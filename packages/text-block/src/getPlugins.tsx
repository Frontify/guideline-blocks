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
    ItalicPlugin,
    LinkPlugin,
    OrderedListPlugin,
    ParagraphPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
    UnorderedListPlugin,
} from '@frontify/fondue';
import { CSSProperties } from 'react';

export const getPlugins = (columns?: number, gap?: CSSProperties['gap']) => {
    if (!columns || columns === 1) {
        return undefined;
    }
    const plugins = new PluginComposer();
    plugins.setPlugin([new SoftBreakPlugin(), new ParagraphPlugin(), new TextStylePlugin()]);
    plugins.setPlugin([
        new BoldPlugin(),
        new ItalicPlugin(),

        new UnderlinePlugin(),
        new StrikethroughPlugin(),
        new LinkPlugin(),
        new ButtonPlugin(),
        new CodePlugin(),
        new BreakAfterPlugin({ columns, gap }),
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
