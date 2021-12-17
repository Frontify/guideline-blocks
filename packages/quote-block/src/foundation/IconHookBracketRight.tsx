/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { ICON_CLASS_NAME } from '../utilities';
import { IconProps } from '../types';

export const IconHookBracketRight: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        viewBox="0 0 7 12"
        fill="currentColor"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M.212 12h5.86V0H4.7v10.72H.212V12z" />
    </svg>
);
