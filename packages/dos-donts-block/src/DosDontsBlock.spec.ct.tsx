/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { DosDontsBlock } from './DosDontsBlock';
import { DONT_COLOR_DEFAULT_VALUE, DO_COLOR_DEFAULT_VALUE } from './settings';
import { DoDontStyle, ItemIconChoice } from './types';

const DosDontsBlockSelector = '[data-test-id="dos-donts-block"]';
const DosDontsHeading = '[data-test-id="dos-donts-heading"]';
const DosDontsContent = '[data-test-id="dos-donts-content"]';
const DosDontsIcon = '[data-test-id="dos-donts-icon"]';

describe("Dos & Don'ts Block", () => {
    it('renders a dos donts block', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {});

        mount(<DosDontsBlockWithStubs />);
        cy.get(DosDontsBlockSelector).should('exist');
    });

    it('renders an empty dos donts block in view mode', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {});

        mount(<DosDontsBlockWithStubs />);
        cy.get(DosDontsBlockSelector).find('textarea').should('be.disabled').should('be.empty');
        cy.get(DosDontsIcon).should('not.exist');
    });

    it('renders an empty dos donts block in edit mode', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            editorState: true,
            blockSettings: {
                style: DoDontStyle.Icons,
                dontIconChoice: ItemIconChoice.CHECKMARK,
                doIconChoice: ItemIconChoice.CHECKMARK,
            },
        });

        mount(<DosDontsBlockWithStubs />);
        cy.get(DosDontsBlockSelector).find('textarea[placeholder="Add a title"]').should('exist');
        cy.get(DosDontsBlockSelector).find('[data-slate-placeholder]').should('exist').contains('Add a description');
    });

    it('renders a dos donts block with the underline style', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            blockSettings: {
                style: DoDontStyle.Underline,
            },
        });

        mount(<DosDontsBlockWithStubs />);
        cy.get(DosDontsIcon).should('not.exist');
        cy.get(DosDontsHeading).next('hr').should('exist');
    });

    it('renders a dos donts block with the correct layout', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            blockSettings: {
                columns: 3,
                isCustomColumnGutter: true,
                customColumnGutterValue: '20px',
            },
        });

        mount(<DosDontsBlockWithStubs />);
        cy.get(DosDontsBlockSelector).should('have.class', 'lg:tw-grid-cols-3');
        cy.get(DosDontsBlockSelector).should('have.css', 'column-gap', '20px');
    });

    it('renders a dos donts block with the correct colors', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            blockSettings: {
                columns: 2,
                doColor: DO_COLOR_DEFAULT_VALUE,
                dontColor: DONT_COLOR_DEFAULT_VALUE,
            },
        });

        mount(<DosDontsBlockWithStubs />);
        cy.get(DosDontsHeading).first().should('have.css', 'color', 'rgb(0, 200, 165)');
        cy.get(DosDontsHeading).eq(1).should('have.css', 'color', 'rgb(255, 55, 90)');
    });

    it('writes content to a dos donts block', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            editorState: true,
        });

        mount(<DosDontsBlockWithStubs />);
        cy.get(DosDontsHeading).first().find('textarea').type('Do this', { force: true }).blur();
        cy.get(DosDontsHeading).first().find('textarea').contains('Do this');
        cy.get(DosDontsContent)
            .first()
            .find('[contenteditable=true]')
            .type('This is an example do description.', { force: true })
            .blur();
        cy.get(DosDontsContent).first().find('[contenteditable=true]').contains('This is an example do description.');
        cy.get(DosDontsHeading).eq(1).find('textarea').type('Dont do this', { force: true }).blur();
        cy.get(DosDontsHeading).eq(1).find('textarea').contains('Dont do this');
        cy.get(DosDontsContent)
            .eq(1)
            .find('[contenteditable=true]')
            .type('This is an example dont description.', { force: true })
            .blur();
        cy.get(DosDontsContent).eq(1).find('[contenteditable=true]').contains('This is an example dont description.');
    });
});
