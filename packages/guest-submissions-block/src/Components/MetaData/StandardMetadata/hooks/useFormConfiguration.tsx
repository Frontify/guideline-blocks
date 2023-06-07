import {
    defaultStandardMetaData,
    REQUIRED_FORM_DATA,
    REQUIRED_FORM_DATA_LABEL,
    STANDARD_METADATA,
    STANDARD_METADATA_LABEL,
} from "../constant";
import { Settings } from "../../../../types";

export const useFormConfiguration = (
    blockSettings: Settings
): [
    (
        | "name"
        | "email"
        | "disclaimer"
        | "description"
        | "creator"
        | "copyrightStatus"
        | "copyrightNotice"
    )[],
    {
        creator: string;
        copyrightStatus: string;
        name: string;
        copyrightNotice: string;
        description: string;
        email: string;
        disclaimer: string;
    },
    ("disclaimer" | "name" | "email")[]
] => {
    const metadataForm = [...REQUIRED_FORM_DATA, ...STANDARD_METADATA];
    const metaDataLabels = {
        ...REQUIRED_FORM_DATA_LABEL,
        ...STANDARD_METADATA_LABEL,
    };

    const activeMetadataList = metadataForm
        .filter((item) => blockSettings[item])
        .filter((item) => item !== "disclaimer");

    const metaData = [...defaultStandardMetaData, ...activeMetadataList];

    const requiredFields = [...REQUIRED_FORM_DATA, ...defaultStandardMetaData];

    return [metaData, metaDataLabels, requiredFields];
};
