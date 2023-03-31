import Worker from "../ValueObject/worker";
import WorkerFactory from "../aggregate/WorkerFactory";
import { QueryFile } from "../Entity/QueryFile";
import { FileUploadResponse } from "../Contract/FileUploadResponse";

interface WebWorkerProperties {
    createWorker(
        files: QueryFile[],
        listener: (e: MessageEvent<FileUploadResponse>) => void
    ): void;
}

export class WorkerService implements WebWorkerProperties {
    public createWorker(
        files: QueryFile[],
        listener: (e: MessageEvent<FileUploadResponse>) => void
    ) {
        const instance = new WorkerFactory(Worker);

        files.forEach((file) => {
            instance.postMessage({
                file: file,
                identifier: file.identifier,
            });
        });

        instance.onmessage = (e: MessageEvent<FileUploadResponse>) => {
            listener(e);
        };
    }
}
