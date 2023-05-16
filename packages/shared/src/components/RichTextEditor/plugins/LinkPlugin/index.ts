/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import { Plugin, PluginProps } from '@frontify/fondue';
import { createLinkPlugin as createPlateLinkPlugin, createPluginFactory } from '@udecode/plate';
import { CustomFloatingLink } from './FloatingLink/CustomFloatingLink';
import { LINK_PLUGIN } from './id';
import { LinkButton } from './LinkButton';
import { LinkMarkupElement } from './LinkMarkupElement';
import { isValidUrl } from './utils/url';

export const createLinkPlugin = (appBridge: AppBridgeBlock) =>
    createPluginFactory({
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
            appBridge,
        },
    })();

export type LinkPluginProps = PluginProps & { appBridge: AppBridgeBlock };

export class LinkPlugin extends Plugin {
    private appBridge: AppBridgeBlock;

    constructor(props?: LinkPluginProps) {
        super(LINK_PLUGIN, {
            button: LinkButton,
            markupElement: new LinkMarkupElement(),
            ...props,
        });
        this.appBridge = props?.appBridge as AppBridgeBlock;
    }

    plugins() {
        return [createLinkPlugin(this.appBridge)];
    }
}
