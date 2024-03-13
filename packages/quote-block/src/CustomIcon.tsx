/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets } from '@frontify/app-bridge';
import { type CustomIconProps } from './types';

export const CustomIcon = ({ style, customIconId, appBridge }: CustomIconProps) => {
    const { blockAssets } = useBlockAssets(appBridge);
    const customIconUrl = blockAssets?.[customIconId]?.[0]?.genericUrl;

    return customIconUrl ? <img style={style} alt="Quote Icon" src={customIconUrl} /> : null;
};
