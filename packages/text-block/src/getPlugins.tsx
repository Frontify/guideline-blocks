/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
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
import { LinkPlugin } from '@frontify/guideline-blocks-shared';
import { CSSProperties } from 'react';

export const getPlugins = (appBridge: AppBridgeBlock, columns?: number, gap?: CSSProperties['gap']) => {
    const plugins = new PluginComposer();
    plugins.setPlugin([new SoftBreakPlugin(), new ParagraphPlugin(), new TextStylePlugin()]);
    plugins.setPlugin([
        new BoldPlugin(),
        new ItalicPlugin(),
        new UnderlinePlugin(),
        new StrikethroughPlugin(),
        new LinkPlugin({ appBridge }),
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
