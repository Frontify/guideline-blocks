/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DividerStyle, DividerHeight } from '@frontify/arcade';

export default {
    main: [
        {
            id: 'style',
            type: 'dropdown',
            defaultValue: DividerStyle.Solid,
            size: 'large',
            choices: [
                {
                    value: DividerStyle.NoLine,
                    icon: 'divider',
                    label: 'Spacer (no line)',
                },
                {
                    value: DividerStyle.Solid,
                    icon: 'divider',
                    label: 'Line',
                },
            ],
        },
    ],
    layout: [
        {
            id: 'height',
            label: 'Block Height',
            type: 'slider',
            defaultValue: DividerHeight.Small,
            choices: [
                {
                    value: DividerHeight.Small,
                    label: 'S',
                },
                {
                    value: DividerHeight.Medium,
                    label: 'M',
                },
                {
                    value: DividerHeight.Large,
                    label: 'L',
                },
            ],
            info: 'Lorem ipsum dolor sit amet',
        },
    ],
};
