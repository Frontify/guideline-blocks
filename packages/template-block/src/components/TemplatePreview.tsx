/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Template, useBlockAssets, useEditorState } from '@frontify/app-bridge';
import {
    ActionMenu,
    Button,
    ButtonEmphasis,
    ButtonStyle,
    Flyout,
    IconDotsVertical,
    IconPlus20,
    IconPlus24,
    merge,
} from '@frontify/fondue';
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
    getBackgroundColorStyles,
    radiusStyleMap,
    toRgbaString,
} from '@frontify/guideline-blocks-settings';

export type TemplatePreviewProps = {
    appBridge: AppBridgeBlock;
    blockSettings: Settings;
    template: Template | null;
    onOpenTemplateChooser: () => void;
};

export const TemplatePreview = ({
    appBridge,
    blockSettings,
    template,
    onOpenTemplateChooser,
}: TemplatePreviewProps) => {
    const { blockAssets } = useBlockAssets(appBridge);
    const isEditing = useEditorState(appBridge);

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

    const [isActionFlyoutOpen, setIsActionFlyoutOpen] = useState(false);

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
                        className={merge([
                            'tw-relative tw-w-full tw-h-full',
                            `tw-object-${previewDisplayValues[previewDisplay]}`,
                        ])}
                        style={{
                            objectPosition: previewImageAnchoring
                                ? previewImageAnchoringValues[previewImageAnchoring]
                                : 'center',
                        }}
                        width={preview === PreviewType.Custom && previewCustom ? previewCustom[0].width : 'auto'}
                        height={preview === PreviewType.Custom && previewCustom ? previewCustom[0].height : 'auto'}
                        alt={template?.name}
                    />
                    {isEditing && (
                        <div className="tw-absolute tw-top-0 tw-right-0 tw-flex tw-justify-end tw-pt-3">
                            <Flyout
                                isOpen={isActionFlyoutOpen}
                                trigger={
                                    <Button
                                        aria-label="Template actions"
                                        emphasis={ButtonEmphasis.Default}
                                        style={ButtonStyle.Default}
                                        icon={<IconDotsVertical />}
                                        onClick={() => setIsActionFlyoutOpen((previousValue) => !previousValue)}
                                    />
                                }
                                onOpenChange={() => setIsActionFlyoutOpen((previousValue) => !previousValue)}
                                legacyFooter={false}
                            >
                                <ActionMenu
                                    menuBlocks={[
                                        {
                                            id: '0',
                                            menuItems: [
                                                {
                                                    id: '0',
                                                    title: 'Choose existing template',
                                                    decorator: <IconPlus20 />,
                                                    onClick: () => {
                                                        setIsActionFlyoutOpen(false);
                                                        onOpenTemplateChooser();
                                                    },
                                                },
                                            ],
                                        },
                                    ]}
                                />
                            </Flyout>
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
