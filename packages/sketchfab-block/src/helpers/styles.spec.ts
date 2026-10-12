/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BorderStyle, type Color } from '@frontify/guideline-blocks-settings';
import { type CSSProperties } from 'react';
import { describe, expect, it } from 'vitest';

import { borderStyles } from '../types';

import { getIframeBorderStyles } from './styles';

describe('getIframeBorderStyles', () => {
    it.each<{ args: [BorderStyle, string, Color]; expected: CSSProperties }>([
        {
            args: [BorderStyle.Dotted, '2px', { red: 50, green: 100, blue: 230, alpha: 0.1 }],
            expected: {
                borderStyle: borderStyles[BorderStyle.Dotted],
                borderWidth: '2px',
                borderColor: 'rgba(50, 100, 230, 0.1)',
            },
        },
        {
            args: [BorderStyle.Solid, '20px', { red: 30, green: 100, blue: 0, alpha: 1 }],
            expected: {
                borderStyle: borderStyles[BorderStyle.Solid],
                borderWidth: '20px',
                borderColor: 'rgb(30, 100, 0)',
            },
        },
        {
            args: [BorderStyle.Dotted, '0', { red: 0, green: 0, blue: 0, alpha: 0 }],
            expected: {
                borderStyle: borderStyles[BorderStyle.Dotted],
                borderWidth: '0',
                borderColor: 'rgba(0, 0, 0, 0)',
            },
        },
    ])('should return the border styles for $args.0 $args.1', ({ args, expected }) => {
        const { borderStyle, borderWidth, borderColor } = getIframeBorderStyles(...args);

        expect({ borderStyle, borderWidth, borderColor }).toEqual(expected);
    });
});
