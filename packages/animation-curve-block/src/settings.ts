/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineSettings } from '@frontify/guideline-blocks-settings';
import {
    Radius,
    getBackgroundSettings,
    getBorderRadiusSettings,
    getBorderSettings,
    getGutterSettings,
} from '@frontify/guideline-blocks-shared';

const COLUMNS_ID = 'columns';
const LINE_COLOR_ID = 'lineColor';
const END_POINTS_ID = 'hasEndpoints';
const END_POINTS_COLOR_ID = 'endpointsColor';
const GRID_ID = 'hasGrid';
const GRID_COLOR_ID = 'gridColor';
const MOTION_ID = 'hasMotion';

export const settings = defineSettings({
    layout: [
        {
            id: 'itemsLayout',
            type: 'sectionHeading',
            label: 'Items',
            blocks: [
                {
                    id: COLUMNS_ID,
                    label: 'Columns',
                    type: 'slider',
                    defaultValue: 3,
                    choices: [
                        {
                            value: 1,
                            label: '1',
                        },
                        {
                            value: 2,
                            label: '2',
                        },
                        {
                            value: 3,
                            label: '3',
                        },
                        {
                            value: 4,
                            label: '4',
                        },
                    ],
                },
                getGutterSettings(),
            ],
        },
        {
            id: 'dataLayout',
            type: 'sectionHeading',
            label: 'Data',
            blocks: [
                {
                    id: 'hasParameter',
                    label: 'Parameter',
                    type: 'switch',
                    defaultValue: true,
                },
                {
                    id: 'hasDuration',
                    label: 'Duration',
                    type: 'switch',
                    defaultValue: true,
                },
                {
                    id: 'displayCss',
                    label: 'Show CSS code',
                    type: 'switch',
                    defaultValue: false,
                },
            ],
        },
    ],
    style: [
        getBackgroundSettings({ defaultValue: true }),
        getBorderSettings(),
        getBorderRadiusSettings({ defaultRadius: Radius.Medium }),
        {
            id: LINE_COLOR_ID,
            label: 'Line',
            type: 'colorInput',
            defaultValue: { red: 45, green: 50, blue: 50, alpha: 1 },
        },
        {
            id: END_POINTS_ID,
            type: 'switch',
            defaultValue: true,
            label: 'End Points',
            on: [
                {
                    id: END_POINTS_COLOR_ID,
                    type: 'colorInput',
                    defaultValue: { red: 45, green: 50, blue: 50, alpha: 1 },
                },
            ],
        },
        {
            id: GRID_ID,
            type: 'switch',
            defaultValue: false,
            label: 'Grid',
            on: [
                {
                    id: GRID_COLOR_ID,
                    type: 'colorInput',
                    defaultValue: { red: 153, green: 153, blue: 153, alpha: 1 },
                },
            ],
        },
        {
            id: MOTION_ID,
            type: 'switch',
            defaultValue: false,
            label: 'Motion',
            info: 'Hover over the curve to see it animated.',
        },
    ],
});
