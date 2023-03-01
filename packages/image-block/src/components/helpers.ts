/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
    InitPlugin,
    ItalicPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    TextStyles,
    UnderlinePlugin,
} from '@frontify/fondue';

export const DEFAULT_CONTENT_DESCRIPTION = '[{"type":"image-title","children":[{"text":""}], "align":"center"}]';
export const DEFAULT_CONTENT_NAME = '[{"type":"imageCaption","children":[{"text":""}], "align":"center"}]';

// TODO: check RTE toolbar width
export const titlePlugins = new PluginComposer();
titlePlugins
    .setPlugin([
        new InitPlugin(),
        new TextStylePlugin({
            textStyles: [
                // TextStyles.ImageTitle,
                // TextStyles.ImageCaption,
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
    ])
    .setPlugin([new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()])
    .setPlugin([new AlignLeftPlugin(), new AlignRightPlugin(), new AlignCenterPlugin(), new AlignJustifyPlugin()])
    .setPlugin([new ResetFormattingPlugin()]);
