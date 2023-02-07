/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
    BreakAfterPlugin,
    ButtonPlugin,
    CheckboxListPlugin,
    CodePlugin,
    EmojiPlugin,
    InitPlugin,
    ItalicPlugin,
    LinkPlugin,
    OrderedListPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
    UnorderedListPlugin,
} from '@frontify/fondue';

export const getPlugins = (columns?: number, gap?: number) => {
    if (!columns || columns === 1) {
        console.log('getPlugins', 'columns === 1');
        return undefined;
    }
    const plugins = new PluginComposer();
    plugins.setPlugin([new InitPlugin(), new TextStylePlugin() as any]);
    plugins.setPlugin([
        new BoldPlugin(),
        new ItalicPlugin(),

        new UnderlinePlugin(),
        new StrikethroughPlugin(),
        new LinkPlugin(),
        new ButtonPlugin(),
        new CodePlugin(),
        new BreakAfterPlugin({ columns, gap }) as any,
    ]);
    plugins.setPlugin([
        new AlignLeftPlugin(),
        new AlignCenterPlugin(),
        new AlignRightPlugin(),
        new AlignJustifyPlugin(),
        new UnorderedListPlugin(),
        new CheckboxListPlugin(),
        new OrderedListPlugin(),
        new ResetFormattingPlugin(),
        new EmojiPlugin(),
    ]);
    return plugins;
};
