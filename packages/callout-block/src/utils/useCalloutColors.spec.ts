/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DesignTokenName, TokenValues } from '@frontify/guideline-blocks-shared';
import { describe, expect, test } from 'vitest';
import { useCalloutColors } from './useCalloutColors';

const designTokens: Partial<Record<DesignTokenName, TokenValues>> = {
    heading1: {
        fontFamily: 'inherit',
        fontSize: '50px',
        color: 'rgb(0, 0, 0)',
        fontStyle: '',
        fontWeight: '400',
        textDecoration: '',
        textTransform: 'none',
        marginTop: '0',
        lineHeight: '1.3',
        letterSpacing: 'normal',
        marginBottom: '10px',
    },
    heading2: {
        fontFamily: 'inherit',
        fontSize: '40px',
        color: 'rgb(0, 0, 0)',
        fontStyle: '',
        fontWeight: '300',
        textDecoration: '',
        textTransform: 'none',
        marginTop: '0',
        lineHeight: '1.3',
        letterSpacing: 'normal',
        marginBottom: '10px',
    },
    heading3: {
        fontFamily: 'inherit',
        marginTop: '0',
        marginBottom: '10px',
    },
    heading4: {
        fontFamily: 'inherit',
        marginTop: '0',
        marginBottom: '10px',
    },
    p: {
        fontFamily: 'inherit',
        fontSize: '15px',
    },
    link: {
        fontFamily: 'inherit',
        fontSize: '15px',
        color: 'rgb(95, 80, 233)',
        fontStyle: '',
        fontWeight: '400',
        textDecoration: '',
        textTransform: 'none',
        lineHeight: '1.3',
        letterSpacing: 'normal',
    },
    custom1: {
        fontFamily: 'inherit',
        fontSize: '16px',
        color: 'rgb(255, 0, 0)',
        fontStyle: '',
        fontWeight: '700',
        textDecoration: '',
        textTransform: 'none',
        marginTop: '0',
        lineHeight: '1.3',
        letterSpacing: 'normal',
        marginBottom: '10px',
    },
    custom2: {
        fontFamily: 'inherit',
        fontSize: '16px',
        color: 'rgb(255, 194, 0)',
        fontStyle: '',
        fontWeight: '700',
        textDecoration: '',
        textTransform: 'none',
        marginTop: '0',
        lineHeight: '1.3',
        letterSpacing: 'normal',
        marginBottom: '10px',
    },
    custom3: {
        fontFamily: 'inherit',
        fontSize: '16px',
        color: 'rgb(255, 0, 222)',
        fontStyle: '',
        fontWeight: '700',
        textDecoration: '',
        textTransform: 'none',
        marginTop: '0',
        lineHeight: '1.3',
        letterSpacing: 'normal',
        marginBottom: '10px',
    },
    quote: {
        fontFamily: 'inherit',
        fontSize: '24px',
        color: 'rgb(5, 231, 39)',
        fontStyle: '',
        fontWeight: '400',
        textDecoration: '',
        textTransform: 'none',
        lineHeight: '1.3',
        letterSpacing: 'normal',
    },
};

describe('Styles are adjusted correctly for callout blocks', () => {
    test('It should adjust all relevant colors', () => {
        const changedDesignTokens = useCalloutColors(designTokens, 'rgb(1,2,3)');
        expect(changedDesignTokens).toHaveProperty('heading1.color', 'rgb(1,2,3)');
        expect(changedDesignTokens).toHaveProperty('heading2.color', 'rgb(1,2,3)');
        expect(changedDesignTokens).toHaveProperty('heading3.color', 'rgb(1,2,3)');
        expect(changedDesignTokens).toHaveProperty('heading4.color', 'rgb(1,2,3)');
        expect(changedDesignTokens).toHaveProperty('p.color', 'rgb(1,2,3)');
        expect(changedDesignTokens).toHaveProperty('link.color', 'rgb(1,2,3)');
    });

    test('It should adjust link to be underlined', () => {
        const changedDesignTokens = useCalloutColors(designTokens, 'rgb(1,2,3)');
        expect(changedDesignTokens).toHaveProperty('link.textDecoration', 'underline');
    });

    test('It should not adjust custom styles and quotes', () => {
        const changedDesignTokens = useCalloutColors(designTokens, 'rgb(1,2,3)');
        expect(changedDesignTokens).toHaveProperty('custom1', designTokens.custom1);
        expect(changedDesignTokens).toHaveProperty('custom2', designTokens.custom2);
        expect(changedDesignTokens).toHaveProperty('custom3', designTokens.custom3);
        expect(changedDesignTokens).toHaveProperty('quote', designTokens.quote);
    });

    test('It should do nothing to invalid design tokens', () => {
        const changedDesignTokens = useCalloutColors(null, 'rgb(1,2,3)');
        expect(changedDesignTokens).toBeUndefined();
    });

    test('It should return original design tokens if no color is passed', () => {
        const changedDesignTokens = useCalloutColors(designTokens, undefined);
        expect(changedDesignTokens).toEqual(designTokens);
    });
});
