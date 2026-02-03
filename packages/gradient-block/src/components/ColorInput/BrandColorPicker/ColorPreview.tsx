/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RgbaColorWithName } from '../types';

import { toRgbFunction } from './utils';

export const ColorPreview = ({ color }: { color?: RgbaColorWithName }) => {
    return (
        <div
            className="tw-flex items-center tw-justify-center w-full tw-h-4"
            style={{ background: color ? toRgbFunction(color) : undefined }}
        />
    );
};
