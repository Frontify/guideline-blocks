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
import { ThumbnailToolbarProps } from '../types';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { AssetChooserObjectType, useAssetUpload, useFileInput } from '@frontify/app-bridge';

import { useEffect, useState } from 'react';

export const ThumbnailToolbar = ({
    appBridge,
    asset,
    isFocused,
    onRemoveAsset,
    onReplaceAsset,
    isUploading,
    setIsUploading,
}: ThumbnailToolbarProps) => {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'image/*' });
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isUploading && setIsUploading(true),
    });

    const openAssetChooser = () => {
        appBridge.openAssetChooser(
            async (result) => {
                onReplaceAsset(asset.id, result[0].id);
                appBridge.closeAssetChooser();
            },
            {
                objectTypes: [AssetChooserObjectType.ImageVideo],
            }
        );
    };

    useEffect(() => {
        if (selectedFiles) {
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll && uploadResults) {
            onReplaceAsset(asset.id, uploadResults[0].id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    const menuBlocks = [
        {
            id: 'menu',
            menuItems: [
                ...(!!openFileDialog
                    ? [
                          {
                              id: 'upload',
                              size: MenuItemContentSize.XSmall,
                              title: 'Replace with upload',
                              onClick: () => {
                                  setIsFlyoutOpen(false);
                                  openFileDialog();
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
                ...(!!openAssetChooser
                    ? [
                          {
                              id: 'asset',
                              size: MenuItemContentSize.XSmall,
                              title: 'Replace with asset',
                              onClick: () => {
                                  setIsFlyoutOpen(false);
                                  openAssetChooser();
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
                    onClick: () => onRemoveAsset(asset.id),
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

    return (
        <div
            data-test-id="item-toolbar"
            className={joinClassNames([
                'group-hover:tw-visible tw-absolute tw-z-10 -tw-right-0.5 -tw-top-6',
                (isFocused && 'tw-visible') || 'tw-invisible',
            ])}
        >
            <div className="tw-bg-white tw-text-box-selected-inverse tw-flex tw-flex-shrink-0 tw-gap-0.5 tw-spacing tw-items-center tw-h-7 tw-self-start tw-border tw-border-box-selected-inverse tw-rounded">
                <Tooltip
                    withArrow
                    enterDelay={300}
                    hoverDelay={0}
                    position={TooltipPosition.Top}
                    content="Delete item"
                    triggerElement={
                        <div
                            data-test-id="remove-thumbnail"
                            onClick={() => onRemoveAsset(asset.id)}
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
