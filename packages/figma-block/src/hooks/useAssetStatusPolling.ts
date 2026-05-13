/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock } from '@frontify/app-bridge';
import { useEffect, useState } from 'react';

import { ASSET_ID } from '../settings';

const ASSET_STATUS_FINISHED = 'FINISHED';
const POLLING_INTERVAL_MS = 3000;

type UseAssetStatusPollingReturn = {
    isReady: boolean;
};

export const useAssetStatusPolling = (
    appBridge: AppBridgeBlock,
    assetId: number,
    initialStatus: string
): UseAssetStatusPollingReturn => {
    const isInitiallyFinished = initialStatus === ASSET_STATUS_FINISHED;
    const [isReady, setIsReady] = useState(isInitiallyFinished);

    useEffect(() => {
        if (isInitiallyFinished) {
            return;
        }

        let intervalId: number;

        const poll = async () => {
            try {
                const blockAssets = await appBridge.getBlockAssets();
                const assets = blockAssets[ASSET_ID] ?? [];
                const asset = assets.find((a) => a.id === assetId);

                if (asset?.status === ASSET_STATUS_FINISHED) {
                    setIsReady(true);
                    clearInterval(intervalId);
                }
            } catch (error) {
                console.error('[useAssetStatusPolling] Failed to fetch block assets:', error);
            }
        };

        intervalId = setInterval(() => {
            poll().catch(console.error);
        }, POLLING_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [appBridge, assetId, isInitiallyFinished]);

    return {
        isReady,
    };
};
