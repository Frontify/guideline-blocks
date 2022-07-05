/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { FC } from 'react';
import { ResponsiveContainer } from 'recharts';
import 'tailwindcss/tailwind.css';
import { BlockBarChart } from './charts/Bar';
import { ChartType, ChartsBlockProps, Settings } from './types';

export const ChartsBlock: FC<ChartsBlockProps> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const { type = ChartType.Bar } = blockSettings;

    const data = [
        { name: 'Page A', uv: 400 },
        { name: 'Page B', uv: 500 },
        { name: 'Page C', uv: 350 },
    ];

    return (
        <div data-test-id="carts-block">
            <ResponsiveContainer width="100%" height={600}>
                {(() => {
                    switch (type) {
                        case ChartType.Bar:
                            return <BlockBarChart data={data} />;
                        case ChartType.Line:
                            return <></>;
                        case ChartType.Pie:
                            return <></>;
                    }
                })()}
            </ResponsiveContainer>
        </div>
    );
};
