/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
    BreakAfterPlugin,
    CheckboxListPlugin,
    CodePlugin,
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
import { ButtonPlugin, LinkPlugin, TextStylePluginsWithoutImage } from '@frontify/guideline-blocks-shared';
import { CSSProperties } from 'react';

const VALID_ALIGN_TYPES = ['heading1', 'heading2', 'heading3', 'heading4', 'custom1', 'custom2', 'custom3', 'quote'];

export const getPlugins = (appBridge: AppBridgeBlock, columns?: number, gap?: CSSProperties['gap']) => {
    const plugins = new PluginComposer();
    plugins.setPlugin([
        new SoftBreakPlugin(),
        new ParagraphPlugin(),
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
            validTypes: VALID_ALIGN_TYPES,
        }),
        new AlignCenterPlugin({
            validTypes: VALID_ALIGN_TYPES,
        }),
        new AlignRightPlugin({
            validTypes: VALID_ALIGN_TYPES,
        }),
        new AlignJustifyPlugin({
            validTypes: VALID_ALIGN_TYPES,
        }),
        new UnorderedListPlugin(),
        new CheckboxListPlugin(),
        new OrderedListPlugin(),
        new ResetFormattingPlugin(),
    ]);
    return plugins;
};
