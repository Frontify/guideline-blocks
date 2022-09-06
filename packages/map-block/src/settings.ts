import { DropdownSize, IconEnum } from '@frontify/fondue';
import { BlockSettings } from '@frontify/guideline-blocks-settings';
import { SelectedTheme } from './MapBlock';

export const DEFAULT_BACKGROUND_COLOR = { r: 250, g: 191, b: 89, a: 1, name: 'Saffron Mango' };
export const FULL_WIDTH = '100%';

const CHOICES = [
    { value: SelectedTheme.Default, label: SelectedTheme.Default },
    { value: SelectedTheme.Classic, label: SelectedTheme.Classic },
    { value: SelectedTheme.Dark, label: SelectedTheme.Dark },
    { value: SelectedTheme.Light, label: SelectedTheme.Light },
];

export const settings: BlockSettings = {
    main: [
        {
            id: 'main-dropdown',
            type: 'dropdown',
            defaultValue: 'custom_block',
            size: DropdownSize.Large,
            disabled: true,
            choices: [
                {
                    value: 'custom_block',
                    icon: IconEnum.MapPointer12,
                    label: 'Map Block',
                },
            ],
        },
        {
            id: 'token',
            type: 'input',
            defaultValue: 'AIzaSyBG0u3PM2NWhYS0ke_ENcKgcoorkr81Xwo',
            show: () => false,
        },
    ],
    basics: [
        {
            id: 'goTo',
            label: 'Set Marker to...',
            type: 'input',
            placeholder: 'Smartive',
        },
    ],
    style: [
        {
            id: 'theme',
            label: 'Theme',
            type: 'dropdown',
            defaultValue: SelectedTheme.Default,
            choices: CHOICES,
        },
    ],
};
