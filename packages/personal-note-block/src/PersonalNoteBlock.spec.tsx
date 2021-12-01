/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import PersonalNoteBlock from '.';

const PersonalNoteBlockSelector = '[data-test-id="personal-note-block"]';

it('renders a personal note block', () => {
    const [PersonalNoteBlockWithStubs] = withAppBridgeStubs(PersonalNoteBlock, {});

    mount(<PersonalNoteBlockWithStubs />);
    cy.get(PersonalNoteBlockSelector).should('exist');
});
