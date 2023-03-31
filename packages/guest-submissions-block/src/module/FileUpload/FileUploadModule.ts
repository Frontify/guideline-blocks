import { QueryFile } from "./Entity/QueryFile";
import { WorkerService } from "./Service/WorkerService";
import { FileUploadProperties } from "./Contract/FileUploadProperties";
import { FileUploadResponse } from "./Contract/FileUploadResponse";

export class FileUploadModule implements FileUploadProperties {
    uploadFiles(
        files: QueryFile[],
        onChange: (e: MessageEvent<FileUploadResponse>) => void
    ) {
        const service = new WorkerService();
        service.createWorker(files, onChange);
    }
}
