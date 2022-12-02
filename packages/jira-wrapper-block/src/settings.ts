import { DropdownSize, IconEnum } from '@frontify/fondue';
import { BlockSettings } from '@frontify/guideline-blocks-settings';

export const DEFAULT_BACKGROUND_COLOR = { red: 250, green: 191, blue: 89, alpha: 1, name: 'Saffron Mango' };
export const FULL_WIDTH = '100%';

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
                    icon: 'Snippet' as IconEnum,
                    label: 'Custom Block',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'showRichTextEditor',
            type: 'switch',
            defaultValue: true,
            label: 'Enable Rich Text Editor',
        },
    ],
    layout: [
        {
            id: 'width',
            type: 'input',
            defaultValue: FULL_WIDTH,
            placeholder: '75%',
            label: 'Width',
            rules: [
                {
                    errorMessage: "Please use a percentage value with '%'",
                    validate: (value: string) => value.match(/^-?\d+%$/g) !== null,
                },
            ],
        },
    ],
    style: [
        {
            id: 'backgroundColor',
            label: 'Background Color',
            type: 'colorInput',
            defaultValue: DEFAULT_BACKGROUND_COLOR,
        },
    ],
};
