/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FC } from 'react';

import { type IconProps } from '../types';
import { ICON_CLASS_NAME } from '../utilities';

export const IconDoubleChevronRight: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        width="100%"
        height="100%"
        viewBox="0 0 1 1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0.166992 0.351933V0.149994L0.457174 0.399448V0.601388L0.166992 0.849994V0.648054L0.340083 0.500418L0.166992 0.351933ZM0.542871 0.648054L0.715962 0.500418L0.542871 0.351933V0.149994L0.833053 0.399448V0.601388L0.542871 0.849994V0.648054Z"
            fill="currentColor"
        />
    </svg>
);
