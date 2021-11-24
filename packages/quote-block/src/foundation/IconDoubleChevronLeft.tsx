/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { IconProps, ICON_CLASS_NAME } from '../utilities';

const IconDoubleChevronLeft: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        viewBox="0 0 16 12"
        fill="currentColor"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M8.487 0v2.273L2.645 5.841v.318l5.842 3.594V12h-.159L.716 7.216V4.784L8.328 0h.159zm7.083 2.273L9.702 5.841v.318l5.868 3.594V12h-.158L7.773 7.216V4.784L15.412 0h.158v2.273z" />
    </svg>
);

export default IconDoubleChevronLeft;
