import React from "react";
import { MetadataProps, MetadataType } from "./type";
import { OnChangeProps } from "./Form/type";
import {
    InputDate,
    InputLong,
    InputNumber,
    InputText,
    MultiSelectDropdown,
    SelectDropdown,
} from "./Form";

export class MetadataFactory {
    static getMetadataFormElement(
        metadata: MetadataProps,
        onChange: (val: OnChangeProps) => void
    ) {
        const { TEXT, LONGTEXT, NUMBER, DATE, MULTISELECT, SELECT } =
            MetadataType;
        const { propertyType } = metadata.valueType;

        if (propertyType === TEXT) {
            return (
                <InputText
                    key={metadata.id}
                    onChange={onChange}
                    {...metadata}
                />
            );
        } else if (propertyType === LONGTEXT) {
            return (
                <InputLong
                    key={metadata.id}
                    {...metadata}
                    onChange={onChange}
                />
            );
        } else if (propertyType === NUMBER) {
            return (
                <InputNumber
                    key={metadata.id}
                    {...metadata}
                    onChange={onChange}
                />
            );
        } else if (propertyType === DATE) {
            return (
                <InputDate
                    key={metadata.id}
                    {...metadata}
                    onChange={onChange}
                />
            );
        } else if (propertyType === MULTISELECT) {
            return (
                <MultiSelectDropdown
                    key={metadata.id}
                    {...metadata}
                    onChange={onChange}
                />
            );
        } else if (propertyType === SELECT) {
            return (
                <SelectDropdown
                    key={metadata.id}
                    {...metadata}
                    onChange={onChange}
                />
            );
        }
        return <div key={"nothing matched"}>nothing matches</div>;
    }
}
