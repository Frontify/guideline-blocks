/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import {
    DropdownAlignment,
    DropdownPosition,
    DropdownSize,
    FormControlStyle,
    IconIcon,
    MenuItemContentSize,
    Validation,
    validationClassMap,
} from '@frontify/fondue';
import { useMemo } from 'react';
import { Form } from '../Form';
import { FormDropdown as FormDropdownComponent } from './Dropdown';
import { FormDropdownProps } from './types';

const CLEAR_ICON_ID = '[data-test-id="dropdown-clear-button"]';
const LABEL_ID = "[data-test-id='input-label']";
const DECORATOR_ID = '[data-test-id="menu-item-decorator"]';
const EXTRA_ID = '[data-test-id=form-control-extra]';
const HELPER_TEXT_ID = '[data-test-id=form-control-helper-text]';
const DROPDOWN_TRIGGER_ID = '[data-test-id=dropdown-trigger]';
const TRIGGER_ID = '[data-test-id=trigger]';
const MENU_ITEM_ID = '[data-test-id=menu-item]';
const MENU_ITEM_TITLE_ID = '[data-test-id="menu-item-title"]';
const DROPDOWN_MENU_ID = '[data-test-id="dropdown-menu"]';

const TEST_LABEL = 'LABEL';
const TEST_HELPER = 'HELPER';
const TEST_EXTRA = 'EXTRA';
const TEST_ID = 'ID';
const DEFAULT_NAME = 'dropdown';

const ITEMS = [
    {
        id: 'small-block',
        menuItems: [
            {
                id: '1',
                title: 'Small',
                size: MenuItemContentSize.Small,
            },
            {
                id: '2',
                title: 'Small second',
                size: MenuItemContentSize.Small,
            },
        ],
    },
];

const FIRST_ITEM_ID = ITEMS[0].menuItems[0].id;
const SECOND_ITEM_ID = ITEMS[0].menuItems[1].id;
const SECOND_ITEM_TEXT = ITEMS[0].menuItems[1].title;
const TRANSFORMER_VALUE = ['2'];

const FormDropdown = ({
    onFormUpdated = cy.stub(),
    value = '',
    name = DEFAULT_NAME,
    menuBlocks = ITEMS,
    ...props
}: Partial<FormDropdownProps> & { value?: string | string[]; onFormUpdated?: () => void }) => {
    const initialValues = useMemo(() => ({ [name]: value }), [name, value]);

    return (
        <Form onValidFieldChange={onFormUpdated} initialValues={initialValues}>
            <FormDropdownComponent name={name} menuBlocks={menuBlocks} {...props} />
        </Form>
    );
};

describe('FormDropdown', () => {
    it('renders without crashing', () => {
        mount(<FormDropdown />);

        cy.get(DROPDOWN_TRIGGER_ID).should('exist');
    });

    it('updates form when dropdown is changed', () => {
        const onFormUpdatedStub = cy.stub();

        mount(<FormDropdown onFormUpdated={onFormUpdatedStub} />);

        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(MENU_ITEM_ID).should('exist');
        cy.get(MENU_ITEM_ID).first().click();
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const [key, value] = stub.args[0];
            expect(value).to.eq(FIRST_ITEM_ID);
            expect(key).to.eq(DEFAULT_NAME);
        });
    });

    it('uses form state and displays current value', () => {
        const onFormUpdatedStub = cy.stub();

        mount(<FormDropdown onFormUpdated={onFormUpdatedStub} value={SECOND_ITEM_ID} />);

        cy.get(DROPDOWN_TRIGGER_ID).should('have.text', SECOND_ITEM_TEXT);
    });

    it('updates form when dropdown cleared and calls onChange', () => {
        const onFormUpdatedStub = cy.stub();
        mount(<FormDropdown value={FIRST_ITEM_ID} onFormUpdated={onFormUpdatedStub} clearable={true} />);

        cy.get(CLEAR_ICON_ID).click();
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const [key, value] = stub.args[0];
            expect(value).to.eq('');
            expect(key).to.eq(DEFAULT_NAME);
        });
    });

    it('applies validation style to dropdown', () => {
        mount(<FormDropdown style={FormControlStyle.Danger} />);

        cy.get(TRIGGER_ID).should('have.class', validationClassMap[Validation.Error]);
    });

    it('disables the dropdown', () => {
        mount(<FormDropdown disabled={true} />);

        cy.get(TRIGGER_ID).should('have.class', 'tw-pointer-events-none');
    });

    it('applies the same id to dropdown and label', () => {
        mount(<FormDropdown id={TEST_ID} label={{ children: 'label' }} />);

        cy.get(LABEL_ID).should('have.attr', 'for', TEST_ID);
        cy.get(DROPDOWN_TRIGGER_ID).should('have.id', TEST_ID);
    });

    it('forwards necessary props to dropdown', () => {
        cy.viewport(550, 220);
        mount(
            <FormDropdown
                clearable={true}
                decorator={<IconIcon />}
                placeholder={TEST_ID}
                size={DropdownSize.Large}
                autoResize={false}
                alignment={DropdownAlignment.End}
                position={DropdownPosition.Top}
            />
        );

        cy.get(MENU_ITEM_TITLE_ID).should('have.text', TEST_ID);
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(DROPDOWN_MENU_ID).then(($el) => {
            const { height } = $el[0].getBoundingClientRect();
            cy.viewport(550, 250);
            cy.get(DROPDOWN_MENU_ID).then(($updatedEl) => {
                const { height: newHeight } = $updatedEl[0].getBoundingClientRect();
                expect(height).to.equal(newHeight);
            });
        });
        cy.get(MENU_ITEM_ID).first().click({ force: true });
        cy.get(CLEAR_ICON_ID).should('be.visible');
        cy.get(DECORATOR_ID).should('be.visible');
        cy.get(TRIGGER_ID).children().last().should('have.class', 'tw-right-5 tw-gap-1.5');
    });

    it('forwards correct properties to form controller', () => {
        mount(
            <FormDropdown
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
            <FormDropdown
                value={TRANSFORMER_VALUE}
                onFormUpdated={onFormUpdatedStub}
                transformers={{ in: (value) => value[0], out: (value) => [value] }}
            />
        );

        cy.get(DROPDOWN_TRIGGER_ID).should('have.text', SECOND_ITEM_TEXT);
        cy.get(DROPDOWN_TRIGGER_ID).click();
        cy.get(MENU_ITEM_ID).should('exist');
        cy.get(MENU_ITEM_ID).first().click();
        cy.wrap(onFormUpdatedStub).should('have.been.calledOnce');
        cy.wrap(onFormUpdatedStub).then((stub) => {
            const value = stub.args[0][1];
            expect(value).to.have.length(1);
            expect(value[0]).to.equal(FIRST_ITEM_ID);
        });
    });
});
