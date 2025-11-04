/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { type RgbaColorWithName } from '../types';

import { BrandColorPicker } from './BrandColorPicker';
import { ColorPreview } from './ColorPreview';

const palettes: {
    id: number;
    title: string;
    colors: RgbaColorWithName[];
}[] = [
    {
        id: 1,
        title: 'Palette 1',
        colors: [
            { red: 255, green: 0, blue: 0, alpha: 1, name: 'Red' },
            { red: 0, green: 255, blue: 0, alpha: 1, name: 'Green' },
            { red: 0, green: 0, blue: 255, alpha: 1, name: 'Blue' },
            { red: 255, green: 255, blue: 0, alpha: 1, name: 'Yellow' },
            { red: 0, green: 255, blue: 255, alpha: 1, name: 'Cyan' },
            { red: 255, green: 0, blue: 255, alpha: 1, name: 'Magenta' },
        ],
    },
    {
        id: 2,
        title: 'Palette 2',
        colors: [
            { red: 255, green: 0, blue: 0, alpha: 1, name: 'Red' },
            { red: 0, green: 255, blue: 0, alpha: 1, name: 'Green' },
            { red: 0, green: 0, blue: 255, alpha: 1, name: 'Blue' },
            { red: 255, green: 255, blue: 0, alpha: 1, name: 'Yellow' },
            { red: 0, green: 255, blue: 255, alpha: 1, name: 'Cyan' },
            { red: 255, green: 0, blue: 255, alpha: 1, name: 'Magenta' },
        ],
    },
];

const PALLETTE_LIST_TEST_ID = 'brand-color-picker_palette-list';
const COLOR_LIST_SELECTOR = '[data-test-id="brand-color-picker_color-list"]';

describe('BrandColorPicker', () => {
    const writeText = vi.fn();

    vi.stubGlobal('navigator', {
        clipboard: {
            writeText,
        },
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('Should render pallette list', () => {
        const { getByTestId } = render(<BrandColorPicker palettes={palettes} />);

        expect(getByTestId(PALLETTE_LIST_TEST_ID)).toBeVisible();
    });

    it('Should render palettes from data', () => {
        const { getByTestId } = render(<BrandColorPicker palettes={palettes} />);

        const paletteList = getByTestId(PALLETTE_LIST_TEST_ID);
        expect(paletteList).toBeVisible();
        expect(paletteList.children.length).toBe(palettes.length);

        expect(paletteList.querySelector(COLOR_LIST_SELECTOR)?.children.length).toBe(palettes[0].colors.length);
    });

    it('Should render correct colors', () => {
        const { getByTestId } = render(<BrandColorPicker palettes={palettes} />);

        const paletteList = getByTestId(PALLETTE_LIST_TEST_ID);
        for (const [index, palette] of palettes.entries()) {
            const colorList = paletteList.children[index].querySelectorAll(`${COLOR_LIST_SELECTOR} li`);
            expect(colorList.length).toBe(palette.colors.length);
            for (const [colorIndex] of palette.colors.entries()) {
                expect(colorList[colorIndex].querySelector('button')?.getAttribute('aria-label')).toBe(
                    'color value: Red'
                );
            }
        }
    });

    it('Should show icon IconCheckMark on selected color preview', () => {
        const currentColor: RgbaColorWithName = { red: 255, green: 0, blue: 0, alpha: 1, name: 'Red' };
        const { getByTestId } = render(<BrandColorPicker palettes={palettes} currentColor={currentColor} />);

        const paletteList = getByTestId(PALLETTE_LIST_TEST_ID);
        const firstPalette = paletteList.children[0];
        const firstColorButton = firstPalette.querySelector(`${COLOR_LIST_SELECTOR} li button`);
        const checkMarkIcon = firstColorButton?.querySelector('svg');

        expect(firstColorButton).toBeVisible();
        expect(checkMarkIcon).toBeVisible();
    });

    it('Should call onColorChange when color is clicked', async () => {
        const onColorChange = vi.fn();
        const { getByTestId } = render(<BrandColorPicker palettes={palettes} onColorChange={onColorChange} />);

        const paletteList = getByTestId(PALLETTE_LIST_TEST_ID);
        const firstPalette = paletteList.children[0];
        const firstColorButton = firstPalette.querySelector(`${COLOR_LIST_SELECTOR} li button`);

        await userEvent.click(firstColorButton as HTMLElement);

        expect(onColorChange).toHaveBeenCalledOnce();
    });

    it('Should navigate colors with keyboard and select color on Enter', async () => {
        const onColorChange = vi.fn();
        const { getByTestId } = render(<BrandColorPicker palettes={palettes} onColorChange={onColorChange} />);

        const paletteList = getByTestId(PALLETTE_LIST_TEST_ID);
        const firstPalette = paletteList.children[0];
        const firstColorButton = firstPalette.querySelector(`${COLOR_LIST_SELECTOR} li button`);

        expect(firstColorButton).toBeVisible();
        (firstColorButton as HTMLElement)?.focus();
        await userEvent.keyboard('{ArrowRight}');
        await userEvent.keyboard('{Enter}');

        expect(onColorChange).toHaveBeenCalledOnce();
    });

    it('Should navigate palettes with keyboard and select color on Enter', async () => {
        const onColorChange = vi.fn();
        const { getByTestId } = render(<BrandColorPicker palettes={palettes} onColorChange={onColorChange} />);

        const paletteList = getByTestId(PALLETTE_LIST_TEST_ID);
        const firstPalette = paletteList.children[0];
        const colorButtons = firstPalette.querySelectorAll(`${COLOR_LIST_SELECTOR} li button`);
        const firstColorButton = colorButtons[0];
        const secondColorButton = colorButtons[1];

        (firstColorButton as HTMLElement)?.focus();
        await userEvent.keyboard('{Tab}');
        await userEvent.keyboard('{Enter}');

        expect(onColorChange).toHaveBeenCalledOnce();
        expect(document.activeElement).toBe(secondColorButton);
    });
});

describe('ColorPreview', () => {
    it('Should render without crashing', () => {
        const { container } = render(<ColorPreview />);
        expect(container).toBeInTheDocument();
    });

    it('Should apply correct background color', () => {
        const color: RgbaColorWithName = { red: 255, green: 0, blue: 0, alpha: 1, name: 'Red' };
        const { container } = render(<ColorPreview color={color} />);
        const div = container.firstChild as HTMLElement;
        expect(div.style.background).toBe('rgb(255 0 0)');
    });

    it('Should handle undefined color', () => {
        const { container } = render(<ColorPreview color={undefined} />);
        const div = container.firstChild as HTMLElement;
        expect(div.style.background).toBe('');
    });

    it('Should handle color with no alpha value', () => {
        const color: RgbaColorWithName = { red: 0, green: 255, blue: 0, name: 'Green' };
        const { container } = render(<ColorPreview color={color} />);
        const div = container.firstChild as HTMLElement;
        expect(div.style.background).toBe('rgb(0 255 0)');
    });
});
