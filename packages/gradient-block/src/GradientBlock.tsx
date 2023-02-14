/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { useBlockSettings } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { FC } from 'react';
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

    return (
        <div data-test-id="gradient-block">
            <div className={`${colorTailwindMap[blockSettings.color]} tw-bg-black-10 tw-h-20`}>gradient box</div>
        </div>
    );
};
