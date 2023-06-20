/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react18';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { OpenAiBlock } from './OpenAiBlock';

const OpenAiBlockSelector = '[data-test-id="openai-block"]';

describe('Example Block', () => {
    it('renders an example block', () => {
        const [OpenAiBlockWithStubs] = withAppBridgeBlockStubs(OpenAiBlock);

        mount(<OpenAiBlockWithStubs />);
        cy.get(OpenAiBlockSelector).should('exist');
    });
});
