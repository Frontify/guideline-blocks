/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FC } from 'react';

import { type IconProps } from '../types';
import { ICON_CLASS_NAME } from '../utilities';

export const IconDoubleChevronLeft: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        width="100%"
        height="100%"
        viewBox="0 0 1 1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0.457174 0.149994V0.351933L0.284083 0.500418L0.457174 0.648054V0.849994L0.166992 0.601388V0.399448L0.457174 0.149994ZM0.542871 0.399448L0.833053 0.149994V0.351933L0.659962 0.500418L0.833053 0.648054V0.849994L0.542871 0.601388V0.399448Z"
            fill="currentColor"
        />
    </svg>
);
