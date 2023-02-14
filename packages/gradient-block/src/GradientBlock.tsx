/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useState } from 'react';
import '@frontify/fondue-tokens/styles';
import { useBlockSettings } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { Divider, DividerStyle } from '@frontify/fondue';
import 'tailwindcss/tailwind.css';

type Settings = {
    color: 'violet' | 'blue' | 'green' | 'red';
};

const colorTailwindMap: Record<Settings['color'], string> = {
    violet: 'tw-text-[rgb(113,89,215)]',
    blue: 'tw-text-blue-600',
    green: 'tw-text-green-600',
    red: 'tw-text-red-600',
};

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

    return (
        <div data-test-id="gradient-block">
            <div className={`${colorTailwindMap[blockSettings.color]} tw-bg-black-10 tw-h-20`}>gradient box</div>
            <div className="tw-bg-gradient-to-r tw-from-[#243c5a] tw-via-[#d717cb_25.43%] tw-to-[#176cd7_80.11%] tw-w-full tw-h-4">
                slider
            </div>
            <Divider height="36px" style={DividerStyle.Solid} />
        </div>
    );
};
