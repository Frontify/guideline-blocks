/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useBlockAssets } from '@frontify/app-bridge';

import { ICON_ASSET_ID } from '../settings';

export const CustomCalloutIcon = ({ appBridge }: { appBridge: AppBridgeBlock }) => {
    const { blockAssets } = useBlockAssets(appBridge);

    const iconUrl = blockAssets?.[ICON_ASSET_ID]?.[0]?.genericUrl.replace('{width}', '24');

    return iconUrl ? <img data-test-id="callout-icon-custom" src={iconUrl} alt="custom callout icon" /> : null;
};
