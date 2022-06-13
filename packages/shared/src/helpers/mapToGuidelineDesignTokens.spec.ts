/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { describe, expect, it } from 'vitest';
import {
    DesignTokenName,
    DesignTokenProperties,
    DesignTokens,
    TransformedDesignTokens,
} from '../hooks/useGuidelineDesignTokens';
import { mapToGuidelineDesignTokens } from './mapToGuidelineDesignTokens';

const mockedDesignTokens: DesignTokenProperties = {
    family: 'family',
    weight: 'weight',
    size: 'size',
    letterspacing: 'letterspacing',
    line_height: 'line_height',
    margin_top: 'margin_top',
    margin_bottom: 'margin_bottom',
    uppercase: 'uppercase',
    italic: 'italic',
    underline: 'underline',
    color: 'color',
};

const expectedTransformedDesignTokens: CSSProperties = {
    fontFamily: 'family',
    fontWeight: 'weight',
    fontSize: 'size',
    letterSpacing: 'letterspacing',
    lineHeight: 'line_height',
    marginTop: 'margin_top',
    marginBottom: 'margin_bottom',
    textTransform: 'none',
    fontStyle: '',
    textDecoration: '',
    color: 'color',
};

const designTokens = [
    'heading1',
    'heading2',
    'heading3',
    'heading4',
    'custom1',
    'custom2',
    'custom3',
    'body',
    'link',
    'quote',
];

/**
 * @vitest-environment happy-dom
 */
describe('mapToGuidelineDesignTokens', () => {
    it('should transform design tokens', () => {
        const result = mapToGuidelineDesignTokens(
            designTokens.reduce<DesignTokens>((acc, token) => {
                acc[token as DesignTokenName] = mockedDesignTokens;
                return acc;
            }, {})
        );
        expect(result).toMatchObject(
            designTokens.reduce<TransformedDesignTokens>((acc, token) => {
                acc[token as DesignTokenName] = expectedTransformedDesignTokens;
                return acc;
            }, {})
        );
    });

    it('should transform uppercase to textTransform', () => {
        const result = mapToGuidelineDesignTokens({ body: { uppercase: '1' } });
        expect(result).toMatchObject({ body: { textTransform: 'uppercase' } });
    });

    it('should transform italic to fontStyle', () => {
        const result = mapToGuidelineDesignTokens({ body: { italic: '1' } });
        expect(result).toMatchObject({ body: { fontStyle: 'italic' } });
    });

    it('should transform underline to textDecoration', () => {
        const result = mapToGuidelineDesignTokens({ body: { underline: '1' } });
        expect(result).toMatchObject({ body: { textDecoration: 'underline' } });
    });

    it('should transform color value', () => {
        const result = mapToGuidelineDesignTokens({ body: { color: '#fff' } });
        expect(result).toMatchObject({ body: { color: '#fff' } });
    });
});
