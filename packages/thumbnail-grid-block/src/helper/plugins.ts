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
    UnderlinePlugin,
    UnorderedListPlugin,
} from '@frontify/fondue';

export const captionPlugins = new PluginComposer();
const textStylePlugins = [new SoftBreakPlugin(), new TextStylePlugin()];
const alignmentPlugins = [
    new AlignLeftPlugin(),
    new AlignCenterPlugin(),
    new AlignRightPlugin(),
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
