/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DATA_DELIMINATOR } from '../Components/MetaData/hooks/useMetadataSettingsConfig';
import { Library } from '../module/Library/Library';
import { MetadataProps } from '../Components/MetaData/type';
import { Bundle, SettingBlock } from '@frontify/guideline-blocks-settings';

const settingsEntry = (id: string, metaDataEntry: MetadataProps, index: number, parentIndex: number): SettingBlock => {
    return {
        id: `metadata-${id}-heading-${metaDataEntry.id}-${index}-${parentIndex}`,
        type: 'sectionHeading',
        label: metaDataEntry.name,
        show: (bundle: Bundle) => bundle.getBlock('assetSubmission')?.value === id,
        blocks: [
            {
                id: `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}`,
                type: 'switch',
                label: 'Show',
                show: (bundle: Bundle) => bundle.getBlock('assetSubmission')?.value === id,
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
};

export const defineCustomMetadataEntries = (libraries: Library[]): SettingBlock[] => {
    return libraries
        .map(({ customMetadataProperties, id }: Library, parentIndex: number) => {
            return customMetadataProperties.map((metaDataEntry: MetadataProps, index: number) =>
                settingsEntry(id, metaDataEntry, index, parentIndex)
            );
        })
        .flat(1);
};
