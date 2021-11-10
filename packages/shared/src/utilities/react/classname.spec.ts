/* (c) Copyright Frontify Ltd., all rights reserved. */

import { classname } from './classname';

describe('classname', () => {
    const data = [
        { classes: ['lorem', undefined, false], expected: 'lorem' },
        { classes: ['lorem', 'ipsum'], expected: 'lorem ipsum' },
        { classes: ['lorem', ''], expected: 'lorem' },
        { classes: ['lorem', ' '], expected: 'lorem  ' },
        { classes: [], expected: '' },
    ];

    it.each(data)('validate correctly values', ({ classes, expected }) => {
        expect(classname(classes)).toBe(expected);
    });
});
