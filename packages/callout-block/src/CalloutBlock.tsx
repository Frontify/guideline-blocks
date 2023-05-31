/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
    CheckboxListPlugin,
    CodePlugin,
    Custom1Plugin,
    Custom2Plugin,
    Custom3Plugin,
    Heading1Plugin,
    Heading2Plugin,
    Heading3Plugin,
    Heading4Plugin,
    ItalicPlugin,
    OrderedListPlugin,
    ParagraphPlugin,
    PluginComposer,
    QuotePlugin,
    ResetFormattingPlugin,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
    UnorderedListPlugin,
} from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    BlockStyles,
    ButtonPlugin,
    LinkPlugin,
    RichTextEditor,
    THEME_PREFIX,
    TextStyles,
    TextStylesWithoutImage,
    hasRichTextValue,
    isDark,
    joinClassNames,
    radiusStyleMap,
    setAlpha,
} from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { CalloutIcon } from './components/CalloutIcon';
import { ICON_ASSET_ID } from './settings';
import { Appearance, BlockSettings, Icon, Type, Width, alignmentMap, outerWidthMap, paddingMap } from './types';

export const CalloutBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);

    const containerDivClassNames = joinClassNames([
        outerWidthMap[blockSettings.width],
        blockSettings.width === Width.HugContents && alignmentMap[blockSettings.alignment],
    ]);

    const getAccentColor = (type: Type) => {
        const style = getComputedStyle(document.body);
        switch (type) {
            case Type.Info:
                return style.getPropertyValue(`${THEME_PREFIX}accent-color-info-color`);
            case Type.Note:
                return style.getPropertyValue(`${THEME_PREFIX}accent-color-note-color`);
            case Type.Tip:
                return style.getPropertyValue(`${THEME_PREFIX}accent-color-tip-color`);
            case Type.Warning:
                return style.getPropertyValue(`${THEME_PREFIX}accent-color-warning-color`);
        }
    };

    const customPaddingStyle = {
        padding: blockSettings.hasCustomPadding
            ? `${blockSettings.paddingTop} ${blockSettings.paddingRight} ${blockSettings.paddingBottom} ${blockSettings.paddingLeft}`
            : '',
    };

    const color = getAccentColor(blockSettings.type);
    const backgroundColor = blockSettings.appearance === Appearance.Strong ? color : setAlpha(0.1, color);

    const defaultTextColor = isDark(color) ? 'white' : 'black';
    const textColor = blockSettings.appearance === Appearance.Light ? color : defaultTextColor;

    const textDivClassNames = joinClassNames([
        'tw-flex tw-items-center',
        blockSettings.width === Width.FullWidth && alignmentMap[blockSettings.alignment],
        !blockSettings.hasCustomPadding && paddingMap[blockSettings.paddingChoice],
    ]);

    const customCornerRadiusStyle = {
        borderRadius: blockSettings.hasExtendedCustomRadius
            ? `${blockSettings.extendedRadiusTopLeft} ${blockSettings.extendedRadiusTopRight} ${blockSettings.extendedRadiusBottomRight} ${blockSettings.extendedRadiusBottomLeft}`
            : radiusStyleMap[blockSettings.extendedRadiusChoice],
    };

    const iconUrl = blockSettings.iconSwitch ? blockAssets?.[ICON_ASSET_ID]?.[0]?.genericUrl : '';
    const showIcon = blockSettings.iconSwitch ? !!iconUrl : blockSettings.iconType !== Icon.None;

    const onTextChange = (value: string) => value !== blockSettings.textValue && setBlockSettings({ textValue: value });

    const RICH_TEXT_PLUGINS = new PluginComposer();
    RICH_TEXT_PLUGINS.setPlugin(new SoftBreakPlugin(), new ParagraphPlugin())
        .setPlugin(
            new TextStylePlugin({
                textStyles: [
                    new Heading1Plugin({
                        styles: { ...BlockStyles[TextStyles.heading1], color: textColor },
                    }),
                    new Heading2Plugin({
                        styles: { ...BlockStyles[TextStyles.heading2], color: textColor },
                    }),
                    new Heading3Plugin({
                        styles: { ...BlockStyles[TextStyles.heading3], color: textColor },
                    }),
                    new Heading4Plugin({
                        styles: { ...BlockStyles[TextStyles.heading4], color: textColor },
                    }),
                    new Custom1Plugin({
                        styles: { ...BlockStyles[TextStyles.custom1], color: textColor },
                    }),
                    new Custom2Plugin({
                        styles: { ...BlockStyles[TextStyles.custom2], color: textColor },
                    }),
                    new Custom3Plugin({
                        styles: { ...BlockStyles[TextStyles.custom3], color: textColor },
                    }),
                    new ParagraphPlugin({ styles: { ...BlockStyles[TextStyles.p], color: textColor } }),
                    new QuotePlugin({ styles: { ...BlockStyles[TextStyles.quote], color: textColor } }),
                ],
            })
        )
        .setPlugin(
            [
                new BoldPlugin(),
                new ItalicPlugin(),
                new UnderlinePlugin(),
                new StrikethroughPlugin(),
                new LinkPlugin({ appBridge }),
                new ButtonPlugin({ appBridge }),
                new CodePlugin(),
            ],
            [
                new AlignLeftPlugin({ validTypes: TextStylesWithoutImage }),
                new AlignCenterPlugin({ validTypes: TextStylesWithoutImage }),
                new AlignRightPlugin({ validTypes: TextStylesWithoutImage }),
                new AlignJustifyPlugin({ validTypes: TextStylesWithoutImage }),
                new UnorderedListPlugin(),
                new CheckboxListPlugin(),
                new OrderedListPlugin(),
                new ResetFormattingPlugin(),
            ]
        );

    return (
        <div data-test-id="callout-block" className={containerDivClassNames}>
            <div
                data-test-id="callout-wrapper"
                className={textDivClassNames}
                style={{
                    backgroundColor,
                    ...customPaddingStyle,
                    ...customCornerRadiusStyle,
                }}
            >
                {showIcon && (
                    <CalloutIcon
                        iconUrl={iconUrl}
                        isActive={hasRichTextValue(blockSettings.textValue)}
                        iconType={blockSettings.iconSwitch ? Icon.Custom : blockSettings.iconType}
                        color={textColor}
                    />
                )}
                <RichTextEditor
                    id={appBridge.getBlockId().toString()}
                    isEditing={isEditing}
                    onBlur={onTextChange}
                    placeholder="Type your text here"
                    value={blockSettings.textValue}
                    plugins={RICH_TEXT_PLUGINS}
                />
            </div>
        </div>
    );
};
