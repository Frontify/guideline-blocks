import { Color } from '@frontify/arcade';

export const colorToHex = ({ hex, alpha }: Color) => {
    if (!alpha) {
        return `${hex}FF`;
    } else {
        const hexAlpha = Math.floor(alpha * 255).toString(16);
        return hex + hexAlpha;
    }
};
