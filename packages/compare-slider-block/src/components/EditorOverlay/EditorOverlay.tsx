/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowCircleUp20, IconImageStack20, IconTrashBin16 } from '@frontify/fondue';
import { BlockItemWrapper } from '@frontify/guideline-blocks-settings';
import { Alignment, EditorOverlayProps, SliderImageSlot } from '../../types';

export const EditorOverlay = ({
    alignment,
    openAssetChooser,
    startFileDialogUpload,
    firstAsset,
    secondAsset,
    borderStyle,
    handleAssetDelete,
    renderLabel,
}: EditorOverlayProps) => {
    return (
        <>
            <div
                style={{
                    width: alignment === Alignment.Vertical ? '100%' : '50%',
                    height: alignment === Alignment.Vertical ? '50%' : '100%',
                }}
                className="tw-absolute tw-flex tw-top-0 tw-left-0"
            >
                <BlockItemWrapper
                    shouldFillContainer
                    outlineOffset={1}
                    toolbarItems={[
                        {
                            type: 'button',
                            icon: <IconTrashBin16 />,
                            onClick: () => handleAssetDelete('firstAsset', firstAsset[0].id),
                            tooltip: 'Remove asset',
                        },
                        {
                            type: 'menu',
                            items: [
                                [
                                    {
                                        title: 'Replace with upload',
                                        icon: <IconArrowCircleUp20 />,
                                        onClick: () => startFileDialogUpload(SliderImageSlot.First),
                                    },
                                    {
                                        title: 'Replace with asset',
                                        icon: <IconImageStack20 />,
                                        onClick: () => openAssetChooser(SliderImageSlot.First),
                                    },
                                ],
                            ],
                        },
                    ]}
                >
                    <div className="tw-w-full tw-h-full tw-pointer-events-none" />
                </BlockItemWrapper>
            </div>
            <div
                style={{
                    left: alignment === Alignment.Vertical ? 0 : '50%',
                    top: alignment === Alignment.Vertical ? '50%' : 0,
                    width: alignment === Alignment.Vertical ? '100%' : '50%',
                    height: alignment === Alignment.Vertical ? '50%' : '100%',
                }}
                className="tw-absolute tw-flex tw-top-0"
            >
                <BlockItemWrapper
                    shouldFillContainer
                    outlineOffset={1}
                    toolbarItems={[
                        {
                            type: 'button',
                            icon: <IconTrashBin16 />,
                            onClick: () => handleAssetDelete('secondAsset', secondAsset[0].id),
                            tooltip: 'Remove asset',
                        },
                        {
                            type: 'menu',
                            items: [
                                [
                                    {
                                        title: 'Replace with upload',
                                        icon: <IconArrowCircleUp20 />,
                                        onClick: () => startFileDialogUpload(SliderImageSlot.Second),
                                    },
                                    {
                                        title: 'Replace with asset',
                                        icon: <IconImageStack20 />,
                                        onClick: () => openAssetChooser(SliderImageSlot.Second),
                                    },
                                ],
                            ],
                        },
                    ]}
                >
                    <div className="tw-w-full tw-h-full" />
                </BlockItemWrapper>
            </div>
            <div className="tw-w-full tw-h-full tw-absolute tw-pointer-events-none" style={borderStyle}>
                <div className="tw-pointer-events-auto">
                    {renderLabel(SliderImageSlot.First)}
                    {renderLabel(SliderImageSlot.Second)}
                </div>
            </div>
        </>
    );
};
