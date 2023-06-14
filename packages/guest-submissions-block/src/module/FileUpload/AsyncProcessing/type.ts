/* (c) Copyright Frontify Ltd., all rights reserved. */

import { QueryFile } from '../Entity/QueryFile';

export type FileUploadMessageEvent = {
    file: QueryFile;
    identifier: string;
};
