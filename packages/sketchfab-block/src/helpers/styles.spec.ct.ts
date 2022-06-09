/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/arcade';
import { BorderStyle } from '@frontify/guideline-blocks-shared';
import { CSSProperties } from 'react';
import { borderStyles } from '../types';
import { getIframeStyles } from './styles';

describe('getIframeStyles', () => {
    it('passes each test', () => {
        const data: { args: [BorderStyle, string, Color, string]; expected: CSSProperties }[] = [
            {
                args: [BorderStyle.Dotted, '2px', { r: 50, g: 100, b: 230, a: 0.1 }, '3px'],
                expected: {
                    borderStyle: borderStyles[BorderStyle.Dotted],
                    borderWidth: '2px',
                    borderColor: 'rgba(50, 100, 230, 0.1)',
                    borderRadius: '3px',
                },
            },
            {
                args: [BorderStyle.Solid, '20px', { r: 30, g: 100, b: 0, a: 1 }, ''],
                expected: {
                    borderStyle: borderStyles[BorderStyle.Solid],
                    borderWidth: '20px',
                    borderColor: 'rgb(30, 100, 0)',
                    borderRadius: '',
                },
            },
            {
                args: [BorderStyle.Dotted, '0', { r: 0, g: 0, b: 0, a: 0 }, ''],
                expected: {
                    borderStyle: borderStyles[BorderStyle.Dotted],
                    borderWidth: '0',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderRadius: '',
                },
            },
        ];
        for (const { expected, args } of data) {
            const { borderStyle, borderWidth, borderColor, borderRadius } = getIframeStyles(
                args[0],
                args[1],
                args[2],
                args[3]
            );
            cy.wrap(borderStyle).should('equal', expected.borderStyle);
            cy.wrap(borderColor).should('equal', expected.borderColor);
            cy.wrap(borderWidth).should('equal', expected.borderWidth);
            cy.wrap(borderRadius).should('equal', expected.borderRadius);
        }
    });
});
