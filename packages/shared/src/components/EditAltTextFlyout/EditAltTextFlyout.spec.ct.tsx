/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
// eslint-disable-next-line no-restricted-syntax
import * as React from 'react';

import { EditAltTextFlyout } from './EditAltTextFlyout';

const FlyoutMenu = '[data-test-id="flyout-menu"]';
const SaveButton = '[data-test-id="save-button"]';
const CancelButton = '[data-test-id="cancel-button"]';

describe('EditAltTextFlyout', () => {
    it('should render a flyout with correct values', () => {
        mount(
            <EditAltTextFlyout
                onSave={cy.stub().as('onSave')}
                setLocalAltText={cy.stub().as('setLocalAltText')}
                setShowAltTextMenu={cy.stub().as('setShowAltTextMenu')}
                showAltTextMenu
                defaultAltText="default alt text"
                localAltText="local alt text"
            />
        );
        cy.get(FlyoutMenu).should('exist');
        cy.get(SaveButton).click();
        cy.get('input').should('have.value', 'local alt text');
        cy.get('@onSave').should('be.calledOnce');
        cy.get('@setShowAltTextMenu').should('be.calledWith', false);
    });

    it('should reset the alt text to its default value after canceling the flyout', () => {
        mount(
            <EditAltTextFlyout
                onSave={cy.stub().as('onSave')}
                setLocalAltText={cy.stub().as('setLocalAltText')}
                setShowAltTextMenu={cy.stub().as('setShowAltTextMenu')}
                showAltTextMenu
                defaultAltText="default alt text"
                localAltText="local alt text"
            />
        );
        cy.get(CancelButton).click();
        cy.get('@setLocalAltText').should('be.calledWith', 'default alt text');
        cy.get('@setShowAltTextMenu').should('be.calledWith', false);
    });

    it('should save an empty string', () => {
        mount(
            <EditAltTextFlyout
                onSave={cy.stub().as('onSave')}
                setLocalAltText={cy.stub().as('setLocalAltText')}
                setShowAltTextMenu={cy.stub().as('setShowAltTextMenu')}
                showAltTextMenu
                defaultAltText="default alt text"
                localAltText="local alt text"
            />
        );
        cy.get('input').clear();
        cy.get('@setLocalAltText').should('be.calledWith', '');
    });

    it('should save a typed value alt text', () => {
        mount(
            <EditAltTextFlyout
                onSave={cy.stub().as('onSave')}
                setLocalAltText={cy.stub().as('setLocalAltText')}
                setShowAltTextMenu={cy.stub().as('setShowAltTextMenu')}
                showAltTextMenu
                defaultAltText="default alt text"
                localAltText=""
            />
        );
        cy.get('input').type('N');
        cy.get('@setLocalAltText').should('be.calledWith', 'N');
    });
});
