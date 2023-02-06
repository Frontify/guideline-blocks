/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ActionMenu,
    IconArrowCircleUp20,
    IconImageStack20,
    LoadingCircle,
    MenuItemContentSize,
} from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import React, { useEffect, useRef, useState } from 'react';
import { BlockEditButtonProps } from '../types';

const BlockEditButton = ({
    onClick,
    onDrop,
    label,
    icon,
    secondaryLabel,
    isLoading,
    fillParentContainer,
    onAssetChooseClick,
    onUploadClick,
    setIsMenuOpen,
}: BlockEditButtonProps) => {
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
        if (onDrop) {
            const dt = e.dataTransfer;
            const files = dt.files;
            onDrop(files);
        }
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
                ' tw-relative tw-text-[14px] tw-text-text-weak tw-border [&:not(:first-child)]:tw-border-l-0 first:tw-rounded-tl-[4px] first:tw-rounded-bl-[4px] last:tw-rounded-tr-[4px] last:tw-rounded-br-[4px] tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-gap-3 tw-w-full',
                !isLoading &&
                    'hover:tw-text-blank-state-hover hover:tw-bg-blank-state-hover-inverse hover:tw-border-blank-state-line-hover active:tw-text-blank-state-pressed active:tw-bg-blank-state-pressed-inverse active:tw-border-blank-state-line-hover',
                isDraggingOver && '[&>*]:tw-pointer-events-none',
                isDraggingOver || !!menuPosition
                    ? 'tw-text-blank-state-pressed tw-bg-blank-state-pressed-inverse tw-border-blank-state-line-hover hover:tw-text-blank-state-pressed hover:tw-border-blank-state-line-hover hover:tw-bg-blank-state-pressed-inverse'
                    : 'tw-bg-blank-state-shaded-inverse tw-border-blank-state-line tw-text-blank-state-shaded ',
                fillParentContainer ? 'tw-h-full' : 'tw-h-[72px]',
                !!onDrop && !isLoading ? 'tw-border-dashed' : 'tw-border-solid',
            ])}
            onDragEnter={() => setIsDraggingOver(true)}
            onDragLeave={() => setIsDraggingOver(false)}
            onDrop={handleDrop}
            onClick={onClick || openMenu}
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
                                                  title: 'Upload',
                                                  onClick: () => {
                                                      onUploadClick();
                                                      setMenuPosition(undefined);
                                                      if (setIsMenuOpen) {
                                                          setIsMenuOpen(false);
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
                                                  title: 'Choose',
                                                  onClick: () => {
                                                      onAssetChooseClick();
                                                      setMenuPosition(undefined);
                                                      if (setIsMenuOpen) {
                                                          setIsMenuOpen(false);
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

export default BlockEditButton;
