import { DropdownSize, IconEnum } from '@frontify/fondue';
import { BlockSettings } from '@frontify/guideline-blocks-settings';
import { SelectedTheme } from '.';

export const DEFAULT_BACKGROUND_COLOR = { r: 250, g: 191, b: 89, a: 1, name: 'Saffron Mango' };
export const FULL_WIDTH = '100%';

const CHOICES = [
    { value: SelectedTheme.Default, label: SelectedTheme.Default },
    { value: SelectedTheme.Classic, label: SelectedTheme.Classic },
    { value: SelectedTheme.Dark, label: SelectedTheme.Dark },
    { value: SelectedTheme.Light, label: SelectedTheme.Light },
];

const settings: BlockSettings = {
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
                    icon: IconEnum.MapPointer,
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
    content: [
        {
            id: 'goTo',
            label: 'Go To ...',
            type: 'input',
            placeholder: 'smartive',
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

export default settings;
