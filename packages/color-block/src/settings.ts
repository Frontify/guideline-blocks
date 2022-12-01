/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum, NotificationStyleType, defineSettings } from '@frontify/guideline-blocks-settings';
import { ColorSpaceLabels } from './types';

const COLORSPACES_ID = 'colorspaces';

const COLORSPACES = [
    {
        id: 'hex',
        label: ColorSpaceLabels.Hex,
    },
    {
        id: 'rgb',
        label: ColorSpaceLabels.Rgb,
    },
    {
        id: 'cmyk',
        label: ColorSpaceLabels.Cmyk,
        tooltip: {
            content:
                'We automatically convert color values to CMYK.\nThese values might differ, depending on what color profile you use.\nYou can always change the values manually here.',
        },
    },
    {
        id: 'cmykCoated',
        label: ColorSpaceLabels.CmykC,
    },
    {
        id: 'cmykUncoated',
        label: ColorSpaceLabels.CmykU,
    },
    {
        id: 'cmykNewspaper',
        label: ColorSpaceLabels.CmykN,
    },
    {
        id: 'pantone',
        label: ColorSpaceLabels.Pms,
    },
    {
        id: 'pantoneCoated',
        label: ColorSpaceLabels.PmsC,
    },
    {
        id: 'pantoneUncoated',
        label: ColorSpaceLabels.PmsU,
    },
    {
        id: 'pantoneCp',
        label: ColorSpaceLabels.PmsCp,
    },
    {
        id: 'pantoneTextile',
        label: ColorSpaceLabels.PmsTcx,
    },
    {
        id: 'pantonePlastics',
        label: ColorSpaceLabels.PmsPq,
    },
    {
        id: 'ral',
        label: ColorSpaceLabels.Ral,
    },

    {
        id: 'variable',
        label: ColorSpaceLabels.Less,
    },
    {
        id: 'lab',
        label: ColorSpaceLabels.Lab,
    },
    {
        id: 'ncs',
        label: ColorSpaceLabels.Ncs,
    },

    {
        id: 'hks',
        label: ColorSpaceLabels.Hks,
    },
    {
        id: 'threeM',
        label: ColorSpaceLabels.ThreeM,
    },
    {
        id: 'oracal',
        label: ColorSpaceLabels.Ora,
    },
];

export const settings = defineSettings({
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
            id: COLORSPACES_ID,
            type: 'checklist',
            defaultValue: ['hex', 'rgb'],
            label: 'Color Spaces',
            choices: COLORSPACES,
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
            show: (bundle) => {
                const colorSpacesValue = bundle?.getBlock(COLORSPACES_ID)?.value as string[];

                return !colorSpacesValue || colorSpacesValue?.length === 0;
            },
        },
    ],
});
