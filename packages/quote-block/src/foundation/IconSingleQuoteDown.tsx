/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FC } from 'react';

import { type IconProps } from '../types';
import { ICON_CLASS_NAME } from '../utilities';

export const IconSingleQuoteDown: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        width="100%"
        height="100%"
        viewBox="0 0 1 1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0.677492 0.412805C0.677492 0.538191 0.646768 0.637005 0.585321 0.709247C0.524704 0.781489 0.439176 0.828404 0.328738 0.849994V0.719211C0.410114 0.69347 0.466163 0.649875 0.496887 0.588428C0.513494 0.551892 0.520552 0.51494 0.518061 0.477574H0.32251V0.149994H0.677492V0.412805Z"
            fill="currentColor"
        />
    </svg>
);
