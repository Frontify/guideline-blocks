import { UploadFileProps } from "./UploadFile";

export const adaptFilesToUploadList = (
    files: FileList | undefined
): UploadFileProps[] => {
    const uploadList: UploadFileProps[] = [];

    if (files) {
        for (const filesKey in files) {
            if (filesKey) {
                uploadList.push({
                    type: files[filesKey].type,
                    name: files[filesKey].name,
                    identifier: toString(files[filesKey]),
                    completed: true,
                });
            }
        }
    }

    return uploadList;
};

const toString = ({ lastModified, name, size, type }: File) =>
    JSON.stringify({
        type,
        name,
        size,
        lastModified,
    });
