/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useState } from 'react';
import { CustomMetadataFactory } from './CustomMetadata';
import { MetadataProps } from './type';
import { OnChangeProps } from './Form/type';
import { Divider, LegacyStack, Validation } from '@frontify/fondue';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { DISCLAIMER_NAME, Disclaimer, StandardMetadataFactory } from './StandardMetadata';
import { useBlockSettings } from '@frontify/app-bridge';
import { Settings } from '../../types';
import { REQUIRED_FORM_DATA } from './StandardMetadata/constant';
import { useFormValidation } from './hooks/UseFormValidation';
import { useMetadataSettingsConfig } from './hooks/useMetadataSettingsConfig';

type MetaDataSubmitProps = {
    onSubmit: (formData: FormValues) => void;
    metadataConfiguration?: MetadataProps[];
    children?: React.ReactNode;
};

export type FormValues = {
    [key: string]: any;
};

export const Metadata: FC<MetaDataSubmitProps & BlockProps> = ({ onSubmit, children, appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const [initialValues, metadataConfiguration] = useMetadataSettingsConfig(blockSettings);
    const [formValues, setFormValues] = useState<FormValues>(initialValues);
    const [errorFields, setErrorFields] = useState<string[]>([]);
    const validateFormOrTriggerError = useFormValidation(formValues);

    const handleInputChange = ({ id, value }: OnChangeProps) => {
        setFormValues((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (validateFormOrTriggerError(REQUIRED_FORM_DATA, metadataConfiguration, setErrorFields, blockSettings)) {
            onSubmit(formValues);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <LegacyStack padding={'none'} spacing={'s'} direction={'column'}>
                {StandardMetadataFactory.getFormElements(blockSettings, handleInputChange, errorFields)}
                {CustomMetadataFactory.getFormElements(metadataConfiguration, handleInputChange, errorFields)}
                {blockSettings.disclaimer && (
                    <>
                        <Divider color="rgb(234, 235, 235)" />
                        <Disclaimer
                            appBridge={appBridge}
                            onChange={handleInputChange}
                            validation={errorFields.includes(DISCLAIMER_NAME) ? Validation.Error : Validation.Default}
                        />
                    </>
                )}
                {children}
            </LegacyStack>
        </form>
    );
};
