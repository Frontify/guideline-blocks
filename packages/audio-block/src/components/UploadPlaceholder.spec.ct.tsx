/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { UploadPlaceholder } from './UploadPlaceholder';

const UploadPlaceholderSelector = '[data-test-id="upload-placeholder"]';

describe('Audio Block Upload Placeholder', () => {
    it('renders an audio block', () => {
        const [UploadPlaceholderBlockWithStubs] = withAppBridgeBlockStubs(UploadPlaceholder);

        mount(<UploadPlaceholderBlockWithStubs />);
        cy.get(UploadPlaceholderSelector).should('exist');
    });
});
