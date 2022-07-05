/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextInputType } from '@frontify/fondue';
import { capitalize } from 'lodash-es';
import { FormDropdown, FormSwitch, FormTextInput } from './Form';

export const InputForm = () => (
    <>
        <FormTextInput name="id" label={{ children: 'ID' }} placeholder="ID" />
        <FormDropdown
            name="inputType"
            label={{ children: 'Input Type' }}
            menuBlocks={[
                {
                    id: '1',
                    menuItems: Object.values(TextInputType).map((type) => ({
                        id: type,
                        title: capitalize(type),
                    })),
                },
            ]}
        />
        <FormTextInput name="placeholder" label={{ children: 'Placeholder' }} placeholder="Placeholder" />
        <FormTextInput name="defaultValue" label={{ children: 'Default Value' }} placeholder="Default Value" />
        <FormTextInput name="label" label={{ children: 'Label' }} placeholder="Label" />
        <FormTextInput name="info" label={{ children: 'Info' }} placeholder="Info" />
        <FormSwitch name="disabled" label="Disabled" />
        <FormSwitch name="clearable" label="Clearable" />
    </>
);
