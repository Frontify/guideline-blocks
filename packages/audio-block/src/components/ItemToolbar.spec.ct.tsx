/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { ItemToolbar } from './ItemToolbar';

const ItemToolbarSelector = '[data-test-id="item-toolbar"]';

describe('Item Toolbar', () => {
    it('renders an item toolbar', () => {
        mount(<ItemToolbar onAssetChooseClick={cy.stub} onRemoveAsset={cy.stub} onUploadClick={cy.stub} />);
        cy.get(ItemToolbarSelector).should('exist');
    });
});
