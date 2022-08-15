/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum } from '@frontify/fondue';
import { BlockSettings, Bundle, NotificationStyleType } from '@frontify/guideline-blocks-settings';

export const settings: BlockSettings = {
    main: [
        {
            id: 'view',
            type: 'dropdown',
            defaultValue: 'cards',
            size: DropdownSize.Large,
            choices: [
                {
                    value: 'list',
                    icon: IconEnum.ListBullets,
                    label: 'List',
                },
                {
                    value: 'drops',
                    icon: IconEnum.Drops,
                    label: 'Drops',
                },
                {
                    value: 'cards',
                    icon: IconEnum.Card,
                    label: 'Cards',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'colorspaces',
            type: 'checklist',
            defaultValue: ['hex', 'rgb'],
            label: 'Color Spaces',
            choices: [
                {
                    id: 'hex',
                    label: 'HEX',
                },
                {
                    id: 'rgb',
                    label: 'RGB',
                },
                {
                    id: 'cmyk',
                    label: 'CMYK',
                    tooltip: {
                        content:
                            'We automatically convert color values to CMYK. \n These values might differ, depending on what color profile you use. \n You can always change the values manually here.',
                    },
                },
                {
                    id: 'cmyk_coated',
                    label: 'CMYK Coated',
                },
                {
                    id: 'cmyk_uncoated',
                    label: 'CMYK Uncoated',
                },
                {
                    id: 'cmyk_newspaper',
                    label: 'CMYK Newspaper',
                },
                {
                    id: 'pantone',
                    label: 'Pantone',
                },
                {
                    id: 'pantone_coated',
                    label: 'Pantone Coated',
                },
                {
                    id: 'pantone_uncoated',
                    label: 'Pantone Uncoated',
                },
                {
                    id: 'pantone_cp',
                    label: 'Pantone CP',
                },
                {
                    id: 'pantone_textile',
                    label: 'Pantone Textile',
                },
                {
                    id: 'pantone_plastics',
                    label: 'Pantone Plastics',
                },
                {
                    id: 'ral',
                    label: 'RAL',
                },

                {
                    id: 'variable',
                    label: 'SCSS/LESS',
                },
                {
                    id: 'lab',
                    label: 'LAB',
                },
                {
                    id: 'ncs',
                    label: 'NCS',
                },

                {
                    id: 'hks',
                    label: 'HKS',
                },
                {
                    id: 'three_m',
                    label: '3M',
                },
                {
                    id: 'oracal',
                    label: 'Oracal',
                },
            ],
            showClearAndSelectAllButtons: true,
            columns: 2,
        },
        {
            id: 'colorspacesInfo',
            type: 'notification',
            title: 'If there is no Color Space selected, viewers might miss some information or the Block could lack visual appeal.',
            styles: {
                type: NotificationStyleType.Warning,
            },
            show: (bundle: Bundle) => {
                const colorSpacesValue = bundle.getBlock('colorspaces')?.value;

                return !colorSpacesValue || (colorSpacesValue as string[]).length === 0;
            },
        },
    ],
};
