import { ApiSettings } from '@frontify/guideline-blocks-settings';

const settings: ApiSettings = {
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
            size: 'large',
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

export default settings;
