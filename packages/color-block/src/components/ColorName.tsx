/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@frontify/fondue';
import { FocusEvent, FormEvent, useState } from 'react';
import { ColorBlockType } from '../types';

type ColorNameProps = {
    viewType: ColorBlockType;
    initialColorName: string;
    isEditing: boolean;
    onBlur: (event: FocusEvent<HTMLInputElement>) => void;
};

const nameWrapperClasses: Record<ColorBlockType, string> = {
    [ColorBlockType.List]: 'tw-flex tw-items-center tw-w-[100px] tw-py-4 tw-mr-12',
    [ColorBlockType.Drops]: 'tw-w-full tw-mb-3 tw-text-center',
    [ColorBlockType.Cards]: 'tw-w-full tw-mb-3',
};

export const ColorName = ({ viewType, initialColorName, isEditing, onBlur }: ColorNameProps) => {
    const [colorName, setColorName] = useState<string>(initialColorName);
    const handleColorNameChange = (event: FormEvent<HTMLInputElement>) => setColorName(event.currentTarget.value);

    return (
        <div className={merge(['tw-text-m tw-text-black tw-font-bold', nameWrapperClasses[viewType]])}>
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
                />
            ) : (
                <div title={colorName} className="tw-overflow-hidden tw-whitespace-nowrap tw-overflow-ellipsis">
                    {colorName}
                </div>
            )}
        </div>
    );
};
