import { Color } from '@frontify/fondue';

export const isRgbaLongFormat = (value: Color) => {
    const requiredKeys = ['red', 'green', 'blue'];
    return typeof value === 'object' && requiredKeys.every((i) => value.hasOwnProperty(i));
};
