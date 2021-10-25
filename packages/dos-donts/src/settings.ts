/* (c) Copyright Frontify Ltd., all rights reserved. */

export default {
    main: [
        {
            id: 'style',
            type: 'dropdown',
            defaultValue: 'icons',
            size: 'large',
            choices: [
                {
                    value: 'icons',
                    icon: 'text-align-right',
                    label: 'Icons',
                },
                {
                    value: 'underline',
                    icon: 'underline',
                    label: 'Underline',
                },
                {
                    value: 'text',
                    icon: 'text-align-left',
                    label: 'Text',
                },
            ],
        },
    ],
    layout: [
        {
            id: 'arrange',
            label: 'Arrange',
            info: 'Here comes the info',
            type: 'slider',
            defaultValue: 'sideBySide',
            choices: [
                {
                    value: 'sideBySide',
                    label: 'Side by side',
                },
                {
                    value: 'stacked',
                    label: 'Stacked',
                },
            ],
        },
        {
            id: 'columns',
            label: 'Columns',
            info: 'Here comes the info',
            type: 'slider',
            defaultValue: 'columns-2',
            choices: [
                {
                    value: 'columns-1',
                    label: '1',
                },
                {
                    value: 'columns-2',
                    label: '2',
                },
                {
                    value: 'columns-3',
                    label: '3',
                },
                {
                    value: 'columns-4',
                    label: '4',
                },
            ],
        },
        {
            id: 'columnGap',
            label: 'Column gap',
            info: 'Here comes the infooo',
            type: 'switch',
            switchLabel: 'Custom',
            on: [
                {
                    id: 'columnGapValue',
                    type: 'input',
                },
            ],
            off: [
                {
                    id: 'columnGapChoice',
                    type: 'slider',
                    defaultValue: 'padding-s',
                    choices: [
                        {
                            value: 'padding-s',
                            label: 'S',
                        },
                        {
                            value: 'padding-m',
                            label: 'M',
                        },
                        {
                            value: 'padding-l',
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'doColor',
            type: 'input',
            label: 'Do color',
            defaultValue: '#00C8A5',
        },
        {
            id: 'dontColor',
            type: 'input',
            label: "Don't color",
            defaultValue: '#FF375A',
        },
    ],
};
