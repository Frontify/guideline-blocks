/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BoldPlugin, InitPlugin, ItalicPlugin, PluginComposer, UnderlinePlugin } from '@frontify/fondue';

export const titlePluginComposer = new PluginComposer()
    .setPlugin(new InitPlugin())
    .setPlugin([new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin()]);
