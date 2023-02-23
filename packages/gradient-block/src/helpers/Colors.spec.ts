/* (c) Copyright Frontify Ltd., all rights reserved. */

// vitest example
import { describe, expect, test } from 'vitest';
import {
    convertHexUnitTo256,
    getAlphafloat,
    getChunksFromString,
    hexStringToRgba,
    isValidHex,
    rgbaStringToHexString,
} from './Colors';

describe('Colors isValidHex', () => {
    // test valid hex
    test('should return true for #000000', () => {
        const hex = '#000000';
        expect(isValidHex(hex)).to.be.true;
    });

    test('should return true for #000', () => {
        const hex = '#000';
        expect(isValidHex(hex)).to.be.true;
    });

    test('should return true for #FFFFFF', () => {
        const hex = '#FFFFFF';
        expect(isValidHex(hex)).to.be.true;
    });

    test('should return true for #FFF', () => {
        const hex = '#FFF';
        expect(isValidHex(hex)).to.be.true;
    });

    test('should return false without #', () => {
        const hex = '000000';
        expect(isValidHex(hex)).to.be.false;
    });

    test('should return false for #0000000', () => {
        const hex = '#0000000';
        expect(isValidHex(hex)).to.be.false;
    });

    test('should return false for #00000', () => {
        const hex = '#00000';
        expect(isValidHex(hex)).to.be.false;
    });

    test('should return false for #FF', () => {
        const hex = '#FF';
        expect(isValidHex(hex)).to.be.false;
    });

    test('should return false for #00G', () => {
        const hex = '#00G';
        expect(isValidHex(hex)).to.be.false;
    });
});

describe('Colors getChunksFromString', () => {
    test('should return ["00", "00", "00"] for #000000', () => {
        const hex = '#000000';
        const chunkSize = Math.floor((hex.length - 1) / 3);
        expect(getChunksFromString(hex.slice(1), chunkSize)).to.be.deep.equal(['00', '00', '00']);
    });

    test('should return ["ff", "ff", "ff"] for #ffffff', () => {
        const hex = '#ffffff';
        const chunkSize = Math.floor((hex.length - 1) / 3);
        expect(getChunksFromString(hex.slice(1), chunkSize)).to.be.deep.equal(['ff', 'ff', 'ff']);
    });

    test('should return ["f", "f", "f"] for #fff', () => {
        const hex = '#fff';
        const chunkSize = Math.floor((hex.length - 1) / 3);
        expect(getChunksFromString(hex.slice(1), chunkSize)).to.be.deep.equal(['f', 'f', 'f']);
    });
});

describe('Colors convertHexUnitTo256', () => {
    test('should return 0 for 00', () => {
        const hexStr = '00';
        expect(convertHexUnitTo256(hexStr)).to.be.equal(0);
    });

    test('should return 0 for 0', () => {
        const hexStr = '0';
        expect(convertHexUnitTo256(hexStr)).to.be.equal(0);
    });

    test('should return 255 for ff', () => {
        const hexStr = 'ff';
        expect(convertHexUnitTo256(hexStr)).to.be.equal(255);
    });

    test('should return 255 for f', () => {
        const hexStr = 'f';
        expect(convertHexUnitTo256(hexStr)).to.be.equal(255);
    });

    test('should return 128 for 80', () => {
        const hexStr = '80';
        expect(convertHexUnitTo256(hexStr)).to.be.equal(128);
    });

    test('should return 1 for 1', () => {
        const hexStr = '1';
        expect(convertHexUnitTo256(hexStr)).to.be.equal(17);
    });

    test('should return 255 for f', () => {
        const hexStr = 'f';
        expect(convertHexUnitTo256(hexStr)).to.be.equal(255);
    });

    test('should return Nan for fff', () => {
        const hexStr = 'fff';
        expect(convertHexUnitTo256(hexStr)).to.be.NaN;
    });
});

describe('Colors getAlphafloat', () => {
    test('should return 1 for 255', () => {
        expect(getAlphafloat(255)).to.be.equal(1);
    });
});

describe('Colors hexStringToRgba', () => {
    test('should return rgba(0, 0, 0, 1) for #000000', () => {
        const hex = '#000000';
        const rgba = {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
        };
        expect(hexStringToRgba(hex)).to.be.deep.equal(rgba);
    });

    test('should return rgba(0, 0, 0, 1) for #000', () => {
        const hex = '#000';
        const rgba = {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
        };
        expect(hexStringToRgba(hex)).to.be.deep.equal(rgba);
    });

    test('should return rgba(255, 255, 255, 1) for #ffffff', () => {
        const hex = '#ffffff';
        const rgba = {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        };
        expect(hexStringToRgba(hex)).to.be.deep.equal(rgba);
    });

    test('should return rgba(255, 255, 255, 1) for #fff', () => {
        const hex = '#fff';
        const rgba = {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        };
        expect(hexStringToRgba(hex)).to.be.deep.equal(rgba);
    });

    test('should throw error for #0000000', () => {
        const hex = '#0000000';
        expect(() => hexStringToRgba(hex)).to.throw();
    });
});

describe('Colors rgbaStringToHexString', () => {
    test('should return #000000 for rgba(0, 0, 0, 1)', () => {
        const rgba = 'rgba(0, 0, 0, 1)';
        const hex = '#000000ff';
        expect(rgbaStringToHexString(rgba)).to.be.equal(hex);
    });

    test('should return #ffffff for rgba(255, 255, 255, 1)', () => {
        const rgba = 'rgba(255, 255, 255, 1)';
        const hex = '#ffffffff';
        expect(rgbaStringToHexString(rgba)).to.be.equal(hex);
    });

    test('should return #000000 for rgba(0, 0, 0, 0)', () => {
        const rgba = 'rgba(0, 0, 0, 0)';
        const hex = '#00000000';
        expect(rgbaStringToHexString(rgba)).to.be.equal(hex);
    });

    test('should return #43ff64d9 for rgba(67, 255, 100, 0.85)', () => {
        const rgba = 'rgba(67, 255, 100, 0.85)';
        const hex = '#43ff64d9';
        expect(rgbaStringToHexString(rgba)).to.be.equal(hex);
    });
});
