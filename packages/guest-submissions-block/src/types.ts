/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MetadataProps } from './Components/MetaData/type';

export type Settings = {
    assetSubmissionMetadataConfig: MetadataProps[];
    assetSubmissionToken: string;
    assetSubmissionId: string;

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
