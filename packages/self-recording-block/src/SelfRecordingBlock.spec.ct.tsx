/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { SelfRecordingBlock } from './SelfRecordingBlock';

const SelfRecordingBlockSelector = '[data-test-id="example-block"]';

describe('Self Recording Block', () => {
    it('renders a self recording block', () => {
        const [SelfRecordingBlockWithStubs] = withAppBridgeBlockStubs(SelfRecordingBlock);

        mount(<SelfRecordingBlockWithStubs />);
        cy.get(SelfRecordingBlockSelector).should('exist');
    });
});
