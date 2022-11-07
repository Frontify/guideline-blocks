/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FormEvent, useState } from 'react';
import { merge } from '@frontify/fondue';

import { ColorBlockType, ColorNameProps } from '../types';

const nameWrapperClasses: Record<ColorBlockType, string> = {
    [ColorBlockType.List]: 'tw-flex tw-items-center tw-w-[100px] tw-py-4 tw-mr-12',
    [ColorBlockType.Drops]: 'tw-w-full tw-text-center',
    [ColorBlockType.Cards]: 'tw-w-full',
};

export const ColorName = ({ viewType, initialColorName, isEditing, onBlur }: ColorNameProps) => {
    const [colorName, setColorName] = useState<string>(initialColorName);
    const handleColorNameChange = (event: FormEvent<HTMLInputElement>) => setColorName(event.currentTarget.value);

    return (
        <div
            data-test-id="color-name"
            className={merge(['tw-text-m tw-text-black tw-font-bold', nameWrapperClasses[viewType]])}
        >
            {isEditing ? (
                <input
                    className={merge([
                        'tw-w-full tw-outline-none focus:tw-outline',
                        viewType === 'drops' ? 'tw-text-center' : '',
                    ])}
                    type="text"
                    value={colorName}
                    onChange={handleColorNameChange}
                    onBlur={onBlur}
                    draggable={true}
                    onDragStart={(event) => event.preventDefault()}
                />
            ) : (
                <div title={colorName} className="tw-overflow-hidden tw-whitespace-nowrap tw-overflow-ellipsis">
                    {colorName}
                </div>
            )}
        </div>
    );
};
