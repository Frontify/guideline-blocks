/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugin, PluginProps } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/Plugin';
import { createLinkPlugin as createPlateLinkPlugin, createPluginFactory } from '@udecode/plate';
import { CustomFloatingLink } from './FloatingLink/CustomFloatingLink';
import { LINK_PLUGIN } from './id';
import { LinkButton } from './LinkButton';
import { LinkMarkupElement } from './LinkMarkupElement';

export const isValidUrl = (url: string): boolean => !!url.match(/^((https?:\/\/|mailto:|tel:).+)|\/r\/.+/);

export const createLinkPlugin = createPluginFactory({
    ...createPlateLinkPlugin(),
    renderAfterEditable: CustomFloatingLink,
    options: {
        isUrl: isValidUrl,
        rangeBeforeOptions: {
            matchString: ' ',
            skipInvalid: true,
            afterMatch: true,
        },
        triggerFloatingLinkHotkeys: 'command+k, ctrl+k',
    },
});

export class LinkPlugin extends Plugin {
    constructor(props?: PluginProps) {
        super(LINK_PLUGIN, {
            button: LinkButton,
            markupElement: new LinkMarkupElement(),
            ...props,
        });
    }

    plugins() {
        return [createLinkPlugin()];
    }
}
