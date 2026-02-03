/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset } from '@frontify/app-bridge';

import { type Type } from '../types';

export const CustomCalloutIcon = ({ customIcon, type }: { customIcon: Asset | undefined; type: Type }) => {
    const devicePixelRatio = Math.max(window.devicePixelRatio, 1);
    const iconUrl = customIcon?.genericUrl.replace('{width}', (20 * devicePixelRatio).toString());

    return iconUrl ? (
        <img data-test-id="callout-icon-custom" src={iconUrl} alt={type} className="tw-w-5 tw-h-5 tw-object-contain" />
    ) : null;
};
