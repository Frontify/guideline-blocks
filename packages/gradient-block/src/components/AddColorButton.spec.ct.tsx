/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { AddColorButton } from './AddColorButton';

const AddColorButtonSelector = '[data-test-id="add-color-button"]';

describe('AddColorButton', () => {
    it('renders an add color button', () => {
        mount(
            <AddColorButton
                blockWidth={800}
                addButtonPositionLeft={42}
                setShowColorModal={cy.stub()}
                setCurrentlyEditingPosition={cy.stub()}
            />
        );
        cy.get(AddColorButtonSelector).should('exist');
    });

    it('renders color with position left', () => {
        mount(
            <AddColorButton
                blockWidth={800}
                addButtonPositionLeft={42}
                setShowColorModal={cy.stub()}
                setCurrentlyEditingPosition={cy.stub()}
            />
        );
        cy.get(AddColorButtonSelector).should('have.css', 'left', '42px');
    });

    it('add color button, click calls functions', () => {
        const setShowColorModalSpy = cy.spy().as('setShowColorModal');
        const setCurrentlyEditingPositionSpy = cy.spy().as('setCurrentlyEditingPosition');
        mount(
            <AddColorButton
                blockWidth={800}
                addButtonPositionLeft={42}
                setShowColorModal={setShowColorModalSpy}
                setCurrentlyEditingPosition={setCurrentlyEditingPositionSpy}
            />
        );

        cy.get(AddColorButtonSelector).click();
        cy.get('@setShowColorModal').should('have.been.calledWith', true);
        cy.get('@setCurrentlyEditingPosition').should('have.been.calledWith', 5.25);
    });
});
