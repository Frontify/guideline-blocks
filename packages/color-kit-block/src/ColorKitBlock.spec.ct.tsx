/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount, mountHook } from '@cypress/react';
import { useColorPalettes, withAppBridgeBlockStubs } from '@frontify/app-bridge';

import { ColorKitBlock } from './ColorKitBlock';

const ColorKitBlockSelector = '[data-test-id="color-kit-block"]';
const ColorKitDownloadButtonSelector = '[data-test-id="download-button"]';

describe('Color Kit block', () => {
    beforeEach(() => {
        const [ColorKitBlockWithStubs, appBridge] = withAppBridgeBlockStubs(ColorKitBlock);
        mountHook(() => useColorPalettes(appBridge));
        mount(<ColorKitBlockWithStubs />);
    });

    it('should render', () => {
        cy.get(ColorKitBlockSelector).should('exist');
    });

    it('triggers download button', () => {
        const downloadButton = cy.get(ColorKitDownloadButtonSelector);

        const spy = cy.spy(downloadButton, 'click');

        expect(spy).to.be.called;
    });
});
