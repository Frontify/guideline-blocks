/* (c) Copyright Frontify Ltd., all rights reserved. */

import { genUniqueId } from '../Utils/GenUniqueId';
import { Status } from '../Contract/Status';

export interface QueryFile {
    uploadUrlId?: string;
    status: Status;
    identifier: string;
    name: string;
    size: number;
    type: string;
}

export function queryFilesDTO(files: FileList) {
    const queryFiles: QueryFile[] = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i] as QueryFile & File;
        file.status = Status.PENDING;
        file.identifier = genUniqueId();
        queryFiles.push(file);
    }
    return queryFiles;
}
