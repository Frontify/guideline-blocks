/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum, MultiInputLayout } from '@frontify/fondue';
import type { BlockSettings, Choice } from '@frontify/guideline-blocks-settings';
import { numericalOrPixelRule } from './utilities/rules/numericalOrPixelRule';

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
export const DEFAULT_FONT_WEIGHT = 'normal';
export const DEFAULT_FONT_SIZE = '40px';
export const DEFAULT_FONT_FAMILY = 'default';
export const DEFAULT_BORDER_STYLE = 'solid';
export const DEFAULT_BORDER_WIDTH = '1px';
export const DEFAULT_BORDER_COLOR = { red: 0, green: 0, blue: 0, alpha: 1, name: 'Black' };
export const DEFAULT_COLOR = { red: 0, green: 0, blue: 0, alpha: 1, name: 'Black' };
export const FULL_WIDTH = '100%';

const getFonts = async (projectId: number) => {
    const response = await fetch(`/api/project-font-family?project_id=${projectId}`);
    const responseJson = await response.json();
    return responseJson.data;
};

export const settings: BlockSettings = {
    main: [
        {
            id: 'type',
            type: 'dropdown',
            defaultValue: 'grid',
            size: DropdownSize.Large,
            disabled: true,
            choices: [
                {
                    value: 'grid',
                    icon: IconEnum.GridRegular,
                    label: 'Grid',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'fontFamily',
            defaultValue: DEFAULT_FONT_FAMILY,
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
            type: 'input',
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
                    defaultValue: DEFAULT_FONT_WEIGHT,
                    size: DropdownSize.Small,
                    choices: [
                        {
                            value: 'normal',
                            label: 'Normal',
                        },
                        {
                            value: 'bold',
                            label: 'Bold',
                        },
                        {
                            value: '100',
                            label: '100',
                        },
                        {
                            value: '200',
                            label: '200',
                        },
                        {
                            value: '300',
                            label: '300',
                        },
                        {
                            value: '400',
                            label: '400',
                        },
                        {
                            value: '500',
                            label: '500',
                        },
                        {
                            value: '600',
                            label: '600',
                        },
                        {
                            value: '700',
                            label: '700',
                        },
                        {
                            value: '800',
                            label: '800',
                        },
                        {
                            value: '900',
                            label: '900',
                        },
                    ],
                },
                {
                    id: 'fontSize',
                    type: 'input',
                    defaultValue: DEFAULT_FONT_SIZE,
                    placeholder: 'e.g. 40px',
                    rules: [numericalOrPixelRule],
                    clearable: false,
                },
                {
                    id: 'color',
                    type: 'colorInput',
                    defaultValue: DEFAULT_COLOR,
                },
            ],
            layout: MultiInputLayout.Columns,
        },
        {
            id: 'backgroundColor',
            label: 'Background',
            type: 'colorInput',
            defaultValue: DEFAULT_BACKGROUND_COLOR,
        },
        {
            id: 'border',
            type: 'multiInput',
            label: 'Border',
            lastItemFullWidth: true,
            blocks: [
                {
                    id: 'borderStyle',
                    type: 'dropdown',
                    defaultValue: DEFAULT_BORDER_STYLE,
                    size: DropdownSize.Small,
                    choices: [
                        {
                            value: 'dotted',
                            label: 'Dotted',
                        },
                        {
                            value: 'dashed',
                            label: 'Dashed',
                        },
                        {
                            value: 'solid',
                            label: 'Solid',
                        },
                    ],
                },
                {
                    id: 'borderWidth',
                    type: 'input',
                    defaultValue: DEFAULT_BORDER_WIDTH,
                    placeholder: 'e.g. 2px',
                    rules: [numericalOrPixelRule],
                    clearable: false,
                },
                {
                    id: 'borderColor',
                    type: 'colorInput',
                    defaultValue: DEFAULT_BORDER_COLOR,
                },
            ],
            layout: MultiInputLayout.Columns,
        },
    ],
};
