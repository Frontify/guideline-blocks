/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetInputSize, DropdownSize, IconEnum } from '@frontify/fondue';
import { AssetInputMode, BlockSettings } from '@frontify/guideline-blocks-settings';

export const settings: BlockSettings = {
    main: [
        {
            id: 'IS_LINE_ID',
            type: 'dropdown',
            size: 'Large' as DropdownSize.Large,
            defaultValue: '',
            disabled: true,
            choices: [
                {
                    value: '',
                    icon: 'DividerBlank' as IconEnum.DividerBlank,
                    label: 'Spacer (no line)',
                },
            ],
        },
    ],
    layout: [
        {
            id: 'showComplementaryColor',
            type: 'switch',
            defaultValue: false,
            label: 'Find/show Complementary Color',
        },
        {
            id: 'useCustomIcons',
            type: 'switch',
            defaultValue: false,
            label: 'Use Custom Icons',
            switchLabel: 'Custom',
            on: [
                {
                    id: 'iconFirstToggle',
                    type: 'assetInput',
                    mode: AssetInputMode.BrowseOnly,
                    size: AssetInputSize.Small,
                    // defaultValue: 'Mobility' //add icon of design
                },
                {
                    id: 'descriptionFirstToggle',
                    type: 'input',
                    defaultValue: 'Mobility',
                },
                {
                    id: 'iconSecondToggle',
                    type: 'assetInput',
                    mode: AssetInputMode.BrowseOnly,
                    size: AssetInputSize.Small,
                    // defaultValue: 'Delivery' //add icon of design
                },
                {
                    id: 'descriptionSecondToggle',
                    type: 'input',
                    defaultValue: 'Delivery',
                },
            ],
        },
    ],
    style: [],
};
