/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ActionMenu,
    Flyout,
    IconArrowCircleUp20,
    IconImageStack20,
    LoadingCircle,
    MenuItemContentSize,
} from '@frontify/fondue';
import { DragEventHandler, MouseEventHandler, useRef, useState } from 'react';
import { joinClassNames } from '../utilities/react/joinClassNames';

export type BlockInjectButtonProps = {
    isLoading?: boolean;
    label: string;
    secondaryLabel?: string;
    icon?: JSX.Element;
    onDrop: (files: FileList) => void;
    fillParentContainer?: boolean;
    onUploadClick: () => void;
    onAssetChooseClick: () => void;
};

export const BlockInjectButton = ({
    onDrop,
    label,
    icon,
    secondaryLabel,
    isLoading,
    fillParentContainer,
    onAssetChooseClick,
    onUploadClick,
}: BlockInjectButtonProps) => {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [menuPosition, setMenuPosition] = useState<[number, number] | undefined>();
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleDrop: DragEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        setIsDraggingOver(false);
        onDrop(event.dataTransfer.files);
    };

    const openMenu: MouseEventHandler<HTMLButtonElement> = (event) => {
        if (!buttonRef.current || isLoading) {
            return;
        }
        const { left, top } = buttonRef.current.getBoundingClientRect();
        const XInsideComponent = event.clientX - left;
        const YInsideComponent = event.clientY - top;
        setMenuPosition([XInsideComponent, YInsideComponent]);
    };

    return (
        <button
            ref={buttonRef}
            className={joinClassNames([
                'tw-font-body tw-relative tw-text-[14px] tw-text-text-weak tw-border tw-rounded-[4px] tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-gap-3 tw-w-full',
                isLoading
                    ? 'tw-cursor-pointer-none'
                    : 'hover:tw-text-blank-state-hover hover:tw-bg-blank-state-pressed-inverse hover:tw-border-blank-state-line-hover active:tw-text-blank-state-pressed active:tw-bg-blank-state-pressed-inverse active:tw-border-blank-state-line-hover',
                isDraggingOver && '[&>*]:tw-pointer-events-none',
                isDraggingOver || !!menuPosition
                    ? 'tw-text-blank-state-pressed tw-bg-blank-state-pressed-inverse tw-border-blank-state-line-hover hover:tw-text-blank-state-pressed hover:tw-border-blank-state-line-hover hover:tw-bg-blank-state-pressed-inverse'
                    : 'tw-bg-blank-state-shaded-inverse tw-border-blank-state-line tw-text-blank-state-shaded',
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
                    <Flyout
                        onOpenChange={(isOpen) => {
                            if (!isOpen) {
                                setMenuPosition(undefined);
                            }
                        }}
                        isOpen={true}
                        fitContent
                        hug={false}
                        trigger={<div />}
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
                    </Flyout>
                </div>
            )}
        </button>
    );
};
