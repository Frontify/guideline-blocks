/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useState } from 'react';
import '@frontify/fondue-tokens/styles';
import { useBlockSettings } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { Divider, DividerStyle } from '@frontify/fondue';
import 'tailwindcss/tailwind.css';
import { Settings, gradientHeightValues } from './types';
import { HEIGHT_DEFAULT_VALUE } from './settings';

export const GradientBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const [gradientColors, setGradientColors] = useState([
        {
            hex: '#243c5a',
            position: '0%',
        },
        {
            hex: '#d717cb',
            position: '25.43%',
        },
        {
            hex: '#176cd7',
            position: '80.11%',
        },
    ]);

    const height = blockSettings.isHeightCustom
        ? blockSettings.heightCustom
        : gradientHeightValues[blockSettings.heightSimple ?? HEIGHT_DEFAULT_VALUE];

    return (
        <div data-test-id="gradient-block">
            <div
                className="tw-bg-gradient-to-r tw-from-[#243c5a] tw-via-[#d717cb_25.43%] tw-to-[#176cd7_80.11%] tw-w-full tw-h-4"
                style={{
                    height,
                }}
            >
                slider
            </div>
            <Divider height="36px" style={DividerStyle.Solid} />
        </div>
    );
};
