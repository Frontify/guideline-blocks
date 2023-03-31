import Worker from "../ValueObject/worker";
import WorkerFactory from "../aggregate/WorkerFactory";
import { QueryFile } from "../Entity/QueryFile";
import { FileUploadResponse } from "../Contract/FileUploadResponse";
import { WebWorkerProperties } from "../Contract/WebWorkerProperties";

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

        // Todo: how to handle terminatin and to free the memory
    }
}
