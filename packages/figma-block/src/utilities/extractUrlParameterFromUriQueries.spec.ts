/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';

import { extractUrlParameterFromUriQueries } from './extractUrlParameterFromUriQueries';

describe('extractUrlParameterFromUriQueries', () => {
    const data = [
        { uri: 'https://www.test.com/embed?host=google&url=', expected: '' },
        { uri: 'https://www.test.com/embed?host=google', expected: '' },
        {
            uri: 'https://www.test.com/embed?host=google&url=https%3A%2F%2Fwww.test.com%2FDO1Jul74v%3Fnode-id%3D1%3A6',
            expected: 'https://www.test.com/DO1Jul74v?node-id=1:6',
        },
        {
            uri: 'https://www.test.com/embed?host=google&url=https%3A%2F%2Fwww.test.com%2FDO1Jul74v%3Fnode-id%3D1%3A6%26url%3Dhttps%3A%2F%2Fwww.google.com',
            expected: 'https://www.test.com/DO1Jul74v?node-id=1:6&url=https://www.google.com',
        },
        {
            uri: 'https://www.test.com/embed?host=google&url=https%3A%2F%2Fwww.test.com%2FDO1Jul74v%3Fnode-id%3D1%3A6&node=123',
            expected: 'https://www.test.com/DO1Jul74v?node-id=1:6',
        },
    ];

    test.each(data)('validate correctly values ($uri $expected)', ({ uri, expected }) => {
        expect(extractUrlParameterFromUriQueries(uri)).toBe(expected);
    });
});
