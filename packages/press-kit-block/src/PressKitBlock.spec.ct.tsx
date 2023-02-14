/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { PressKitBlock } from './PressKitBlock';

const PressKitBlockSelector = '[data-test-id="example-block"]';

describe('Example Block', () => {
    it('renders an example block', () => {
        const [PressKitBlockWithStubs] = withAppBridgeBlockStubs(PressKitBlock);

        mount(<PressKitBlockWithStubs />);
        cy.get(PressKitBlockSelector).should('exist');
    });
});
