/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react-hooks';
import { CSSProperties } from 'react';
import { describe, expect, test } from 'vitest';
import { DesignApiProperties, StyleCategories, StyleCategoriesTransformed, StyleName } from './useDesignApi';
import { useDesignApiTransformer } from './useDesignApiTransformer';

const mockStyles: DesignApiProperties = {
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

const expectedTransformedStyles: CSSProperties = {
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

const mockStyleCategories = [
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

describe('useDesignApiTransformer', () => {
    test('should transform StyleCategories', () => {
        const result = renderHook(() =>
            useDesignApiTransformer(
                mockStyleCategories.reduce<StyleCategories>((acc, category) => {
                    acc[category as StyleName] = mockStyles;
                    return acc;
                }, {})
            )
        );
        expect(result.result.current).toMatchObject(
            mockStyleCategories.reduce<StyleCategoriesTransformed>((acc, category) => {
                acc[category as StyleName] = expectedTransformedStyles;
                return acc;
            }, {})
        );
    });
});
