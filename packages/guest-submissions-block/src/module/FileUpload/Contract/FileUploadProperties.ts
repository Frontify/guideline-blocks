/* (c) Copyright Frontify Ltd., all rights reserved. */

import { QueryFile } from '../Entity/QueryFile';
import { FileUploadResponse } from './FileUploadResponse';

export interface FileUploadProperties {
    uploadFiles(files: QueryFile[], onChange: (e: MessageEvent<FileUploadResponse>) => void): void;
}
