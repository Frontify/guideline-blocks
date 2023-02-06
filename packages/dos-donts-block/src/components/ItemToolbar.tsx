/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ActionMenu,
    Flyout,
    IconArrowCircleUp20,
    IconArrowMove16,
    IconArrowSwap20,
    IconDotsVertical16,
    IconImageStack20,
    IconTrashBin16,
    IconTrashBin20,
    MenuItemContentSize,
} from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { DoDontType, ItemToolbarProps } from '../types';

const ItemToolbar = ({
    draggableProps,
    id,
    isDragging,
    onRemoveSelf,
    isFlyoutOpen,
    setIsFlyoutOpen,
    onChangeItem,
    type,
    onAssetChooseClick,
    onUploadClick,
}: ItemToolbarProps) => {
    return (
        <div className="tw-flex tw-justify-end">
            <div className="tw-bg-white tw-text-box-selected-inverse tw-flex tw-flex-shrink-0 tw-gap-[2px] tw-px-[1px] tw-spacing tw-items-center tw-h-[28px] tw-self-start tw-border tw-border-box-selected-inverse tw-rounded-[4px]">
                <button
                    {...draggableProps}
                    className={joinClassNames([
                        'tw-bg-base  tw-inline-flex  tw-items-center tw-justify-center tw-w-[24px] tw-h-[24px] tw-rounded-sm',
                        isDragging
                            ? 'tw-cursor-grabbing hover:tw-bg-box-selected-pressed'
                            : 'tw-cursor-grab hover:tw-bg-box-selected-hover',
                    ])}
                >
                    <IconArrowMove16 />
                </button>
                <div
                    onClick={onRemoveSelf}
                    className="tw-bg-base hover:tw-bg-box-selected-hover active:tw-bg-box-selected-pressed tw-cursor-pointer tw-inline-flex  tw-items-center tw-justify-center tw-w-[24px] tw-h-[24px] tw-rounded-sm"
                >
                    <IconTrashBin16 />
                </div>
                <div className="tw-flex tw-flex-shrink-0 tw-flex-1 tw-h-[24px]">
                    <Flyout
                        isOpen={isFlyoutOpen}
                        legacyFooter={false}
                        fitContent
                        hug={false}
                        onOpenChange={setIsFlyoutOpen}
                        trigger={
                            <div className="tw-bg-base hover:tw-bg-box-selected-hover active:tw-bg-box-selected-pressed tw-cursor-pointer tw-inline-flex  tw-items-center tw-justify-center tw-w-[24px] tw-h-[24px] tw-rounded-sm">
                                <IconDotsVertical16 />
                            </div>
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
                                        {
                                            id: 'change',
                                            size: MenuItemContentSize.XSmall,
                                            title: type === DoDontType.Do ? 'Change to "don\'t"' : 'Change to "do"',
                                            onClick: () => {
                                                onChangeItem(
                                                    id,
                                                    type === DoDontType.Do ? DoDontType.Dont : DoDontType.Do,
                                                    'type'
                                                );
                                            },
                                            initialValue: true,
                                            decorator: (
                                                <div className="tw-mr-2">
                                                    <IconArrowSwap20 />
                                                </div>
                                            ),
                                        },
                                    ],
                                },
                                {
                                    id: 'deletemenu',
                                    menuItems: [
                                        {
                                            id: 'delete',
                                            size: MenuItemContentSize.XSmall,
                                            title: 'Delete',
                                            onClick: onRemoveSelf,
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
export default ItemToolbar;
