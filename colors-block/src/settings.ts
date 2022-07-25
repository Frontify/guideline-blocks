import { DropdownSize, IconEnum } from '@frontify/fondue';
import { BlockSettings, Bundle, NotificationStyleType } from '@frontify/guideline-blocks-settings';

export const FULL_WIDTH = '100%';

const settings: BlockSettings = {
    main: [
        {
            id: 'view_type',
            type: 'dropdown',
            defaultValue: 'list',
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
    content: [
        {
            id: 'colorspaces',
            type: 'checklist',
            label: 'this is label',
            info: 'this is info',
            choices: [
                {
                    id: 'variable',
                    label: 'SCSS/LESS',
                    tooltip: {
                        content: 'test content',
                    },
                },
                {
                    id: 'ral',
                    label: 'RAL',
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
                    id: 'pantone_plastics',
                    label: 'Pantone Plastics',
                },
                {
                    id: 'pantone_textile',
                    label: 'Pantone Textile',
                },
                {
                    id: 'oracal',
                    label: 'Oracal',
                },
                {
                    id: 'cmyk',
                    label: 'CMYK',
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
                    id: 'lab',
                    label: 'LAB',
                },
            ],
            showClearAndSelectAllButtons: true,
            columns: 2,
        },
        {
            id: 'colorspace_info',
            type: 'notification',
            title: 'If there is no Colorspace selected, viewers might miss some information or the Block could lack visual appeal.',
            styles: {
                type: NotificationStyleType.Warning,
            },
            show: (bundle: Bundle) => {
                const colorspacesValue = bundle.getBlock('colorspaces')?.value as string[];
                return !colorspacesValue || colorspacesValue.length === 0;
            },
        },
    ],
};

export default settings;

/*

{
"project":1,
"palette":2,
"view":"grid",
"colorspaces":
[
    'variable',
    'ral',
    'pantone',
    'pantone_coated',
    'pantone_uncoated',
    'pantone_cp',
    'pantone_plastics',
    'pantone_textile',
    'oracal',
    'cmyk',
    'cmyk_coated',
    'cmyk_uncoated',
    'cmyk_newspaper',
    'ncs',
    'hks',
    'three_m',
    'lab',
];
}

*/
