/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useBlockSettings } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { BlockBarChart } from './charts/Bar';
import { ChartType, ChartsBlockProps, Settings } from './types';
import { ResponsiveContainer } from 'recharts';

export const ChartsBlock: FC<ChartsBlockProps> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const [chartData, setChartData] = useState<string>('');

    const { type = ChartType.Bar } = blockSettings;

    const data = [
        { name: 'Page A', uv: 400 },
        { name: 'Page B', uv: 500 },
        { name: 'Page C', uv: 350 },
    ];

    console.log({ chartData });

    useEffect(() => {
        const url = blockAssets.chartData?.shift()?.origin_url;
        if (url !== undefined) {
            fetch(url)
                .then((response) => response.text())
                .then((text) => setChartData(text));
        }
    }, [blockAssets, setChartData]);

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
