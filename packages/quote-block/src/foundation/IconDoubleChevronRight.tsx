/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { ICON_CLASS_NAME } from '../utilities';
import { IconProps } from '../types';

const IconDoubleChevronRight: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        viewBox="0 0 16 12"
        fill="currentColor"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M7.799 12V9.727l5.841-3.568V5.84L7.799 2.247V0h.158l7.612 4.784v2.432L7.957 12H7.8zM.715 9.727l5.868-3.568V5.84L.715 2.247V0h.158l7.64 4.784v2.432L.872 12H.715V9.727z" />
    </svg>
);

export default IconDoubleChevronRight;
