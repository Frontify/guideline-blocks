/* (c) Copyright Frontify Ltd., all rights reserved. */

export type FileUploadMessageEvent = {
    file: Blob & { name: string };
    identifier: string;
};
