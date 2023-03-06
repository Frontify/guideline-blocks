/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
    ButtonPlugin,
    CheckboxListPlugin,
    CodePlugin,
    ItalicPlugin,
    LinkPlugin,
    OrderedListPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    TextStyles,
    UnderlinePlugin,
    UnorderedListPlugin,
} from '@frontify/fondue';

export const DEFAULT_CONTENT_DESCRIPTION = '[{"type":"image-title","children":[{"text":""}], "align":"center"}]';
export const DEFAULT_CONTENT_NAME = '[{"type":"imageCaption","children":[{"text":""}], "align":"center"}]';

export const captionPlugins = new PluginComposer();
const textStylePlugins = [
    new SoftBreakPlugin(),
    new TextStylePlugin({
        textStyles: [
            TextStyles.ELEMENT_IMAGE_TITLE,
            TextStyles.ELEMENT_IMAGE_CAPTION,
            TextStyles.ELEMENT_HEADING1,
            TextStyles.ELEMENT_HEADING2,
            TextStyles.ELEMENT_HEADING3,
            TextStyles.ELEMENT_HEADING4,
            TextStyles.ELEMENT_CUSTOM1,
            TextStyles.ELEMENT_CUSTOM2,
            TextStyles.ELEMENT_CUSTOM3,
            TextStyles.ELEMENT_QUOTE,
            TextStyles.ELEMENT_PARAGRAPH,
        ],
    }),
];
const alignmentPlugins = [
    new AlignLeftPlugin(),
    new AlignRightPlugin(),
    new AlignCenterPlugin(),
    new AlignJustifyPlugin(),
];
const markStylesPlugins = [new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()];
captionPlugins
    .setPlugin(textStylePlugins)
    .setPlugin([...markStylesPlugins, new LinkPlugin(), new ButtonPlugin(), new CodePlugin()])
    .setPlugin([
        ...alignmentPlugins,
        new UnorderedListPlugin(),
        new CheckboxListPlugin(),
        new OrderedListPlugin(),
        new ResetFormattingPlugin(),
    ]);

export const titlePlugins = new PluginComposer();
titlePlugins
    .setPlugin(textStylePlugins)
    .setPlugin(markStylesPlugins)
    .setPlugin([...alignmentPlugins, new ResetFormattingPlugin()]);
