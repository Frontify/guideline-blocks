/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FormEvent, useState } from 'react';
import { Color, ColorPatch } from '@frontify/app-bridge';
import { IconExclamationMarkTriangle, IconSize, TooltipIcon, merge } from '@frontify/fondue';

import { mapColorSpaces } from '../helpers/mapColorSpaces';
import { ColorBlockType, ColorSpaceLabels, ColorSpaceValues } from '../types';

type ColorSpaceValueProps = {
    viewType: ColorBlockType;
    color: Color;
    colorSpaceId: keyof ColorSpaceValues;
    onUpdate: (colorPatch: ColorPatch) => void;
};

export const ColorSpaceValue = ({ viewType, color, colorSpaceId, onUpdate }: ColorSpaceValueProps) => {
    const [ColorSpaceValues, setColorSpaceValues] = useState<ColorSpaceValues>({
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

        setColorSpaceValues((previousState) => ({ ...previousState, [name]: value }));
    };

    const mappedColorSpace = mapColorSpaces(colorSpaceId, color);

    return (
        <div
            className={merge([
                'tw-flex tw-items-center',
                viewType === ColorBlockType.List ? 'tw-h-5 tw-ml-3' : 'tw-h-4',
            ])}
        >
            {[ColorSpaceLabels.Cmyk, ColorSpaceLabels.Hex, ColorSpaceLabels.Rgb].includes(mappedColorSpace.label) ? (
                <div className="tw-text-s tw-text-black-80">
                    {mappedColorSpace.value || mappedColorSpace.placeholder}
                </div>
            ) : (
                <div className="tw-flex tw-items-center">
                    <input
                        name={colorSpaceId}
                        className="tw-w-full tw-mr-1 tw-outline-none tw-text-s"
                        type="text"
                        value={ColorSpaceValues[colorSpaceId]}
                        onChange={handleColorSpaceValueChange}
                        placeholder={mappedColorSpace.placeholder}
                        onBlur={(event) => {
                            onUpdate({
                                [mappedColorSpace.key || colorSpaceId]: event.target.value,
                            });
                        }}
                    />

                    <TooltipIcon
                        tooltip={{
                            content:
                                'There is no automatic conversion for this color space. Please enter the value manually.',
                        }}
                        triggerIcon={<IconExclamationMarkTriangle />}
                        iconSize={IconSize.Size12}
                    />
                </div>
            )}
        </div>
    );
};
