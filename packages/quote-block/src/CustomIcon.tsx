/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CustomIconProps } from './types';

export const CustomIcon = ({ style, customIcon }: CustomIconProps) => {
    const customIconUrl = customIcon?.genericUrl;

    return customIconUrl ? <img style={style} alt="Quote Icon" src={customIconUrl} /> : null;
};
