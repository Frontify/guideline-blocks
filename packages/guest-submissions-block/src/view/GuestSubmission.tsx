import type { FC } from "react";
import React, { useState } from "react";
import { useBlockSettings } from "@frontify/app-bridge";
import type { BlockProps } from "@frontify/guideline-blocks-settings";
import { Divider, IconPlus24, IconSize, Stack } from "@frontify/fondue";
import { AssetDropzone } from "../components/AssetDropzone";
import { Headline } from "../components/Headline";
import { UploadFileList } from "../components/UploadFileList";
import { Settings } from "../types";
import { QueryFile } from "../model/QueryFileList";
import { fileUpload, queryFilesDTO } from "../helper/FileUpload";

export const GuestSubmission: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] =
        useBlockSettings<Settings>(appBridge);

    const [fileList, setFileList] = useState<QueryFile[]>([]);

    const onFileUploadHandler = async (files: FileList) => {
        console.log(files);
        const queryFiles = queryFilesDTO(files);
        setFileList(queryFiles);

        const output = await fileUpload(queryFiles[0]);
        console.log(output);
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
            <UploadFileList entries={fileList} />
            {/* uploading files - name / Email - Metadata - Submit Discard*/}
        </Stack>
    );
};
