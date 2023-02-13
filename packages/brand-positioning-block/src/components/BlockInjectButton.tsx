/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ActionMenu,
    Flyout,
    IconArrowCircleUp20,
    IconImageStack20,
    LoadingCircle,
    MenuItemContentSize,
} from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { DragEventHandler, MouseEventHandler, useRef, useState } from 'react';
import { BlockInjectButtonProps } from '../types';

const BlockInjectButton = ({
    onClick,
    onDrop,
    label,
    icon,
    secondaryLabel,
    isLoading,
    onAssetChooseClick,
    onUploadClick,
}: BlockInjectButtonProps) => {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [menuPosition, setMenuPosition] = useState<[number, number] | undefined>();
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleDrop: DragEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        setIsDraggingOver(false);
        if (onDrop) {
            const { dataTransfer } = event;
            const files = dataTransfer.files;
            onDrop(files);
        }
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
                'tw-font-body tw-relative tw-h-[72px] tw-text-sm tw-text-text-weak tw-border tw-rounded tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-gap-3 tw-w-full',
                !isLoading &&
                    'hover:tw-text-blank-state-hover hover:tw-bg-blank-state-hover-inverse hover:tw-border-blank-state-line-hover active:tw-text-blank-state-pressed active:tw-bg-blank-state-pressed-inverse active:tw-border-blank-state-line-hover',
                isDraggingOver && '[&>*]:tw-pointer-events-none',
                isDraggingOver || !!menuPosition
                    ? 'tw-text-blank-state-pressed tw-bg-blank-state-pressed-inverse tw-border-blank-state-line-hover hover:tw-text-blank-state-pressed hover:tw-border-blank-state-line-hover hover:tw-bg-blank-state-pressed-inverse'
                    : 'tw-bg-blank-state-shaded-inverse tw-border-blank-state-line tw-text-blank-state-shaded ',
                !!onDrop && isDraggingOver && !isLoading ? 'tw-border-dashed' : 'tw-border-solid',
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
                    <Flyout
                        onOpenChange={(isOpen) => {
                            if (!isOpen) {
                                setMenuPosition(undefined);
                            }
                        }}
                        isOpen={true}
                        fitContent
                        hug={false}
                        legacyFooter={false}
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

export default BlockInjectButton;
