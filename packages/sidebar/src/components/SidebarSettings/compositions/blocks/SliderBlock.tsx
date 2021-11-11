/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import { FormControl, IconEnum, IconItem, Slider, TextOrNumberItem, iconsMap } from '@frontify/arcade';
import { UpdateDataFunction } from '../../hocs/withSettings';
import { SliderBlock as SliderBlockType } from '../../hooks/useSettings';

export type SliderBlockProps = {
    block: SliderBlockType;
    onUpdate: UpdateDataFunction<SliderBlockType['value']>;
};

export const SliderBlock: FC<SliderBlockProps> = ({ block, onUpdate }) => {
    const allChoicesHaveAnIcon = block.choices.every((choice) => choice.icon);
    const isValidChoice = (value?: string) => {
        const isValid = block.choices.some((choice) => choice.value === value);
        !isValid && console.warn('The value is not part of the slider, fallback to the default value.');
        return isValid;
    };
    const items = allChoicesHaveAnIcon
        ? block.choices.map(
              ({ icon, label, value }): IconItem => ({
                  ariaLabel: label,
                  icon: icon ? iconsMap[icon] : iconsMap[IconEnum.Minus],
                  id: value,
              })
          )
        : block.choices.map(
              ({ value, label }): TextOrNumberItem => ({
                  id: value,
                  value: label,
              })
          );

    return (
        <FormControl
            label={{
                children: block.label,
                htmlFor: block.id,
                tooltip: block.info ? { content: block.info } : undefined,
            }}
            helper={{ text: block.helperText || '' }}
        >
            <div data-test-id="settings-sidebar-slider-block">
                <Slider
                    id={block.id}
                    key={block.id}
                    items={items}
                    activeItemId={isValidChoice(block.value) && block.value ? block.value : block.defaultValue}
                    onChange={(id) => onUpdate(block.id, id)}
                />
            </div>
        </FormControl>
    );
};
