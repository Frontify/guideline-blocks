/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DocumentApiDummy, getAppBridgeBlockStub } from '@frontify/app-bridge';
import { PluginComposer, TextStyles } from '@frontify/fondue';
import { mount } from 'cypress/react';
import { SinonStub } from 'cypress/types/sinon';
import React from 'react';
import { ButtonPlugin, LinkPlugin, RichTextEditor } from '.';
import { convertToRteValue } from '../../helpers';

const RteHtmlSelector = '[data-test-id="rte-content-html"]';
const RichTextSelector = '[data-test-id="rich-text-editor"]';
const ButtonSelector = '[data-test-id="button"]';
const ToolbarButtonSelector = '[data-testid="ToolbarButton"]';
const InternalDocumentLinkSelector = '[data-test-id="internal-link-selector-document-link"]';
const FloatingLinkModalSelector = '[data-test-id="floating-link-insert"]';
const FloatingButtonModalSelector = '[data-test-id="floating-button-insert"]';

const apiDocuments = [{ ...DocumentApiDummy.with(1), permanentLink: '/r/document' }];

const appBridge = getAppBridgeBlockStub({
    blockId: 1,
});

describe('RichTextEditor', () => {
    it('should render a rich text editor in edit mode', () => {
        mount(<RichTextEditor isEditing onBlur={cy.stub} />);
        cy.get(RichTextSelector).should('exist');
    });

    it('should render a rich text html in view mode', () => {
        mount(<RichTextEditor isEditing={false} onBlur={cy.stub} value="test" />);
        cy.get(RteHtmlSelector).should('exist');
    });

    it('should render a json value in view mode', () => {
        mount(
            <RichTextEditor
                isEditing={false}
                onBlur={cy.stub}
                value={convertToRteValue(TextStyles.ELEMENT_HEADING1, 'Test Heading')}
            />
        );
        cy.get(RteHtmlSelector).should('exist');
    });

    it('should render a html value in view mode', () => {
        mount(<RichTextEditor isEditing={false} onBlur={cy.stub} value="<p>Test Paragraph</p>" />);
        cy.get(RteHtmlSelector).should('exist');
    });

    it('should not render html output if value is empty', () => {
        mount(<RichTextEditor isEditing={false} onBlur={cy.stub} value="" />);
        cy.get(RteHtmlSelector).should('not.exist');
    });

    it('should not render html output if value is undefined', () => {
        mount(<RichTextEditor isEditing={false} onBlur={cy.stub} />);
        cy.get(RteHtmlSelector).should('not.exist');
    });

    it('should be able to select internal link', () => {
        (appBridge.getDocumentGroups as SinonStub) = cy.stub().returns([]);
        (appBridge.getAllDocuments as SinonStub) = cy.stub().returns(apiDocuments);

        mount(
            <RichTextEditor
                isEditing={true}
                onBlur={cy.stub}
                plugins={new PluginComposer().setPlugin([new LinkPlugin({ appBridge })])}
                value={convertToRteValue(TextStyles.ELEMENT_PARAGRAPH, 'This is a link')}
            />
        );
        cy.get(RichTextSelector).click();
        cy.get(RichTextSelector).type('{selectall}');
        cy.get(ToolbarButtonSelector).click();
        cy.get(ButtonSelector).first().click();
        cy.get(InternalDocumentLinkSelector).click();
        cy.get(ButtonSelector).last().click();
        cy.get(FloatingLinkModalSelector).find(ButtonSelector).last().click();
        cy.get(RichTextSelector).find('a[href="/r/document"]').should('exist');
    });

    it('should be able to select internal button link', () => {
        (appBridge.getDocumentGroups as SinonStub) = cy.stub().returns([]);
        (appBridge.getAllDocuments as SinonStub) = cy.stub().returns(apiDocuments);

        mount(
            <RichTextEditor
                isEditing={true}
                onBlur={cy.stub}
                plugins={new PluginComposer().setPlugin([new ButtonPlugin({ appBridge })])}
                value={convertToRteValue(TextStyles.ELEMENT_PARAGRAPH, 'This is a button')}
            />
        );
        cy.get(RichTextSelector).click();
        cy.get(RichTextSelector).type('{selectall}');
        cy.get(ToolbarButtonSelector).click();
        cy.get(ButtonSelector).first().click();
        cy.get(InternalDocumentLinkSelector).click();
        cy.get(ButtonSelector).last().click();
        cy.get(FloatingButtonModalSelector).find(ButtonSelector).last().click();
        cy.get(RichTextSelector).find('a[href="/r/document"]').should('exist');
    });
});
