/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getAppBridgeBlockStub, type getAppBridgeBlockStubProps } from '@frontify/app-bridge/testing';
import { type BlockConfigExport } from '@frontify/guideline-blocks-settings';
import { type ReactElement, useEffect, useMemo, useRef } from 'react';

import { preparePreviewAppBridge } from './previewAppBridge';
import { applySettingChangeHandlers, type getSettingChangeHandlers } from './settingsToArgs';

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
        appBridgeStub.updateBlockSettings(structuredClone(settled)).catch(console.error);
    }, [appBridgeStub, blockSettings, onBlockSettingsChange, settingChangeHandlers]);

    // The stub keeps block settings in its `settings` context, same as the real host.
    useEffect(
        () =>
            appBridgeStub.context('settings').subscribe((settings) => {
                const serialized = JSON.stringify(settings);
                if (serialized !== lastSyncedRef.current) {
                    lastSyncedRef.current = serialized;
                    onBlockSettingsChange(settings);
                }
            }),
        [appBridgeStub, onBlockSettingsChange]
    );

    return <Block key={`${isEditing}-${JSON.stringify(appBridge)}`} appBridge={appBridgeStub} />;
};
