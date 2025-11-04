/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ColorInputContent } from './ColorInputContent';
import { type RgbaColorWithName } from './types';

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

const currentColor = { red: 255, green: 0, blue: 0, alpha: 1, name: 'Red' };

describe('ColorInputContent', () => {
    it('renders brand color picker by default', () => {
        render(<ColorInputContent palettes={palettes} currentColor={currentColor} onColorChange={vi.fn()} />);
        expect(screen.getByLabelText('ColorPickerComponent_Brand')).toBeInTheDocument();
        expect(screen.getByLabelText('ColorPickerComponent_Custom')).toBeInTheDocument();
        expect(screen.getByText('Palette 1')).toBeInTheDocument();
    });

    it('switches to custom color picker', () => {
        render(<ColorInputContent palettes={palettes} currentColor={currentColor} onColorChange={vi.fn()} />);
        fireEvent.click(screen.getByLabelText('ColorPickerComponent_Custom'));
        expect(screen.getByText('HEX')).toBeInTheDocument();
    });

    it('should only show brand color picker', () => {
        render(
            <ColorInputContent
                palettes={palettes}
                currentColor={currentColor}
                onColorChange={vi.fn()}
                showPicker="brand"
            />
        );
        expect(screen.queryByLabelText('ColorPickerComponent_Brand')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('ColorPickerComponent_Custom')).not.toBeInTheDocument();
        expect(screen.getByTestId('brand-color-picker')).toBeInTheDocument();
    });

    it('should only show custom color picker', () => {
        render(
            <ColorInputContent
                palettes={palettes}
                currentColor={currentColor}
                onColorChange={vi.fn()}
                showPicker="custom"
            />
        );
        expect(screen.queryByLabelText('ColorPickerComponent_Brand')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('ColorPickerComponent_Custom')).not.toBeInTheDocument();
        expect(screen.getByTestId('color-picker-value-input')).toBeInTheDocument();
    });
});
