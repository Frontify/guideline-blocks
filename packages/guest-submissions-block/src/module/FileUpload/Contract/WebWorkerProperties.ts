import { QueryFile } from "../Entity/QueryFile";
import { FileUploadResponse } from "./FileUploadResponse";

export interface WebWorkerProperties {
    createWorker(
        files: QueryFile[],
        listener: (e: MessageEvent<FileUploadResponse>) => void
    ): void;
}
