import { QueryFile, Status } from "../model/QueryFileList";
import { parseString } from "./parseString";

export const uploadFileFrontify = `
    mutation UploadFile($input: UploadFileInput!) {
      uploadFile(input: $input) {
        id
        urls
      }
    }
`;
export const fileUpload = async (queryFile: QueryFile) => {
    const CHUNK_SIZE = 100 * 1024 * 1024;

    const uploadVariables = {
        input: {
            filename: queryFile.name,
            chunkSize: CHUNK_SIZE,
            size: queryFile.size,
        },
    };

    const uploadBody = {
        query: uploadFileFrontify,
        variables: uploadVariables,
    };

    return await fetch(`/graphql`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadBody),
    });
};

export function queryFilesDTO(files: FileList) {
    const queryFiles: QueryFile[] = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i] as QueryFile;
        file.status = Status.SUCCESS;
        file.identifier = parseString(files[i]);
        queryFiles.push(file);
    }
    return queryFiles;
}
