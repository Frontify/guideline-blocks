/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset } from '@frontify/app-bridge';

export const CustomCalloutIcon = ({ customIcon }: { customIcon: Asset | undefined }) => {
    const devicePixelRatio = Math.max(window.devicePixelRatio, 1);
    const iconUrl = customIcon?.genericUrl.replace('{width}', (20 * devicePixelRatio).toString());

    return iconUrl ? (
        <img
            data-test-id="callout-icon-custom"
            src={iconUrl}
            alt=""
            aria-hidden="true"
            className="tw-w-5 tw-h-5 tw-object-contain"
        />
    ) : null;
};
