import { AssetSubmissionRequestType } from "./module/AssetSubmission/type";

export type Settings = {
    assetSubmissionMetadataConfig: AssetSubmissionRequestType;

    assetSubmission: string;
    columnNumber: number;
    content?: string;
    modalcontent?: string;
    buttonText: string;
    dropzoneUpload: string;
    dropzoneDrop: string;

    // Default Metadata
    name: boolean;
    email: boolean;
    // Standard Metadata
    description: boolean;
    creator: boolean;
    copyrightStatus: boolean;
    copyrightNotice: boolean;

    disclaimer: boolean;
    disclaimerText?: string;
};
