/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import DosDontsBlock from '.';

const DosDontsBlockSelector = '[data-test-id="dos-donts-block"]';

it("renders a do's & dont's block", () => {
    const [DosDontsBlockWithStubs] = withAppBridgeStubs(DosDontsBlock, {});

    mount(<DosDontsBlockWithStubs />);
    cy.get(DosDontsBlockSelector).should('exist');
});
