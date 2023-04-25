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
        const chunks = this.chunkify(files, 10);
        chunks.forEach((chunk) => {
            service.processFileChunks(chunk, onChange);
        });
    }

    private chunkify<T>(arr: T[], chunkSize: number): T[][] {
        const chunks: T[][] = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    }
}
