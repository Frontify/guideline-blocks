import React from "react";
import { OnChangeProps } from "../Form/type";
import { Settings } from "../../../types";
import { InputText } from "../Form";
import { Validation } from "@frontify/fondue";
import { MetadataType } from "../type";
import { useFormConfiguration } from "./hooks/useFormConfiguration";

export class StandardMetadataFactory {
    static getFormElements(
        blockSettings: Settings,
        onChange: (val: OnChangeProps) => void,
        errorFields: string[]
    ) {
        const [metaData, metaDataLabels, requiredFields] =
            useFormConfiguration(blockSettings);

        return metaData.map((entry) => (
            <InputText
                id={entry}
                key={entry}
                onChange={onChange}
                isRequired={
                    requiredFields.filter((item: any) => item === entry)
                        .length > 0
                }
                name={metaDataLabels[entry]}
                valueType={{ propertyType: MetadataType.TEXT }}
                validation={
                    errorFields.includes(entry)
                        ? Validation.Error
                        : Validation.Default
                }
            />
        ));
    }
}
