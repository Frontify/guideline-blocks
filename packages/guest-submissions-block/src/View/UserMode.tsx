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
    Modal,
    ModalWidth,
    Stack,
} from "@frontify/fondue";
import { AssetDropzone } from "../Components/AssetDropzone";
import { Headline, ModalHeadline } from "../Components/Headline";
import { UploadFileList } from "../Components/UploadFileList";
import {
    QueryFile,
    queryFilesDTO,
} from "../module/FileUpload/Entity/QueryFile";
import { FileUploadModule } from "../module/FileUpload/FileUploadModule";
import { FileUploadResponse } from "../module/FileUpload/Contract/FileUploadResponse";
import { Metadata } from "../Components/MetaData";
import { useBlockSettings } from "@frontify/app-bridge";
import { Settings } from "../types";
import { AssetSubmission } from "../module/AssetSubmission/AssetSubmission";

export const UserMode: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
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

    const CARD_CONTAINER =
        "tw-bg-base-alt tw-rounded tw-flex tw-justify-between tw-content-center tw-items-center tw-p-4";
    return (
        <>
            <div className={CARD_CONTAINER}>
                <Headline appBridge={appBridge} />
                <div>
                    <Button onClick={() => setModalOpen(!modalOpen)}>
                        {blockSettings.buttonText}
                    </Button>
                </div>
            </div>
            <Modal
                width={ModalWidth.Default}
                onClose={() => setModalOpen(false)}
                isOpen={modalOpen}
                isDismissable
            >
                <Modal.Body horizontalPadding={false}>
                    <div className="tw-p-6">
                        <Stack spacing="s" padding="none" direction="column">
                            <ModalHeadline appBridge={appBridge} />
                            <AssetDropzone onFileUpload={onFileUploadHandler} />
                            <UploadFileList
                                entries={fileList}
                                onEntryDeletion={onFileDeletion}
                            />

                            <Divider color="rgb(234, 235, 235)" />

                            {fileList.length > 0 && (
                                <Metadata
                                    appBridge={appBridge}
                                    onSubmit={(formData) => {
                                        setModalOpen(false);

                                        AssetSubmission.createAssetSubmissions({
                                            requestId:
                                                blockSettings.assetSubmission,
                                            token: blockSettings
                                                .assetSubmissionMetadataConfig
                                                .tokens[0].token,
                                            fileIds: fileList.map(
                                                (item) => item.uploadUrlId!
                                            ),
                                            submitter: {
                                                name: "Peter",
                                                email: "mark@hans.ch",
                                            },
                                            metadata: `[${JSON.stringify(
                                                formData
                                            )}]`,
                                            //  "custom": {id: "id of custom metadta", value: "value"}
                                            //  "standard": {id: field_key, value: value }
                                        });
                                    }}
                                >
                                    <Divider color="rgb(234, 235, 235)" />

                                    <div className="tw-mt-2 tw-flex tw-justify-end">
                                        <div className="tw-pr-3">
                                            <Button
                                                style={ButtonStyle.Default}
                                                emphasis={
                                                    ButtonEmphasis.Default
                                                }
                                                onClick={() =>
                                                    setModalOpen(false)
                                                }
                                            >
                                                Cancel
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
                            )}
                            {fileList.length === 0 && (
                                <Button
                                    style={ButtonStyle.Default}
                                    emphasis={ButtonEmphasis.Default}
                                    onClick={() => setModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                            )}
                        </Stack>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};
