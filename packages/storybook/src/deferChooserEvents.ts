/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type getAppBridgeBlockStub, TemplateLegacyDummy } from '@frontify/app-bridge/testing';

import { AssetFixture } from './fixtures';

type AppBridgeStub = ReturnType<typeof getAppBridgeBlockStub>;
type Listener = (payload: unknown) => void;

/** What each chooser "returns" once it's opened in the preview. */
const CHOOSERS: Record<string, { event: string; payload: () => unknown }> = {
    openAssetChooser: { event: 'assetsChosen', payload: () => ({ assets: [AssetFixture.image(0, 123)] }) },
    openTemplateChooser: { event: 'templateChosen', payload: () => ({ template: TemplateLegacyDummy.with(234) }) },
    openLinkChooser: { event: 'linkChosen', payload: () => ({ url: 'https://example.com' }) },
};

/**
 * The app-bridge stub calls `assetsChosen`/`templateChosen`/`linkChosen` listeners the moment they
 * subscribe, which suits unit tests but makes blocks that subscribe on mount (e.g. the template block)
 * "pick" a dummy right away in a preview. This holds those events back until the matching chooser is
 * opened via `dispatch`, so choosing only happens when someone clicks.
 */
export const deferChooserEvents = (appBridge: AppBridgeStub): void => {
    const listeners = new Map<string, Set<Listener>>();
    const originalDispatch = appBridge.dispatch.bind(appBridge);

    const subscribe = (event: string, listener: Listener) => {
        const eventListeners = listeners.get(event) ?? new Set<Listener>();
        eventListeners.add(listener);
        listeners.set(event, eventListeners);
        return () => eventListeners.delete(listener);
    };

    const dispatch = (action: { name: string }) => {
        const chooser = CHOOSERS[action.name];
        if (chooser) {
            // Hooks dispatch "open" before subscribing, so fire once the current call stack is done.
            setTimeout(() => {
                for (const listener of listeners.get(chooser.event) ?? []) {
                    listener(chooser.payload());
                }
            });
        }
        return originalDispatch(action as Parameters<typeof originalDispatch>[0]);
    };

    appBridge.subscribe = subscribe as unknown as AppBridgeStub['subscribe'];
    appBridge.dispatch = dispatch as unknown as AppBridgeStub['dispatch'];
};
