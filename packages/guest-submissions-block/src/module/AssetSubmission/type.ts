import { CopyRightStatus } from "../../Components/MetaData/StandardMetadata/type";

export type CreateAssetSubmissionsInput = {
    requestId: string;
    token: string;
    fileIds?: (string | undefined)[];
    submitter: {
        name: string;
        email: string;
    };
    metadata: AssetSubmissionMetadata;
};

export type AssetSubmissionMetadata = {
    description?: string;
    copyright?: {
        author?: string;
        status?: CopyRightStatus;
        notice?: string;
    };
    custom?: {
        propertyId: string;
        value: string | string[];
    }[];
};

export type AssetSubmissionRequestType = {
    id: string;
    projectId: string;
    title: string;
    description: string;
    tokens: {
        token: string;
    }[];
};
