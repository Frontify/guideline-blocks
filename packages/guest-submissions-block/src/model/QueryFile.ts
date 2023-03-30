export enum Status {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
}

export interface QueryFile extends File {
    status: Status;
    identifier: string;
}

const genUniqueId = (): string => {
    const dateStr = Date.now().toString(36); // convert num to base 36 and stringify

    const randomStr = Math.random().toString(36).substring(2, 8); // start at index 2 to skip decimal point

    return `${dateStr}-${randomStr}`;
};

export function queryFilesDTO(files: FileList) {
    const queryFiles: QueryFile[] = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i] as QueryFile;
        file.status = Status.SUCCESS;
        file.identifier = genUniqueId();
        queryFiles.push(file);
    }
    return queryFiles;
}
