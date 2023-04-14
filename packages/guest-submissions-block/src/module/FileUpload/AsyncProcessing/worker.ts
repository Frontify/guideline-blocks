import { FileUploadMessageEvent } from "./type";

export default () => {
    self.onmessage = async (event: MessageEvent<FileUploadMessageEvent>) => {
        const { file, identifier } = event.data;

        // First get the Upload urls
        const CHUNK_SIZE = 100 * 1024 * 1024;
        const uploadVariables = {
            input: {
                filename: file.name,
                chunkSize: CHUNK_SIZE,
                size: file.size,
            },
        };

        const uploadBody = {
            query: `
                mutation UploadFile($input: UploadFileInput!) {
                  uploadFile(input: $input) {
                    id
                    urls
                  }
                }
            `,
            variables: uploadVariables,
        };

        try {
            const response = await fetch(`${self.location.origin}/graphql`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(uploadBody),
            });

            const uploadFileResponse = await response.json();

            // @ts-ignore
            const reader = new FileReaderSync();
            const arrayBuffer = reader.readAsArrayBuffer(file);
            const blob = new Blob([arrayBuffer], { type: file.type });

            for (const url of uploadFileResponse.data.uploadFile.urls) {
                await fetch(url, {
                    method: "PUT",
                    headers: {
                        "content-type": "binary",
                    },
                    body: blob,
                });
            }

            self.postMessage({
                identifier: identifier,
                status: "SUCCESS",
                id: uploadFileResponse.data.uploadFile.id,
            });
        } catch (error) {
            self.postMessage({
                identifier: identifier,
                status: "ERROR",
                error: error,
            });
        }
    };
};
