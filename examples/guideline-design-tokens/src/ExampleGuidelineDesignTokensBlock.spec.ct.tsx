/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { ExampleGuidelineDesignTokensBlock } from './ExampleGuidelineDesignTokensBlock';

const EXAMPLE_GUIDELINE_DESIGN_TOKENS_BLOCK_SELECTOR = '[data-test-id="example-guideline-design-tokens-block"]';

describe('Example Guideline Design Token Block', () => {
    before(() => {
        document.body.setAttribute('data-hub', '1');
    });

    beforeEach(() => {
        cy.intercept(`${window.location.origin}/api/portal/1/appearance`, {
            statusCode: 200,
            body: {
                data: {
                    heading1: {
                        family: 'Arial',
                        size: '24px',
                    },
                    heading2: {
                        family: 'Helvetica Neue',
                        size: '18px',
                    },
                },
            },
        });
    });

    it('renders an example block with styles from the api', () => {
        const [ExampleGuidelineDesignTokensBlockWithStubs] = withAppBridgeBlockStubs(ExampleGuidelineDesignTokensBlock);

        mount(<ExampleGuidelineDesignTokensBlockWithStubs />);
        cy.get(EXAMPLE_GUIDELINE_DESIGN_TOKENS_BLOCK_SELECTOR).should('exist');

        cy.get(`${EXAMPLE_GUIDELINE_DESIGN_TOKENS_BLOCK_SELECTOR} h1`)
            .should('exist')
            .and('have.css', 'font-family', 'Arial')
            .and('have.css', 'font-size', '24px');

        cy.get(`${EXAMPLE_GUIDELINE_DESIGN_TOKENS_BLOCK_SELECTOR} h2`)
            .should('exist')
            .should('have.css', 'font-family', '"Helvetica Neue"')
            .and('have.css', 'font-size', '18px');
    });
});
