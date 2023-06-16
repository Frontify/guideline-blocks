/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { assetSubmissionDTO } from './AssetSubmissionDTO';
import { CopyRightStatus } from '../../Components/MetaData/StandardMetadata/type';

describe('AssetSubmissionDTO', () => {
    test('Should Transform Input to correct output', () => {
        const input = {
            name: 'Julian',
            email: 'Iffgasdf.ch',
            creator: 'Creator',
            disclaimer: 'Checked',
            description: 'Descriptio',
            copyrightNotice: 'notice',
            copyrightStatus: CopyRightStatus.COPYRIGHTED,
            'eyJpZGVudGlmaWVyIjoxMiwidHlwsdZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': 'text',
            'eyJpZGVudGlmasaWVyIjoxMywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': 'Campaign Description',
            'eyJpZGVudGlmaWVyIjoxNSwfdsidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': 'My Birthday Party',
            'eyJpZGVudfdsGlmaWVyIjoxNCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': '123123',
        };

        const desiredOutput = {
            copyright: {
                author: 'Creator',
                notice: 'notice',
                status: 'COPYRIGHTED',
            },
            custom: [
                {
                    propertyId: 'email',
                    value: 'Iffgasdf.ch',
                },
                {
                    propertyId: 'disclaimer',
                    value: 'Checked',
                },
                {
                    propertyId: 'eyJpZGVudGlmaWVyIjoxMiwidHlwsdZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==',
                    value: 'text',
                },
                {
                    propertyId: 'eyJpZGVudGlmasaWVyIjoxMywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==',
                    value: 'Campaign Description',
                },
                {
                    propertyId: 'eyJpZGVudGlmaWVyIjoxNSwfdsidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==',
                    value: 'My Birthday Party',
                },
                {
                    propertyId: 'eyJpZGVudfdsGlmaWVyIjoxNCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==',
                    value: '123123',
                },
            ],
            description: 'Descriptio',
        };
        const output = assetSubmissionDTO(input);
        expect(output).toStrictEqual(desiredOutput);
    });
});
