/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Template, TemplateLegacy, useBlockAssets, useEditorState } from '@frontify/app-bridge';
import {
    ActionMenu,
    Button,
    ButtonRounding,
    ButtonSize,
    ButtonStyle,
    ButtonType,
    Color,
    Flyout,
    IconDotsVertical,
    IconPlus20,
    merge,
} from '@frontify/fondue';
import { getRgbaString } from '../utils';
import { useCallback, useState } from 'react';
import {
    Settings,
    cornerRadiusValues,
    previewDisplayValues,
    previewHeightValues,
    previewImageAnchoringValues,
    textPositioningToFlexDirection,
} from '../types';
import { SETTING_ID } from '../constants';

export type TemplatePreviewProps = {
    appBridge: AppBridgeBlock;
    blockSettings: Settings;
    template: Template | null;
    onUpdateTemplate: (key: string, newTemplateIds: number[]) => Promise<void>;
    onUpdateTemplateTitle: (value: string) => void;
    onUpdateTemplateDescription: (value: string) => void;
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
        hasPreviewBackgroundColor,
        previewBackgroundColor,
        hasPreviewBorder,
        previewBorderColor,
        previewBorderStyle,
        previewBorderWidth,
        isPreviewCorderRadiusCustom,
        previewCornerRadiusSimple,
        previewCornerRadiusCustom,
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

    const [isActionFlyoutOpen, setIsActionFlyoutOpen] = useState(false);

    const updateTemplateTitleAndDescription = (template: TemplateLegacy) => {
        const { title, description } = blockSettings;
        const newTitleValue = title ? title : template.title;
        const newDescriptionValue = description ? description : template.description;

        onUpdateTemplateTitle(newTitleValue);
        onUpdateTemplateDescription(newDescriptionValue);
    };

    const onTemplateSelected = useCallback(
        async (result: TemplateLegacy) => {
            try {
                await onUpdateTemplate(SETTING_ID, [result.id]);
                await onSave({
                    ...blockSettings,
                    template: result,
                    templateId: result.id,
                });
                updateTemplateTitleAndDescription(result);
            } catch (error) {
                onError(error as string);
            }

            appBridge.closeTemplateChooser();
        },
        [appBridge, blockSettings, onError, onSave, onUpdateTemplate, updateTemplateTitleAndDescription],
    );

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
                        backgroundColor: hasPreviewBackgroundColor
                            ? getRgbaString(previewBackgroundColor as Color)
                            : undefined,
                        borderRadius: isPreviewCorderRadiusCustom
                            ? previewCornerRadiusCustom
                            : cornerRadiusValues[previewCornerRadiusSimple],
                        border: hasPreviewBorder
                            ? `${previewBorderWidth} ${previewBorderStyle} ${getRgbaString(
                                  previewBorderColor as Color,
                              )}`
                            : 'none',
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
                    style={ButtonStyle.Primary}
                    type={ButtonType.Button}
                >
                    Choose existing template
                </Button>
            )}
        </div>
    );
};
