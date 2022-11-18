/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { ICON_CLASS_NAME } from '../utilities';
import { IconProps } from '../types';

export const IconHookBracketRight: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        width="100%"
        height="100%"
        viewBox="0 0 1 1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M0.681201 0.849994V0.149994H0.551937V0.731684H0.318604V0.849994H0.681201Z" fill="currentColor" />
    </svg>
);
