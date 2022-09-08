/* (c) Copyright Frontify Ltd., all rights reserved. */

const paletteMock = {
    palette02: { name: 'Palette 02', colors: ['red', 'green', 'blue'] },
    summerPalette: { name: 'Summer Palette', colors: ['red', 'green', 'blue'] },
    paletteXyz: { name: 'Palette XYZ', colors: ['red', 'green', 'blue'] },
    palette888: {
        name: 'Palette 888',
        colors: ['red', 'green', 'blue', 'red', 'green', 'blue', 'red', 'green', 'blue', 'red', 'green', 'blue'],
    },
    halloweenPalette: { name: 'Halloween Palette', colors: ['red', 'green', 'blue'] },
};

export const useColorPalettes = (colorPalettes: string[]) => {
    return Object.entries(paletteMock)
        .filter(([key]) => colorPalettes.includes(key))
        .map(([, value]) => value);
};
