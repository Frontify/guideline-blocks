/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { assetSubmissionDTO } from './AssetSubmissionDTO';

describe('AssetSubmissionDTO', () => {
    test('Should Transform Input to correct output', () => {
        const input = {
            name: 'Julian',
            email: 'Iffgasdf.ch',
            creator: 'Creator',
            disclaimer: 'Checked',
            description: 'Descriptio',
            copyrightNotice: 'notice',
            copyrightStatus: 'status',
            'eyJpZGVudGlmaWVyIjoxMiwidHlwsdZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': 'text',
            'eyJpZGVudGlmasaWVyIjoxMywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': 'Campaign Description',
            'eyJpZGVudGlmaWVyIjoxNSwfdsidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': 'My Birthday Party',
            'eyJpZGVudfdsGlmaWVyIjoxNCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': '123123',
        };

        const desiredOutput = {
            standard: {
                description: 'Descriptio',
                legal: {
                    creator: 'Creator',
                    copyright: {
                        status: 'status',
                        notice: 'notice',
                    },
                },
            },
            custom: {
                'eyJpZGVudGlmaWVyIjoxMiwidHlwsdZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': 'text',
                'eyJpZGVudGlmasaWVyIjoxMywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': 'Campaign Description',
                'eyJpZGVudGlmaWVyIjoxNSwfdsidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': 'My Birthday Party',
                'eyJpZGVudfdsGlmaWVyIjoxNCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==': '123123',
            },
        };
        const output = assetSubmissionDTO(input);
        expect(output).toStrictEqual(desiredOutput);
    });
});
