/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { AppBridgeNative, useBlockSettings } from '@frontify/app-bridge';
import { Color } from '@frontify/arcade';
import { DividerAlignment, dividerAlignment, DividerStyle, dividerStyle } from './types';
import {
    ALIGNMENT_DEFAULT_VALUE,
    COLOR_DEFAULT_RGBA_VALUE,
    HEIGHT_DEFAULT_VALUE,
    STYLE_DEFAULT_VALUE,
    WIDTH_DEFAULT_VALUE,
} from './settings';

type Props = {
    appBridge: AppBridgeNative;
};

type Settings = {
    alignment?: DividerAlignment;
    style?: DividerStyle;
    isLine?: string;
    color?: Color;
    isWidthCustom?: boolean;
    widthCustom?: string;
    widthSimple?: string;
    isHeightCustom?: boolean;
    heightCustom?: string;
    heightSimple?: string;
    isThicknessCustom?: boolean;
    thicknessCustom?: string;
    thicknessSimple?: string;
};

const Divider: FC<Props> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    // TODO: replace with shared utility after PR passes: https://github.com/Frontify/guideline-blocks/pull/37
    const stringifyRGBA = (value: {}) => `rgba(${Object.values(value).join(', ')})`;

    return (
        <div className={`tw-flex ${dividerAlignment[blockSettings.alignment ?? ALIGNMENT_DEFAULT_VALUE]}`}>
            <div
                className="tw-flex tw-items-center tw-transition-all"
                style={{
                    width: blockSettings.isWidthCustom
                        ? blockSettings.widthCustom
                        : blockSettings.widthSimple ?? WIDTH_DEFAULT_VALUE,
                    height: blockSettings.isHeightCustom
                        ? blockSettings.heightCustom
                        : blockSettings.heightSimple ?? HEIGHT_DEFAULT_VALUE,
                }}
            >
                <hr
                    className={`tw-border-t tw-m-0 tw-w-full ${
                        blockSettings.isLine === DividerStyle.Solid || !blockSettings.isLine
                            ? dividerStyle[blockSettings.style ?? STYLE_DEFAULT_VALUE]
                            : dividerStyle[DividerStyle.NoLine]
                    }`}
                    style={{
                        borderTopWidth: blockSettings.isThicknessCustom
                            ? blockSettings.thicknessCustom
                            : blockSettings.thicknessSimple,
                        borderTopColor: blockSettings.color?.rgba
                            ? stringifyRGBA(blockSettings.color?.rgba)
                            : stringifyRGBA(COLOR_DEFAULT_RGBA_VALUE),
                    }}
                />
            </div>
        </div>
    );
};

export default Divider;
