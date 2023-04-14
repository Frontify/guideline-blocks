import Worker from "../AsyncProcessing/worker";
import WorkerFactory from "../AsyncProcessing/WorkerFactory";
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

        let uploadCount = 0;
        instance.onmessage = (e: MessageEvent<FileUploadResponse>) => {
            listener(e);
            uploadCount++;
            if (uploadCount === files.length) {
                console.debug("terminating Worker");
                instance.terminate();
            }
        };

        // Todo: how to handle terminatin and to free the memory
    }
}
