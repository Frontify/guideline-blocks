/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Template, TemplateLegacy, useBlockAssets, useEditorState } from '@frontify/app-bridge';
import {
    ActionMenu,
    Button,
    ButtonRounding,
    ButtonSize,
    ButtonStyle,
    ButtonType,
    Flyout,
    IconDotsVertical,
    IconPlus20,
    merge,
} from '@frontify/fondue';
import { useState } from 'react';
import {
    Settings,
    previewDisplayValues,
    previewHeightValues,
    previewImageAnchoringValues,
    textPositioningToFlexDirection,
} from '../types';
import { TEMPLATE_BLOCK_SETTING_ID } from '../constants';
import { getBackgroundColorStyles, radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-settings';

export type TemplatePreviewProps = {
    appBridge: AppBridgeBlock;
    blockSettings: Settings;
    template: Template | null;
    onUpdateTemplate: (key: string, newTemplateIds: number[]) => Promise<void>;
    onUpdateTemplateTitle: (newValue: string, prevValue?: string) => void;
    onUpdateTemplateDescription: (newValue: string, prevValue?: string) => void;
    onSave: (properties: Partial<Settings>) => Promise<void>;
    onError: (message: string) => void;
};

export const TemplatePreview = ({
    appBridge,
    blockSettings,
    template,
    onUpdateTemplate,
    onUpdateTemplateTitle,
    onUpdateTemplateDescription,
    onSave,
    onError,
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

    const [isActionFlyoutOpen, setIsActionFlyoutOpen] = useState(false);

    const onTemplateSelected = async (result: TemplateLegacy) => {
        const { title, description } = blockSettings;

        try {
            await onUpdateTemplate(TEMPLATE_BLOCK_SETTING_ID, [result.id]);
            onSave({
                template: result,
                templateId: result.id,
            });
            onUpdateTemplateTitle(result.title, title);
            onUpdateTemplateDescription(result.description, description);
        } catch (error) {
            onError(error as string);
        }

        appBridge.closeTemplateChooser();
    };

    const openTemplateChooser = () => appBridge.openTemplateChooser(onTemplateSelected);

    return (
        <div
            data-test-id="template-block-preview"
            style={{
                width: isRows ? `${100 - parseInt(textRatio)}%` : '100%',
            }}
        >
            {template !== null || previewCustom ? (
                <div
                    className="tw-relative"
                    style={{
                        ...(hasBackgroundTemplatePreview && {
                            ...getBackgroundColorStyles(backgroundColorTemplatePreview),
                        }),
                        borderRadius,
                        border,
                        height: isPreviewHeightCustom ? previewHeightCustom : previewHeightValues[previewHeightSimple],
                    }}
                >
                    <img
                        data-test-id="template-block-preview-img"
                        src={previewCustom ? previewCustom[0].previewUrl : template?.previewUrl}
                        className={merge([
                            'tw-relative tw-w-full tw-h-full',
                            `tw-object-${previewDisplayValues[previewDisplay]}`,
                        ])}
                        style={{
                            objectPosition: previewImageAnchoring
                                ? previewImageAnchoringValues[previewImageAnchoring]
                                : 'center',
                        }}
                        width={previewCustom ? previewCustom[0].width : 'auto'}
                        height={previewCustom ? previewCustom[0].height : 'auto'}
                        alt={template?.name}
                    />
                    {isEditing && (
                        <div className="tw-absolute tw-top-0 tw-right-0 tw-flex tw-justify-end tw-pt-3">
                            <Flyout
                                isOpen={isActionFlyoutOpen}
                                trigger={
                                    <Button
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
                                                        openTemplateChooser();
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
                <Button
                    data-test-id="template-block-preview-templatechooser-btn"
                    hugWidth
                    icon={<IconPlus20 />}
                    onClick={openTemplateChooser}
                    rounding={ButtonRounding.Medium}
                    size={ButtonSize.Medium}
                    style={ButtonStyle.Default}
                    type={ButtonType.Button}
                >
                    Choose existing template
                </Button>
            )}
        </div>
    );
};
