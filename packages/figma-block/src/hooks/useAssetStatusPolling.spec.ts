/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock } from '@frontify/app-bridge';
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ASSET_ID } from '../settings';

import { useAssetStatusPolling } from './useAssetStatusPolling';

const ASSET_STATUS_FINISHED = 'FINISHED';
const ASSET_STATUS_PROCESSING = 'PROCESSING';
const POLLING_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 20;
const ASSET_ID_FIXTURE = 42;

const createAppBridgeMock = (status: string) =>
    ({
        getBlockAssets: vi.fn().mockResolvedValue({
            [ASSET_ID]: [{ id: ASSET_ID_FIXTURE, status }],
        }),
    }) as unknown as AppBridgeBlock;

const advancePollingInterval = async (times = 1) => {
    await act(async () => {
        await vi.advanceTimersByTimeAsync(POLLING_INTERVAL_MS * times);
    });
};

describe('useAssetStatusPolling', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    describe('when initialStatus is FINISHED', () => {
        it('should return isReady: true immediately', () => {
            const appBridge = createAppBridgeMock(ASSET_STATUS_PROCESSING);

            const { result } = renderHook(() =>
                useAssetStatusPolling(appBridge, ASSET_ID_FIXTURE, ASSET_STATUS_FINISHED)
            );

            expect(result.current.isReady).toBe(true);
        });

        it('should not start polling', async () => {
            const appBridge = createAppBridgeMock(ASSET_STATUS_PROCESSING);

            renderHook(() => useAssetStatusPolling(appBridge, ASSET_ID_FIXTURE, ASSET_STATUS_FINISHED));

            await advancePollingInterval(3);

            expect(appBridge.getBlockAssets).not.toHaveBeenCalled();
        });
    });

    describe('when initialStatus is not FINISHED', () => {
        it('should return isReady: false initially', () => {
            const appBridge = createAppBridgeMock(ASSET_STATUS_PROCESSING);

            const { result } = renderHook(() =>
                useAssetStatusPolling(appBridge, ASSET_ID_FIXTURE, ASSET_STATUS_PROCESSING)
            );

            expect(result.current.isReady).toBe(false);
        });

        it('should start polling and set isReady: true when the asset reaches FINISHED', async () => {
            const appBridge = createAppBridgeMock(ASSET_STATUS_FINISHED);

            const { result } = renderHook(() =>
                useAssetStatusPolling(appBridge, ASSET_ID_FIXTURE, ASSET_STATUS_PROCESSING)
            );

            expect(result.current.isReady).toBe(false);

            await advancePollingInterval();

            expect(appBridge.getBlockAssets).toHaveBeenCalledTimes(1);
            expect(result.current.isReady).toBe(true);
        });

        it('should keep polling until status becomes FINISHED', async () => {
            const appBridge = {
                getBlockAssets: vi
                    .fn()
                    .mockResolvedValueOnce({ [ASSET_ID]: [{ id: ASSET_ID_FIXTURE, status: ASSET_STATUS_PROCESSING }] })
                    .mockResolvedValueOnce({ [ASSET_ID]: [{ id: ASSET_ID_FIXTURE, status: ASSET_STATUS_PROCESSING }] })
                    .mockResolvedValue({ [ASSET_ID]: [{ id: ASSET_ID_FIXTURE, status: ASSET_STATUS_FINISHED }] }),
            } as unknown as AppBridgeBlock;

            const { result } = renderHook(() =>
                useAssetStatusPolling(appBridge, ASSET_ID_FIXTURE, ASSET_STATUS_PROCESSING)
            );

            await advancePollingInterval(2);
            expect(result.current.isReady).toBe(false);
            expect(appBridge.getBlockAssets).toHaveBeenCalledTimes(2);

            await advancePollingInterval();
            expect(result.current.isReady).toBe(true);
            expect(appBridge.getBlockAssets).toHaveBeenCalledTimes(3);
        });

        it('should stop polling after status becomes FINISHED', async () => {
            const appBridge = createAppBridgeMock(ASSET_STATUS_FINISHED);

            renderHook(() => useAssetStatusPolling(appBridge, ASSET_ID_FIXTURE, ASSET_STATUS_PROCESSING));

            await advancePollingInterval();
            expect(appBridge.getBlockAssets).toHaveBeenCalledTimes(1);

            await advancePollingInterval(5);
            expect(appBridge.getBlockAssets).toHaveBeenCalledTimes(1);
        });

        it('should clear the interval on unmount', () => {
            const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');
            const appBridge = createAppBridgeMock(ASSET_STATUS_PROCESSING);

            const { unmount } = renderHook(() =>
                useAssetStatusPolling(appBridge, ASSET_ID_FIXTURE, ASSET_STATUS_PROCESSING)
            );

            unmount();

            expect(clearIntervalSpy).toHaveBeenCalled();
        });

        it('should remain not ready when the asset is not found in the returned assets', async () => {
            const appBridge = {
                getBlockAssets: vi.fn().mockResolvedValue({ [ASSET_ID]: [{ id: 999, status: ASSET_STATUS_FINISHED }] }),
            } as unknown as AppBridgeBlock;

            const { result } = renderHook(() =>
                useAssetStatusPolling(appBridge, ASSET_ID_FIXTURE, ASSET_STATUS_PROCESSING)
            );

            await advancePollingInterval();

            expect(result.current.isReady).toBe(false);
        });

        it('should remain not ready when the key is absent from block assets', async () => {
            const appBridge = {
                getBlockAssets: vi.fn().mockResolvedValue({}),
            } as unknown as AppBridgeBlock;

            const { result } = renderHook(() =>
                useAssetStatusPolling(appBridge, ASSET_ID_FIXTURE, ASSET_STATUS_PROCESSING)
            );

            await advancePollingInterval();

            expect(result.current.isReady).toBe(false);
        });

        it('should log an error and continue polling when getBlockAssets throws', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const error = new Error('Network error');
            const appBridge = {
                getBlockAssets: vi
                    .fn()
                    .mockRejectedValueOnce(error)
                    .mockResolvedValue({ [ASSET_ID]: [{ id: ASSET_ID_FIXTURE, status: ASSET_STATUS_FINISHED }] }),
            } as unknown as AppBridgeBlock;

            const { result } = renderHook(() =>
                useAssetStatusPolling(appBridge, ASSET_ID_FIXTURE, ASSET_STATUS_PROCESSING)
            );

            await advancePollingInterval();
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                '[useAssetStatusPolling] Failed to fetch block assets:',
                error
            );
            expect(result.current.isReady).toBe(false);

            await advancePollingInterval();
            expect(result.current.isReady).toBe(true);
        });

        it('should set isReady: true when initialStatus prop updates to FINISHED from the parent', () => {
            const appBridge = createAppBridgeMock(ASSET_STATUS_PROCESSING);
            let currentStatus = ASSET_STATUS_PROCESSING;

            const { result, rerender } = renderHook(() =>
                useAssetStatusPolling(appBridge, ASSET_ID_FIXTURE, currentStatus)
            );

            expect(result.current.isReady).toBe(false);

            currentStatus = ASSET_STATUS_FINISHED;
            rerender();

            expect(result.current.isReady).toBe(true);
            expect(appBridge.getBlockAssets).not.toHaveBeenCalled();
        });

        it('should stop polling and log an error after reaching the max attempt limit', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const appBridge = createAppBridgeMock(ASSET_STATUS_PROCESSING);

            const { result } = renderHook(() =>
                useAssetStatusPolling(appBridge, ASSET_ID_FIXTURE, ASSET_STATUS_PROCESSING)
            );

            await advancePollingInterval(MAX_POLL_ATTEMPTS);

            expect(appBridge.getBlockAssets).toHaveBeenCalledTimes(MAX_POLL_ATTEMPTS);
            expect(result.current.isReady).toBe(false);
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                '[useAssetStatusPolling] Max poll attempts reached for asset',
                ASSET_ID_FIXTURE
            );

            await advancePollingInterval(5);
            expect(appBridge.getBlockAssets).toHaveBeenCalledTimes(MAX_POLL_ATTEMPTS);
        });
    });
});
