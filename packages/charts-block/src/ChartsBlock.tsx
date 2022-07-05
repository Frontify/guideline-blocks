/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { ChartType, ChartsBlockProps, Settings } from './types';

export const ChartsBlock: FC<ChartsBlockProps> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const { type = ChartType.Bar } = blockSettings;

    return <div data-test-id="carts-block">Charts block with type {type}!</div>;
};
