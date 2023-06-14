/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Status } from './Status';

export type FileUploadResponse = {
    id: string;
    status: Status;
    identifier: string;
};
