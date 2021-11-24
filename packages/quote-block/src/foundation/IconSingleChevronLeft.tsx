/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { IconProps, ICON_CLASS_NAME } from '../utilities';

const IconSingleChevronLeft: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        viewBox="0 0 10 12"
        fill="currentColor"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M9.506 12L.62 7.264V4.763L9.506 0h.16v2.235L2.695 5.854v.319l6.97 3.619V12h-.159z" />
    </svg>
);

export default IconSingleChevronLeft;
