/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DATA_DELIMINATOR } from '../Components/MetaData/hooks/useMetadataSettingsConfig';
import { Library } from '../module/Library/Library';
import { MetadataProps } from '../Components/MetaData/type';
import { Bundle, SettingBlock } from '@frontify/guideline-blocks-settings';

type checkListProps = {
    value: string[];
};

type switchProps = {
    value: boolean | null;
};

const settingsEntry = (id: string, metaDataEntry: MetadataProps, index: number, parentIndex: number): SettingBlock => {
    return {
        id: `metadata-${id}-heading-${metaDataEntry.id}-${index}-${parentIndex}`,
        type: 'sectionHeading',
        show: (bundle: Bundle) => bundle.getBlock('assetSubmission')?.value === id,
        blocks: [
            {
                id: `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}`,
                type: 'checklist',
                defaultValue: [''],
                choices: [{ id: `${id}-checkbox-${metaDataEntry.id}`, label: `${metaDataEntry.name}` }],
                showClearAndSelectAllButtons: false,
                columns: 1,
            },
            {
                id: `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}${DATA_DELIMINATOR}required`,
                type: 'switch',
                label: 'Required',
                size: 'small',
                show: (bundle) => {
                    const { value } = bundle.getBlock(
                        `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}`
                    ) as checkListProps;
                    return value.length > 1;
                },
            },
            {
                id: `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}${DATA_DELIMINATOR}customize`,
                type: 'switch',
                label: 'Custom Label',
                size: 'small',
                show: (bundle) => {
                    const { value } = bundle.getBlock(
                        `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}`
                    ) as checkListProps;
                    return value.length > 1;
                },
                onChange: (bundle) => {
                    if (
                        bundle.getBlock(
                            `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}${DATA_DELIMINATOR}customize`
                        )?.value === false
                    ) {
                        bundle.setBlockValue(
                            `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}${DATA_DELIMINATOR}label`,
                            ''
                        );
                    }
                },
            },
            {
                id: `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}${DATA_DELIMINATOR}label`,
                type: 'input',
                inputType: 'text',
                placeholder: 'Enter a custom label',
                show: (bundle) => {
                    const { value } = bundle.getBlock(
                        `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}`
                    ) as checkListProps;
                    const customLabel = bundle.getBlock(
                        `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}${DATA_DELIMINATOR}customize`
                    ) as switchProps;

                    return value.length > 1 && !!customLabel.value;
                },
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
