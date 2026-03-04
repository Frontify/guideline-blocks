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
    OrderedListPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
    UnorderedListPlugin,
} from '@frontify/fondue/rte';
import { AllTextStylePlugins, AllTextStyles, ButtonPlugin, LinkPlugin } from '@frontify/guideline-blocks-settings';

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

export const getCaptionPlugins = (appBridge: AppBridgeBlock) => {
    return new PluginComposer()
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
};
