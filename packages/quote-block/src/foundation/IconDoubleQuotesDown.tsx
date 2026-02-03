/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FC } from 'react';

import { type IconProps } from '../types';
import { ICON_CLASS_NAME } from '../utilities';

export const IconDoubleQuotesDown: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        width="100%"
        height="100%"
        viewBox="0 0 1 1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0.0292969 0.477574V0.149994H0.384279V0.412805C0.384279 0.534869 0.354386 0.632853 0.294599 0.706755C0.235643 0.780658 0.149285 0.828404 0.0355246 0.849994V0.719211C0.119392 0.692639 0.175857 0.646969 0.20492 0.5822C0.220697 0.548155 0.22734 0.51328 0.224848 0.477574H0.0292969ZM0.884991 0.703019C0.826865 0.778582 0.739676 0.827574 0.623425 0.849994V0.719211C0.708953 0.693469 0.765833 0.646138 0.794065 0.577218C0.80569 0.549816 0.811503 0.516601 0.811503 0.477574H0.617197V0.149994H0.970934V0.412805C0.970934 0.531548 0.942286 0.628286 0.884991 0.703019Z"
            fill="currentColor"
        />
    </svg>
);
