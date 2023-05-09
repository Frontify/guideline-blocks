/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiInputLayout } from '@frontify/fondue';
import { Choice, defineSettings, numericalOrPixelRule } from '@frontify/guideline-blocks-settings';
import { getBorderRadiusSettings, getBorderSettings } from '@frontify/guideline-blocks-shared';
import { radiusValues } from './types';

const HAS_BACKGROUND_ID = 'hasBackground';

export const DEFAULT_BACKGROUND_COLOR = { red: 255, green: 255, blue: 255, alpha: 1, name: 'White' };
export const DEFAULT_CHARS = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
];

const getFonts = async (projectId: number) => {
    const response = await fetch(`/api/project-font-family?project_id=${projectId}`);
    const responseJson = await response.json();
    return responseJson.data;
};

export const settings = defineSettings({
    basics: [
        {
            id: 'fontFamily',
            defaultValue: 'default',
            type: 'dropdown',
            choices: async ({ getAppBridge }): Promise<Choice[]> => {
                const appBridge = getAppBridge();
                const fontStyles = await getFonts(appBridge.getProjectId());

                const fonts = fontStyles.map((fontStyle: { name: string }) => {
                    return {
                        label: `${fontStyle.name}`,
                        value: fontStyle.name,
                    };
                });

                fonts.unshift({ label: 'Default', value: 'default' });

                return fonts.filter(
                    (font: { label: string; value: string }, index: number, self: any) =>
                        index === self.findIndex((t: { label: string; value: string }) => t.label === font.label)
                );
            },
        },
        {
            id: 'chars',
            type: 'textarea',
            label: 'Characters',
            defaultValue: DEFAULT_CHARS.join(','),
        },
    ],
    style: [
        {
            id: 'font',
            type: 'multiInput',
            label: 'Font',
            lastItemFullWidth: true,
            blocks: [
                {
                    id: 'fontWeight',
                    type: 'dropdown',
                    defaultValue: 'normal',
                    choices: [
                        {
                            value: 'normal',
                            label: 'Normal',
                        },
                        {
                            value: 'bold',
                            label: 'Bold',
                        },
                    ],
                },
                {
                    id: 'fontSize',
                    type: 'input',
                    defaultValue: '40px',
                    placeholder: 'e.g. 40px',
                    rules: [numericalOrPixelRule],
                    clearable: false,
                },
                {
                    id: 'color',
                    type: 'colorInput',
                },
            ],
            layout: MultiInputLayout.Columns,
        },
        {
            id: HAS_BACKGROUND_ID,
            type: 'switch',
            label: 'Background',
            defaultValue: false,
            on: [
                {
                    id: 'backgroundColor',
                    type: 'colorInput',
                    defaultValue: DEFAULT_BACKGROUND_COLOR,
                },
            ],
        },
        getBorderSettings({ defaultValue: true, defaultColor: { red: 0, green: 0, blue: 0, alpha: 1, name: 'Black' } }),
        getBorderRadiusSettings({
            id: 'cornerRadius',
            radiusStyleMap: radiusValues,
        }),
    ],
});
