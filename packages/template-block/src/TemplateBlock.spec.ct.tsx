/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { getAppBridgeBlockStub, TemplateDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { TemplateBlock } from './TemplateBlock';
import { SETTING_ID } from './constants';

const TEMPLATE_BLOCK_CONTAINER_SELECTOR = '[data-test-id="template-block-container"]';
const TEMPLATE_BLOCK_SELECTOR = '[data-test-id="template-block"]';
const TEMPLATE_PREVIEW_SELECTOR = '[data-test-id="template-block-preview-img"]';
const TEMPLATE_TITLE_SELECTOR = '[data-test-id="template-block-title"]';
const TEMPLATE_TITLE_EDIT_SELECTOR = '[data-test-id="template-block-title-edit"]';
const TEMPLATE_DESCRIPTION_SELECTOR = '[data-test-id="template-block-description"]';
const TEMPLATE_DESCRIPTION_EDIT_SELECTOR = '[data-test-id="template-block-description-edit"]';
const TEMPLATE_PAGE_COUNT_SELECTOR = '[data-test-id="template-block-page-count"]';
const TEMPLATE_NEW_PUBLICATION_SELECTOR = '[data-test-id="template-block-new-publication-btn"]';
const TEMPLATE_CHOOSER_BTN_SELECTOR = '[data-test-id="template-block-preview-templatechooser-btn"]';

const TEMPLATE_ID = 13;

describe('Template Block', () => {
    it('renders an empty template block', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock);

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_CONTAINER_SELECTOR).should('exist');
        cy.get(TEMPLATE_BLOCK_SELECTOR).should('not.exist');
    });

    it('renders a template block with provided template', () => {
        const templateDummy = TemplateDummy.with(TEMPLATE_ID);
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            blockTemplates: {
                template: [templateDummy],
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_SELECTOR).should('exist');
        cy.get(TEMPLATE_PREVIEW_SELECTOR).should('exist');
        cy.get(TEMPLATE_TITLE_SELECTOR).should('exist');
        cy.get(TEMPLATE_DESCRIPTION_SELECTOR).should('exist');
        cy.get(TEMPLATE_PAGE_COUNT_SELECTOR).should('exist');
        cy.get(TEMPLATE_NEW_PUBLICATION_SELECTOR).should('exist');
    });

    it('renders template block if in edit mode', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_CONTAINER_SELECTOR).should('exist');
        cy.get(TEMPLATE_BLOCK_SELECTOR).should('exist');
        cy.get(TEMPLATE_NEW_PUBLICATION_SELECTOR).should('exist');
        cy.get(TEMPLATE_NEW_PUBLICATION_SELECTOR).should('be.disabled');
        cy.get(TEMPLATE_CHOOSER_BTN_SELECTOR).should('exist');
        cy.get(TEMPLATE_TITLE_EDIT_SELECTOR).should('exist');
        cy.get(TEMPLATE_DESCRIPTION_EDIT_SELECTOR).should('exist');
        cy.get(TEMPLATE_PAGE_COUNT_SELECTOR).should('exist');
    });

    it('triggers openTemplateChooser in edit mode', () => {
        const [TemplateBlockWithStubs, appBridge] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_CHOOSER_BTN_SELECTOR).should('exist');
        cy.get(TEMPLATE_CHOOSER_BTN_SELECTOR).click();
        expect(appBridge.openTemplateChooser).to.be.calledOnce;
    });
});
