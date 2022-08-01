/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';

import { TootlipContentProps } from '../types';

export const TootlipContent: FC<TootlipContentProps> = ({ color, status }) => {
    return (
        <>
            <span className="tw-block">Color Name</span>
            <span className="tw-block">{color}</span>
            <span className="tw-text-black-50">
                {status === 'error' && 'Error copying. Try again.'}
                {status === 'idle' && 'Click to copy'}
                {status === 'success' && 'Copied!'}
            </span>
        </>
    );
};
