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
                    icon: IconEnum.ListBullet,
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
                    id: 'cmykCoated',
                    label: 'CMYK Coated',
                },
                {
                    id: 'cmykUncoated',
                    label: 'CMYK Uncoated',
                },
                {
                    id: 'cmykNewspaper',
                    label: 'CMYK Newspaper',
                },
                {
                    id: 'pantone',
                    label: 'Pantone',
                },
                {
                    id: 'pantoneCoated',
                    label: 'Pantone Coated',
                },
                {
                    id: 'pantoneUncoated',
                    label: 'Pantone Uncoated',
                },
                {
                    id: 'pantoneCp',
                    label: 'Pantone CP',
                },
                {
                    id: 'pantoneTextile',
                    label: 'Pantone Textile',
                },
                {
                    id: 'pantonePlastics',
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
                    id: 'threeM',
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
                const colorSpacesValue = bundle?.getBlock('colorspaces')?.value as string[];

                return !colorSpacesValue || colorSpacesValue?.length === 0;
            },
        },
    ],
};
