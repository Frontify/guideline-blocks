/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FC } from 'react';

import { type IconProps } from '../types';
import { ICON_CLASS_NAME } from '../utilities';

export const IconSingleChevronLeft: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        width="100%"
        height="100%"
        viewBox="0 0 1 1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0.645162 0.149994V0.351933L0.472071 0.500418L0.645162 0.648054V0.849994L0.35498 0.601388V0.399448L0.645162 0.149994Z"
            fill="currentColor"
        />
    </svg>
);
