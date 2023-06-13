import { FormValues } from "../../Components/MetaData";
import { AssetSubmissionMetadata } from "./type";

export const assetSubmissionDTO = ({
    name,
    email,
    creator,
    disclaimer,
    description,
    copyrightStatus,
    copyrightNotice,
    ...customFields
}: FormValues): AssetSubmissionMetadata => ({
    description,
    copyright: {
        author: creator,
        status: copyrightStatus,
        notice: copyrightNotice,
    },
    custom: Object.entries(customFields).map(([propertyId, value]) => ({
        propertyId,
        value,
    })),
});
