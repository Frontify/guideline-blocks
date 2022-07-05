/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockAssets, useBlockSettings } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { toRgbaString } from '@frontify/guideline-blocks-shared';
import { FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { BlockBarChart } from './charts/Bar';
import { BlockLineChart } from './charts/Line';
import { BlockPieChart } from './charts/Pie';
import { DEFAULT_BAR_COLOR, DEFAULT_LABEL_COLOR, HEIGHT_DEFAULT_VALUE } from './settings';
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
        color = DEFAULT_BAR_COLOR,
        labelColor = DEFAULT_LABEL_COLOR,
    } = blockSettings;

    const headers = chartData ? chartData.split('\n')[0].split(',') : [];
    const lines = chartData
        ?.split('\n')
        ?.slice(1)
        ?.map((row) => {
            return row?.split(',')[0];
        });
    const parsedData = chartData
        ?.split('\n')
        ?.slice(1)
        ?.map((row) => {
            return row
                ?.split(',')
                ?.slice(1)
                ?.map((value) => parseInt(value));
        });

    const data = chartData
        ? headers.map((header, index) => {
              const displayData = { name: header };
              for (let i = 0; i < lines.length; i++) {
                  displayData[lines[i]] = parsedData[i][index];
              }
              return displayData;
          })
        : [];

    debugger;

    useEffect(() => {
        const url = blockAssets.chartData?.shift()?.origin_url;
        if (url !== undefined) {
            fetch(url)
                .then((response) => response.text())
                .then((text) => setChartData(text));
        }
    }, [blockAssets, setChartData]);

    return (
        <>
            {data.length > 0 ? (
                <div data-test-id="charts-block">
                    {(() => {
                        switch (type) {
                            case ChartType.Bar:
                                return (
                                    <BlockBarChart
                                        data={data}
                                        height={isHeightCustom ? heightCustom : chartHeightValues[heightSimple]}
                                        color={color ? toRgbaString(color) : toRgbaString(DEFAULT_BAR_COLOR)}
                                        labelColor={
                                            labelColor ? toRgbaString(labelColor) : toRgbaString(DEFAULT_LABEL_COLOR)
                                        }
                                        lines={lines}
                                    />
                                );
                            case ChartType.Line:
                                return (
                                    <BlockLineChart
                                        data={data}
                                        height={isHeightCustom ? heightCustom : chartHeightValues[heightSimple]}
                                        color={color ? toRgbaString(color) : toRgbaString(DEFAULT_BAR_COLOR)}
                                        labelColor={
                                            labelColor ? toRgbaString(labelColor) : toRgbaString(DEFAULT_LABEL_COLOR)
                                        }
                                        lines={lines}
                                    />
                                );
                            case ChartType.Pie:
                                return (
                                    <BlockPieChart
                                        data={data}
                                        height={isHeightCustom ? heightCustom : chartHeightValues[heightSimple]}
                                        color={color ? toRgbaString(color) : toRgbaString(DEFAULT_BAR_COLOR)}
                                        labelColor={
                                            labelColor ? toRgbaString(labelColor) : toRgbaString(DEFAULT_LABEL_COLOR)
                                        }
                                        line={lines[0]}
                                    />
                                );
                        }
                    })()}
                </div>
            ) : (
                <div className="tw-text-center tw-bg-box-negative tw-p-9">
                    Please upload a CSV to show awesome charts!
                </div>
            )}
        </>
    );
};
