/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { FormControlStyle, ON_SAVE_DELAY_IN_MS } from '@frontify/fondue';
import { useMemo } from 'react';
import { Form } from '../Form';
import { FormRichTextEditor as RichTextEditorComponent } from './RichTextEditor';
import { FormRichTextEditorProps } from './types';

const RTE_INPUT_ID = "[data-test-id='rich-text-editor']";
const RTE_TOOLBAR_ID = '[data-test-id=toolbar]';
const RTE_EDITOR_ID = "[data-slate-editor='true']";
const LABEL_ID = "[data-test-id='input-label']";
const PLACEHOLDER_ID = "[data-slate-placeholder='true']";
const EXTRA_ID = '[data-test-id=form-control-extra]';
const HELPER_TEXT_ID = '[data-test-id=form-control-helper-text]';
const TEXT_MARK_BUTTONS = '[data-test-id=toolbar-group-1]';

const RTE_INPUT_NAME = 'rich-text-editor';
const RTE_TEST_ID = 'rich-text-editor-id';

const TEST_INPUT = 'Lorem ipsum';
const TEST_LABEL = 'LABEL';
const TEST_HELPER = 'HELPER';
const TEST_EXTRA = 'EXTRA';

const TRANSFORMER_VALUE = 'TEST';

const FormRichTextEditor = ({
    onFormUpdated = cy.stub(),
    value = '',
    name = RTE_INPUT_NAME,
    ...props
}: Partial<FormRichTextEditorProps> & { value?: string; onFormUpdated?: () => void }) => {
    const initialValues = useMemo(() => ({ [name]: value }), [name, value]);

    return (
        <Form onValidFieldChange={onFormUpdated} initialValues={initialValues}>
            <RichTextEditorComponent name={name} {...props} />
        </Form>
    );
};

describe('FormRichTextEditor', () => {
    it('renders without crashing', () => {
        mount(<FormRichTextEditor />);
        cy.get(RTE_INPUT_ID).should('exist');
    });

    it('renders toolbar on text select', () => {
        mount(<FormRichTextEditor />);
        cy.get(RTE_EDITOR_ID)
            .click()
            .type(TEST_INPUT, { delay: 5 })
            .type('{selectAll}', { force: true })
            .wait(ON_SAVE_DELAY_IN_MS);
        cy.get(RTE_TOOLBAR_ID).should('be.visible');
    });

    it('updates form when input is changed', () => {
        const onFormUpdatedStub = cy.stub();

        mount(<FormRichTextEditor onFormUpdated={onFormUpdatedStub} />);

        cy.get(RTE_EDITOR_ID).click().type(TEST_INPUT).wait(ON_SAVE_DELAY_IN_MS);
        cy.wrap(onFormUpdatedStub).should(
            'have.been.calledWith',
            RTE_INPUT_NAME,
            `[{"type":"p","children":[{"text":"${TEST_INPUT}"}]}]`
        );
    });

    it('updates form when toolbar button is clicked', () => {
        const onFormUpdatedStub = cy.stub();

        mount(<FormRichTextEditor onFormUpdated={onFormUpdatedStub} />);

        cy.get(RTE_EDITOR_ID).click().type(TEST_INPUT, { delay: 5 }).wait(ON_SAVE_DELAY_IN_MS);
        cy.wrap(onFormUpdatedStub).should(
            'have.been.calledWith',
            RTE_INPUT_NAME,
            `[{"type":"p","children":[{"text":"${TEST_INPUT}"}]}]`
        );
        cy.get(RTE_EDITOR_ID).click().type('{selectall}', { force: true }).wait(ON_SAVE_DELAY_IN_MS);

        cy.get(TEXT_MARK_BUTTONS).children().eq(0).click().wait(ON_SAVE_DELAY_IN_MS);

        cy.wrap(onFormUpdatedStub).should('have.been.calledTwice');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const [key, value] = stub.args[stub.args.length - 1];
            expect(value).to.eq(`[{"type":"p","children":[{"text":"${TEST_INPUT}","bold":true}]}]`);
            expect(key).to.eq(RTE_INPUT_NAME);
        });
    });

    it('blurs the input and calls onBlur', () => {
        const onBlurStub = cy.stub();
        mount(<FormRichTextEditor onBlur={onBlurStub} />);

        cy.get(RTE_EDITOR_ID).click().type(TEST_INPUT).wait(ON_SAVE_DELAY_IN_MS).blur();
        cy.wrap(onBlurStub).should('have.been.calledWith', `[{"type":"p","children":[{"text":"${TEST_INPUT}"}]}]`);
    });

    it('makes the input readonly', () => {
        mount(<FormRichTextEditor readonly={true} />);

        cy.get('[contenteditable=false]').should('exist');
    });

    it('renders a placeholder', () => {
        mount(<FormRichTextEditor placeholder={TEST_INPUT} />);

        cy.get(PLACEHOLDER_ID).should('exist');
        cy.get(PLACEHOLDER_ID).contains(TEST_INPUT);
    });

    it('applies the id to the label', () => {
        mount(<FormRichTextEditor id={RTE_TEST_ID} label={{ children: 'label' }} />);

        cy.get(LABEL_ID).should('have.attr', 'for', RTE_TEST_ID);
    });

    it('forwards correct properties to form controller', () => {
        mount(
            <FormRichTextEditor
                style={FormControlStyle.Danger}
                label={{ children: TEST_LABEL }}
                helper={{ text: TEST_HELPER }}
                extra={TEST_EXTRA}
            />
        );

        cy.get(LABEL_ID).should('have.text', TEST_LABEL);
        cy.get(HELPER_TEXT_ID).should('have.text', TEST_HELPER).and('have.class', 'tw-text-red-60');
        cy.get(EXTRA_ID).should('have.text', TEST_EXTRA);
    });

    it('correctly applies transformers', () => {
        const onFormUpdatedStub = cy.stub();

        mount(
            <FormRichTextEditor
                onFormUpdated={onFormUpdatedStub}
                value={TRANSFORMER_VALUE}
                transformers={{
                    in: (value) => `<p>${value}</p>`,
                    out: (value = '') => JSON.parse(value)?.[0].children?.[0].text,
                }}
            />
        );

        cy.get(RTE_EDITOR_ID).click().wait(ON_SAVE_DELAY_IN_MS);
        cy.get(RTE_EDITOR_ID).should('have.text', TRANSFORMER_VALUE);
        cy.wrap(onFormUpdatedStub).should('have.been.calledWith', RTE_INPUT_NAME, TRANSFORMER_VALUE);
    });
});
