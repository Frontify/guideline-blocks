import type { FC } from "react";
import React, { useState } from "react";
import { useBlockSettings } from "@frontify/app-bridge";
import type { BlockProps } from "@frontify/guideline-blocks-settings";
import { Settings } from "./types";
import { Headline } from "./components/Headline";
import { AssetDropzone } from "./components/AssetDropzone";
import { Divider, IconPlus24, IconSize, Stack } from "@frontify/fondue";
import { UploadFileList } from "./components/UploadFileList";
import { adaptFilesToUploadList } from "./components/UploadFileList/adapter";

export const AnExampleBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] =
        useBlockSettings<Settings>(appBridge);

    const [fileList, setFileList] = useState<FileList>();

    const onFileUpload = (e: any) => {
        console.log("File Upload Happened", e);
        setFileList(e);
    };

    return (
        <Stack spacing="s" padding="none" direction="column">
            <Headline appBridge={appBridge} />
            <Divider color="rgb(234, 235, 235)" />
            <AssetDropzone onFileUpload={onFileUpload}>
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
            <UploadFileList entries={adaptFilesToUploadList(fileList)} />
            {/* uploading files - name / Email - Metadata - Submit Discard*/}
        </Stack>
    );
};
