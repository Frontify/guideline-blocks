/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset, FileExtensionSets } from '@frontify/app-bridge';
import { type getAppBridgeBlockStub, TemplateLegacyDummy } from '@frontify/app-bridge/testing';

import { AssetFixture } from './fixtures';

type AppBridgeStub = ReturnType<typeof getAppBridgeBlockStub>;
type Listener = (payload: unknown) => void;
type BlockAssets = Record<string, Asset[]>;
type AssetChooserOptions = { extensions?: string[]; multiSelection?: boolean };

/** `AssetDummy` uses this URL; it never loads in a browser. */
const PLACEHOLDER_URL = 'https://preview.url';
const FIRST_CHOSEN_ASSET_ID = 9000;

const isAudioChooser = (options: AssetChooserOptions = {}) =>
    (options.extensions ?? []).some((extension) => (FileExtensionSets.Audio as string[]).includes(extension));

/**
 * Makes the app-bridge test stub behave like a guideline in a preview:
 *
 * - Assets the stub resolves by id (after the asset chooser, an upload, `getAssetById`) come back as
 *   `AssetDummy` placeholders. They're swapped for what the preview's chooser handed out, or otherwise
 *   for a Lorem Picsum photo seeded by the asset id, so they actually render.
 * - The stub calls `assetsChosen`/`templateChosen`/`linkChosen` listeners the moment they subscribe,
 *   which suits unit tests but makes blocks that subscribe on mount (e.g. the template block) "pick"
 *   a dummy right away. Those events are held back until the matching chooser is opened via `dispatch`.
 */
export const preparePreviewAppBridge = (appBridge: AppBridgeStub): void => {
    const chosenAssets = new Map<number, Asset>();
    let nextChosenAssetId = FIRST_CHOSEN_ASSET_ID;

    const resolveAsset = (asset: Asset): Asset =>
        asset.previewUrl === PLACEHOLDER_URL ? (chosenAssets.get(asset.id) ?? AssetFixture.photo(asset.id)) : asset;

    const resolveBlockAssets = (blockAssets: BlockAssets | undefined): BlockAssets | undefined =>
        blockAssets &&
        Object.fromEntries(Object.entries(blockAssets).map(([key, assets]) => [key, assets.map(resolveAsset)]));

    const chooseAsset = (options?: AssetChooserOptions): Asset => {
        const id = nextChosenAssetId++;
        const asset = isAudioChooser(options) ? AssetFixture.audio(id) : AssetFixture.photo(id);
        chosenAssets.set(id, asset);
        return asset;
    };

    const choosers: Record<string, { event: string; payload: (actionPayload: unknown) => unknown }> = {
        openAssetChooser: {
            event: 'assetsChosen',
            payload: (options) => ({ assets: [chooseAsset(options as AssetChooserOptions)] }),
        },
        openTemplateChooser: { event: 'templateChosen', payload: () => ({ template: TemplateLegacyDummy.with(234) }) },
        openLinkChooser: { event: 'linkChosen', payload: () => ({ url: 'https://example.com' }) },
    };

    const listeners = new Map<string, Set<Listener>>();
    const originalDispatch = appBridge.dispatch.bind(appBridge);
    const originalContext = appBridge.context.bind(appBridge);
    const originalGetBlockAssets = appBridge.getBlockAssets.bind(appBridge);
    const originalGetAssetById = appBridge.getAssetById.bind(appBridge);

    const subscribe = (event: string, listener: Listener) => {
        const eventListeners = listeners.get(event) ?? new Set<Listener>();
        eventListeners.add(listener);
        listeners.set(event, eventListeners);
        return () => eventListeners.delete(listener);
    };

    const dispatch = (action: { name: string; payload?: unknown }) => {
        const chooser = choosers[action.name];
        if (chooser) {
            // Hooks dispatch "open" before subscribing, so fire once the current call stack is done.
            setTimeout(() => {
                for (const listener of listeners.get(chooser.event) ?? []) {
                    listener(chooser.payload(action.payload));
                }
            });
        }
        return originalDispatch(action as Parameters<typeof originalDispatch>[0]);
    };

    const context = (key?: string) => {
        const contextValue = originalContext(key as Parameters<typeof originalContext>[0]);
        if (key !== 'assets') {
            return contextValue;
        }
        const assetsContext = contextValue as {
            get: () => BlockAssets | undefined;
            subscribe: (listener: (blockAssets: BlockAssets | undefined) => void) => () => void;
        };
        return {
            get: () => resolveBlockAssets(assetsContext.get()),
            subscribe: (listener: (blockAssets: BlockAssets | undefined) => void) =>
                assetsContext.subscribe((blockAssets) => listener(resolveBlockAssets(blockAssets))),
        };
    };

    appBridge.subscribe = subscribe as unknown as AppBridgeStub['subscribe'];
    appBridge.dispatch = dispatch as unknown as AppBridgeStub['dispatch'];
    appBridge.context = context as unknown as AppBridgeStub['context'];
    appBridge.getBlockAssets = (() =>
        resolveBlockAssets(
            originalGetBlockAssets() as unknown as BlockAssets
        )) as unknown as AppBridgeStub['getBlockAssets'];
    appBridge.getAssetById = (async (id: number) =>
        resolveAsset(await originalGetAssetById(id))) as unknown as AppBridgeStub['getAssetById'];
};
