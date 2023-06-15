/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RequiredSettingsType } from '../StandardMetadata/type';
import { MetadataProps } from '../type';
import { Settings } from '../../../types';
import { defaultStandardMetaData } from '../StandardMetadata/constant';
import { FormValues } from '../Metadata';

const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email) ? 'email' : '';
};

export function useFormValidation(formValues: FormValues) {
    return (
        requiredStandardMetaData: (keyof RequiredSettingsType)[],
        metaConfigurationData: MetadataProps[],
        setMissingFields: (value: ((prevState: string[]) => string[]) | string[]) => void,
        fromBlockSettings: Settings
    ): boolean => {
        const standardMetaData = requiredStandardMetaData.filter((item) => fromBlockSettings[item]);
        const requiredCustomMetadataId = metaConfigurationData.filter((item) => item.isRequired).map((item) => item.id);
        const missingRequiredFields = [
            ...requiredCustomMetadataId,
            ...standardMetaData,
            ...defaultStandardMetaData,
        ].filter((item) => !formValues[item] || formValues[item] === '');

        const emailValidationError = validateEmail(formValues.email);
        if (emailValidationError) {
            missingRequiredFields.push(emailValidationError);
        }

        setMissingFields(missingRequiredFields);

        return missingRequiredFields.length === 0;
    };
}
