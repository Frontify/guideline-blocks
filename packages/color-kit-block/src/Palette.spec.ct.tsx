/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe } from 'vitest';
import { mount } from '@cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';

import { Palette } from './Palette';

const ColorKitPaletteSelector = '[data-test-id="palette"]';
const ColorKitDownloadButtonSelector = '[data-test-id="download-button"]';

describe('Palette', () => {
    it('should render', () => {
        const [PaletteWithStubs] = withAppBridgeBlockStubs(Palette);
        mount(<PaletteWithStubs />);

        cy.get(ColorKitPaletteSelector).should('exist');
    });

    it('should not render color', () => {
        const [PaletteWithStubs] = withAppBridgeBlockStubs(Palette);
        mount(<PaletteWithStubs />);

        const downloadButton = cy.get(ColorKitDownloadButtonSelector);

        cy.spy(downloadButton, 'click');

        expect(downloadButton).to.be.called;
    });
});
