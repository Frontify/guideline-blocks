/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { AppBridgeNative, useBlockSettings } from '@frontify/app-bridge';
import { DividerAlignment, dividerAlignment, DividerStyle, dividerStyle } from './types';

type Props = {
    appBridge: AppBridgeNative;
};

type Settings = {
    alignment: DividerAlignment;
    style: DividerStyle;
    isLine: string;
    color: string;
    isWidthCustom: boolean;
    widthCustom: string;
    widthSimple: string;
    isHeightCustom: boolean;
    heightCustom: string;
    heightSimple: string;
    isThicknessCustom: boolean;
    thicknessCustom: string;
    thicknessSimple: string;
};

const Divider: FC<Props> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    return (
        <div className={`tw-flex ${dividerAlignment[blockSettings.alignment]}`}>
            <div
                className="tw-flex tw-items-center tw-transition-all"
                style={{
                    width: blockSettings.isWidthCustom ? blockSettings.widthCustom : blockSettings.widthSimple,
                    height: blockSettings.isHeightCustom ? blockSettings.heightCustom : blockSettings.heightSimple,
                }}
            >
                <hr
                    className={`tw-border-t tw-m-0 tw-w-full ${
                        blockSettings.isLine === DividerStyle.Solid
                            ? dividerStyle[blockSettings.style]
                            : dividerStyle[DividerStyle.NoLine]
                    }`}
                    style={{
                        borderTopWidth: blockSettings.isThicknessCustom
                            ? blockSettings.thicknessCustom
                            : blockSettings.thicknessSimple,
                        borderTopColor: blockSettings.color ? blockSettings.color : '#CCC',
                    }}
                />
            </div>
        </div>
    );
};

export default Divider;
