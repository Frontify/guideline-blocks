/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { useMetadataSettingsConfig } from './useMetadataSettingsConfig';
import { MetadataType } from '../type';

describe('Metadata Config', () => {
    test('MetadataConfig Spec ', () => {
        const [initialValue, metadata] = useMetadataSettingsConfig(testObject);

        const desiredInitialValue = {
            'eyJpZGVudGlmaWVyIjoxMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': 'Default Value',
        };

        const desiredMetadata = [
            {
                id: 'eyJpZGVudGlmaWVyIjoxMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==',
                isRequired: false,
                defaultValue: 'Default Value',
                name: 'test',
                type: {
                    name: 'TEXT',
                },
            },
        ];
        expect(initialValue).toStrictEqual(desiredInitialValue);
        expect(metadata).toStrictEqual(desiredMetadata);
    });

    test('MetadataConfig works without metadata ', () => {
        const [initialValue, metadata] = useMetadataSettingsConfig(testObjectNoConfiguration);

        expect(initialValue).toStrictEqual({});
        expect(metadata).toStrictEqual([]);
    });
});

const testObjectNoConfiguration = {
    name: false,
    email: false,
    content: '[{"type":"p","children":[{"text":"cc<yxc<yxcasdf","textStyle":"p"}]}]',
    buttonText: 'New Submission',
    disclaimer: true,
    description: false,
    creator: false,
    copyrightStatus: false,
    copyrightNotice: false,
    assetSubmission: 'eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6InByb2plY3QifQ==',
    assetSubmissionMetadataConfig: [],
    assetSubmissionToken: 'Nas2YR66rKBSXfoo',
    assetSubmissionId: 'eyJpZGVudGlmaWVyIjoxLCJ0eXBlIjoiYXNzZXRTdWJtaXNzaW9uUmVxdWVzdCJ9',
    'test--#--eyJpZGVudGlmaWVyIjoxMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': true,
    disclaimerText:
        '[{"type":"p","children":[{"text":"By continuing, I agree that I will not upload malware, unlawful materials or content that violates the intellectual property rights of others.","textStyle":"p"}]}]',
    'metadata-eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6InByb2plY3QifQ==-heading-eyJpZGVudGlmaWVyIjoxMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==-0-0':
        null,
    'metadata-eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6InByb2plY3QifQ==-heading-eyJpZGVudGlmaWVyIjoxMywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==-1-0':
        null,
    'Long Text--#--eyJpZGVudGlmaWVyIjoxMywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': null,
    'metadata-eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6InByb2plY3QifQ==-heading-eyJpZGVudGlmaWVyIjoxNCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==-2-0':
        null,
    'Number--#--eyJpZGVudGlmaWVyIjoxNCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': null,
    'metadata-eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6InByb2plY3QifQ==-heading-eyJpZGVudGlmaWVyIjoxNSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==-3-0':
        null,
    'Single Select--#--eyJpZGVudGlmaWVyIjoxNSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': null,
    'metadata-eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6InByb2plY3QifQ==-heading-eyJpZGVudGlmaWVyIjoxNiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==-4-0':
        null,
    'Multi-select--#--eyJpZGVudGlmaWVyIjoxNiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': null,
    'metadata-eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6InByb2plY3QifQ==-heading-eyJpZGVudGlmaWVyIjoxNywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==-5-0':
        null,
    'Date--#--eyJpZGVudGlmaWVyIjoxNywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': null,
    'metadata-eyJpZGVudGlmaWVyIjozMiwidHlwZSI6InByb2plY3QifQ==-heading-eyJpZGVudGlmaWVyIjoxOCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==-0-1':
        null,
    'Required--#--eyJpZGVudGlmaWVyIjoxOCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': null,
};

