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
    AllTextStylePlugins,
    AllTextStyles,
    ButtonPlugin,
    LinkPlugin,
    OrderedListPlugin,
    UnorderedListPlugin,
} from '@frontify/guideline-blocks-settings';

export const titlePlugins = new PluginComposer()
    .setPlugin([new SoftBreakPlugin(), new TextStylePlugin({ textStyles: AllTextStylePlugins })])
    .setPlugin([new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()])
    .setPlugin([
        new AlignLeftPlugin({ validTypes: AllTextStyles }),
        new AlignCenterPlugin({ validTypes: AllTextStyles }),
        new AlignRightPlugin({ validTypes: AllTextStyles }),
        new AlignJustifyPlugin({ validTypes: AllTextStyles }),
        new ResetFormattingPlugin(),
    ]);

export const getDescriptionPlugins = (appBridge: AppBridgeBlock): PluginComposer =>
    new PluginComposer()
        .setPlugin(
            new SoftBreakPlugin(),
            new TextStylePlugin({
                textStyles: AllTextStylePlugins,
            })
        )
        .setPlugin(
            [
                new BoldPlugin(),
                new ItalicPlugin(),
                new UnderlinePlugin(),
                new StrikethroughPlugin(),
                new LinkPlugin({ appBridge }),
                new ButtonPlugin({ appBridge }),
                new CodePlugin(),
            ],
            [
                new AlignLeftPlugin({ validTypes: AllTextStyles }),
                new AlignCenterPlugin({ validTypes: AllTextStyles }),
                new AlignRightPlugin({ validTypes: AllTextStyles }),
                new AlignJustifyPlugin({ validTypes: AllTextStyles }),
                new UnorderedListPlugin(),
                new CheckboxListPlugin(),
                new OrderedListPlugin(),
                new ResetFormattingPlugin(),
                new AutoformatPlugin(),
            ]
        );
