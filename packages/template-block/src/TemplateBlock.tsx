/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, Template, useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { CSSProperties, ReactElement, ReactNode, useCallback, useState } from 'react';
import 'tailwindcss/tailwind.css';
import {
    BlockProps,
    PreviewType,
    Settings,
    cardPaddingValues,
    cornerRadiusValues,
    previewDisplayValues,
    previewHeightValues,
    previewImageAnchoringValues,
    textPositioningToFlexDirection,
} from './types';
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
    EditorActions,
    Flyout,
    FormControl,
    IconDotsVertical,
    IconPlus20,
    IconSpacingClasses,
    RichTextEditor,
    Text,
    merge,
} from '@frontify/fondue';
import { toRgbaString, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

const TITLE_ACTIONS = [[EditorActions.TEXT_STYLES], [EditorActions.BOLD, EditorActions.ITALIC]];
const DESCRIPTION_ACTIONS = [
    [EditorActions.TEXT_STYLES],
    [EditorActions.BOLD, EditorActions.ITALIC, EditorActions.UNDERLINE, EditorActions.LINK],
    [
        EditorActions.ALIGN_LEFT,
        EditorActions.ALIGN_CENTER,
        EditorActions.ALIGN_RIGHT,
        EditorActions.ALIGN_JUSTIFY,
        EditorActions.UNORDERED_LIST,
        EditorActions.ORDERED_LIST,
    ],
];

const GAP = '32px';

export const TemplateBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, updateBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const isEditing = useEditorState(appBridge);
    const blockId = appBridge.getBlockId().toString();
    const { designTokens } = useGuidelineDesignTokens();

    const {
        title,
        description,
        template,
        preview,
        buttonStyle,
        isCardPaddingCustom,
        cardPaddingSimple,
        cardPaddingCustomTop,
        cardPaddingCustomLeft,
        cardPaddingCustomRight,
        cardPaddingCustomBottom,
        hasCardBackgroundColor,
        cardBackgroundColor,
        hasCardBorder,
        cardBorderColor,
        cardBorderStyle,
        cardBorderWidth,
        isCardCornerRadiusCustom,
        cardCornerRadiusSimple,
        cardCornerRadiusCustom,
        hasPreviewBackgroundColor,
        previewBackgroundColor,
        hasPreviewBorder,
        previewBorderColor,
        previewBorderStyle,
        previewBorderWidth,
        isPreviewCorderRadiusCustom,
        previewCornerRadiusSimple,
        previewCornerRadiusCustom,
        textPositioning,
        textRatio,
        textAnchoringHorizontal,
        textAnchoringVertical,
        isPreviewHeightCustom,
        previewHeightSimple,
        previewHeightCustom,
        previewDisplay,
        previewImageAnchoring,
    } = blockSettings;

    const { previewCustom } = blockAssets;

    const hasPreview = useCallback(() => preview !== PreviewType.None, [preview]);
    const flexDirection = hasPreview() ? textPositioningToFlexDirection[textPositioning] : 'row';
    const isRows = useCallback(
        () => hasPreview() && (flexDirection === 'row' || flexDirection === 'row-reverse'),
        [flexDirection, hasPreview]
    );

    const onChangeSetting = (key: string, value: string) => {
        updateBlockSettings({ ...blockSettings, [key]: value });
    };

    const [isActionFlyoutOpen, setIsActionFlyoutOpen] = useState(false);
    const [isButtonFlyoutOpen, setIsButtonFlyoutOpen] = useState(false);

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

    const getButtonStyles = (kind: keyof ButtonElements) =>
        `${ButtonStyleClasses[ButtonEmphasis.Default][ButtonStyle.Default][kind]}`;

    const buttonClasses = merge([
        getButtonStyles('button'),
        ButtonCommonClasses,
        ButtonRoundingClasses[ButtonRounding.Medium],
    ]);

    const onButtonStyleChange = (style: string) => {
        onChangeSetting('buttonStyle', style);
        setIsButtonFlyoutOpen(false);
    };

    return (
        <div data-test-id="template-block">
            <div
                className="tw-border tw-border-black-20"
                style={{
                    backgroundColor: hasCardBackgroundColor ? toRgbaString(cardBackgroundColor as Color) : undefined,
                    borderRadius: isCardCornerRadiusCustom
                        ? cardCornerRadiusCustom
                        : cornerRadiusValues[cardCornerRadiusSimple],
                    border: hasCardBorder
                        ? `${cardBorderWidth} ${cardBorderStyle} ${toRgbaString(cardBorderColor as Color)}`
                        : 'none',
                    padding: isCardPaddingCustom
                        ? `${cardPaddingCustomTop} ${cardPaddingCustomRight} ${cardPaddingCustomBottom} ${cardPaddingCustomLeft}`
                        : cardPaddingValues[cardPaddingSimple],
                }}
            >
                <div
                    className="tw-flex"
                    style={{
                        flexDirection,
                        gap: GAP,
                        alignItems: isRows() ? textAnchoringHorizontal : textAnchoringVertical,
                    }}
                >
                    {hasPreview() && (
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
                                            ? `${previewBorderWidth} ${previewBorderStyle} ${toRgbaString(
                                                  previewBorderColor as Color
                                              )}`
                                            : 'none',
                                        height: isPreviewHeightCustom
                                            ? previewHeightCustom
                                            : previewHeightValues[previewHeightSimple],
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
                                        height: isPreviewHeightCustom
                                            ? previewHeightCustom
                                            : previewHeightValues[previewHeightSimple],
                                    }}
                                    onClick={openTemplateChooser}
                                >
                                    <span
                                        data-test-id="button-icon"
                                        className={merge([
                                            IconSpacingClasses[ButtonSize.Medium],
                                            getButtonStyles('icon'),
                                        ])}
                                    >
                                        <IconPlus20 />
                                    </span>
                                    <span>Choose existing template</span>
                                </button>
                            )}
                        </div>
                    )}
                    <div
                        className={merge(['tw-flex', isRows() && hasPreview() ? 'tw-flex-col' : 'tw-flex-row'])}
                        style={{
                            width: isRows() && hasPreview() ? `${textRatio}%` : '100%',
                            gap: GAP,
                        }}
                    >
                        <div className="tw-grow tw-min-w-0">
                            <div className="tw-mb-2">
                                <RichTextEditor
                                    id={`${blockId}-title`}
                                    value={title}
                                    placeholder={isEditing ? 'Template Name' : undefined}
                                    onTextChange={(value) => onChangeSetting('title', value)}
                                    actions={TITLE_ACTIONS}
                                    readonly={!isEditing}
                                />
                                <Text size={'small'}>0 pages</Text>
                            </div>
                            <RichTextEditor
                                id={`${blockId}-description`}
                                value={description}
                                placeholder={
                                    isEditing
                                        ? 'Use default Template description if available, add your own or leave it empty'
                                        : undefined
                                }
                                onTextChange={(value) => onChangeSetting('description', value)}
                                actions={DESCRIPTION_ACTIONS}
                                readonly={!isEditing}
                            />
                        </div>
                        <div className="tw-shrink-0">
                            {isEditing && designTokens ? (
                                <Flyout
                                    isOpen={isButtonFlyoutOpen}
                                    onOpenChange={() => setIsButtonFlyoutOpen(isButtonFlyoutOpen)}
                                    trigger={
                                        <CustomButton
                                            id="use-template"
                                            styles={
                                                buttonStyle && designTokens
                                                    ? designTokens[buttonStyle]
                                                    : designTokens?.button_primary
                                            }
                                            onClick={() => setIsButtonFlyoutOpen(!isButtonFlyoutOpen)}
                                        >
                                            Use this template
                                        </CustomButton>
                                    }
                                    hug={false}
                                    legacyFooter={false}
                                >
                                    <div className="tw-p-5">
                                        <FormControl
                                            label={{
                                                children: 'Button Style',
                                                htmlFor: 'buttonStyle',
                                            }}
                                        >
                                            <CustomButton
                                                id="primary"
                                                styles={designTokens.button_primary}
                                                isActive={buttonStyle === 'button_primary'}
                                                onClick={() => onButtonStyleChange('button_primary')}
                                            >
                                                Primary Button
                                            </CustomButton>

                                            <CustomButton
                                                id="secondary"
                                                styles={designTokens.button_secondary}
                                                isActive={buttonStyle === 'button_secondary'}
                                                onClick={() => onButtonStyleChange('button_secondary')}
                                            >
                                                Secondary Button
                                            </CustomButton>

                                            <CustomButton
                                                id="tertiary"
                                                styles={designTokens.button_tertiary}
                                                isActive={buttonStyle === 'button_tertiary'}
                                                onClick={() => onButtonStyleChange('button_tertiary')}
                                            >
                                                Tertiary Button
                                            </CustomButton>
                                        </FormControl>
                                    </div>
                                </Flyout>
                            ) : (
                                <CustomButton
                                    id="use-template"
                                    styles={
                                        buttonStyle && designTokens
                                            ? designTokens[buttonStyle]
                                            : designTokens?.button_primary
                                    }
                                    onClick={() => console.log('use template')}
                                >
                                    Use this template
                                </CustomButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

type CustomButtonProps = {
    id: string;
    styles?: CSSProperties & { hover?: CSSProperties };
    isActive?: boolean;
    onClick: () => void;
    children: ReactNode;
};

const CustomButton = ({ id, styles, isActive = false, onClick, children }: CustomButtonProps) => {
    const [hovered, setHovered] = useState(false);
    const getStyles = () => (styles && styles.hover && hovered ? { ...styles, ...styles.hover } : styles);

    return (
        <button
            data-test-id={`custom-button-${id}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            style={getStyles()}
            className={
                isActive ? 'tw-outline tw-outline-1 tw-outline-violet-60 tw-outline-offset-2 tw-w-fit' : 'tw-w-fit'
            }
        >
            {children}
        </button>
    );
};
