export enum Status {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
}

export interface QueryFile extends File {
    status: Status;
    identifier: string;
}
