/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { TemplateBlock } from './TemplateBlock';

const TemplateBlockSelector = '[data-test-id="template-block"]';

describe('Template Block', () => {
    it('renders an template block', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock);

        mount(<TemplateBlockWithStubs />);
        cy.get(TemplateBlockSelector).should('exist');
    });
});
