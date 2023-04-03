/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { mount } from 'cypress/react';

import { TextStyles } from '@frontify/fondue';

import { RichTextBlock } from './';
import { convertToRteValue } from '../../helpers';

const RteHtmlSelector = '[data-test-id="rte-content-html"]';
const RichTextSelector = '[data-test-id="rich-text-editor"]';

describe('RichTextBlock', () => {
    it('should renders rich text editor as editor', () => {
        mount(<RichTextBlock settingsId="test" isEditing setBlockSettings={cy.stub} />);
        cy.get(RichTextSelector).should('exist');
    });

    it('should renders rich text html as viewer', () => {
        mount(<RichTextBlock settingsId="test" isEditing={false} setBlockSettings={cy.stub} value="test" />);
        cy.get(RteHtmlSelector).should('exist');
    });

    it('should render rich text html as viewer if value is json', () => {
        mount(
            <RichTextBlock
                settingsId="test"
                isEditing={false}
                setBlockSettings={cy.stub}
                value={convertToRteValue(TextStyles.ELEMENT_HEADING1, 'Test Heading')}
            />
        );
        cy.get(RteHtmlSelector).should('exist');
    });

    it('should render rich text html as viewer if value is html', () => {
        mount(
            <RichTextBlock
                settingsId="test"
                isEditing={false}
                setBlockSettings={cy.stub}
                value="<p>Test Paragraph</p>"
            />
        );
        cy.get(RteHtmlSelector).should('exist');
    });

    it('should not render rich text html as viewer if value is empty string', () => {
        mount(<RichTextBlock settingsId="test" isEditing={false} setBlockSettings={cy.stub} value="" />);
        cy.get(RteHtmlSelector).should('not.exist');
    });

    it('should not render rich text html as viewer if value is undefined', () => {
        mount(<RichTextBlock settingsId="test" isEditing={false} setBlockSettings={cy.stub} />);
        cy.get(RteHtmlSelector).should('not.exist');
    });
});
