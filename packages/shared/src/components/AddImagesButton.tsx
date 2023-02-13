/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ActionMenu,
    IconArrowCircleUp20,
    IconImageStack20,
    LoadingCircle,
    MenuItemContentSize,
} from '@frontify/fondue';
import React, { useEffect, useRef, useState } from 'react';
import { joinClassNames } from '../utilities/react/joinClassNames';

export type AddImagesButtonProps = {
    isLoading?: boolean;
    label: string;
    secondaryLabel?: string;
    icon?: JSX.Element;
    onDrop?: (files: FileList) => void;
    fillParentContainer?: boolean;
    onUploadClick: () => void;
    onAssetChooseClick: () => void;
    setIsMenuOpen?: (isOpen: boolean) => void;
};

export const textAndBgColor = 'tw-bg-blank-state-shaded-inverse tw-border-blank-state-line tw-text-blank-state-shaded';
export const textAndBgColorHover =
    'hover:tw-text-blank-state-hover hover:tw-bg-blank-state-hover-inverse hover:tw-border-blank-state-line-hover active:tw-text-blank-state-pressed active:tw-bg-blank-state-pressed-inverse active:tw-border-blank-state-line-hover';

export const AddImagesButton = ({
    onDrop,
    label,
    icon,
    secondaryLabel,
    isLoading,
    fillParentContainer,
    onAssetChooseClick,
    onUploadClick,
    setIsMenuOpen,
}: AddImagesButtonProps) => {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [menuPosition, setMenuPosition] = useState<[number, number] | undefined>();
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target as HTMLElement)) {
                setMenuPosition(undefined);
                if (setIsMenuOpen) {
                    setIsMenuOpen(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsMenuOpen]);

    const handleDrop: React.DragEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        setIsDraggingOver(false);
        onDrop && onDrop(e.dataTransfer.files);
    };

    const openMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if (!buttonRef.current || isLoading) {
            return;
        }
        const { left, top } = buttonRef.current.getBoundingClientRect();
        const XInsideComponent = e.clientX - left;
        const YInsideComponent = e.clientY - top;
        setMenuPosition([XInsideComponent, YInsideComponent]);
        if (setIsMenuOpen) {
            setIsMenuOpen(true);
        }
    };

    return (
        <button
            ref={buttonRef}
            className={joinClassNames([
                ' tw-font-body tw-relative tw-text-[14px] tw-text-text-weak tw-border tw-rounded-[4px] tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-gap-3 tw-w-full',
                !isLoading && textAndBgColorHover,
                isDraggingOver && '[&>*]:tw-pointer-events-none',
                isDraggingOver || !!menuPosition
                    ? 'tw-text-blank-state-pressed tw-bg-blank-state-pressed-inverse tw-border-blank-state-line-hover hover:tw-text-blank-state-pressed hover:tw-border-blank-state-line-hover hover:tw-bg-blank-state-pressed-inverse'
                    : textAndBgColor,
                fillParentContainer ? 'tw-h-full' : 'tw-h-[72px]',
                isDraggingOver && !isLoading ? 'tw-border-dashed' : 'tw-border-solid',
            ])}
            onDragEnter={() => setIsDraggingOver(true)}
            onDragLeave={() => setIsDraggingOver(false)}
            onDrop={handleDrop}
            onClick={openMenu}
        >
            {isLoading ? (
                <LoadingCircle />
            ) : (
                <>
                    <div>{icon}</div>
                    <div className="tw-flex tw-flex-col tw-items-start">
                        <div className="tw-font-medium">{label}</div>
                        {secondaryLabel && <div className="tw-font-normal">{secondaryLabel}</div>}
                    </div>
                </>
            )}
            {menuPosition && (
                <div
                    className="tw-absolute tw-left-0 tw-top-full tw-z-20"
                    style={{
                        left: menuPosition[0],
                        top: menuPosition[1],
                    }}
                >
                    <ActionMenu
                        menuBlocks={[
                            {
                                id: 'menu',
                                menuItems: [
                                    ...(onUploadClick
                                        ? [
                                              {
                                                  id: 'upload',
                                                  size: MenuItemContentSize.XSmall,
                                                  title: 'Upload asset',
                                                  onClick: () => {
                                                      onUploadClick();
                                                      setMenuPosition(undefined);
                                                      if (setIsMenuOpen) {
                                                          setIsMenuOpen(true);
                                                      }
                                                  },

                                                  initialValue: true,
                                                  decorator: (
                                                      <div className="tw-mr-2">
                                                          <IconArrowCircleUp20 />
                                                      </div>
                                                  ),
                                              },
                                          ]
                                        : []),
                                    ...(onAssetChooseClick
                                        ? [
                                              {
                                                  id: 'asset',
                                                  size: MenuItemContentSize.XSmall,
                                                  title: 'Browse asset',
                                                  onClick: () => {
                                                      onAssetChooseClick();
                                                      setMenuPosition(undefined);
                                                      if (setIsMenuOpen) {
                                                          setIsMenuOpen(true);
                                                      }
                                                  },
                                                  initialValue: true,
                                                  decorator: (
                                                      <div className="tw-mr-2">
                                                          <IconImageStack20 />
                                                      </div>
                                                  ),
                                              },
                                          ]
                                        : []),
                                ],
                            },
                        ]}
                    />
                </div>
            )}
        </button>
    );
};
