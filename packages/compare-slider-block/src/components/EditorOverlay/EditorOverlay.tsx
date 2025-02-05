/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowCircleUp20, IconImageStack20, IconSpeechBubbleQuote20, IconTrashBin16 } from '@frontify/fondue';
import { BlockItemWrapper } from '@frontify/guideline-blocks-settings';
import { Alignment, EditorOverlayProps, SliderImageSlot } from '../../types';
import { useState } from 'react';
import { EditAltTextFlyout } from '@frontify/guideline-blocks-shared';

export const EditorOverlay = ({
    alignment,
    openAssetChooser,
    startFileDialogUpload,
    firstAsset,
    secondAsset,
    borderStyle,
    handleAssetDelete,
    renderLabel,
    firstAlt,
    secondAlt,
    updateImageAlt,
}: EditorOverlayProps) => {
    const [showFirstAltTextMenu, setShowFirstAltTextMenu] = useState(false);
    const [showSecondAltTextMenu, setShowSecondAltTextMenu] = useState(false);

    const [firstLocalAltText, setFirstLocalAltText] = useState<string | undefined>(firstAlt);
    const [secondLocalAltText, setSecondLocalAltText] = useState<string | undefined>(secondAlt);

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
                                    {
                                        title: 'Set alt text',
                                        onClick: () => setShowFirstAltTextMenu(true),
                                        icon: <IconSpeechBubbleQuote20 />,
                                    },
                                ],
                            ],
                        },
                    ]}
                >
                    <EditAltTextFlyout
                        setShowAltTextMenu={setShowFirstAltTextMenu}
                        showAltTextMenu={showFirstAltTextMenu}
                        setLocalAltText={setFirstLocalAltText}
                        defaultAltText={firstAlt}
                        onSave={() => updateImageAlt('firstAssetAlt', firstLocalAltText ?? '')}
                        localAltText={firstLocalAltText}
                    />
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
                    outlineOffset={-1}
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
                                    {
                                        title: 'Set alt text',
                                        onClick: () => setShowSecondAltTextMenu(true),
                                        icon: <IconSpeechBubbleQuote20 />,
                                    },
                                ],
                            ],
                        },
                    ]}
                >
                    <EditAltTextFlyout
                        setShowAltTextMenu={setShowSecondAltTextMenu}
                        showAltTextMenu={showSecondAltTextMenu}
                        setLocalAltText={setSecondLocalAltText}
                        defaultAltText={secondAlt}
                        onSave={() => updateImageAlt('secondAssetAlt', secondLocalAltText ?? '')}
                        localAltText={secondLocalAltText}
                    />
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
