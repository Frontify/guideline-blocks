/* (c) Copyright Frontify Ltd., all rights reserved. */

export const getRgbCssFromHex = (hex: string) => {
    const colorValue = hex.slice(1, 7);
    const base10Hex = parseInt(colorValue, 16);
    const r = (base10Hex >> 16) & 255;
    const g = (base10Hex >> 8) & 255;
    const b = base10Hex & 255;

    return `rgb(${r}, ${g}, ${b})`;
};
