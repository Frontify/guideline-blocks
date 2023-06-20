/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { useMetadataSettingsConfig } from './useMetadataSettingsConfig';
import { MetadataType } from '../type';

describe('Metadata Config', () => {
    test('MetadataConfig Spec ', () => {
        const [initialValue, metadata] = useMetadataSettingsConfig(testObject);

        const desiredInitialValue = {
            'eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': 'just some text',
        };

        const desiredMetadata = [
            {
                id: 'eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==',
                isRequired: false,
                name: 'Summer Party',
                defaultValue: 'just some text',
                type: { name: 'TEXT' },
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
};

const testObject = {
    name: true,
    email: true,
    'A Short Text--#--eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': [
        '',
        'eyJpZGVudGlmaWVyIjozNywidHlwZSI6InByb2plY3QifQ==-checkbox-eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==',
    ],
    'Another Short Text--#--eyJpZGVudGlmaWVyIjoyMCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': [''],
    'Testadata--#--eyJpZGVudGlmaWVyIjoyMSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': [''],
    'Long text--#--eyJpZGVudGlmaWVyIjoyMywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': [''],
    'Long text--#--eyJpZGVudGlmaWVyIjoyMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': [''],
    buttonText: 'Add Submission',
    testCheck: [''],
    disclaimer: false,
    description: false,
    creator: false,
    copyrightStatus: true,
    copyrightNotice: false,
    assetSubmission: 'eyJpZGVudGlmaWVyIjozNywidHlwZSI6InByb2plY3QifQ==',
    assetSubmissionMetadataConfig: [
        {
            id: 'eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==',
            isRequired: false,
            name: 'A Short Text',
            defaultValue: 'just some text',
            type: {
                name: MetadataType.TEXT,
            },
        },
        {
            id: 'eyJpZGVudGlmaWVyIjoyMCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==',
            isRequired: false,
            name: 'Another Short Text',
            type: {
                name: MetadataType.TEXT,
            },
        },
    ],
    assetSubmissionToken: '35827mDZkLTmzFXG',
    assetSubmissionId: 'eyJpZGVudGlmaWVyIjoxMywidHlwZSI6ImFzc2V0U3VibWlzc2lvblJlcXVlc3QifQ==',
    'A Short Text--#--eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==--#--required': false,
    'Another Short Text--#--eyJpZGVudGlmaWVyIjoyMCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==--#--required': false,
    'A Short Text--#--eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==--#--customize': true,
    'A Short Text--#--eyJpZGVudGlmaWVyIjoxOSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==--#--label': 'Summer Party',
    content: '[{"type":"p","children":[{"text":"asdfdsasdf"}]}]',
};
