/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Asset,
    AssetChooserObjectType,
    FileExtension,
    FileExtensionSets,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
    usePrivacySettings,
} from '@frontify/app-bridge';
import { TextStyles } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    DownloadButton,
    RichTextEditor,
    convertToRteValue,
    downloadAsset,
    getDefaultPluginsWithLinkChooser,
    hasRichTextValue,
    isDownloadable,
    joinClassNames,
} from '@frontify/guideline-blocks-shared';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { AudioPlayer, BlockAttachments, UploadPlaceholder } from './components';
import { getRteTitlePlugins } from './helpers/getRteTitlePlugins';
import { AUDIO_ID } from './settings';
import { BlockSettings, TextPosition } from './types';

const DEFAULT_CONTENT_TITLE = convertToRteValue(TextStyles.heading3);
const DEFAULT_CONTENT_DESCRIPTION = convertToRteValue();

export const AudioBlock = ({ appBridge }: BlockProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'audio/*' });
    const { assetDownloadEnabled } = usePrivacySettings(appBridge);
    const [isTitlePending, setIsTitlePending] = useState(false);
    const [isDescriptionPending, setIsDescriptionPending] = useState(false);
    const audio = blockAssets?.[AUDIO_ID]?.[0];

    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isLoading && setIsLoading(true),
    });

    const onRemoveAsset = () => deleteAssetIdsFromKey(AUDIO_ID, [audio?.id]);
    const updateAudioAsset = async (audio: Asset) => {
        if (!hasRichTextValue(blockSettings.title)) {
            onTitleChange(convertToRteValue(TextStyles.heading3, audio.title));
        }
        await updateAssetIdsFromKey(AUDIO_ID, [audio.id]);
        setIsLoading(false);
    };

    const openAssetChooser = () => {
        appBridge.openAssetChooser(
            async (result) => {
                setIsLoading(true);
                updateAudioAsset(result[0]);
                appBridge.closeAssetChooser();
            },
            {
                selectedValueId: blockAssets[AUDIO_ID]?.[0]?.id,
                objectTypes: [AssetChooserObjectType.File],
                extensions: FileExtensionSets.Audio,
            }
        );
    };

    const onFilesDrop = (files: FileList) => {
        if (files) {
            const droppedFileExtension = files[0].name.split('.').pop()?.toLocaleLowerCase() as FileExtension;
            if (FileExtensionSets.Audio.includes(droppedFileExtension)) {
                setIsLoading(true);
                uploadFile(files[0]);
            }
        }
    };

    const onTitleChange = (value: string) => {
        if (value === blockSettings.title) {
            setIsTitlePending(false);
        } else {
            setBlockSettings({ title: value }).finally(() => {
                setIsTitlePending(false);
            });
        }
    };

    const onDescriptionChange = (value: string) => {
        if (value === blockSettings.description) {
            setIsDescriptionPending(false);
        } else {
            setBlockSettings({ description: value }).finally(() => {
                setIsDescriptionPending(false);
            });
        }
    };

    useEffect(() => {
        if (selectedFiles) {
            setIsLoading(true);
            uploadFile(selectedFiles[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll && uploadResults) {
            updateAudioAsset(uploadResults[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    return (
        <div
            data-test-id="audio-block"
            className={joinClassNames([
                'tw-flex tw-flex-col tw-gap-3',
                blockSettings.positioning === TextPosition.Below ? 'tw-mt-5' : 'tw-flex-col-reverse',
            ])}
        >
            {audio ? (
                <AudioPlayer
                    audio={audio}
                    isEditing={isEditing}
                    isLoading={isLoading}
                    openFileDialog={openFileDialog}
                    openAssetChooser={openAssetChooser}
                    onRemoveAsset={onRemoveAsset}
                />
            ) : (
                isEditing && (
                    <UploadPlaceholder
                        onUploadClick={openFileDialog}
                        onAssetChooseClick={openAssetChooser}
                        onFilesDrop={onFilesDrop}
                        loading={isLoading}
                    />
                )
            )}
            <div className="tw-flex tw-gap-4 tw-justify-between tw-w-full">
                <div className="tw-flex-1">
                    <div data-test-id="block-title">
                        <RichTextEditor
                            id={`${appBridge.getBlockId().toString()}-title`}
                            plugins={getRteTitlePlugins()}
                            isEditing={isEditing}
                            onBlur={onTitleChange}
                            onTextChange={onTitleChange}
                            value={blockSettings.title ?? DEFAULT_CONTENT_TITLE}
                            placeholder="Asset name"
                            onValueChanged={() => setIsTitlePending(true)}
                            shouldPreventPageLeave={isTitlePending}
                            updateValueOnChange
                        />
                    </div>

                    <div data-test-id="block-description">
                        <RichTextEditor
                            id={`${appBridge.getBlockId().toString()}-description`}
                            plugins={getDefaultPluginsWithLinkChooser(appBridge)}
                            isEditing={isEditing}
                            onBlur={onDescriptionChange}
                            onTextChange={onDescriptionChange}
                            value={blockSettings.description ?? DEFAULT_CONTENT_DESCRIPTION}
                            placeholder="Add a description here"
                            onValueChanged={() => setIsDescriptionPending(true)}
                            shouldPreventPageLeave={isDescriptionPending}
                        />
                    </div>
                </div>
                {audio && (
                    <div className="tw-flex tw-gap-2">
                        {isDownloadable(blockSettings.security, blockSettings.downloadable, assetDownloadEnabled) && (
                            <DownloadButton onDownload={() => downloadAsset(audio)} />
                        )}
                        <BlockAttachments appBridge={appBridge} />
                    </div>
                )}
            </div>
        </div>
    );
};
