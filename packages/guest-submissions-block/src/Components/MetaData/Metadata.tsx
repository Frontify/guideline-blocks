import React, { FC, useEffect, useState } from "react";
import { testMetadata } from "./constant";
import { CustomMetadataFactory } from "./CustomMetadataFactory";
import { MetadataProps } from "./type";
import { OnChangeProps } from "./Form/type";
import { Divider, Stack } from "@frontify/fondue";
import { BlockProps } from "@frontify/guideline-blocks-settings";
import {
    STANDARD_METADATA,
    StandardMetadataFactory,
} from "./StandardMetadataFactory";
import { useBlockSettings } from "@frontify/app-bridge";
import { Settings } from "../../types";
import { Disclaimer } from "../Disclaimer";

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

    let initialValues = [] as unknown as FormValues;

    useEffect(() => {
        initialValues = metadataConfiguration
            .filter((item) => !!item.defaultValue)
            .reduce((prev, cur) => {
                return {
                    ...prev,
                    [cur.id]: cur.defaultValue,
                };
            }, [] as unknown as FormValues);
    }, []);

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

        if (validateFormOrTriggerError()) {
            onSubmit(formValues);
        }
    };

    const validateFormOrTriggerError = (): boolean => {
        // All the Standard Metadata is required
        const requiredStandartMetadata = STANDARD_METADATA.filter(
            (item) => blockSettings[item]
        );
        const requiredCustomMetadataId = metadataConfiguration
            .filter((item) => item.isRequired)
            .map((item) => item.id);

        const requiredFields = [
            ...requiredCustomMetadataId,
            ...requiredStandartMetadata,
        ];

        setErrorFields(
            requiredFields.filter(
                (item) => !Object.keys(formValues).includes(item)
            )
        );

        return (
            requiredFields.filter(
                (item) => !Object.keys(formValues).includes(item)
            ).length === 0
        );
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
                    <Disclaimer appBridge={appBridge} />
                )}
                {children}
            </Stack>
        </form>
    );
};
