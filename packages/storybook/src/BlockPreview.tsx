/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getAppBridgeBlockStub, type getAppBridgeBlockStubProps } from '@frontify/app-bridge/testing';
import { type BlockConfigExport } from '@frontify/guideline-blocks-settings';
import { type ReactElement, useEffect, useMemo, useRef } from 'react';

import { preparePreviewAppBridge } from './previewAppBridge';
import { applySettingChangeHandlers, type getSettingChangeHandlers } from './settingsToArgs';

const BLOCK_SETTINGS_UPDATED = 'AppBridge:BlockSettingsUpdated';

type BlockSettingsUpdatedEvent = { blockId: number; blockSettings: Record<string, unknown> };

type Emitter = {
    on: (event: string, handler: (payload: BlockSettingsUpdatedEvent) => void) => void;
    off: (event: string, handler: (payload: BlockSettingsUpdatedEvent) => void) => void;
    emit: (event: string, payload: BlockSettingsUpdatedEvent) => void;
};

/** The app-bridge stub keeps block settings on a global mitt emitter, same as the real host. */
const getEmitter = () => (window as unknown as { emitter: Emitter }).emitter;

export type AppBridgeStubOptions = Omit<getAppBridgeBlockStubProps, 'blockSettings' | 'editorState'>;

type BlockPreviewProps = {
    block: BlockConfigExport['block'];
    blockSettings: Record<string, unknown>;
    isEditing: boolean;
    appBridge?: AppBridgeStubOptions;
    /** Settings `onChange` hooks, run when a control changes a setting, like the sidebar does. */
    settingChangeHandlers?: ReturnType<typeof getSettingChangeHandlers>;
    onBlockSettingsChange: (blockSettings: Record<string, unknown>) => void;
};

/**
 * Renders a block against the app-bridge test stub and keeps its settings in sync with Storybook args
 * in both directions: control changes are pushed into the block, and edits made inside the block
 * (e.g. typing a title) are written back to the controls panel.
 */
export const BlockPreview = ({
    block: Block,
    blockSettings,
    isEditing,
    appBridge,
    settingChangeHandlers = {},
    onBlockSettingsChange,
}: BlockPreviewProps): ReactElement => {
    const latestSettingsRef = useRef(blockSettings);
    latestSettingsRef.current = blockSettings;
    const lastSyncedRef = useRef(JSON.stringify(blockSettings));

    // The stub reads editor state and assets once, so a new stub (and a remount) is needed when they change.
    const appBridgeStub = useMemo(() => {
        const stub = getAppBridgeBlockStub({
            ...appBridge,
            blockSettings: structuredClone(latestSettingsRef.current),
            editorState: isEditing,
        });
        preparePreviewAppBridge(stub);
        return stub;
    }, [appBridge, isEditing]);
    const blockId = appBridgeStub.context('blockId').get();

    useEffect(() => {
        if (JSON.stringify(blockSettings) === lastSyncedRef.current) {
            return;
        }
        const previous = JSON.parse(lastSyncedRef.current) as Record<string, unknown>;
        const settled = applySettingChangeHandlers(settingChangeHandlers, previous, blockSettings, appBridgeStub);
        lastSyncedRef.current = JSON.stringify(settled);
        if (settled !== blockSettings) {
            // Reflect the hooks' writes (e.g. an appended `px`) in the controls panel too.
            onBlockSettingsChange(settled);
        }
        getEmitter().emit(BLOCK_SETTINGS_UPDATED, { blockId, blockSettings: structuredClone(settled) });
    }, [appBridgeStub, blockId, blockSettings, onBlockSettingsChange, settingChangeHandlers]);

    useEffect(() => {
        const handleUpdate = (event: BlockSettingsUpdatedEvent) => {
            const serialized = JSON.stringify(event.blockSettings);
            if (event.blockId === blockId && serialized !== lastSyncedRef.current) {
                lastSyncedRef.current = serialized;
                onBlockSettingsChange(event.blockSettings);
            }
        };
        const emitter = getEmitter();
        emitter.on(BLOCK_SETTINGS_UPDATED, handleUpdate);
        return () => emitter.off(BLOCK_SETTINGS_UPDATED, handleUpdate);
    }, [appBridgeStub, blockId, onBlockSettingsChange]);

    return <Block key={`${isEditing}-${JSON.stringify(appBridge)}`} appBridge={appBridgeStub} />;
};
