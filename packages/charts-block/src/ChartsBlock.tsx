/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useBlockSettings } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { toRgbaString } from '@frontify/guideline-blocks-shared';
import { FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { BlockBarChart } from './charts/Bar';
import { BlockLineChart } from './charts/Line';
import { BlockPieChart } from './charts/Pie';
import { DEFAULT_COLOR, HEIGHT_DEFAULT_VALUE } from './settings';
import { ChartType, ChartsBlockProps, Settings, chartHeightValues } from './types';

export const ChartsBlock: FC<ChartsBlockProps> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const [chartData, setChartData] = useState<string>('');

    const {
        type = ChartType.Bar,
        isHeightCustom = false,
        heightCustom = '',
        heightSimple = HEIGHT_DEFAULT_VALUE,
        color = DEFAULT_COLOR,
    } = blockSettings;

    const data = [
        { name: 'Page A', uv: 400 },
        { name: 'Page B', uv: 500 },
        { name: 'Page C', uv: 350 },
    ];

    useEffect(() => {
        const url = blockAssets.chartData?.shift()?.origin_url;
        if (url !== undefined) {
            fetch(url)
                .then((response) => response.text())
                .then((text) => setChartData(text));
        }
    }, [blockAssets, setChartData]);

    return (
        <div data-test-id="charts-block">
            {(() => {
                switch (type) {
                    case ChartType.Bar:
                        return (
                            <BlockBarChart
                                data={data}
                                height={isHeightCustom ? heightCustom : chartHeightValues[heightSimple]}
                                color={color ? toRgbaString(color) : toRgbaString(DEFAULT_COLOR)}
                            />
                        );
                    case ChartType.Line:
                        return (
                            <BlockLineChart
                                data={data}
                                height={isHeightCustom ? heightCustom : chartHeightValues[heightSimple]}
                                color={color ? toRgbaString(color) : toRgbaString(DEFAULT_COLOR)}
                            />
                        );
                    case ChartType.Pie:
                        return (
                            <BlockPieChart
                                data={data}
                                height={isHeightCustom ? heightCustom : chartHeightValues[heightSimple]}
                                color={color ? toRgbaString(color) : toRgbaString(DEFAULT_COLOR)}
                            />
                        );
                }
            })()}
        </div>
    );
};
