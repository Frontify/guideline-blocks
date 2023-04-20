import React from "react";
import { OnChangeProps } from "./Form/type";
import { Settings } from "../../types";
import { InputText } from "./Form";

type PartialSettingstype = Partial<
    Pick<
        Settings,
        | "name"
        | "email"
        | "description"
        | "creator"
        | "copyrightStatus"
        | "copyrightNotice"
    >
>;

const STANDARD_METADATA: (keyof PartialSettingstype)[] = [
    "name",
    "email",
    "description",
    "creator",
    "copyrightStatus",
    "copyrightNotice",
];

const STANDARD_METADATA_LABEL: Record<keyof PartialSettingstype, string> = {
    name: "Name",
    email: "Email",
    description: "Description",
    creator: "Creator",
    copyrightStatus: "Copyright Status",
    copyrightNotice: "Copyright Notice",
};

export class StandardMetadataFactory {
    static getFormElements(
        blockSettings: Settings,
        onChange: (val: OnChangeProps) => void
    ) {
        const activeMetadataList = STANDARD_METADATA.filter(
            (item) => blockSettings[item]
        );

        return activeMetadataList.map((metadata) => {
            return (
                <InputText
                    id={metadata}
                    key={metadata}
                    onChange={onChange}
                    isRequired={true}
                    name={STANDARD_METADATA_LABEL[metadata]}
                    valueType={{ propertyType: metadata }}
                />
            );
        });
    }
}
