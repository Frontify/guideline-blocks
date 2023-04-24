import React, { FC, useState } from "react";
import { testMetadata } from "./constant";
import { CustomMetadataFactory } from "./CustomMetadata";
import { MetadataProps } from "./type";
import { OnChangeProps } from "./Form/type";
import { Divider, Stack, Validation } from "@frontify/fondue";
import { BlockProps } from "@frontify/guideline-blocks-settings";
import {
    Disclaimer,
    DISCLAIMER_NAME,
    StandardMetadataFactory,
} from "./StandardMetadata";
import { useBlockSettings } from "@frontify/app-bridge";
import { Settings } from "../../types";
import { RequiredSettingsType } from "./StandardMetadata/type";
import { REQUIRED_FORM_DATA } from "./StandardMetadata/constant";

type MetaDataSubmitProps = {
    onSubmit: (formData: FormValues) => void;
    metadataConfiguration?: MetadataProps[];
};

type FormValues = {
    [key: string]: string;
};
export const Metadata: FC<MetaDataSubmitProps & BlockProps> = ({
    onSubmit,
    children,
    appBridge,
    metadataConfiguration = testMetadata,
}) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    let initialValues: FormValues;

    initialValues = metadataConfiguration
        .filter((item) => !!item.defaultValue)
        .reduce((prev, cur) => {
            return {
                ...prev,
                [cur.id]: cur.defaultValue,
            };
        }, [] as unknown as FormValues);

    const [formValues, setFormValues] = useState<FormValues>(initialValues);
    const [errorFields, setErrorFields] = useState<string[]>([]);
    const handleInputChange = ({ id, value }: OnChangeProps) => {
        setFormValues((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (
            validateFormOrTriggerError(
                REQUIRED_FORM_DATA,
                metadataConfiguration,
                setErrorFields,
                blockSettings
            )
        ) {
            onSubmit(formValues);
        }
    };

    // This one to extract and add some test
    const validateFormOrTriggerError = (
        requiredStandardMetadata: (keyof RequiredSettingsType)[],
        metaConfigurationData: MetadataProps[],
        setMissingFields: (
            value: ((prevState: string[]) => string[]) | string[]
        ) => void,
        fromBlockSettings: Settings
    ): boolean => {
        // All the Standard Metadata is required
        const requiredStandartMetadata = requiredStandardMetadata.filter(
            (item) => fromBlockSettings[item]
        );
        const requiredCustomMetadataId = metaConfigurationData
            .filter((item) => item.isRequired)
            .map((item) => item.id);

        const requiredFields = [
            ...requiredCustomMetadataId,
            ...requiredStandartMetadata,
        ];

        const missingRequiredFields = requiredFields.filter(
            (item) =>
                !Object.keys(formValues).includes(item) ||
                (Object.keys(formValues).includes(item) &&
                    formValues[item] === "")
        );

        setMissingFields(missingRequiredFields);

        return missingRequiredFields.length === 0;
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack padding={"none"} spacing={"s"} direction={"column"}>
                {StandardMetadataFactory.getFormElements(
                    blockSettings,
                    handleInputChange,
                    errorFields
                )}
                {CustomMetadataFactory.getFormElements(
                    metadataConfiguration,
                    handleInputChange,
                    errorFields
                )}
                <Divider color="rgb(234, 235, 235)" />
                {blockSettings.disclaimer && (
                    <Disclaimer
                        appBridge={appBridge}
                        onChange={handleInputChange}
                        validation={
                            errorFields.includes(DISCLAIMER_NAME)
                                ? Validation.Error
                                : Validation.Default
                        }
                    />
                )}
                {children}
            </Stack>
        </form>
    );
};
