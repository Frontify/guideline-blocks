import { Status } from "../../module/FileUpload/Contract/Status";

export type UploadFileProps = {
    type: string;
    name: string;
    identifier: string;
    status: Status;
    last: boolean;
    onDelete: (identifier: string) => void;
};
