/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import DosDontsBlock from '.';
import { DONT_COLOR_DEFAULT_VALUE, DO_COLOR_DEFAULT_VALUE } from './settings';
import { DoDontLayout, DoDontSpacing } from './types';

const DosDontsBlockSelector = '[data-test-id="dos-donts-block"]';
const DosDontsIcon = '[data-test-id="dos-donts-icon"]';

it("renders a do's & dont's block", () => {
    const [DosDontsBlockWithStubs] = withAppBridgeStubs(DosDontsBlock, {});

    mount(<DosDontsBlockWithStubs />);
    cy.get(DosDontsBlockSelector).should('exist');
});

it("renders an empty do's & dont's block in view mode", () => {
    const [DosDontsBlockWithStubs] = withAppBridgeStubs(DosDontsBlock, {});

    mount(<DosDontsBlockWithStubs />);
    cy.get(DosDontsBlockSelector).find('[data-slate-placeholder]').should('not.exist');
    cy.get(DosDontsIcon).should('not.exist');
});

it("renders an empty do's & dont's block in edit mode", () => {
    const [DosDontsBlockWithStubs] = withAppBridgeStubs(DosDontsBlock, { editorState: true });

    mount(<DosDontsBlockWithStubs />);
    cy.get(DosDontsBlockSelector).find('[data-slate-placeholder]').first().should('exist').contains('Add a title');
    cy.get(DosDontsBlockSelector).find('[data-slate-placeholder]').last().should('exist').contains('Add a description');
    cy.get(DosDontsIcon).should('have.class', 'tw-opacity-30');
});

it("renders an do's & dont's block with the correct layout", () => {
    const [DosDontsBlockWithStubs] = withAppBridgeStubs(DosDontsBlock, {
        blockSettings: {
            columns: 3,
            layout: DoDontLayout.Stacked,
            spacingChoice: DoDontSpacing.Large,
        },
    });

    mount(<DosDontsBlockWithStubs />);
    cy.get(DosDontsBlockSelector).children().should('have.length', 6);
    cy.get(DosDontsBlockSelector).should('have.class', 'tw-grid-flow-col');
    cy.get(DosDontsBlockSelector).should('have.class', 'tw-grid-cols-3');
    cy.get(DosDontsBlockSelector).should('have.css', 'column-gap', '32px');
});

it("renders an do's & dont's block with the correct colors", () => {
    const [DosDontsBlockWithStubs] = withAppBridgeStubs(DosDontsBlock, {
        blockSettings: {
            doColor: DO_COLOR_DEFAULT_VALUE,
            dontColor: DONT_COLOR_DEFAULT_VALUE,
        },
    });

    mount(<DosDontsBlockWithStubs />);
});
