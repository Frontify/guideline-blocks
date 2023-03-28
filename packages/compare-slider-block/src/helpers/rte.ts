/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
    ItalicPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    TextStyles,
    UnderlinePlugin,
} from '@frontify/fondue';

const textStylePlugins = [
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

export const labelPlugins = new PluginComposer();

labelPlugins
    .setPlugin(textStylePlugins)
    .setPlugin(markStylesPlugins)
    .setPlugin([...alignmentPlugins, new ResetFormattingPlugin()]);
