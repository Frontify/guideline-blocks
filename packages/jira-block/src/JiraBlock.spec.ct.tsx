/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { JiraBlock } from './JiraBlock';

const JiraBlockSelector = '[data-test-id="jira-block"]';

describe('Jira Block', () => {
    it('renders an Jira block', () => {
        const [JiraBlockWithStubs] = withAppBridgeBlockStubs(JiraBlock);

        mount(<JiraBlockWithStubs />);
        cy.get(JiraBlockSelector).should('exist');
    });
});
