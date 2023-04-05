import React from "react";
import { MetadataProps, MetadataType } from "./type";
import { OnChangeProps } from "./Form/type";
import { InputDate, InputLong, InputNumber, InputText } from "./Form";

export class MetadataFactory {
    static getMetadataFormElement(
        metadata: MetadataProps,
        onChange: (val: OnChangeProps) => void
    ) {
        const { TEXT, LONGTEXT, NUMBER, DATE, MULTISELECT, SELECT } =
            MetadataType;
        const { propertyType } = metadata.valueType;

        if (propertyType === TEXT) {
            return <InputText onChange={onChange} {...metadata} />;
        } else if (propertyType === LONGTEXT) {
            return <InputLong {...metadata} onChange={onChange} />;
        } else if (propertyType === NUMBER) {
            return <InputNumber {...metadata} onChange={onChange} />;
        } else if (propertyType === DATE) {
            return <InputDate {...metadata} onChange={onChange} />;
        } else if (propertyType === MULTISELECT) {
        } else if (propertyType === SELECT) {
        }
        return <div>nothing matches</div>;
    }
}
