/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { AudioBlock } from './AudioBlock';

const AudioBlockSelector = '[data-test-id="audio-block"]';

describe('Audio Block', () => {
    it('renders an audio block', () => {
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock);

        mount(<AudioBlockWithStubs />);
        cy.get(AudioBlockSelector).should('exist');
    });
});
