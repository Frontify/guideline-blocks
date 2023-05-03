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
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
} from '@frontify/fondue';

export const getTitlePlugin = () => {
    return new PluginComposer()
        .setPlugin([new SoftBreakPlugin(), new TextStylePlugin()])
        .setPlugin([new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()])
        .setPlugin([
            new AlignLeftPlugin(),
            new AlignCenterPlugin(),
            new AlignRightPlugin(),
            new AlignJustifyPlugin(),
            new ResetFormattingPlugin(),
        ]);
};
