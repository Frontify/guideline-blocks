/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Template, useBlockAssets, useEditorState } from '@frontify/app-bridge';
import { IconArrowSync, IconPlus24, IconSpeechBubbleQuote20, merge } from '@frontify/fondue';
import { useState } from 'react';
import {
    PreviewType,
    Settings,
    previewDisplayValues,
    previewHeightValues,
    previewImageAnchoringValues,
    textPositioningToFlexDirection,
} from '../types';
import {
    BlockInjectButton,
    BlockItemWrapper,
    getBackgroundColorStyles,
    radiusStyleMap,
    toRgbaString,
} from '@frontify/guideline-blocks-settings';
import { EditAltTextFlyout } from '@frontify/guideline-blocks-shared';

export type TemplatePreviewProps = {
    appBridge: AppBridgeBlock;
    blockSettings: Settings;
    template: Template | null;
    updateBlockSettings: (newSettings: Partial<Settings>) => Promise<void>;
    onOpenTemplateChooser: () => void;
};

export const TemplatePreview = ({
    appBridge,
    blockSettings,
    template,
    updateBlockSettings,
    onOpenTemplateChooser,
}: TemplatePreviewProps) => {
    const { blockAssets } = useBlockAssets(appBridge);
    const isEditing = useEditorState(appBridge);
    const [showAltTextMenu, setShowAltTextMenu] = useState(false);
    const [localAltText, setLocalAltText] = useState<string | undefined>(blockSettings.altText);
    const [isHovered, setIsHovered] = useState(false);

    const {
        hasBackgroundTemplatePreview,
        backgroundColorTemplatePreview,
        hasBorder_templatePreview,
        borderWidth_templatePreview,
        borderColor_templatePreview,
        borderStyle_templatePreview,
        hasRadius_templatePreview,
        radiusValue_templatePreview,
        radiusChoice_templatePreview,
        textRatio,
        preview,
        isPreviewHeightCustom,
        previewHeightSimple,
        previewHeightCustom,
        previewDisplay,
        previewImageAnchoring,
        textPositioning,
    } = blockSettings;

    const { previewCustom } = blockAssets;

    const flexDirection = textPositioningToFlexDirection[textPositioning];
    const isRows = flexDirection === 'row' || flexDirection === 'row-reverse';
    const borderRadius = hasRadius_templatePreview
        ? radiusValue_templatePreview
        : radiusStyleMap[radiusChoice_templatePreview];
    const border = hasBorder_templatePreview
        ? `${borderWidth_templatePreview} ${borderStyle_templatePreview} ${toRgbaString(borderColor_templatePreview)}`
        : 'none';
    const height = isPreviewHeightCustom ? previewHeightCustom : previewHeightValues[previewHeightSimple];

    return (
        <div
            data-test-id="template-block-preview"
            style={{
                width: isRows ? `${100 - parseInt(textRatio)}%` : '100%',
            }}
        >
            {template !== null || previewCustom ? (
                <div
                    className="tw-relative tw-overflow-hidden"
                    data-test-id="template-block-preview-wrapper"
                    style={{
                        ...(hasBackgroundTemplatePreview && {
                            ...getBackgroundColorStyles(backgroundColorTemplatePreview),
                        }),
                        borderRadius,
                        border,
                        height,
                    }}
                >
                    <img
                        data-test-id="template-block-preview-img"
                        src={
                            preview === PreviewType.Custom && previewCustom
                                ? previewCustom[0].previewUrl
                                : template?.previewUrl
                        }
                        className={merge(['tw-relative tw-w-full tw-h-full', previewDisplayValues[previewDisplay]])}
                        style={{
                            objectPosition: previewImageAnchoring
                                ? previewImageAnchoringValues[previewImageAnchoring]
                                : 'center',
                        }}
                        width={preview === PreviewType.Custom && previewCustom ? previewCustom[0].width : 'auto'}
                        height={preview === PreviewType.Custom && previewCustom ? previewCustom[0].height : 'auto'}
                        alt={blockSettings.altText || undefined}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onBlur={() => setIsHovered(false)}
                    />
                    {isEditing && (
                        <div className="tw-absolute tw-top-5 tw-right-0 tw-flex tw-justify-end tw-pt-3 tw-mx-3">
                            <BlockItemWrapper
                                shouldHideWrapper={!isEditing}
                                shouldBeShown={isHovered || showAltTextMenu}
                                toolbarItems={[]}
                                toolbarFlyoutItems={[
                                    [
                                        {
                                            title: 'Set alt text',
                                            onClick: () => setShowAltTextMenu(true),
                                            icon: <IconSpeechBubbleQuote20 />,
                                        },
                                        {
                                            title: 'Replace template',
                                            onClick: () => onOpenTemplateChooser(),
                                            icon: <IconArrowSync />,
                                        },
                                    ],
                                ]}
                            >
                                <EditAltTextFlyout
                                    setShowAltTextMenu={setShowAltTextMenu}
                                    showAltTextMenu={showAltTextMenu}
                                    setLocalAltText={setLocalAltText}
                                    defaultAltText={blockSettings.altText}
                                    onSave={() => updateBlockSettings({ altText: localAltText || undefined })}
                                    localAltText={localAltText}
                                />
                            </BlockItemWrapper>
                        </div>
                    )}
                </div>
            ) : (
                <div style={{ height }}>
                    <BlockInjectButton
                        label="Choose existing template"
                        icon={<IconPlus24 />}
                        withMenu={false}
                        fillParentContainer={true}
                        onClick={onOpenTemplateChooser}
                    />
                </div>
            )}
        </div>
    );
};
