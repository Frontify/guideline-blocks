/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useBlockAssets } from '@frontify/app-bridge';

import { ICON_ASSET_ID } from '../settings';

export const CustomCalloutIcon = ({ appBridge }: { appBridge: AppBridgeBlock }) => {
    const { blockAssets } = useBlockAssets(appBridge);

    const icon = blockAssets?.[ICON_ASSET_ID]?.[0];

    const iconUrl = icon?.genericUrl.replace('{width}', '20');

    return iconUrl ? (
        <img
            data-test-id="callout-icon-custom"
            src={iconUrl}
            alt="custom callout icon"
            height={icon?.height}
            width={icon?.width}
            className="tw-w-5 tw-h-5 tw-object-contain"
        />
    ) : null;
};
