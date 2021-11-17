import { IconEnum } from '@frontify/arcade';
import { ApiSettings } from '@frontify/guideline-blocks-settings';

const settings: ApiSettings = {
    main: [
        {
            id: 'main-dropdown',
            type: 'dropdown',
            defaultValue: 'custom_block',
            size: 'Large',
            disabled: true,
            choices: [
                {
                    value: 'custom_block',
                    icon: IconEnum.Snippet,
                    label: 'Custom Block',
                },
            ],
        },
    ],
};

export default settings;
