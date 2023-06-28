/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { mount } from 'cypress/react18';
import { LinkComponent } from './LinkComponent';
import React from 'react';

const LINK_COMPONENT_ID = '[data-test-id="link-component"]'; // TODO: Add data-test-id
const TEXT_INPUT_ID = '[data-test-id="text-input"]';
const INPUT_LABEL_CONTAINER_ID = '[data-test-id="input-label-container"]';
const BUTTON_ID = '[data-test-id="button"]';
const CLEAR_ICON_ID = '[data-test-id="clear-icon"]';
const CHECKBOX_ID = '[data-test-id="checkbox-input"]';

describe('Link Component', () => {
    it('renders the link component', () => {
        const [LinkComponentWithStubs] = withAppBridgeBlockStubs(LinkComponent, {});
        mount(<LinkComponentWithStubs />);
        cy.get(LINK_COMPONENT_ID).should('exist');
    });

    it('renders the link components label, placeholder and info', () => {
        const [LinkComponentWithStubs] = withAppBridgeBlockStubs(LinkComponent, {});
        mount(<LinkComponentWithStubs label="Custom Label" info="Custom Info" placeholder="Custom Placeholder" />);
        cy.get(LINK_COMPONENT_ID).should('exist');
        cy.get(INPUT_LABEL_CONTAINER_ID).contains('Custom Label');
        cy.get(INPUT_LABEL_CONTAINER_ID).contains('Custom Info');
        cy.get(TEXT_INPUT_ID).should('have.attr', 'placeholder', 'Custom Placeholder');
    });

    it('renders the link component with a valid url', () => {
        const [LinkComponentWithStubs] = withAppBridgeBlockStubs(LinkComponent, {});
        mount(<LinkComponentWithStubs url="https://example.com" />);
        cy.get(LINK_COMPONENT_ID).should('exist');
        cy.get(TEXT_INPUT_ID).should('have.value', 'https://example.com');
    });

    it('renders with clear icon', () => {
        const [LinkComponentWithStubs] = withAppBridgeBlockStubs(LinkComponent, {});
        mount(<LinkComponentWithStubs url="https://frontify.com" clearable />);

        cy.get(CLEAR_ICON_ID).should('exist');
    });

    it('renders without clear icon', () => {
        const [LinkComponentWithStubs] = withAppBridgeBlockStubs(LinkComponent, {});
        mount(<LinkComponentWithStubs clearable={false} />);

        cy.get(TEXT_INPUT_ID).click({ force: true });
        cy.get(TEXT_INPUT_ID).type('https://frontify.com').type('{enter}');
        cy.get(CLEAR_ICON_ID).should('not.exist');
    });

    it('toggles checkbox on click', () => {
        const [LinkComponentWithStubs] = withAppBridgeBlockStubs(LinkComponent, {});
        mount(
            <LinkComponentWithStubs
                onToggleTab={cy.stub().as('onToggleTab')}
                url="https://frontify.com"
                openInNewTab={false}
            />
        );

        cy.get(CHECKBOX_ID).should('not.be.checked');
        cy.get(CHECKBOX_ID).click({ force: true });
        cy.get('@onToggleTab').should('be.called.with', true);
    });

    it('types into search field', () => {
        const [LinkComponentWithStubs] = withAppBridgeBlockStubs(LinkComponent, {});
        mount(<LinkComponentWithStubs onUrlChange={cy.stub().as('onUrlChange')} />);

        cy.get(TEXT_INPUT_ID).click({ force: true });
        cy.get(TEXT_INPUT_ID).type('https://frontify.com');
        cy.get('@onUrlChange').should('be.called.with', 'https://frontify.com');
    });

    it('shows internal link button', () => {
        const [LinkComponentWithStubs] = withAppBridgeBlockStubs(LinkComponent, {});
        mount(<LinkComponentWithStubs />);

        cy.get(BUTTON_ID).should('exist');
    });

    it('hides internal link button', () => {
        const [LinkComponentWithStubs] = withAppBridgeBlockStubs(LinkComponent, {});
        mount(<LinkComponentWithStubs hideInternalLinkButton />);

        cy.get(BUTTON_ID).should('not.exist');
    });
});
