import { FormValues } from "../../Components/MetaData";

type AssetSubmissionMetadata = {
    standard: {
        description?: string;
        legal?: {
            creator?: string;
            copyright: {
                status?: string;
                notice?: string;
            };
        };
    };
    custom: {
        [key: string]: string;
    };
};

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
    standard: {
        description,
        legal: {
            creator,
            copyright: {
                status: copyrightStatus,
                notice: copyrightNotice,
            },
        },
    },
    custom: customFields,
});
