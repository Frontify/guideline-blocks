/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { AssetSubmission } from './AssetSubmission';

const testQuery = {
    data: {
        brands: [
            {
                libraries: {
                    items: [
                        {
                            id: 'test',
                            name: 'test',
                            assetSubmissionRequests: [
                                {
                                    id: 'eyJpZGVudGlmaWVyIjoxLCJ0eXBlIjoiYXNzZXRTdWJtaXNzaW9uUmVxdWVzdCJ9',
                                    name: 'test title',
                                    projectId: '1234',
                                    title: '1234',
                                    description: '1234',
                                    tokens: [
                                        {
                                            token: 'asdf',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: 'test',
                            name: 'Icon library',
                            assetSubmissionRequests: [],
                        },
                        {
                            id: 'test',
                            name: 'Submissions',
                            assetSubmissionRequests: [],
                        },
                    ],
                },
            },
            {
                libraries: {
                    items: [],
                },
            },
            {
                libraries: {
                    items: [],
                },
            },
        ],
    },
};

describe('AssetSubmission', () => {
    test('Should return Flat Array with AssetSubmissionRequest Object', () => {
        const desiredOutput = [
            {
                description: '1234',
                id: 'eyJpZGVudGlmaWVyIjoxLCJ0eXBlIjoiYXNzZXRTdWJtaXNzaW9uUmVxdWVzdCJ9',
                name: 'test title',
                projectId: '1234',
                title: '1234',
                tokens: [
                    {
                        token: 'asdf',
                    },
                ],
            },
        ];
        const output = AssetSubmission.filterEmptySubmissionRequests(testQuery);
        expect(output).toStrictEqual(desiredOutput);
    });
});
