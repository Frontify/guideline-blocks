/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { FC } from 'react';
import React, { useState } from 'react';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    Button,
    ButtonEmphasis,
    ButtonStyle,
    ButtonType,
    Divider,
    IconArrowRight24,
    LegacyStack,
    Modal,
    ModalWidth,
} from '@frontify/fondue';
import { AssetDropzone } from '../Components/AssetDropzone';
import { UploadFileList } from '../Components/UploadFileList';
import { QueryFile, queryFilesDTO } from '../module/FileUpload/Entity/QueryFile';
import { FileUploadModule } from '../module/FileUpload/FileUploadModule';
import { FileUploadResponse } from '../module/FileUpload/Contract/FileUploadResponse';
import { Metadata } from '../Components/MetaData';
import { useBlockSettings } from '@frontify/app-bridge';
import { Settings } from '../types';
import { AssetSubmission } from '../module/AssetSubmission/AssetSubmission';
import { assetSubmissionDTO } from '../module/AssetSubmission/AssetSubmissionDTO';
import { Headline, ModalHeadline } from '../Components/Headline';
import { Status } from '../module/FileUpload/Contract/Status';
import { BlockRoutes } from './Router';
import { BlockStyles } from '@frontify/guideline-blocks-shared';

export const CARD_CONTAINER =
    'tw-bg-base-alt tw-rounded tw-flex tw-justify-between tw-content-center tw-items-center tw-p-8';
export const UserMode: FC<BlockProps & { setView: (routes: BlockRoutes) => void }> = ({ appBridge, setView }) => {
    const [{ buttonText, assetSubmissionToken, assetSubmissionId }, setBlockSettings] =
        useBlockSettings<Settings>(appBridge);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [fileList, setFileList] = useState<QueryFile[] | (QueryFile & File)[]>([]);
    const [buttonHover, setButtonHover] = useState<boolean>(false);

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
        const updatedUploadList = fileList.filter((item) => item.identifier !== identifer);
        setFileList(updatedUploadList);
    };

    return (
        <>
            <div className={CARD_CONTAINER}>
                <div className={'tw-w-2/3'}>
                    <Headline appBridge={appBridge} />
                </div>
                <div>
                    <button
                        onMouseEnter={() => setButtonHover(true)}
                        onMouseLeave={() => setButtonHover(false)}
                        style={{
                            ...BlockStyles.buttonPrimary,
                            ...(buttonHover ? BlockStyles.buttonPrimary?.hover : null),
                        }}
                        onClick={() => setModalOpen(!modalOpen)}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
            <Modal width={ModalWidth.Default} onClose={() => setModalOpen(false)} isOpen={modalOpen} isDismissable>
                <Modal.Body horizontalPadding={false}>
                    <div className="tw-p-16 tw-pr-14 tw-pb-14">
                        <LegacyStack spacing="s" padding="none" direction="column">
                            <ModalHeadline appBridge={appBridge} />
                            <AssetDropzone onFileUpload={onFileUploadHandler} />
                            <UploadFileList entries={fileList} onEntryDeletion={onFileDeletion} />

                            <Divider color="rgb(234, 235, 235)" />

                            {fileList.length > 0 && (
                                <Metadata
                                    appBridge={appBridge}
                                    onSubmit={async (formData) => {
                                        await setBlockSettings({ uploadedFiles: fileList.length });
                                        AssetSubmission.createAssetSubmissions({
                                            requestId: assetSubmissionId,
                                            token: assetSubmissionToken,
                                            fileIds: fileList.map((item) => item.uploadUrlId),
                                            submitter: {
                                                name: formData.name,
                                                email: formData.email,
                                            },
                                            metadata: assetSubmissionDTO(formData),
                                            autoApprove: true,
                                        });

                                        setFileList([]);

                                        setModalOpen(false);
                                        setView(BlockRoutes.SUCCESS_PAGE);
                                    }}
                                >
                                    <Divider color="rgb(234, 235, 235)" />

                                    <div className="tw-mt-2 tw-flex tw-justify-end">
                                        <div className="tw-pr-3">
                                            <Button
                                                style={ButtonStyle.Default}
                                                emphasis={ButtonEmphasis.Default}
                                                onClick={() => setModalOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                        <Button
                                            icon={<IconArrowRight24 />}
                                            type={ButtonType.Submit}
                                            disabled={fileList.some((file) => file.status === Status.PENDING)}
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
                        </LegacyStack>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};
