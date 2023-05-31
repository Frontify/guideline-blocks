/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
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
    TextStyles,
    UnderlinePlugin,
    UnorderedListPlugin,
} from '@frontify/fondue';
import { BlockStyles, ButtonPlugin, LinkPlugin, TextStylesWithoutImage } from '@frontify/guideline-blocks-shared';

export const getRtePlugins = (textColor: string, appBridge: AppBridgeBlock) => {
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

    return RICH_TEXT_PLUGINS;
};
