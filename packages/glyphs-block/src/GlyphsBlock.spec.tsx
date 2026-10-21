/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge/testing';
import { BorderStyle, Radius, radiusStyleMap } from '@frontify/guideline-blocks-settings';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { GlyphsBlock } from './GlyphsBlock';

const GLYPHS_BLOCK_TEST_ID = 'glyphs-block';
const GLYPHS_ITEM_TEST_ID = 'glyphs-item';

const renderGlyphsBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [GlyphsBlockWithStubs, appBridge] = withAppBridgeBlockStubs(GlyphsBlock, appBridgeProps);
    const utils = render(<GlyphsBlockWithStubs />);
    return { ...utils, appBridge };
};

describe('Glyphs Block', () => {
    it('should render a glyphs block with defaults', () => {
        renderGlyphsBlock();

        expect(screen.getByTestId(GLYPHS_BLOCK_TEST_ID)).toHaveTextContent('Aa');
    });

    it('should render a glyphs block with custom border', () => {
        renderGlyphsBlock({
            blockSettings: {
                hasBorder: true,
                borderStyle: BorderStyle.Dotted,
                borderWidth: '2px',
                borderColor: { r: 240, g: 0, b: 0, a: 1 },
            },
        });

        for (const item of screen.getAllByTestId(GLYPHS_ITEM_TEST_ID)) {
            expect(item).toHaveStyle({ outlineColor: 'rgb(240, 0, 0)', outlineStyle: 'dotted', outlineWidth: '2px' });
        }
    });

    it('should render a glyphs block with predefined radius', () => {
        renderGlyphsBlock({
            blockSettings: {
                hasRadius: false,
                radiusChoice: Radius.Large,
            },
        });

        const items = screen.getAllByTestId(GLYPHS_ITEM_TEST_ID);
        expect(items[0]).toHaveStyle({ borderTopLeftRadius: radiusStyleMap[Radius.Large] });
        expect(items[5]).toHaveStyle({ borderTopRightRadius: radiusStyleMap[Radius.Large] });
        expect(items[30]).toHaveStyle({ borderBottomLeftRadius: radiusStyleMap[Radius.Large] });
        expect(items[items.length - 1]).toHaveStyle({ borderBottomRightRadius: radiusStyleMap[Radius.Large] });
    });

    it('should render a glyphs block with custom radius', () => {
        renderGlyphsBlock({
            blockSettings: {
                hasRadius: true,
                radiusValue: '10px',
            },
        });

        const items = screen.getAllByTestId(GLYPHS_ITEM_TEST_ID);
        expect(items[0]).toHaveStyle({ borderTopLeftRadius: '10px' });
        expect(items[5]).toHaveStyle({ borderTopRightRadius: '10px' });
        expect(items[30]).toHaveStyle({ borderBottomLeftRadius: '10px' });
        expect(items[items.length - 1]).toHaveStyle({ borderBottomRightRadius: '10px' });
    });

    it('should render a glyphs block with custom background', () => {
        renderGlyphsBlock({
            blockSettings: {
                hasBackground: true,
                backgroundColor: { r: 240, g: 0, b: 0, a: 1 },
            },
        });

        for (const item of screen.getAllByTestId(GLYPHS_ITEM_TEST_ID)) {
            expect(item).toHaveStyle({ backgroundColor: 'rgb(240, 0, 0)' });
        }
    });

    it('should render a glyphs block with custom font', () => {
        renderGlyphsBlock({
            blockSettings: {
                fontFamily: 'Merriweather',
                fontWeight: 600,
                fontSize: 24,
                fontColor: { r: 240, g: 0, b: 0, a: 1 },
            },
        });

        expect(screen.getByTestId(GLYPHS_BLOCK_TEST_ID)).toHaveStyle({
            fontFamily: 'Merriweather',
            fontWeight: '600',
            fontSize: '24px',
            color: 'rgb(240, 0, 0)',
        });
    });
});
