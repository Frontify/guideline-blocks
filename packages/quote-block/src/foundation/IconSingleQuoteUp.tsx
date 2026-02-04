/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FC } from 'react';

import { type IconProps } from '../types';
import { ICON_CLASS_NAME } from '../utilities';

export const IconSingleQuoteUp: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        width="100%"
        height="100%"
        viewBox="0 0 1 1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0.676979 0.849994H0.323242V0.587182C0.323242 0.460136 0.353135 0.361322 0.412922 0.290741C0.473539 0.21933 0.559897 0.172414 0.671997 0.149994V0.279531C0.586469 0.304442 0.529589 0.350943 0.501356 0.419033C0.485579 0.455569 0.479351 0.490029 0.482673 0.522414H0.676979V0.849994Z"
            fill="currentColor"
        />
    </svg>
);
