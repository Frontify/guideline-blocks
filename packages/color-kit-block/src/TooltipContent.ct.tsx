/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { describe } from 'vitest';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';

import { ColorKitBlock } from './ColorKitBlock';

const ColorKitBlockSelector = '[data-test-id="color-kit-block"]';
const ColorKitDownloadButtonSelector = '[data-test-id="download-button"]';

describe('Color Kit block', () => {
    beforeEach(() => {
        const [ExampleBlockWithStubs] = withAppBridgeBlockStubs(ColorKitBlock);
        mount(<ExampleBlockWithStubs />);
    });

    it('renders', () => {
        cy.get(ColorKitBlockSelector).should('exist');
    });

    it('triggers download button', () => {
        const downloadButton = cy.get(ColorKitDownloadButtonSelector);

        cy.spy(downloadButton, 'click');

        expect(downloadButton).to.be.called;
    });
});
