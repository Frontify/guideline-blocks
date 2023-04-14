import React, { FC, useState } from "react";
import { testMetadata } from "./constant";
import { MetadataFactory } from "./MetadataFactory";
import { MetadataProps } from "./type";
import { OnChangeProps } from "./Form/type";
import { Stack } from "@frontify/fondue";

type MetaDataSubmitProps = {
    onSubmit: (formData: FormValues) => void;
    metadataConfiguration?: MetadataProps[];
};

type FormValues = {
    [key: string]: string;
};
export const Metadata: FC<MetaDataSubmitProps> = ({ onSubmit, children }) => {
    // This one we can set with the default values

    // const initialValues = testMetadata
    //     .filter((item) => !!item.defaultValue)
    //     .map((item) => ({
    //         [item.id]:
    //             item.defaultValue && item.defaultValue.value
    //                 ? item.defaultValue.value
    //                 : item.defaultValue,
    //     }));

    // Figure out how to set the initial values
    // @ts-ignore
    const [formValues, setFormValues] = useState<FormValues>([]);
    const handleInputChange = ({ id, value }: OnChangeProps) => {
        setFormValues((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };
    const renderMetadataFields = () =>
        testMetadata.map((item: MetadataProps) =>
            MetadataFactory.getMetadataFormElement(item, handleInputChange)
        );

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack padding={"none"} spacing={"s"} direction={"column"}>
                {renderMetadataFields()}
            </Stack>
            {children}
        </form>
    );
};
