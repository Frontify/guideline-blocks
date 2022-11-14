/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FileExtensionSets } from '@frontify/app-bridge';
import type { BlockSettings, Bundle } from '@frontify/guideline-blocks-settings';
import { PreviewType } from './types';

export const settings: BlockSettings = {
    main: [],
    basics: [
        {
            id: 'template',
            type: 'templateInput',
            label: 'Template',
            multiSelection: false,
        },
        {
            id: 'previewType',
            type: 'slider',
            label: 'Preview',
            choices: [
                {
                    label: 'None',
                    value: PreviewType.None,
                },
                {
                    label: 'Template',
                    value: PreviewType.Template,
                },
                {
                    label: 'Custom',
                    value: PreviewType.Custom,
                },
            ],
            defaultValue: PreviewType.None,
        },
        {
            id: 'customPreview',
            type: 'assetInput',
            extensions: FileExtensionSets.Images,
            label: 'Custom Preview',
            show: (bundle: Bundle) => bundle.getBlock('previewType')?.value === PreviewType.Custom,
        },
    ],
    layout: [],
    style: [],
    security: [],
};