const testObject = {
    name: false,
    email: false,
    content: '[{"type":"p","children":[{"text":"cc<yxc<yxcasdf","textStyle":"p"}]}]',
    buttonText: 'New Submission',
    disclaimer: true,
    description: false,
    creator: false,
    copyrightStatus: false,
    copyrightNotice: false,
    assetSubmission: 'eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6InByb2plY3QifQ==',
    assetSubmissionMetadataConfig: [
        {
            id: 'eyJpZGVudGlmaWVyIjoxMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==',
            isRequired: false,
            defaultValue: 'Default Value',
            name: 'test',
            type: {
                name: MetadataType.TEXT,
            },
        },
        {
            id: 'eyJpZGVudGlmaWVyIjoxMywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==',
            isRequired: false,
            name: 'Long Text',
            type: {
                name: MetadataType.LONGTEXT,
            },
        },
        {
            id: 'eyJpZGVudGlmaWVyIjoxNCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==',
            isRequired: false,
            name: 'Number',
            type: {
                name: MetadataType.NUMBER,
            },
        },
        {
            id: 'eyJpZGVudGlmaWVyIjoxNSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==',
            isRequired: false,
            name: 'Single Select',
            type: {
                name: MetadataType.SELECT,
                options: [
                    {
                        value: 'one',
                        id: 'eyJpZGVudGlmaWVyIjoxLCJ0eXBlIjoiY3VzdG9tTWV0YWRhdGFQcm9wZXJ0eU9wdGlvbiJ9',
                        isDefault: false,
                    },
                    {
                        value: 'two',
                        id: 'eyJpZGVudGlmaWVyIjoyLCJ0eXBlIjoiY3VzdG9tTWV0YWRhdGFQcm9wZXJ0eU9wdGlvbiJ9',
                        isDefault: false,
                    },
                ],
            },
        },
        {
            id: 'eyJpZGVudGlmaWVyIjoxNiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==',
            isRequired: false,
            defaultValue: {
                id: 'eyJpZGVudGlmaWVyIjozLCJ0eXBlIjoiY3VzdG9tTWV0YWRhdGFQcm9wZXJ0eU9wdGlvbiJ9',
                value: 'one',
            },
            name: 'Multi-select',
            type: {
                name: MetadataType.MULTISELECT,
                options: [
                    {
                        value: 'one',
                        id: 'eyJpZGVudGlmaWVyIjozLCJ0eXBlIjoiY3VzdG9tTWV0YWRhdGFQcm9wZXJ0eU9wdGlvbiJ9',
                        isDefault: true,
                    },
                    {
                        value: 'two',
                        id: 'eyJpZGVudGlmaWVyIjo0LCJ0eXBlIjoiY3VzdG9tTWV0YWRhdGFQcm9wZXJ0eU9wdGlvbiJ9',
                        isDefault: false,
                    },
                    {
                        value: 'three',
                        id: 'eyJpZGVudGlmaWVyIjo1LCJ0eXBlIjoiY3VzdG9tTWV0YWRhdGFQcm9wZXJ0eU9wdGlvbiJ9',
                        isDefault: false,
                    },
                ],
            },
        },
        {
            id: 'eyJpZGVudGlmaWVyIjoxNywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==',
            isRequired: false,
            name: MetadataType.DATE,
            type: {
                name: MetadataType.DATE,
            },
        },
    ],
    assetSubmissionToken: 'Nas2YR66rKBSXfoo',
    assetSubmissionId: 'eyJpZGVudGlmaWVyIjoxLCJ0eXBlIjoiYXNzZXRTdWJtaXNzaW9uUmVxdWVzdCJ9',
    'test--#--eyJpZGVudGlmaWVyIjoxMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': true,
    disclaimerText:
        '[{"type":"p","children":[{"text":"By continuing, I agree that I will not upload malware, unlawful materials or content that violates the intellectual property rights of others.","textStyle":"p"}]}]',
    'metadata-eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6InByb2plY3QifQ==-heading-eyJpZGVudGlmaWVyIjoxMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==-0-0':
        null,
    'metadata-eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6InByb2plY3QifQ==-heading-eyJpZGVudGlmaWVyIjoxMywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==-1-0':
        null,
    'Long Text--#--eyJpZGVudGlmaWVyIjoxMywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': null,
    'metadata-eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6InByb2plY3QifQ==-heading-eyJpZGVudGlmaWVyIjoxNCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==-2-0':
        null,
    'Number--#--eyJpZGVudGlmaWVyIjoxNCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': null,
    'metadata-eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6InByb2plY3QifQ==-heading-eyJpZGVudGlmaWVyIjoxNSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==-3-0':
        null,
    'Single Select--#--eyJpZGVudGlmaWVyIjoxNSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': null,
    'metadata-eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6InByb2plY3QifQ==-heading-eyJpZGVudGlmaWVyIjoxNiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==-4-0':
        null,
    'Multi-select--#--eyJpZGVudGlmaWVyIjoxNiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': null,
    'metadata-eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6InByb2plY3QifQ==-heading-eyJpZGVudGlmaWVyIjoxNywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==-5-0':
        null,
    'Date--#--eyJpZGVudGlmaWVyIjoxNywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': null,
    'metadata-eyJpZGVudGlmaWVyIjozMiwidHlwZSI6InByb2plY3QifQ==-heading-eyJpZGVudGlmaWVyIjoxOCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==-0-1':
        null,
    'Required--#--eyJpZGVudGlmaWVyIjoxOCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': null,
};
