import { QueryFile } from "../Entity/QueryFile";
import { FileUploadResponse } from "./FileUploadResponse";

export interface WebWorkerProperties {
    processFileChunks(
        files: QueryFile[],
        listener: (e: MessageEvent<FileUploadResponse>) => void
    ): void;
}
