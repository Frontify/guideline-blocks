/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Button, ButtonType, CheckboxState, ChecklistDirection, Divider, MenuItemContentSize } from '@frontify/fondue';
import { Meta, Story } from '@storybook/react';
import { array, boolean, object, string } from 'yup';
import { FieldValues } from 'react-hook-form';
import {
    Form,
    FormCheckbox,
    FormChecklist,
    FormColorPicker,
    FormDropdown,
    FormMultiSelect,
    FormRichTextEditor,
    FormSlider,
    FormSwitch,
    FormTagInput,
    FormTextInput,
    FormTextarea,
} from '.';

export default {
    title: 'Styleguide/Form',
    component: Form,
    argTypes: {
        initialValues: {
            table: {
                disable: true,
            },
        },
        schema: {
            table: {
                disable: true,
            },
        },
        onSubmit: {
            table: {
                disable: true,
            },
        },
        keepHiddenValues: {
            table: {
                disable: true,
            },
        },
        onSubmitTrigger: {
            action: 'onSubmit',
        },
        onValidFieldChangeTrigger: {
            action: 'onChange',
        },
    },
} as Meta;

const onSubmitDefault = <T extends FieldValues>(arg: T) => arg;
const onValidFieldChange = (name: unknown, value: unknown) => ({ name, value });

interface FormStoryProp {
    onSubmitTrigger?: typeof onSubmitDefault;
    onValidFieldChangeTrigger?: typeof onValidFieldChange;
}

export const BasicFormSubmit: Story<FormStoryProp> = ({ onSubmitTrigger = onSubmitDefault }: FormStoryProp) => {
    return (
        <Form onSubmit={onSubmitTrigger}>
            <div className="tw-grid tw-gap-y-2.5 tw-mx-8 tw-my-4">
                <FormTextInput name="surname" placeholder={'Set your surname'} />
                <Button type={ButtonType.Submit}>Update Name</Button>
            </div>
        </Form>
    );
};

export const BasicFormSubmitWithBasicValidation: Story<FormStoryProp> = ({
    onSubmitTrigger = onSubmitDefault,
}: FormStoryProp) => {
    const VALIDATION_SCHEMA = object({ surname: string().min(5).required() });

    return (
        <Form onSubmit={onSubmitTrigger} schema={VALIDATION_SCHEMA}>
            <div className="tw-grid tw-gap-y-2.5 tw-mx-8 tw-my-4">
                <FormTextInput name="surname" placeholder={'Set your surname'} />
                <Button type={ButtonType.Submit}>Update Name</Button>
            </div>
        </Form>
    );
};

export const BasicFormSubmitWithCustomErrorText: Story<FormStoryProp> = ({
    onSubmitTrigger = onSubmitDefault,
}: FormStoryProp) => {
    const VALIDATION_SCHEMA = object({
        surname: string().min(5, 'Custom Validation Error Message').required('Custom Required Error Message'),
    });

    return (
        <Form onSubmit={onSubmitTrigger} schema={VALIDATION_SCHEMA}>
            <div className="tw-grid tw-gap-y-2.5 tw-mx-8 tw-my-4">
                <FormTextInput name="surname" placeholder={'Set your surname'} />
                <Button type={ButtonType.Submit}>Update Name</Button>
            </div>
        </Form>
    );
};

export const BasicOnChangeWithValidation: Story<FormStoryProp> = ({
    onValidFieldChangeTrigger = onValidFieldChange,
}: FormStoryProp) => {
    const VALIDATION_SCHEMA = object({ surname: string().min(2).required() });

    return (
        <Form onValidFieldChange={onValidFieldChangeTrigger} schema={VALIDATION_SCHEMA}>
            <FormTextInput name="surname" placeholder={'Set your surname'} />
        </Form>
    );
};

export const BasicOnChangeWithValidationCustomErrorText: Story<FormStoryProp> = ({
    onValidFieldChangeTrigger = onValidFieldChange,
}: FormStoryProp) => {
    const VALIDATION_SCHEMA = object({
        surname: string().min(3, 'This is a Custom error Message').required(),
    });

    return (
        <Form onValidFieldChange={onValidFieldChangeTrigger} schema={VALIDATION_SCHEMA}>
            <FormTextInput name="surname" placeholder={'Set your surname'} />
        </Form>
    );
};

