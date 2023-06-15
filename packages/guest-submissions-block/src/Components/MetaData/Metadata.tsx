/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, FormEvent, useState } from 'react';
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
import { CopyRightStatus } from './StandardMetadata/type';

type MetaDataSubmitProps = {
    onSubmit: (formData: FormValues) => void;
    metadataConfiguration?: MetadataProps[];
    children?: React.ReactNode;
};

export type CustomMetadataFormValues = {
    [key: string]:
        | string
        | string[]
        | { propertyId: string; value: string }[]
        | undefined
        | {
              id: string;
              value: string;
          };
};

export type FormValues = {
    email: string;
    name: string;
    description?: string;
    creator?: string;
    copyrightStatus?: CopyRightStatus;
    copyrightNotice?: string;
} & CustomMetadataFormValues;

export const Metadata: FC<MetaDataSubmitProps & BlockProps> = ({ onSubmit, children, appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const [initialValues, metadataConfiguration] = useMetadataSettingsConfig(blockSettings);
    const [formValues, setFormValues] = useState<FormValues>(initialValues as FormValues);
    const [errorFields, setErrorFields] = useState<string[]>([]);
    const validateFormOrTriggerError = useFormValidation(formValues);

    const handleInputChange = ({ id, value }: OnChangeProps) => {
        setFormValues((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
