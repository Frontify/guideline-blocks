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
        const metadataForm = [...REQUIRED_FORM_DATA, ...STANDARD_METADATA];
        const metadataFormLabels = {
            ...REQUIRED_FORM_DATA_LABEL,
            ...STANDARD_METADATA_LABEL,
        };

        const activeMetadataList = metadataForm
            .filter((item) => blockSettings[item])
            .filter((item) => item !== "disclaimer");

        return activeMetadataList.map((metadata) => (
            <InputText
                id={metadata}
                key={metadata}
                onChange={onChange}
                isRequired={
                    REQUIRED_FORM_DATA.filter((item) => item === metadata)
                        .length > 0
                }
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
