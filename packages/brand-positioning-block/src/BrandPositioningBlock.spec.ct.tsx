/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { mount } from 'cypress/react';
import { BrandPositioningBlock } from './BrandPositioningBlock';

const BrandPositioningBlockSelector = '[data-test-id="brandpositioning-block"]';
const BrandPositioningAddSelector = '[data-test-id="brandpositioning-addbutton"]';
const BrandPositioningAxisSelector = '[data-test-id="brandpositioning-axis"]';
const BrandPositioningToolbarSelector = '[data-test-id="brandpositioning-toolbar"]';
const BrandPositioningItemSelector = '[data-test-id="brandpositioning-item"]';

const MOCK_ITEMS = [
    {
        id: '1',
        position: { x: 10, y: 20 },
    },
    {
        id: '2',
        position: { x: 20, y: 30 },
    },
    {
        id: '3',
        position: { x: 30, y: 40 },
    },
];

describe('Brand Positioning Block', () => {
    it('renders brand positioning block', () => {
        const [BrandPositioningBlockWithStubs] = withAppBridgeBlockStubs(BrandPositioningBlock);
        mount(<BrandPositioningBlockWithStubs />);
        cy.get(BrandPositioningBlockSelector).should('exist');
    });

    it('renders 2 axis', () => {
        const [BrandPositioningBlockWithStubs] = withAppBridgeBlockStubs(BrandPositioningBlock);
        mount(<BrandPositioningBlockWithStubs />);
        cy.get(BrandPositioningAxisSelector).should('have.length', 2);
    });

    it('does not render block inject button in view mode', () => {
        const [BrandPositioningBlockWithStubs] = withAppBridgeBlockStubs(BrandPositioningBlock);
        mount(<BrandPositioningBlockWithStubs />);
        cy.get(BrandPositioningAddSelector).should('not.exist');
    });

    it('renders block inject button in edit mode', () => {
        const [BrandPositioningBlockWithStubs] = withAppBridgeBlockStubs(BrandPositioningBlock, { editorState: true });
        mount(<BrandPositioningBlockWithStubs />);
        cy.get(BrandPositioningAddSelector).should('exist');
    });

    it('renders an item for each items saved', () => {
        const [BrandPositioningBlockWithStubs] = withAppBridgeBlockStubs(BrandPositioningBlock, {
            blockSettings: { items: MOCK_ITEMS },
        });
        mount(<BrandPositioningBlockWithStubs />);
        cy.get(BrandPositioningItemSelector).should('have.length', 3);
    });

    it('does not render a toolbar on hover in view mode', () => {
        const [BrandPositioningBlockWithStubs] = withAppBridgeBlockStubs(BrandPositioningBlock, {
            blockSettings: { items: MOCK_ITEMS },
        });
        mount(<BrandPositioningBlockWithStubs />);
        cy.get(BrandPositioningToolbarSelector).should('not.have.class', 'group-hover:tw-visible');
    });

    it('renders a toolbar on hover in edit mode', () => {
        const [BrandPositioningBlockWithStubs] = withAppBridgeBlockStubs(BrandPositioningBlock, {
            blockSettings: { items: MOCK_ITEMS },
            editorState: true,
        });
        mount(<BrandPositioningBlockWithStubs />);
        cy.get(BrandPositioningToolbarSelector).should('have.class', 'group-hover:tw-visible');
    });
});
