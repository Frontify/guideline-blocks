/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FormColorPicker, FormTextInput } from './Form';

export const ColorInputForm = () => (
    <>
        <FormTextInput name="id" label={{ children: 'ID' }} placeholder="ID" />
        <FormTextInput name="label" label={{ children: 'Label' }} placeholder="Label" />
        <FormTextInput name="info" label={{ children: 'Info' }} placeholder="Info" />\
        <FormColorPicker name="defaultValue" label={{ children: 'Default Value' }} />
    </>
);
