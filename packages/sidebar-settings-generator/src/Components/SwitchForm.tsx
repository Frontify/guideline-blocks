/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FormSwitch, FormTextInput } from './Form';

export const SwitchForm = () => (
    <>
        <FormTextInput name="id" label={{ children: 'ID' }} placeholder="ID" />
        <FormTextInput name="label" label={{ children: 'Label' }} placeholder="Label" />
        <FormTextInput name="switchLabel" label={{ children: 'Switch Label' }} placeholder="Switch Label" />
        <FormTextInput name="info" label={{ children: 'Info' }} placeholder="Info" />
        <FormSwitch name="defaultValue" label="Default Value" />
    </>
);
