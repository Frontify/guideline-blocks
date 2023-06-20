/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FOCUS_VISIBLE_STYLE, merge } from '@frontify/fondue';
import { ReactNode } from 'react';

type ControlButtonProps = {
    children: ReactNode;
    onClick: () => void;
};

export const ControlButton = ({ children, onClick }: ControlButtonProps) => (
    <button
        className={merge([
            'tw-flex tw-items-center tw-gap-2 tw-text-text-disabled hover:tw-text-text tw-transition-colors tw-rounded',
            FOCUS_VISIBLE_STYLE,
        ])}
        onClick={onClick}
    >
        {children}
    </button>
);
