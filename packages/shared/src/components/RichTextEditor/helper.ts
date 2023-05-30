/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PluginComposer, SerializeNodesToHtmlOptions, parseRawValue, serializeNodesToHtml } from '@frontify/fondue';
import { CSSPropertiesHover } from '@frontify/fondue/dist/components/RichTextEditor/serializer/types';
import { BlockStyles } from './plugins';

export const serializeRawToHtmlAsync = async (
    raw: string,
    columns: SerializeNodesToHtmlOptions['columns'] = 1,
    columnGap: SerializeNodesToHtmlOptions['columnGap'] = 'normal',
    styles: Record<string, CSSPropertiesHover> = BlockStyles,
    plugins: PluginComposer = new PluginComposer()
): Promise<string> => {
    const nodes = parseRawValue({ raw, plugins });
    return Promise.resolve(serializeNodesToHtml(nodes, { columns, columnGap, styles }));
};
