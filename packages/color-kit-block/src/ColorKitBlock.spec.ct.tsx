/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { ColorKitBlock } from './ColorKitBlock';

const ColorKitBlockSelector = '[data-test-id="color-kit-block"]';
const ColorKitDownloadButtonSelector = '[data-test-id="download-button"]';

describe('Color Kit block', () => {
    beforeEach(() => {
        const [ColorKitBlockWithStubs] = withAppBridgeBlockStubs(ColorKitBlock);
        mount(<ColorKitBlockWithStubs />);
    });

    it('renders', () => {
        cy.get(ColorKitBlockSelector).should('exist');
    });

    it('can click on and download palettes as zip', () => {
        cy.get(ColorKitDownloadButtonSelector).should('have.attr', 'href').and('include', 'zip');
    });
});
