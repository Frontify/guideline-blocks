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
});
