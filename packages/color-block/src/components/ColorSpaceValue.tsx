/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FormEvent, useState } from 'react';
import { FrontifyColor, FrontifyColorPatch } from '@frontify/app-bridge';
import { merge } from '@frontify/fondue';

import { mapColorSpaces } from '../helpers/mapColorSpaces';
import { ColorBlockType, ColorSpaceInputValues } from '../types';

type ColorSpaceValueProps = {
    viewType: ColorBlockType;
    color: FrontifyColor;
    colorSpaceId: keyof ColorSpaceInputValues;
    onUpdate: (colorPatch: FrontifyColorPatch) => void;
};

export const ColorSpaceValue = ({ viewType, color, colorSpaceId, onUpdate }: ColorSpaceValueProps) => {
    const [colorSpaceInputValues, setColorSpaceInputValues] = useState<ColorSpaceInputValues>({
        cmykCoated: color.cmykCoated ?? '',
        cmykNewspaper: color.cmykNewspaper ?? '',
        cmykUncoated: color.cmykUncoated ?? '',
        hks: color.hks ?? '',
        lab: color.lab ?? '',
        ncs: color.ncs ?? '',
        oracal: color.oracal ?? '',
        pantoneCoated: color.pantoneCoated ?? '',
        pantoneCp: color.pantoneCp ?? '',
        pantonePlastics: color.pantonePlastics ?? '',
        pantoneTextile: color.pantoneTextile ?? '',
        pantoneUncoated: color.pantoneUncoated ?? '',
        pantone: color.pantone ?? '',
        ral: color.ral ?? '',
        threeM: color.threeM ?? '',
        variable: color.nameCss ?? '',
    });

    const handleColorSpaceValueChange = (event: FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;

        setColorSpaceInputValues((previousState) => ({ ...previousState, [name]: value }));
    };

    const mappedColorSpace = mapColorSpaces(colorSpaceId, color);

    return (
        <div
            className={merge([
                'tw-flex tw-items-center',
                viewType === ColorBlockType.List ? 'tw-h-5 tw-ml-3' : 'tw-h-4',
            ])}
        >
            {['CMYK', 'HEX', 'RGB'].includes(mappedColorSpace.label) ? (
                <div className="tw-text-s tw-text-black-80">
                    {mappedColorSpace.value || mappedColorSpace.placeholder}
                </div>
            ) : (
                <input
                    name={colorSpaceId}
                    className="tw-w-full tw-outline-none tw-text-s"
                    type="text"
                    value={colorSpaceInputValues[colorSpaceId]}
                    onChange={handleColorSpaceValueChange}
                    placeholder={mappedColorSpace.placeholder}
                    onBlur={(event) => {
                        onUpdate({
                            [mappedColorSpace.key || colorSpaceId]: event.target.value,
                        });
                    }}
                />
            )}
        </div>
    );
};
