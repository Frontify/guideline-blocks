/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset, AssetDummy, getAppBridgeBlockStub } from '@frontify/app-bridge';
import { renderHook } from '@testing-library/react-hooks';

import { beforeAll, describe, expect, it } from 'vitest';
import { useAttachments } from './useAttachments';

const MOCK_SETTINGS_ID = 'attachments';

/**
 * @vitest-environment happy-dom
 */

describe('useAttachments', () => {
    beforeAll(() => {
        global.structuredClone = (val: unknown) => val;
    });

    it('if attachment is added, sortedAttachments should have a length of 1', async () => {
        const { result, rerender, unmount } = renderHook(() =>
            useAttachments(
                getAppBridgeBlockStub({
                    blockAssets: { [MOCK_SETTINGS_ID]: [{ id: 1 } as Asset] },
                }),
                MOCK_SETTINGS_ID,
                MOCK_SETTINGS_ID
            )
        );

        await result.current.onAddAttachments([AssetDummy.with(1)]);
        rerender();
        expect(result.current.sortedAttachments).toHaveLength(1);
        unmount();
    });

    it('if attachment is removed, sortedAttachments should change length from 3 to 2', async () => {
        const { result, rerender, unmount } = renderHook(() =>
            useAttachments(
                getAppBridgeBlockStub({
                    blockAssets: { [MOCK_SETTINGS_ID]: [{ id: 1 }, { id: 2 }, { id: 3 }] as Asset[] },
                    blockSettings: { [MOCK_SETTINGS_ID]: [{ id: 1 }, { id: 2 }, { id: 3 }] as Asset[] },
                }),
                MOCK_SETTINGS_ID,
                MOCK_SETTINGS_ID
            )
        );

        await result.current.onAttachmentDelete(AssetDummy.with(1));
        rerender();
        expect(result.current.sortedAttachments).toHaveLength(2);
        unmount();
    });

    it('if attachment is replaced, the new attachment should be in the same position', async () => {
        const { result, rerender, unmount } = renderHook(() =>
            useAttachments(
                getAppBridgeBlockStub({
                    blockAssets: { [MOCK_SETTINGS_ID]: [{ id: 1 }, { id: 10 }, { id: 3 }] as Asset[] },
                    blockSettings: { [MOCK_SETTINGS_ID]: [{ id: 1 }, { id: 2 }, { id: 3 }] as Asset[] },
                }),
                MOCK_SETTINGS_ID,
                MOCK_SETTINGS_ID
            )
        );

        await result.current.onAttachmentReplace(AssetDummy.with(2), AssetDummy.with(10));
        rerender();
        expect(result.current.sortedAttachments[1]).toEqual({ id: 10 });
        unmount();
    });

    it('if attachments are reordered, thew sortedAttachments should also be in the new order', async () => {
        const { result, rerender, unmount } = renderHook(() =>
            useAttachments(
                getAppBridgeBlockStub({
                    blockAssets: { [MOCK_SETTINGS_ID]: [{ id: 1 }, { id: 2 }, { id: 3 }] as Asset[] },
                    blockSettings: { [MOCK_SETTINGS_ID]: [{ id: 1 }, { id: 2 }, { id: 3 }] as Asset[] },
                }),
                MOCK_SETTINGS_ID,
                MOCK_SETTINGS_ID
            )
        );

        await result.current.onAttachmentsSorted([AssetDummy.with(3), AssetDummy.with(2), AssetDummy.with(1)]);
        rerender();
        expect(result.current.sortedAttachments[0]).toEqual({ id: 3 });
        expect(result.current.sortedAttachments[1]).toEqual({ id: 2 });
        expect(result.current.sortedAttachments[2]).toEqual({ id: 1 });
        unmount();
    });
});
