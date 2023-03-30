import { QueryFile } from "../model/QueryFile";
import { uploadFileFrontify } from "../query/mutation";

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
