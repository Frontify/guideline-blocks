import { UploadFileProps } from "./UploadFile";

export const adaptFilesToUploadList = (
    files: FileList | undefined
): UploadFileProps[] => {
    const uploadList: UploadFileProps[] = [];

    if (files) {
        for (let i = 0; i < files?.length; i++) {
            uploadList.push({
                type: files[i].type,
                name: files[i].name,
                identifier: toString(files[i]),
                completed: true,
            });
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
