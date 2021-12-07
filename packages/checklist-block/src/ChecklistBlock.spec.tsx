/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import ChecklistBlock from '.';

const CHECKLIST_BLOCK = '[data-test-id="divider-block"]';

it('renders if block settings is empty', () => {
    const [StubbedChecklistBlock] = withAppBridgeStubs(ChecklistBlock, { blockSettings: {} });

    mount(<StubbedChecklistBlock />);
    cy.get(CHECKLIST_BLOCK).should('exist');
});
