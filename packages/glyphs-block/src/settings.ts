/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type Choice,
    appendUnit,
    defineSettings,
    getBorderRadiusSettings,
    getBorderSettings,
    numericalOrPixelRule,
} from '@frontify/guideline-blocks-settings';

import { getFontWeights, getFonts } from './helpers';

export const DEFAULT_CHARS =
    'Aa, Bb, Cc, Dd, Ee, Ff, Gg, Hh, Ii, Jj, Kk, Ll, Mm, Nn, Oo, Pp, Qq, Rr, Ss, Tt, Uu, Vv, Ww, Xx, Yy, Zz, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9';

export const BLACK_COLOR = { red: 0, green: 0, blue: 0, alpha: 1, name: 'Black' };
export const WHITE_COLOR = { red: 255, green: 255, blue: 255, alpha: 1, name: 'White' };

const HAS_BACKGROUND_ID = 'hasBackground';
const FONT_FAMILY_ID = 'fontFamily';
const FONT_SIZE_ID = 'fontSize';

export const settings = defineSettings({
    basics: [
        {
            id: FONT_FAMILY_ID,
            defaultValue: 'inherit',
            type: 'dropdown',
            label: 'Family',
            info: 'Select a font family from the project.',
            choices: async ({ getAppBridge }): Promise<Choice[]> => {
                const appBridge = getAppBridge();
                const fonts = await getFonts(appBridge.getProjectId());
                fonts.unshift({ label: 'Default', value: 'inherit' });
                return fonts;
            },
        },
        {
            id: 'chars',
            type: 'textarea',
            label: 'Characters',
            defaultValue: DEFAULT_CHARS,
            placeholder: 'e.g. A,B,C',
            info: 'Add characters with a comma between them.',
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
                    choices: async (bundle): Promise<Choice[]> => {
                        const appBridge = bundle.getAppBridge();
                        const selectedFont = bundle.getBlock(FONT_FAMILY_ID)?.value as string;
                        const fontWeights = await getFontWeights(appBridge.getProjectId(), selectedFont);
                        fontWeights.unshift({ label: 'Normal', value: 'normal' });
                        return fontWeights;
                    },
                },
                {
                    id: FONT_SIZE_ID,
                    type: 'input',
                    defaultValue: '40px',
                    placeholder: 'e.g. 40px',
                    rules: [numericalOrPixelRule],
                    onChange: (bundle) => appendUnit(bundle, FONT_SIZE_ID),
                    clearable: false,
                },
                {
                    id: 'fontColor',
                    type: 'colorInput',
                    defaultValue: BLACK_COLOR,
                },
            ],
            layout: 'columns',
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
                    defaultValue: WHITE_COLOR,
                },
            ],
        },
        getBorderSettings({ defaultValue: true, defaultColor: BLACK_COLOR }),
        getBorderRadiusSettings(),
    ],
});
