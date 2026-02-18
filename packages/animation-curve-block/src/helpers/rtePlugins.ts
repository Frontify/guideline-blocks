/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    AutoformatPlugin,
    BoldPlugin,
    ItalicPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
} from '@frontify/fondue/rte';
import { TextStylePluginsWithoutImage, TextStylesWithoutImage } from '@frontify/guideline-blocks-settings';

export const getTitlePlugin = () => {
    return new PluginComposer()
        .setPlugin([new SoftBreakPlugin(), new TextStylePlugin({ textStyles: TextStylePluginsWithoutImage })])
        .setPlugin([new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()])
        .setPlugin([
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
            new ResetFormattingPlugin(),
            new AutoformatPlugin(),
        ]);
};
