/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset, useBlockAssets } from '@frontify/app-bridge';
import { ReactNode, createContext } from 'react';

type AssetsProviderProps = {
    appBridge: AppBridgeBlock;
    children: ReactNode;
};

type AssetsContext = {
    blockAssets?: Record<string, Asset[]>;
    addAssetIdsToKey?: (key: string, assetIds: number[]) => Promise<void>;
    deleteAssetIdsFromKey?: (key: string, assetIds: number[]) => Promise<void>;
    updateAssetIdsFromKey?: (key: string, assetIds: number[]) => Promise<void>;
};

export const AssetsContext = createContext<AssetsContext>({} as AssetsContext);

export const AssetsProvider = ({ appBridge, children }: AssetsProviderProps) => {
    const { blockAssets, addAssetIdsToKey, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    return (
        <AssetsContext.Provider value={{ blockAssets, addAssetIdsToKey, deleteAssetIdsFromKey, updateAssetIdsFromKey }}>
            {children}
        </AssetsContext.Provider>
    );
};
