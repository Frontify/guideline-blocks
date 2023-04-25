export type Settings = {
    assetSubmission: {
        id: string;
    };
    columnNumber: number;
    content?: string;
    modalcontent?: string;
    buttonText: string;
    dropzoneUpload: string;
    dropzoneDrop: string;

    // Standard Metadata
    name: boolean;
    email: boolean;
    description: boolean;
    creator: boolean;
    copyrightStatus: boolean;
    copyrightNotice: boolean;

    disclaimer: boolean;
    disclaimerText?: string;
};
