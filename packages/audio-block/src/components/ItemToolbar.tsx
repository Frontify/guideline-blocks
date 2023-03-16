/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ActionMenu,
    Flyout,
    IconArrowCircleUp20,
    IconDotsHorizontal16,
    IconImageStack20,
    IconTrashBin16,
    IconTrashBin20,
    MenuItemContentSize,
    Tooltip,
    TooltipPosition,
} from '@frontify/fondue';
import { ItemToolbarProps, TextPosition } from '../types';

import { useState } from 'react';
import { joinClassNames } from '@frontify/guideline-blocks-shared';

export const ItemToolbar = ({ textPosition, onRemoveAsset, onUploadClick, onAssetChooseClick }: ItemToolbarProps) => {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

    const menuBlocks = [
        {
            id: 'menu',
            menuItems: [
                ...(!!onUploadClick
                    ? [
                          {
                              id: 'upload',
                              size: MenuItemContentSize.XSmall,
                              title: 'Replace with upload',
                              onClick: () => {
                                  setIsFlyoutOpen(false);
                                  onUploadClick();
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
                ...(!!onAssetChooseClick
                    ? [
                          {
                              id: 'asset',
                              size: MenuItemContentSize.XSmall,
                              title: 'Replace with asset',
                              onClick: () => {
                                  setIsFlyoutOpen(false);
                                  onAssetChooseClick();
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
        {
            id: 'deletemenu',
            menuItems: [
                {
                    id: 'delete',
                    size: MenuItemContentSize.XSmall,
                    title: 'Delete',
                    onClick: onRemoveAsset,
                    initialValue: true,
                    decorator: (
                        <div className="tw-mr-2">
                            <IconTrashBin20 />
                        </div>
                    ),
                },
            ],
        },
    ];

    const toolbarClassNames = joinClassNames([
        'tw-absolute tw-z-10 -tw-right-0.5 tw-visible',
        textPosition === TextPosition.Below && '-tw-top-1',
        textPosition === TextPosition.Above && '-tw-top-6',
    ]);

    return (
        <div data-test-id="item-toolbar" className={toolbarClassNames}>
            <div className="tw-bg-white tw-text-box-selected-inverse tw-flex tw-flex-shrink-0 tw-gap-0.5 tw-spacing tw-items-center tw-h-7 tw-self-start tw-border tw-border-box-selected-inverse tw-rounded">
                <Tooltip
                    withArrow
                    enterDelay={300}
                    hoverDelay={0}
                    position={TooltipPosition.Top}
                    content="Delete item"
                    triggerElement={
                        <div
                            onClick={onRemoveAsset}
                            className="tw-bg-base hover:tw-bg-box-selected-hover active:tw-bg-box-selected-pressed tw-cursor-pointer tw-inline-flex tw-items-center tw-justify-center tw-w-6 tw-h-6 tw-rounded-sm"
                        >
                            <IconTrashBin16 />
                        </div>
                    }
                />

                <div className="tw-flex tw-flex-shrink-0 tw-flex-1 tw-h-6">
                    <Flyout
                        isOpen={isFlyoutOpen}
                        fitContent
                        hug={false}
                        onOpenChange={setIsFlyoutOpen}
                        legacyFooter={false}
                        trigger={
                            <Tooltip
                                withArrow
                                hoverDelay={0}
                                enterDelay={300}
                                position={TooltipPosition.Top}
                                content="Options"
                                triggerElement={
                                    <div className="tw-bg-base hover:tw-bg-box-selected-hover active:tw-bg-box-selected-pressed tw-cursor-pointer tw-inline-flex tw-items-center tw-justify-center tw-w-6 tw-h-6 tw-rounded-sm">
                                        <IconDotsHorizontal16 />
                                    </div>
                                }
                            />
                        }
                    >
                        <ActionMenu menuBlocks={menuBlocks} />
                    </Flyout>
                </div>
            </div>
        </div>
    );
};
