/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import StorybookBlock from '.';

const StorybookBlockSelector = '[data-test-id="storybook-block"]';

it('renders a storybook block', () => {
    const [StorybookBlockWithStubs] = withAppBridgeStubs(StorybookBlock, {});

    mount(<StorybookBlockWithStubs />);
    cy.get(StorybookBlockSelector).should('exist');
});
