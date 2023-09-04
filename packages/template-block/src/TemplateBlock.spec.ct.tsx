/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { TemplateDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { TemplateBlock } from './TemplateBlock';
import { SETTING_ID } from './constants';

const TEMPLATE_BLOCK_SELECTOR = '[data-test-id="template-block"]';

const TEMPLATE_ID = 13;

describe('Template Block', () => {
    it('renders a template block', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock);

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_SELECTOR).should('exist');
    });

    it('renders a template block with a provided template', () => {
        const template = TemplateDummy.with(TEMPLATE_ID);
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            blockTemplates: {
                [SETTING_ID]: [template],
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_SELECTOR).should('exist');
    });
});
