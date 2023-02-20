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
import { ItemToolbarProps } from '../types';

import { useState } from 'react';

export const ItemToolbar = ({ onRemoveAsset, onUploadClick, onAssetChooseClick }: ItemToolbarProps) => {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

    return (
        <div data-test-id="item-toolbar" className="tw-flex tw-justify-end">
            <div className="tw-bg-white tw-text-box-selected-inverse tw-flex tw-flex-shrink-0 tw-gap-[2px] tw-px-[1px] tw-spacing tw-items-center tw-h-[28px] tw-self-start tw-border tw-border-box-selected-inverse tw-rounded-[4px]">
                <Tooltip
                    withArrow
                    enterDelay={300}
                    hoverDelay={0}
                    position={TooltipPosition.Top}
                    content={'Delete item'}
                    triggerElement={
                        <div
                            onClick={onRemoveAsset}
                            className="tw-bg-base hover:tw-bg-box-selected-hover active:tw-bg-box-selected-pressed tw-cursor-pointer tw-inline-flex  tw-items-center tw-justify-center tw-w-[24px] tw-h-[24px] tw-rounded-sm"
                        >
                            <IconTrashBin16 />
                        </div>
                    }
                />

                <div className="tw-flex tw-flex-shrink-0 tw-flex-1 tw-h-[24px]">
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
                                content={'Options'}
                                triggerElement={
                                    <div className="tw-bg-base hover:tw-bg-box-selected-hover active:tw-bg-box-selected-pressed tw-cursor-pointer tw-inline-flex  tw-items-center tw-justify-center tw-w-[24px] tw-h-[24px] tw-rounded-sm">
                                        <IconDotsHorizontal16 />
                                    </div>
                                }
                            />
                        }
                    >
                        <ActionMenu
                            menuBlocks={[
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
                            ]}
                        />
                    </Flyout>
                </div>
            </div>
        </div>
    );
};
