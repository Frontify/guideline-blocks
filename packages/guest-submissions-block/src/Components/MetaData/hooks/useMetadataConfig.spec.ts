/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { useMetadataSettingsConfig } from './useMetadataSettingsConfig';

describe('Metadata Config', () => {
    test('MetadataConfig Spec ', () => {
        const [initialValue, metadata] = useMetadataSettingsConfig(testObject as any);

        const desiredInitialValue = {
            'eyJpZGVudGlmaWVyIjoxMiwidHlwsdZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': 'text',
        };

        const desiredMetadata = [
            {
                id: 'eyJpZGVudGlmaWVyIjoxMiwidHlwsdZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==',
                name: 'asdfasdf',
                valueType: { propertyType: 'TEXT' },
                isRequired: false,
                defaultValue: 'text',
            },
        ];
        expect(initialValue).toStrictEqual(desiredInitialValue);
        expect(metadata).toStrictEqual(desiredMetadata);
    });

    test('MetadataConfig works without metadata ', () => {
        const [initialValue, metadata] = useMetadataSettingsConfig(testObjectNoConfiguration as any);

        expect(initialValue).toStrictEqual({});
        expect(metadata).toStrictEqual([]);
    });
});

const testObjectNoConfiguration = {
    buttonText: 'New Submission',
    disclaimer: false,
    description: false,
    creator: false,
    copyrightStatus: false,
    copyrightNotice: false,
    assetSubmission: 'eyJpZGVudGlmaWVyIjoxLCJ0eXBlIjoiYXNzZXRTdWJtaXNzaW9uUmVxdWVzdCJ9',
    'New Summer Field Name--#--eyJpZGVudGlmaWVyIjoxMiwidHlwsdZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': true,
    'New Summer Field Name--#--eyJpZGVudGlmaWVyIjoxMiwidHlwsdZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==--#--required':
        false,
    'New Summer Field Name--#--eyJpZGVudGlmaWVyIjoxMiwidHlwsdZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==--#--label':
        'asdfasdf',
    customMetaData: 'JSON.stringify(assetSubmissionRequests[0])',
    assetSubmissionMetadataConfig: {
        id: 'eyJpZGVudGlmaWVyIjoxLCJ0eXBlIjoiYXNzZXRTdWJtaXNzaW9uUmVxdWVzdCJ9',
        title: 'Summer Query',
        description: 'New Summer Query',
        configuration: '[]',
    },
    'Winter Queryy--#--eyJpZGVudGlmaWVyIjoxaggaaMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': false,
    'Winter Queryy--#--eyJpZGVudGlmaWVyIjoxaggaaMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==--#--required': false,
    'Winter Queryy--#--eyJpZGVudGlmaWVyIjoxaggaaMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==--#--label': '',
    'Single Select--#--eyJpZGVudGlmaWVasasayIjoxNSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': false,
    'Single Select--#--eyJpZGVudGlmaWVasasayIjoxNSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==--#--required': false,
    'Campaign Description--#--eyJpZGVudfsfsfGlmaWVyIjoxMywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': false,
    modalcontent: '[{"type":"p","children":[{"text":"jlkjsadfasdf"}]}]',
};

const testObject = {
    buttonText: 'New Submission',
    disclaimer: false,
    description: false,
    creator: false,
    copyrightStatus: false,
    copyrightNotice: false,
    assetSubmission: 'eyJpZGVudGlmaWVyIjoxLCJ0eXBlIjoiYXNzZXRTdWJtaXNzaW9uUmVxdWVzdCJ9',
    'New Summer Field Name--#--eyJpZGVudGlmaWVyIjoxMiwidHlwsdZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': true,
    'New Summer Field Name--#--eyJpZGVudGlmaWVyIjoxMiwidHlwsdZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==--#--required':
        false,
    'New Summer Field Name--#--eyJpZGVudGlmaWVyIjoxMiwidHlwsdZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==--#--label':
        'asdfasdf',
    customMetaData: 'JSON.stringify(assetSubmissionRequests[0])',
    assetSubmissionMetadataConfig: {
        id: 'eyJpZGVudGlmaWVyIjoxLCJ0eXBlIjoiYXNzZXRTdWJtaXNzaW9uUmVxdWVzdCJ9',
        title: 'Summer Query',
        description: 'New Summer Query',
        configuration:
            '[{"id":"eyJpZGVudGlmaWVyIjoxMiwidHlwsdZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==","name":"New Summer Field Name","valueType":{"propertyType":"TEXT"},"isRequired":true,"defaultValue":"text"},{"id":"eyJpZGVudGlmaWVyIjoxNSwfdsidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==","name":"double Select","valueType":{"options":[{"id":"eyJpZGVudGlmaWVyIjoxLasCJ0eXBlIjoiY3VzdG9tTWV0YWRhdGFQcm9wZXJ0eU9wdGlvbiJ9","value":"My Birthday Party"},{"id":"eyJpZGVudGlmaWVyIjoyLCJ0eXBlIjoiY3VzdG9tTWV0YWRhdGFQcm9wZXJ0eU9wdGlvbiJ9","value":"This is something else"}],"propertyType":"SELECT"},"isRequired":true,"defaultValue":""},{"id":"eyJpZGVudGlmasaWVyIjoxMywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==","name":"Campaign Description","valueType":{"propertyType":"LONGTEXT"},"isRequired":false,"defaultValue":"Campaign Description"},{"id":"eyJpZGVudfdsGlmaWVyIjoxNCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==","name":"Event Number","valueType":{"propertyType":"NUMBER"},"isRequired":false,"defaultValue":null},{"id":"eyJpZGVudagaaGlmaWVyIjoxNywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==","name":"Campaign Date","valueType":{"propertyType":"DATE"},"isRequired":false,"defaultValue":null}]',
    },
    'Winter Queryy--#--eyJpZGVudGlmaWVyIjoxaggaaMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': false,
    'Winter Queryy--#--eyJpZGVudGlmaWVyIjoxaggaaMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==--#--required': false,
    'Winter Queryy--#--eyJpZGVudGlmaWVyIjoxaggaaMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==--#--label': '',
    'Single Select--#--eyJpZGVudGlmaWVasasayIjoxNSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': false,
    'Single Select--#--eyJpZGVudGlmaWVasasayIjoxNSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==--#--required': false,
    'Campaign Description--#--eyJpZGVudfsfsfGlmaWVyIjoxMywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': false,
    modalcontent: '[{"type":"p","children":[{"text":"jlkjsadfasdf"}]}]',
};
