/* (c) Copyright Frontify Ltd., all rights reserved. */

/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames } from './joinClassNames';

describe('joinClassNames', () => {
    const data = [
        { classes: ['lorem', undefined, false], expected: 'lorem' },
        { classes: ['lorem', 'ipsum'], expected: 'lorem ipsum' },
        { classes: ['lorem', ''], expected: 'lorem' },
        { classes: ['lorem', ' '], expected: 'lorem  ' },
        { classes: [], expected: '' },
    ];

    it.each(data)('validate correctly values', ({ classes, expected }) => {
        expect(joinClassNames(classes)).toBe(expected);
    });
});
