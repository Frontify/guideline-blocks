/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
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

export const getRichTextEditorPlugins = (appBridge: AppBridgeBlock) =>
    new PluginComposer()
        .setPlugin(new SoftBreakPlugin(), new ParagraphPlugin())
        .setPlugin(new TextStylePlugin())
        .setPlugin(
            [
                new BoldPlugin(),
                new ItalicPlugin(),
                new UnderlinePlugin(),
                new StrikethroughPlugin(),
                new LinkPlugin({ appBridge }),
                new ButtonPlugin(),
                new CodePlugin(),
            ],
            [
                new AlignLeftPlugin(),
                new AlignCenterPlugin(),
                new AlignRightPlugin(),
                new AlignJustifyPlugin(),
                new UnorderedListPlugin(),
                new CheckboxListPlugin(),
                new OrderedListPlugin(),
                new ResetFormattingPlugin(),
                new EmojiPlugin(),
            ]
        );
