/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AppBridgeBlock,
    Template,
    TemplateLegacy,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
} from '@frontify/app-bridge';
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
    SETTING_ID,
    Settings,
    cornerRadiusValues,
    previewDisplayValues,
    previewHeightValues,
    previewImageAnchoringValues,
    textPositioningToFlexDirection,
} from '../types';

export type PreviewProps = {
    appBridge: AppBridgeBlock;
    template: Template | null;
    onUpdateTemplate: (key: string, newTemplateIds: number[]) => Promise<void>;
    onUpdateTemplateTitle: (value: string) => void;
    onUpdateTemplateDescription: (value: string) => void;
};

export const Preview = ({
    appBridge,
    template,
    onUpdateTemplate,
    onUpdateTemplateTitle,
    onUpdateTemplateDescription,
}: PreviewProps) => {
    const [blockSettings, updateBlockSettings] = useBlockSettings<Settings>(appBridge);
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
    const isRows = useCallback(() => flexDirection === 'row' || flexDirection === 'row-reverse', [flexDirection]);

    const [isActionFlyoutOpen, setIsActionFlyoutOpen] = useState(false);

    const updateTemplateTitleAndDescription = (template: TemplateLegacy) => {
        const { title, description } = blockSettings;
        const newTitleValue = title ? title : template.title;
        const newDescriptionValue = description ? description : template.description;

        onUpdateTemplateTitle(newTitleValue);
        onUpdateTemplateDescription(newDescriptionValue);
    };

    const onTemplateSelected = useCallback(async (result: TemplateLegacy) => {
        await onUpdateTemplate(SETTING_ID, [result.id]);

        updateBlockSettings({
            ...blockSettings,
            template: result,
            templateId: result.id,
        }).then(() => {
            updateTemplateTitleAndDescription(result);
        });

        appBridge.closeTemplateChooser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openTemplateChooser = () => appBridge.openTemplateChooser(onTemplateSelected);

    return (
        <div
            style={{
                width: isRows() ? `${100 - parseInt(textRatio)}%` : '100%',
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
                                  previewBorderColor as Color
                              )}`
                            : 'none',
                        height: isPreviewHeightCustom ? previewHeightCustom : previewHeightValues[previewHeightSimple],
                    }}
                >
                    <img
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
                                        onClick={() => setIsActionFlyoutOpen(!isActionFlyoutOpen)}
                                    />
                                }
                                onOpenChange={() => setIsActionFlyoutOpen(!isActionFlyoutOpen)}
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
