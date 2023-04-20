import React, { FC, useState } from "react";
import { testMetadata } from "./constant";
import { CustomMetadataFactory } from "./CustomMetadataFactory";
import { MetadataProps } from "./type";
import { OnChangeProps } from "./Form/type";
import { Stack } from "@frontify/fondue";
import { BlockProps } from "@frontify/guideline-blocks-settings";
import { StandardMetadataFactory } from "./StandardMetadataFactory";
import { useBlockSettings } from "@frontify/app-bridge";
import { Settings } from "../../types";

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
}) => {
    const [blockSettings, setBlockSettings] =
        useBlockSettings<Settings>(appBridge);

    // This one we can set with the default values

    const initialValues = testMetadata
        .filter((item) => !!item.defaultValue)
        .map((item) => ({
            [item.id]:
                item.defaultValue && item.defaultValue.value
                    ? item.defaultValue.value
                    : item.defaultValue,
        }));

    // Figure out how to set the initial values
    // @ts-ignore
    const [formValues, setFormValues] = useState<FormValues>(initialValues);
    const handleInputChange = ({ id, value }: OnChangeProps) => {
        setFormValues((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };
    const renderCustomMetadataFields = () =>
        CustomMetadataFactory.getFormElements(testMetadata, handleInputChange);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    const renderStandardMetadataFields = () => {
        return StandardMetadataFactory.getFormElements(
            blockSettings,
            handleInputChange
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack padding={"none"} spacing={"s"} direction={"column"}>
                {renderStandardMetadataFields()}
                {renderCustomMetadataFields()}
                {children}
            </Stack>
        </form>
    );
};
