import React, { FC, useState } from "react";
import { testMetadata } from "./constant";
import { MetadataFactory } from "./MetadataFactory";
import { MetadataProps } from "./type";
import { OnChangeProps } from "./Form/type";

type MetaDataSubmitProps = {
    onSubmit: (formData: FormValues) => void;
    metadataConfiguration?: MetadataProps[];
};

type FormValues = {
    [key: string]: string;
};
export const Metadata: FC<MetaDataSubmitProps> = ({ onSubmit, children }) => {
    const [formValues, setFormValues] = useState<FormValues>({});
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
            {renderMetadataFields()}
            {children}
        </form>
    );
};
