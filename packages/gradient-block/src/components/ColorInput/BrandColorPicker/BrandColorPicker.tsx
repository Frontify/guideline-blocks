/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SegmentedControl, TextInput } from '@frontify/fondue/components';
import { IconCheckMark, IconGridRegular, IconMagnifier, IconStackVertical } from '@frontify/fondue/icons';
import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';

import { type Palette, type RgbaColorWithName } from '../types';

import { areColorsEqual, fromGraphQLColorToCssColor, isColorLight, toRgbFunction } from './utils';

type BrandColorView = 'grid' | 'list';
type BrandColorPickerProps = {
    palettes?: Palette[];
    currentColor?: RgbaColorWithName;
    onColorChange?: (color: RgbaColorWithName) => void;
};

export const BrandColorPicker = ({
    currentColor,
    palettes = [],
    onColorChange = () => {},
    ...props
}: BrandColorPickerProps) => {
    const [view, setView] = useState<BrandColorView>('grid');
    const [filteredPalettes, setFilteredPalettes] = useState(palettes);

    const handleQueryChange = useCallback(
        // eslint-disable-next-line react-hooks/use-memo
        debounce((event: React.ChangeEvent<HTMLInputElement>) => {
            const query = event.target.value;
            setFilteredPalettes(
                palettes
                    .map((palette) => {
                        if (palette.title.toLowerCase().includes(query.toLowerCase())) {
                            return palette;
                        }
                        return {
                            ...palette,
                            colors: palette.colors.filter((color) =>
                                color.name?.toLowerCase().includes(query.toLowerCase())
                            ),
                        };
                    })
                    .filter((palette) => palette.colors.length > 0)
            );
        }, 200),
        [palettes, setFilteredPalettes]
    );

    return (
        <div
            className="tw-flex tw-flex-col tw-gap-4"
            data-picker-type="brand-color"
            data-test-id="brand-color-picker"
            {...props}
        >
            <div className="tw-flex tw-gap-2">
                <div className="tw-flex-1">
                    <TextInput.Root data-test-id="brand-color-picker_search" onChange={handleQueryChange}>
                        <TextInput.Slot name="left">
                            <IconMagnifier size={16} />
                        </TextInput.Slot>
                    </TextInput.Root>
                </div>

                <SegmentedControl.Root
                    onValueChange={(value) => {
                        setView(value as BrandColorView);
                    }}
                    defaultValue="grid"
                >
                    <SegmentedControl.Item value="grid" aria-label="Grid">
                        <IconGridRegular size={20} />
                    </SegmentedControl.Item>
                    <SegmentedControl.Item value="list" aria-label="List">
                        <IconStackVertical size={20} />
                    </SegmentedControl.Item>
                </SegmentedControl.Root>
            </div>
            <ul
                className="tw-flex tw-flex-col tw-gap-4"
                data-layout={view}
                data-test-id="brand-color-picker_palette-list"
            >
                {filteredPalettes.length > 0
                    ? filteredPalettes.map(({ id, title, colors }) =>
                          colors.length > 0 ? (
                              <li key={id} className="tw-flex tw-flex-col tw-gap-2">
                                  <span className="tw-text-sm tw-font-medium tw-text-text">{title}</span>
                                  <ul
                                      className="tw-grid tw-grid-cols-[repeat(auto-fill,1.5rem)] [[data-layout='list']_&]:tw-grid-cols-1 tw-gap-2"
                                      data-test-id="brand-color-picker_color-list"
                                  >
                                      {colors.map((color) => {
                                          return (
                                              <li key={color.name} data-test-id="brand-color">
                                                  <button
                                                      className="tw-flex tw-gap-4 tw-items-center"
                                                      onClick={() => onColorChange(color)}
                                                      type="button"
                                                      aria-label={`color value: ${color.name}`}
                                                  >
                                                      <span
                                                          className="tw-flex tw-items-center tw-justify-center tw-w-6 tw-aspect-square tw-rounded tw-ring-1 tw-ring-line tw-ring-offset-1"
                                                          style={{
                                                              background: toRgbFunction(
                                                                  fromGraphQLColorToCssColor({
                                                                      ...color,
                                                                      alpha: color.alpha ?? 1,
                                                                  })
                                                              ),
                                                              color: isColorLight(color)
                                                                  ? 'var(--text-color)'
                                                                  : 'var(--base-color)',
                                                          }}
                                                      >
                                                          {areColorsEqual(color, currentColor) && (
                                                              <IconCheckMark size={20} />
                                                          )}
                                                      </span>
                                                      {view === 'list' && (
                                                          <span className="tw-font-normal tw-text-text">
                                                              {color.name}
                                                          </span>
                                                      )}
                                                  </button>
                                              </li>
                                          );
                                      })}
                                  </ul>
                              </li>
                          ) : null
                      )
                    : 'No colors found'}
            </ul>
        </div>
    );
};
BrandColorPicker.displayName = 'ColorChooser.Brand';
