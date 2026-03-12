/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock } from '@frontify/app-bridge';
import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    AutoformatPlugin,
    BoldPlugin,
    CheckboxListPlugin,
    CodePlugin,
    ItalicPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
} from '@frontify/fondue/rte';
import {
    ButtonPlugin,
    LinkPlugin,
    OrderedListPlugin,
    TextStylePluginsWithoutImage,
    TextStylesWithoutImage,
    UnorderedListPlugin,
} from '@frontify/guideline-blocks-settings';

const textStylePlugins = [new SoftBreakPlugin(), new TextStylePlugin({ textStyles: TextStylePluginsWithoutImage })];
const alignmentPlugins = [
    new AlignLeftPlugin({
        validTypes: TextStylesWithoutImage,
    }),
    new AlignCenterPlugin({
        validTypes: TextStylesWithoutImage,
    }),
    new AlignRightPlugin({
        validTypes: TextStylesWithoutImage,
    }),
    new AlignJustifyPlugin({
        validTypes: TextStylesWithoutImage,
    }),
];
const markStylesPlugins = [new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()];

export const titlePlugins = new PluginComposer();
titlePlugins
    .setPlugin(textStylePlugins)
    .setPlugin(markStylesPlugins)
    .setPlugin([...alignmentPlugins, new ResetFormattingPlugin(), new AutoformatPlugin()]);

export const getCaptionPlugins = (appBridge: AppBridgeBlock) =>
    new PluginComposer()
        .setPlugin(textStylePlugins)
        .setPlugin([
            ...markStylesPlugins,
            new LinkPlugin({ appBridge }),
            new ButtonPlugin({ appBridge }),
            new CodePlugin(),
        ])
        .setPlugin([
            ...alignmentPlugins,
            new UnorderedListPlugin(),
            new CheckboxListPlugin(),
            new OrderedListPlugin(),
            new ResetFormattingPlugin(),
            new AutoformatPlugin(),
        ]);
