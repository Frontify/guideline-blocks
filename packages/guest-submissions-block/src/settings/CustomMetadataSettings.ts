/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DATA_DELIMINATOR } from '../Components/MetaData/hooks/useMetadataSettingsConfig';
import { Library } from '../module/Library/Library';
import { MetadataProps } from '../Components/MetaData/type';
import { Bundle } from '@frontify/guideline-blocks-settings';
import { SettingBlock } from '@frontify/guideline-blocks-settings/src';

export const defineCustomMetadataEntries = (libraries: Library[]): SettingBlock[] | any => {
    return libraries
        .map((library: Library, parentIndex: number) => {
            const { customMetadataProperties } = library;
            return customMetadataProperties.map((metaDataEntry: MetadataProps, index: number) => {
                return {
                    id: `metadata-${library.id}-heading-${metaDataEntry.id}-${index}-${parentIndex}`,
                    type: 'sectionHeading',
                    label: metaDataEntry.name,
                    defaultValue: null,
                    show: (bundle: Bundle) => bundle.getBlock('assetSubmission')?.value === library.id,
                    blocks: [
                        {
                            id: `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}`,
                            type: 'switch',
                            label: 'Show',
                            labelStyle: 'heading',
                            defaultValue: null,
                            show: (bundle: Bundle) => bundle.getBlock('assetSubmission')?.value === library.id,
                            on: [
                                {
                                    id: `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}${DATA_DELIMINATOR}required`,
                                    type: 'switch',
                                    label: 'Required',
                                    info: `${
                                        metaDataEntry.isRequired
                                            ? 'This field is required by the Library, but its okey to disable it for submissions'
                                            : ''
                                    }`,
                                    size: 'small',
                                },
                                {
                                    id: `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}${DATA_DELIMINATOR}label`,
                                    type: 'input',
                                    inputType: 'text',
                                    label: 'Custom Label',
                                    placeholder: 'Enter a custom label',
                                },
                            ],
                        },
                    ],
                };
            });
        })
        .flat(1);
};
