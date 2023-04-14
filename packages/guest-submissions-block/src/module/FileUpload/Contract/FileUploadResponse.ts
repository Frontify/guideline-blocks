import { Status } from "./Status";

export type FileUploadResponse = {
    id: string;
    status: Status;
    identifier: string;
};
