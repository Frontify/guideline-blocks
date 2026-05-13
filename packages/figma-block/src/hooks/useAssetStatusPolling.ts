/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock } from '@frontify/app-bridge';
import { useEffect, useState } from 'react';

import { ASSET_ID } from '../settings';

const ASSET_STATUS_FINISHED = 'FINISHED';
const POLLING_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 20;

type UseAssetStatusPollingReturn = {
    isReady: boolean;
};

const isFinished = (status: string | undefined) => status && status === ASSET_STATUS_FINISHED;

export const useAssetStatusPolling = (
    appBridge: AppBridgeBlock,
    assetId: number,
    initialStatus: string
): UseAssetStatusPollingReturn => {
    const [pollingDetectedFinished, setPollingDetectedFinished] = useState(false);
    const isReady = isFinished(initialStatus) || pollingDetectedFinished;

    useEffect(() => {
        if (isFinished(initialStatus)) {
            return;
        }

        let intervalId: number;
        let attempts = 0;

        const poll = async () => {
            attempts++;
            try {
                const blockAssets = await appBridge.getBlockAssets();
                const assets = blockAssets[ASSET_ID] ?? [];
                const asset = assets.find((a) => a.id === assetId);

                if (isFinished(asset?.status)) {
                    setPollingDetectedFinished(true);
                    clearInterval(intervalId);
                    return;
                }
            } catch (error) {
                console.error('[useAssetStatusPolling] Failed to fetch block assets:', error);
            }

            if (attempts >= MAX_POLL_ATTEMPTS) {
                console.error('[useAssetStatusPolling] Max poll attempts reached for asset', assetId);
                clearInterval(intervalId);
            }
        };

        intervalId = setInterval(async () => {
            await poll();
        }, POLLING_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [appBridge, assetId, initialStatus]);

    return { isReady };
};
