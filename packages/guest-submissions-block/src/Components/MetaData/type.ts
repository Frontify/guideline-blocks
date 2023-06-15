/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum MetadataType {
    'TEXT' = 'TEXT',
    'LONGTEXT' = 'LONGTEXT',
    'NUMBER' = 'NUMBER',
    'MULTISELECT' = 'MULTISELECT',
    'DATE' = 'DATE',
    'SELECT' = 'SELECT',
}

export type MetadataProps = {
    id: string;
    isRequired: boolean;
    defaultValue?: string | string[] | { id: string; value: string };
    name: string;
    type: {
        name: MetadataType;
        options?: {
            value: string;
            id: string;
            isDefault: boolean;
        }[];
    };
};
