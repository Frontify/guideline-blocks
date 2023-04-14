import type { FC } from "react";
import React, { useState } from "react";
import type { BlockProps } from "@frontify/guideline-blocks-settings";
import {
    Button,
    ButtonEmphasis,
    ButtonStyle,
    ButtonType,
    Divider,
    IconArrowRight24,
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

export const ViewMode: FC<BlockProps> = ({ appBridge }) => {
    // const [blockSettings, setBlockSettings] =
    //     useBlockSettings<Settings>(appBridge);

    const [fileList, setFileList] = useState<
        QueryFile[] | (QueryFile & File)[]
    >([]);

    const onFileUpdate = (e: MessageEvent<FileUploadResponse>) => {
        setFileList((prevList) =>
            prevList.map((item) =>
                item.identifier === e.data.identifier
                    ? {
                          identifier: item.identifier,
                          name: item.name,
                          size: item.size,
                          type: item.type,
                          uploadUrlId: e.data.id,
                          status: e.data.status,
                      }
                    : item
            )
        );
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
        <div className="tw-border tw-p-6 tw-rounded tw-border-[#eaebeb]">
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
                            <p className="tw-font-bold">
                                Upload from your disk
                            </p>
                            <p>Drop your files here</p>
                        </Stack>
                    </Stack>
                </AssetDropzone>
                <UploadFileList
                    entries={fileList}
                    onEntryDeletion={onFileDeletion}
                />

                <Divider color="rgb(234, 235, 235)" />

                <Metadata
                    onSubmit={(formData) => console.log("onsubmit", formData)}
                >
                    <Divider color="rgb(234, 235, 235)" />

                    <div className="tw-mt-2 tw-flex tw-justify-end">
                        <div className="tw-pr-3">
                            <Button
                                style={ButtonStyle.Default}
                                emphasis={ButtonEmphasis.Default}
                            >
                                Discard
                            </Button>
                        </div>
                        <Button
                            icon={<IconArrowRight24 />}
                            type={ButtonType.Submit}
                        >
                            Submit
                        </Button>
                    </div>
                </Metadata>
                {/* name / Email - , bit weird - Submit Discard*/}
            </Stack>
        </div>
    );
};
