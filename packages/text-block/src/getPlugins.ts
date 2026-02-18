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
import {
    BreakAfterPlugin,
    ButtonPlugin,
    LinkPlugin,
    TextStylePluginsWithoutImage,
    TextStylesWithoutImage,
} from '@frontify/guideline-blocks-settings';
import { type CSSProperties } from 'react';

export const getPlugins = (appBridge: AppBridgeBlock, columns?: number, gap?: CSSProperties['gap']) => {
    const plugins = new PluginComposer();
    plugins.setPlugin([
        new SoftBreakPlugin(),
        new TextStylePlugin({
            textStyles: TextStylePluginsWithoutImage,
        }),
    ]);
    plugins.setPlugin([
        new BoldPlugin(),
        new ItalicPlugin(),
        new UnderlinePlugin(),
        new StrikethroughPlugin(),
        new LinkPlugin({ appBridge }),
        new ButtonPlugin({ appBridge }),
        new CodePlugin(),
        new BreakAfterPlugin({ columns, gap }),
    ]);
    plugins.setPlugin([
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
        new UnorderedListPlugin(),
        new CheckboxListPlugin(),
        new OrderedListPlugin(),
        new ResetFormattingPlugin(),
        new AutoformatPlugin(),
    ]);
    return plugins;
};
