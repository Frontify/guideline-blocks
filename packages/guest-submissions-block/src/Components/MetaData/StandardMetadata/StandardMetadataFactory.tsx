import React from "react";
import { OnChangeProps } from "../Form/type";
import { Settings } from "../../../types";
import { InputText } from "../Form";
import { Validation } from "@frontify/fondue";
import { MetadataType } from "../type";

import {
    REQUIRED_FORM_DATA,
    REQUIRED_FORM_DATA_LABEL,
    STANDARD_METADATA,
    STANDARD_METADATA_LABEL,
} from "./constant";

export class StandardMetadataFactory {
    static getFormElements(
        blockSettings: Settings,
        onChange: (val: OnChangeProps) => void,
        errorFields: string[]
    ) {
        const metadataForm = [...STANDARD_METADATA, ...REQUIRED_FORM_DATA];
        const metadataFormLabels = {
            ...STANDARD_METADATA_LABEL,
            ...REQUIRED_FORM_DATA_LABEL,
        };

        const activeMetadataList = metadataForm
            .filter((item) => blockSettings[item])
            .filter((item) => item !== "disclaimer");

        return activeMetadataList.map((metadata) => (
            <InputText
                id={metadata}
                key={metadata}
                onChange={onChange}
                isRequired={true}
                name={metadataFormLabels[metadata]}
                valueType={{ propertyType: MetadataType.TEXT }}
                validation={
                    errorFields.includes(metadata)
                        ? Validation.Error
                        : Validation.Default
                }
            />
        ));
    }
}
