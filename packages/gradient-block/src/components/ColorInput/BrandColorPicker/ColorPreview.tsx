/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toRgbFunction } from './utils';

import { type RgbaColorWithName } from '../types';

export const ColorPreview = ({ color }: { color?: RgbaColorWithName }) => {
    return (
        <div
            className="tw-flex items-center tw-justify-center w-full tw-h-4"
            style={{ background: color ? toRgbFunction(color) : undefined }}
        />
    );
};
