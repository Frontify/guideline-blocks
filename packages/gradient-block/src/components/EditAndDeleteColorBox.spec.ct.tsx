/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { EditAndDeleteColorBox } from './EditAndDeleteColorBox';

const EditAndDeleteColorBoxSelector = '[data-test-id="edit-and-delete-color-box"]';

const activeColor = {
    color: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1,
    },
    position: 50,
};

const gradientColors = [
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        },
        position: 0,
    },
    {
        color: {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
        },
        position: 50,
    },
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        },
        position: 100,
    },
];

describe('EditAndDeleteColorBox', () => {
    it('renders an edit and delete color box', () => {
        mount(
            <EditAndDeleteColorBox
                color={activeColor}
                gradientColors={gradientColors}
                setColors={cy.stub().as('setColors')}
                setCurrentlyEditingPosition={cy.stub().as('setCurrentlyEditingPosition')}
                setShowColorModal={cy.stub().as('setShowColorModal')}
            />
        );
        cy.get(EditAndDeleteColorBoxSelector).should('exist');
    });
});
