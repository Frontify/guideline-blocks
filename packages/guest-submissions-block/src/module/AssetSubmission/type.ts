export type CreateAssetSubmissionsInput = {
    requestId: string;
    token: string;
    fileIds?: (string | undefined)[];
    submitter: {
        name: string;
        email: string;
    };
    metadata: string;
};

export type AssetSubmissionRequestType = {
    configuration: string;
    id: string;
    title: string;
    description: string;
    tokens: {
        token: string;
    }[];
};