export const MultipleOnChangeWithValidationAndCustomErrorText: Story<FormStoryProp> = ({
    onSubmitTrigger = onSubmitDefault,
    onValidFieldChangeTrigger = onValidFieldChange,
}: FormStoryProp) => {
    const schema = object({
        name: string().defined(),
        lastname: string().optional(),
        address: string().min(5).required(),
        city: string().min(3, 'This is a Custom error Message').required(),
        website: string().url().nullable(),
        email: string().email(),
    });

    return (
        <Form onSubmit={onSubmitTrigger} onValidFieldChange={onValidFieldChangeTrigger} schema={schema}>
            <div className="tw-grid tw-gap-y-2.5 tw-mx-8 tw-my-4">
                <FormTextInput name="name" placeholder={'Set your Name'} label={{ children: 'name' }} />
                <FormTextInput name="lastname" placeholder={'Set your lastname'} label={{ children: 'lastname' }} />
                <FormTextarea name="address" placeholder={'Set your address'} label={{ children: 'Address' }} />
                <FormTextInput name="city" placeholder={'Set your city'} label={{ children: 'City' }} />
                <FormTextInput name="website" placeholder={'Add your Website'} label={{ children: 'Website' }} />
                <FormTextInput name="email" placeholder={'Email'} label={{ children: 'Email' }} />
            </div>
            <Button type={ButtonType.Submit}>Update Form</Button>
        </Form>
    );
};

const SLIDER_ITEMS = [
    { id: 'item_1', value: '1' },
    { id: 'item_2', value: '2' },
];

const DROPDOWN_ITEMS = [
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

const CHECKBOXES = [
    {
        value: 'checkbox-1',
        label: 'Checklist - Checkbox label',
    },
    {
        value: 'checkbox-2',
        label: 'Checklist - Checkbox label',
        state: CheckboxState.Mixed,
    },
    {
        value: 'checkbox-3',
        label: 'Checklist - Checkbox label',
        note: 'Note about this input',
        disabled: true,
    },
];

const ITEMS = [
    {
        value: 'Checkbox label 1',
    },
    {
        value: 'Short tag',
    },
    {
        value: 'Checkbox label 2',
    },
    {
        value: 'Checkbox label 3',
    },
    {
        value: 'Tag 74',
    },
    {
        value: 'This is a long tag',
    },
];

export const AllTheFormElements: Story<FormStoryProp> = ({
    onSubmitTrigger = onSubmitDefault,
    onValidFieldChangeTrigger = onValidFieldChange,
}: FormStoryProp) => {
    const schema = object({
        name: string().defined(),
        lastname: string().optional(),
        switch: boolean(),
        slider: string(),
        richText: string(),
        multiselect: array().of(string()),
        dropdown: string(),
        FormColorPicker: string(),
        Checklist: array().of(string()),
        tags: array().of(string()).min(1),
    });

    return (
        <Form
            onSubmit={onSubmitTrigger}
            onValidFieldChange={onValidFieldChangeTrigger}
            schema={schema}
            initialValues={{
                slider: SLIDER_ITEMS[0].id,
            }}
        >
            <div className="tw-grid tw-gap-y-4.5 tw-mx-8 tw-my-4 tw-gap-m">
                <FormTextInput name="name" placeholder={'Set your Name'} label={{ children: 'TextInput' }} />
                <FormTextarea name="address" placeholder={'Set your address'} label={{ children: 'Textarea' }} />
                <Divider />
                <FormSwitch name="switch" label={'Switch'} />
                <FormSlider name="slider" items={SLIDER_ITEMS} label={{ children: 'Slider' }} />
                <div className="tw-border-2 tw-border-black-40 tw-p-2">
                    <FormRichTextEditor name="richText" label={{ children: 'RichTextEditor' }} />
                </div>
                <Divider />
                <FormTagInput
                    name="tags"
                    label={{ children: 'Tags', required: true }}
                    helper={{ text: 'Press Enter to add tag' }}
                />
                <FormDropdown name="Dropdown" menuBlocks={DROPDOWN_ITEMS} label={{ children: 'Dropdown' }} />
                <FormColorPicker name="ColorPicker" label={{ children: 'ColorPicker' }} />
                <Divider />
                <FormMultiSelect name="multiselect" items={ITEMS} label={{ children: 'MultiSelect' }} />
                <FormChecklist
                    name="Checklist"
                    checkboxes={CHECKBOXES}
                    direction={ChecklistDirection.Vertical}
                    label={{ children: 'Checklist' }}
                />
                <FormCheckbox name="Checkbox" value={'VALUE'} label={'Checkbox'} />
                <Divider />
                <Button type={ButtonType.Submit}>Trigger onSubmit</Button>
            </div>
        </Form>
    );
};
