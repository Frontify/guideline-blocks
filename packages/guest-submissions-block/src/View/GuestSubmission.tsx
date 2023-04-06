import type { FC } from "react";
import React, { useEffect, useState } from "react";
import type { BlockProps } from "@frontify/guideline-blocks-settings";
import {
    Button,
    ButtonEmphasis,
    ButtonStyle,
    ButtonType,
    Divider,
    IconPlus24,
    IconSize,
    Stack,
} from "@frontify/fondue";
import { AssetDropzone } from "../Components/AssetDropzone";
import { Headline } from "../Components/Headline";
import { UploadFileList } from "../Components/UploadFileList";
import {
    QueryFile,
    queryFilesDTO,
} from "../module/FileUpload/Entity/QueryFile";
import { FileUploadModule } from "../module/FileUpload/FileUploadModule";
import { FileUploadResponse } from "../module/FileUpload/Contract/FileUploadResponse";
import { Metadata } from "../Components/MetaData";

export const GuestSubmission: FC<BlockProps> = ({ appBridge }) => {
    // const [blockSettings, setBlockSettings] =
    //     useBlockSettings<Settings>(appBridge);

    const [fileList, setFileList] = useState<QueryFile[]>([]);
    const [updatedItem, setUpdatedItem] = useState<FileUploadResponse | null>();

    useEffect(() => {
        if (!!updatedItem) {
            setUpdatedItem(null);

            const intermediateFileList = fileList.map((item) => {
                if (item.identifier === updatedItem.identifier) {
                    // Todo: use this updatedItem.id to create the asset
                    console.log(updatedItem);
                    item.status = updatedItem.status;
                    return item;
                }
                return item;
            });

            setFileList(intermediateFileList);
        }
    }, [updatedItem]);

    const onFileUpdate = (e: MessageEvent<FileUploadResponse>) => {
        setUpdatedItem(e.data);
    };

    const onFileUploadHandler = async (files: FileList) => {
        const queryFiles = queryFilesDTO(files);

        setFileList([...fileList, ...queryFiles]);

        const fileUpload = new FileUploadModule();
        fileUpload.uploadFiles(queryFiles, onFileUpdate);
    };

    const onFileDeletion = (identifer: string) => {
        const updatedUploadList = fileList.filter(
            (item) => item.identifier !== identifer
        );
        setFileList(updatedUploadList);
    };

    return (
        <Stack spacing="s" padding="none" direction="column">
            <Headline appBridge={appBridge} />
            <Divider color="rgb(234, 235, 235)" />
            <AssetDropzone onFileUpload={onFileUploadHandler}>
                <Stack padding="none" spacing="s" align="center">
                    <IconPlus24 size={IconSize.Size24} />
                    <Stack
                        padding="none"
                        spacing="xxs"
                        direction="column"
                        align="start"
                    >
                        <p className="tw-font-bold">Upload from your disk</p>
                        <p>Drop your files here</p>
                    </Stack>
                </Stack>
            </AssetDropzone>
            <UploadFileList
                entries={fileList}
                onEntryDeletion={onFileDeletion}
            />

            <Metadata onSubmit={(formData) => console.log(formData)}>
                <div className="tw-mt-2 tw-flex tw-justify-end">
                    <Button
                        style={ButtonStyle.Default}
                        emphasis={ButtonEmphasis.Weak}
                    >
                        Discard
                    </Button>
                    <Button type={ButtonType.Submit}>submit</Button>
                </div>
            </Metadata>
            {/* name / Email - , bit weird - Submit Discard*/}
        </Stack>
    );
};
