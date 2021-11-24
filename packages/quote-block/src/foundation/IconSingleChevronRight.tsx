/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { IconProps, ICON_CLASS_NAME } from '../utilities';

const IconSingleChevronRight: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        viewBox="0 0 10 12"
        fill="currentColor"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M.78 0l8.886 4.736v2.501L.779 12H.62V9.765l6.972-3.619v-.319L.619 2.208V0h.16z" />
    </svg>
);

export default IconSingleChevronRight;
