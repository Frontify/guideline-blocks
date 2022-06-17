/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { ExampleContainerQueriesBlock } from './ExampleContainerQueriesBlock';

const EXAMPLE_CONTAINER_QUERIES_BLOCK_SELECTOR = '[data-test-id="example-container-queries-block"]';
const BREAKPOINT = '[data-test-id="breakpoint"]';

describe('Example Container Queries Block', () => {
    it('renders an example block', () => {
        mount(<ExampleContainerQueriesBlock />);
        cy.get(EXAMPLE_CONTAINER_QUERIES_BLOCK_SELECTOR).should('exist');
    });

    it('renders with different breakpoints', () => {
        mount(<ExampleContainerQueriesBlock />);

        cy.viewport(100, 2000);
        cy.get(BREAKPOINT).should('contain', 'sm');

        cy.viewport(700, 2000);
        cy.get(BREAKPOINT).should('contain', 'md');

        cy.viewport(1000, 2000);
        cy.get(BREAKPOINT).should('contain', 'l');

        cy.viewport(2000, 2000);
        cy.get(BREAKPOINT).should('contain', 'xl');
    });
});
