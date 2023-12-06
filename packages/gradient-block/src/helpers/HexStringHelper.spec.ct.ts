/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toHex6or8String } from './HexStringHelper';

describe('HexStringHelper', () => {
    it('should generate a hex 6 string if alpha is 1', () => {
        cy.wrap(toHex6or8String({ blue: 255, red: 255, green: 255, alpha: 1 })).should('equal', '#ffffff');
    });
    it('should generate a hex 6 string if alpha is undefined', () => {
        cy.wrap(toHex6or8String({ blue: 255, red: 255, green: 255 })).should('equal', '#ffffff');
    });
    it('should generate a hex 8 string if alpha is 0.5', () => {
        cy.wrap(toHex6or8String({ blue: 255, red: 255, green: 255, alpha: 0.5 })).should('equal', '#ffffff80');
    });
});
