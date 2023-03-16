/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, getAppBridgeBlockStub } from '@frontify/app-bridge';
import { cleanup, renderHook } from '@testing-library/react-hooks';

import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { useAttachments } from './useAttachments';

const MOCK_SETTINGS_ID = 'attachments';

/**
 * @vitest-environment happy-dom
 */

describe('useAttachments', () => {
    beforeAll(() => {
        global.structuredClone = (val: unknown) => val;
    });

    afterEach(() => {
        cleanup();
    });

    it('if attachment is added, attachments should have a length of 1', async () => {
        const STUB_WITH_NO_ASSETS = getAppBridgeBlockStub({
            blockId: 1,
            blockAssets: { [MOCK_SETTINGS_ID]: [] },
        });
        const { result, waitForNextUpdate } = renderHook(() => useAttachments(STUB_WITH_NO_ASSETS, MOCK_SETTINGS_ID));

        await waitForNextUpdate();
        await result.current.onAddAttachments([AssetDummy.with(1)]);
        expect(result.current.attachments).toHaveLength(1);
    });

    it('if attachment is removed, attachments should change length from 3 to 2', async () => {
        const STUB_WITH_THREE_ASSETS = getAppBridgeBlockStub({
            blockId: 2,
            blockAssets: { [MOCK_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2), AssetDummy.with(3)] },
        });
        const { result, waitForNextUpdate } = renderHook(() =>
            useAttachments(STUB_WITH_THREE_ASSETS, MOCK_SETTINGS_ID)
        );

        await waitForNextUpdate();
        await result.current.onAttachmentDelete(AssetDummy.with(1));
        expect(result.current.attachments).toHaveLength(2);
    });

    it('if attachment is replaced, the new attachment should be in the same position', async () => {
        const STUB_WITH_THREE_ASSETS = getAppBridgeBlockStub({
            blockId: 2,
            blockAssets: { [MOCK_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2), AssetDummy.with(3)] },
        });
        const { result, waitForNextUpdate } = renderHook(() =>
            useAttachments(STUB_WITH_THREE_ASSETS, MOCK_SETTINGS_ID)
        );

        await waitForNextUpdate();
        await result.current.onAttachmentReplace(AssetDummy.with(2), AssetDummy.with(10));
        expect(result.current.attachments[1].id).toBe(10);
    });

    it('if attachments are reordered, thew attachments should also be in the new order', async () => {
        const STUB_WITH_THREE_ASSETS = getAppBridgeBlockStub({
            blockId: 2,
            blockAssets: { [MOCK_SETTINGS_ID]: [AssetDummy.with(1), AssetDummy.with(2), AssetDummy.with(3)] },
        });
        const { result, waitForNextUpdate } = renderHook(() =>
            useAttachments(STUB_WITH_THREE_ASSETS, MOCK_SETTINGS_ID)
        );
        await waitForNextUpdate();
        await result.current.onAttachmentsSorted([AssetDummy.with(3), AssetDummy.with(2), AssetDummy.with(1)]);
        expect(result.current.attachments[0].id).toBe(3);
        expect(result.current.attachments[1].id).toBe(2);
        expect(result.current.attachments[2].id).toBe(1);
    });
});
