/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { mount } from 'cypress/react';
import { ImageBlock } from './ImageBlock';

const ImageBlockSelector = '[data-test-id="text-block"]';

describe('Image Block', () => {
    it('renders an image block', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {});

        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockSelector).should('exist');
    });
});
