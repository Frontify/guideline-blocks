/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings } from '@frontify/app-bridge';
import { joinClassNames, mapRgbaToString } from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import {
    ALIGNMENT_DEFAULT_VALUE,
    COLOR_DEFAULT_RGBA_VALUE,
    HEIGHT_DEFAULT_VALUE,
    STYLE_DEFAULT_VALUE,
    THICKNESS_DEFAULT_VALUE,
    WIDTH_DEFAULT_VALUE,
} from './settings';
import {
    dividerAlignmentMap,
    dividerHeightMap,
    DividerStyle,
    dividerStyleMap,
    dividerThicknessMap,
    Props,
    Settings,
} from './types';

const Divider: FC<Props> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const {
        isLine = DividerStyle.Solid,
        alignment = ALIGNMENT_DEFAULT_VALUE,
        style = STYLE_DEFAULT_VALUE,
        color = COLOR_DEFAULT_RGBA_VALUE,
        isWidthCustom = false,
        widthCustom = '',
        widthSimple = WIDTH_DEFAULT_VALUE,
        isHeightCustom = false,
        heightCustom = '',
        heightSimple = HEIGHT_DEFAULT_VALUE,
        isThicknessCustom = false,
        thicknessCustom = '',
        thicknessSimple = THICKNESS_DEFAULT_VALUE,
    } = blockSettings;

    return (
        <div className={joinClassNames(['tw-flex', dividerAlignmentMap[alignment]])}>
            <div
                className="tw-flex tw-items-center tw-transition-all"
                style={{
                    width: isWidthCustom ? widthCustom : widthSimple,
                    height: isHeightCustom ? heightCustom : dividerHeightMap[heightSimple],
                }}
            >
                <hr
                    className={joinClassNames([
                        'tw-border-t tw-m-0 tw-w-full',
                        dividerStyleMap[isLine === DividerStyle.Solid ? style : DividerStyle.NoLine],
                    ])}
                    style={{
                        borderTopWidth: isThicknessCustom ? thicknessCustom : dividerThicknessMap[thicknessSimple],
                        borderTopColor: color.rgba ? mapRgbaToString(color.rgba) : color.hex,
                    }}
                />
            </div>
        </div>
    );
};

export default Divider;
