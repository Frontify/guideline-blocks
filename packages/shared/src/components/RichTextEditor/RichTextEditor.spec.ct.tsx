/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { mount } from 'cypress/react18';

import { TextStyles } from '@frontify/fondue';

import { RichTextEditor } from '.';
import { convertToRteValue } from '../../helpers';

const RteHtmlSelector = '[data-test-id="rte-content-html"]';
const RichTextSelector = '[data-test-id="rich-text-editor"]';

describe('RichTextEditor', () => {
    it('should renders rich text editor as editor', () => {
        mount(<RichTextEditor isEditing onBlur={cy.stub} />);
        cy.get(RichTextSelector).should('exist');
    });

    it('should renders rich text html as viewer', () => {
        mount(<RichTextEditor isEditing={false} onBlur={cy.stub} value="test" />);
        cy.get(RteHtmlSelector).should('exist');
    });

    it('should render rich text html as viewer if value is json', () => {
        mount(
            <RichTextEditor
                isEditing={false}
                onBlur={cy.stub}
                value={convertToRteValue(TextStyles.ELEMENT_HEADING1, 'Test Heading')}
            />
        );
        cy.get(RteHtmlSelector).should('exist');
    });

    it('should render rich text html as viewer if value is html', () => {
        mount(<RichTextEditor isEditing={false} onBlur={cy.stub} value="<p>Test Paragraph</p>" />);
        cy.get(RteHtmlSelector).should('exist');
    });

    it('should not render rich text html as viewer if value is empty string', () => {
        mount(<RichTextEditor isEditing={false} onBlur={cy.stub} value="" />);
        cy.get(RteHtmlSelector).should('not.exist');
    });

    it('should not render rich text html as viewer if value is undefined', () => {
        mount(<RichTextEditor isEditing={false} onBlur={cy.stub} />);
        cy.get(RteHtmlSelector).should('not.exist');
    });
});
