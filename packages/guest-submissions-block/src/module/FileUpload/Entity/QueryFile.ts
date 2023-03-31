import { genUniqueId } from "../Utils/GenUniqueId";
import { Status } from "../Contract/Status";

export interface QueryFile extends File {
    status: Status;
    identifier: string;
}

export function queryFilesDTO(files: FileList) {
    const queryFiles: QueryFile[] = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i] as QueryFile;
        file.status = Status.PENDING;
        file.identifier = genUniqueId();
        queryFiles.push(file);
    }
    return queryFiles;
}
