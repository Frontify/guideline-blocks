/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
    CheckboxListPlugin,
    CodePlugin,
    ItalicPlugin,
    OrderedListPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
    UnorderedListPlugin,
} from '@frontify/fondue';
import { AllTextStylePlugins, AllTextStyles, ButtonPlugin, LinkPlugin } from '@frontify/guideline-blocks-shared';

const textStylePlugins = [
    new SoftBreakPlugin(),
    new TextStylePlugin({
        textStyles: AllTextStylePlugins,
    }),
];
const alignmentPlugins = [
    new AlignLeftPlugin({
        validTypes: AllTextStyles,
    }),
    new AlignRightPlugin({
        validTypes: AllTextStyles,
    }),
    new AlignCenterPlugin({
        validTypes: AllTextStyles,
    }),
    new AlignJustifyPlugin({
        validTypes: AllTextStyles,
    }),
];
const markStylesPlugins = [new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()];

export const titlePlugins = new PluginComposer();
titlePlugins
    .setPlugin(textStylePlugins)
    .setPlugin(markStylesPlugins)
    .setPlugin([...alignmentPlugins, new ResetFormattingPlugin()]);

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
        ]);
