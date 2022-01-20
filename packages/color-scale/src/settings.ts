import { BlockSettings } from '@frontify/guideline-blocks-settings';
import { DropdownSize } from '@frontify/arcade';

const settings: BlockSettings = {
    main: [
        {
            id: 'style',
            type: 'dropdown',
            defaultValue: 'COLOR_AND_LABEL',
            choices: [
                {
                    value: 'COLOR_AND_LABEL',
                    label: 'Color & Label',
                },
                {
                    value: 'COLOR_ONLY',
                    label: 'Color only',
                },
            ],
            size: DropdownSize.Large,
        },
    ],
    style: [
        {
            id: 'size',
            label: 'Size',
            type: 'dropdown',
            defaultValue: 'S',
            choices: [
                {
                    value: 'S',
                    label: 'S',
                },
                {
                    value: 'M',
                    label: 'M',
                },
                {
                    value: 'L',
                    label: 'L',
                },
            ],
        },
    ],
};

// eslint-disable-next-line import/no-default-export
export default settings;
