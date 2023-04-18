type AssetSubmissionsMetadata = {
    id: string;
    value: string;
};
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
