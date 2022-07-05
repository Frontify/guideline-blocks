/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum } from '@frontify/fondue';
import { BlockSettings } from '@frontify/guideline-blocks-settings';
import { ChartType } from './types';

const settings: BlockSettings = {
    main: [
        {
            id: 'type',
            type: 'dropdown',
            defaultValue: ChartType.Line,
            size: DropdownSize.Large,
            choices: [
                {
                    value: ChartType.Line,
                    icon: IconEnum.Lines,
                    label: 'Line Chart',
                },
                {
                    value: ChartType.Bar,
                    icon: IconEnum.ChartBars,
                    label: 'Bar Chart',
                },
                {
                    value: ChartType.Pie,
                    icon: IconEnum.ChartPie,
                    label: 'Pie Chart',
                },
            ],
        },
        {
            id: 'chartData',
            label: 'Chart Data',
            type: 'assetInput',
        },
    ],
    layout: [],
    style: [],
};

export default settings;
