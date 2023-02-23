/* (c) Copyright Frontify Ltd., all rights reserved. */

export const rgbaStringToHexString = (rgba: string, forceRemoveAlpha = false) => {
    return `#${rgba
        .replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
        .split(',') // splits them at ","
        .filter((string, index) => !forceRemoveAlpha || index !== 3)
        .map((string) => parseFloat(string)) // Converts them to numbers
        .map((number, index) => (index === 3 ? Math.round(number * 255) : number)) // Converts alpha to 255 number
        .map((number) => number.toString(16)) // Converts numbers to hex
        .map((string) => (string.length === 1 ? `0${string}` : string)) // Adds 0 when length of one number is 1
        .join('')}`; // Puts the array to togehter to a string
};

export const hexStringToRgba = (hex: string, alpha?: number) => {
    if (!isValidHex(hex)) {
        throw new Error('Invalid HEX');
    }
    const chunkSize = Math.floor((hex.length - 1) / 3);
    const hexArr = getChunksFromString(hex.slice(1), chunkSize);

    if (!hexArr) {
        return;
    }

    const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
    return {
        red: r,
        green: g,
        blue: b,
        alpha: getAlphafloat(a, alpha),
    };
};

export const isValidHex = (hex: string) => /^#([\dA-Fa-f]{6}|[\dA-Fa-f]{3})$/.test(hex);
export const getChunksFromString = (st: string, chunkSize: number) => st.match(new RegExp(`.{${chunkSize}}`, 'g'));
// to be renamed because this doesnt just convert hex to 256 but also repeats the string if the length is 1
export const convertHexUnitTo256 = (hexStr: string) => parseInt(hexStr.repeat(2 / hexStr.length), 16);
export const getAlphafloat = (a: number, alpha?: number) => {
    if (typeof a !== 'undefined') {
        return a / 255;
    }
    if (typeof alpha !== 'number' || alpha < 0 || alpha > 1) {
        return 1;
    }
    return alpha;
};
