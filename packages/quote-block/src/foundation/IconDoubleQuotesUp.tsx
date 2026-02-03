/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FC } from 'react';

import { type IconProps } from '../types';
import { ICON_CLASS_NAME } from '../utilities';

export const IconDoubleQuotesUp: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        width="100%"
        height="100%"
        viewBox="0 0 1 1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0.0273438 0.849994V0.587182C0.0273438 0.462627 0.0568218 0.364229 0.115778 0.291987C0.175564 0.219745 0.262338 0.172414 0.376098 0.149994V0.279531C0.291401 0.306103 0.23452 0.351773 0.205458 0.416542C0.190511 0.450587 0.184283 0.485878 0.186774 0.522414H0.382326V0.849994H0.0273438ZM0.966489 0.279531C0.882622 0.305273 0.826157 0.351773 0.797094 0.419033C0.780487 0.454739 0.773844 0.489199 0.777165 0.522414H0.972717V0.849994H0.617735V0.587182C0.617735 0.460967 0.648043 0.362153 0.70866 0.290741C0.770107 0.21933 0.85605 0.172414 0.966489 0.149994V0.279531Z"
            fill="currentColor"
        />
    </svg>
);
