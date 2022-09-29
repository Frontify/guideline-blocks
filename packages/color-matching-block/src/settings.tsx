/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, FileExtension } from '@frontify/app-bridge';
import { AssetInputSize, DropdownSize } from '@frontify/fondue';
import { AssetInputMode, AssetInputSource } from '@frontify/guideline-blocks-settings';
import { IconRender } from '../foundation/IconRender';
import { IconToolbar } from '../foundation/IconToolbar';
import { ColorMatchingType } from './types';

export const ICON_LEFT_ID = 'iconLeft';
export const ICON_RIGHT_ID = 'iconRight';
export const LOGO_ID = 'logoId';
export const IS_TOOLBAR_TYPE = 'toolbarType';

export const settings = {
    main: [
        {
            id: IS_TOOLBAR_TYPE,
            type: 'dropdown',
            size: 'Large' as DropdownSize.Large,
            defaultValue: ColorMatchingType.Toolbar,
            disabled: false,
            choices: [
                {
                    value: ColorMatchingType.Toolbar,
                    icon: <IconToolbar />,
                    label: ColorMatchingType.Toolbar,
                },
                {
                    value: ColorMatchingType.Render,
                    icon: <IconRender />,
                    label: ColorMatchingType.Toolbar,
                },
            ],
        },
    ],
    basics: [
        {
            id: 'imageTitle',
            type: 'textarea',
            placeholder: 'Your image headline',
            defaultValue: 'This is a color-matched headline',
        },
        {
            id: 'imageDescription',
            type: 'textarea',
            placeholder: 'Your image description',
            defaultValue: 'Explore the colors on the right.',
        },
    ],
    selection: [
        {
            id: 'showComplementaryColor',
            type: 'switch',
            defaultValue: false,
            label: 'Detect complementary',
        },
        {
            id: 'useCustomLogo',
            type: 'switch',
            defaultValue: false,
            label: 'Use custom Logo',
            on: [
                {
                    id: LOGO_ID,
                    type: 'assetInput',
                    size: AssetInputSize.Small,
                    extensions: ['svg' as FileExtension.Svg],
                    objectTypes: [AssetChooserObjectType.ImageVideo],
                },
            ],
        },
    ],
    mode: [
        {
            id: 'useCustomIcons',
            type: 'switch',
            defaultValue: false,
            label: 'Use Custom Icons',
            switchLabel: 'Custom',
            on: [
                {
                    type: 'sectionHeading',
                    blocks: [
                        {
                            id: 'descriptionFirstToggle',
                            type: 'input',
                            placeholder: 'Mode name toggle off',
                            defaultValue: 'Mobility',
                        },
                        {
                            id: ICON_LEFT_ID,
                            type: 'assetInput',
                            size: AssetInputSize.Small,
                            mode: AssetInputMode.BrowseOnly,
                            extensions: ['svg' as FileExtension.Svg],
                        },
                    ],
                    label: 'Left toggle',
                },
                {
                    type: 'sectionHeading',
                    blocks: [
                        {
                            id: 'descriptionSecondToggle',
                            type: 'input',
                            placeholder: 'Mode name toggle on',
                            defaultValue: 'Delivery',
                        },
                        {
                            id: ICON_RIGHT_ID,
                            type: 'assetInput',
                            size: AssetInputSize.Small,
                            extensions: ['svg' as FileExtension.Svg],
                            source: AssetInputSource.Library,
                            mode: AssetInputMode.BrowseOnly,
                        },
                    ],
                    label: 'Right toggle',
                },
            ],
        },
    ],
};
