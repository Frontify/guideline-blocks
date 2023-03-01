/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { UploadPlaceholder } from './UploadPlaceholder';

const UploadPlaceholderSelector = '[data-test-id="upload-placeholder"]';
const LoadingCircle = '[data-test-id="loading-circle"]';

describe('Upload Placeholder', () => {
    it('renders an upload placeholder', () => {
        mount(
            <UploadPlaceholder
                onUploadClick={cy.stub()}
                onAssetChooseClick={cy.stub()}
                loading={false}
                onFilesDrop={cy.stub()}
            />
        );
        cy.get(UploadPlaceholderSelector).should('exist');
    });

    it('renders an placeholder in loading', () => {
        mount(
            <UploadPlaceholder
                onUploadClick={cy.stub()}
                onAssetChooseClick={cy.stub()}
                loading={true}
                onFilesDrop={cy.stub()}
            />
        );
        cy.get(LoadingCircle).should('exist');
    });
});
