/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, Template, useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    ActionMenu,
    Button,
    ButtonCommonClasses,
    ButtonElements,
    ButtonEmphasis,
    ButtonRounding,
    ButtonRoundingClasses,
    ButtonSize,
    ButtonStyle,
    ButtonStyleClasses,
    Flyout,
    IconDotsVertical,
    IconPlus20,
    IconSpacingClasses,
    merge,
} from '@frontify/fondue';
import { toRgbaString } from '@frontify/guideline-blocks-shared';
import { useCallback, useState } from 'react';
import {
    BlockProps,
    Settings,
    cornerRadiusValues,
    previewDisplayValues,
    previewHeightValues,
    previewImageAnchoringValues,
    textPositioningToFlexDirection,
} from '../types';

export const Preview = ({ appBridge }: BlockProps) => {
    const [blockSettings, updateBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const isEditing = useEditorState(appBridge);

    const {
        title,
        description,
        template,
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

    const getButtonStyles = (kind: keyof ButtonElements) =>
        `${ButtonStyleClasses[ButtonEmphasis.Default][ButtonStyle.Default][kind]}`;

    const buttonClasses = merge([
        getButtonStyles('button'),
        ButtonCommonClasses,
        ButtonRoundingClasses[ButtonRounding.Medium],
    ]);

    const [isActionFlyoutOpen, setIsActionFlyoutOpen] = useState(false);

    const onTemplateSelected = useCallback((result: Template) => {
        const newTitleValue = title
            ? title
            : JSON.stringify([{ type: 'heading3', children: [{ text: result.title }] }]);
        const newDescriptionValue = description
            ? description
            : JSON.stringify([{ type: 'p', children: [{ text: result.description }] }]);

        updateBlockSettings({
            ...blockSettings,
            template: result,
            templateId: result.id,
            title: newTitleValue,
            description: newDescriptionValue,
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
            {template || previewCustom ? (
                <div
                    className="tw-relative"
                    style={{
                        backgroundColor: hasPreviewBackgroundColor
                            ? toRgbaString(previewBackgroundColor as Color)
                            : undefined,
                        borderRadius: isPreviewCorderRadiusCustom
                            ? previewCornerRadiusCustom
                            : cornerRadiusValues[previewCornerRadiusSimple],
                        border: hasPreviewBorder
                            ? `${previewBorderWidth} ${previewBorderStyle} ${toRgbaString(previewBorderColor as Color)}`
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
                        width={previewCustom ? previewCustom[0].width : template?.width}
                        height={previewCustom ? previewCustom[0].height : template?.height}
                    />
                    {isEditing && (
                        <div className="tw-absolute tw-top-0 tw-right-0 tw-flex tw-justify-end tw-pt-3">
                            <Flyout
                                isOpen={isActionFlyoutOpen}
                                trigger={
                                    <Button
                                        icon={<IconDotsVertical />}
                                        hideLabel={true}
                                        emphasis={ButtonEmphasis.Default}
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
                <button
                    className={merge([buttonClasses, 'tw-w-full tw-h-full'])}
                    style={{
                        height: isPreviewHeightCustom ? previewHeightCustom : previewHeightValues[previewHeightSimple],
                    }}
                    onClick={openTemplateChooser}
                >
                    <span
                        data-test-id="button-icon"
                        className={merge([IconSpacingClasses[ButtonSize.Medium], getButtonStyles('icon')])}
                    >
                        <IconPlus20 />
                    </span>
                    <span>Choose existing template</span>
                </button>
            )}
        </div>
    );
};
