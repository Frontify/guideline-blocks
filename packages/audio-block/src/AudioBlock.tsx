/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Asset,
    AssetChooserObjectType,
    FileExtension,
    FileExtensionSets,
    useAssetChooser,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
    usePrivacySettings,
} from '@frontify/app-bridge';
import {
    BlockProps,
    DownloadButton,
    RichTextEditor,
    TextStyles,
    convertToRteValue,
    hasRichTextValue,
    isDownloadable,
    joinClassNames,
    withAttachmentsProvider,
} from '@frontify/guideline-blocks-settings';
import { useEffect, useState } from 'react';

import { AudioPlayer, BlockAttachments, UploadPlaceholder } from './components';
import { getDescriptionPlugins, titlePlugins } from './helpers/plugins';
import { ATTACHMENTS_ASSET_ID, AUDIO_ID } from './settings';
import { BlockSettings, TextPosition } from './types';

import 'tailwindcss/tailwind.css';
import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';

const DEFAULT_CONTENT_TITLE = convertToRteValue(TextStyles.imageTitle);
const DEFAULT_CONTENT_DESCRIPTION = convertToRteValue(TextStyles.imageCaption);

export const AudioBlock = withAttachmentsProvider(({ appBridge }: BlockProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'audio/*' });
    const { assetDownloadEnabled } = usePrivacySettings(appBridge);
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

    const onOpenAssetChooser = () => {
        openAssetChooser(
            async (result) => {
                setIsLoading(true);
                updateAudioAsset(result[0]);
                closeAssetChooser();
            },
            {
                selectedValueId: blockAssets[AUDIO_ID]?.[0]?.id,
                objectTypes: [AssetChooserObjectType.File],
                extensions: FileExtensionSets.Audio,
            },
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

    const onTitleChange = (title: string) => title !== blockSettings.title && setBlockSettings({ title });

    const onDescriptionChange = (description: string) =>
        description !== blockSettings.description && setBlockSettings({ description });

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
        <div className="audio-block">
            <div
                data-test-id="audio-block"
                className={joinClassNames([
                    'tw-flex tw-gap-3',
                    blockSettings.positioning === TextPosition.Below ? 'tw-flex-col' : 'tw-flex-col-reverse',
                ])}
            >
                {audio ? (
                    <AudioPlayer
                        audio={audio}
                        isEditing={isEditing}
                        isLoading={isLoading}
                        openFileDialog={openFileDialog}
                        openAssetChooser={onOpenAssetChooser}
                        onRemoveAsset={onRemoveAsset}
                    />
                ) : (
                    isEditing && (
                        <UploadPlaceholder
                            onUploadClick={openFileDialog}
                            onAssetChooseClick={onOpenAssetChooser}
                            onFilesDrop={onFilesDrop}
                            loading={isLoading}
                        />
                    )
                )}
                <div className="tw-flex tw-gap-4 tw-justify-between tw-w-full tw-relative">
                    <div className="tw-flex-1">
                        <div data-test-id="block-title">
                            <RichTextEditor
                                id={`${appBridge.getBlockId().toString()}-title`}
                                plugins={titlePlugins}
                                isEditing={isEditing}
                                onTextChange={onTitleChange}
                                value={blockSettings.title ?? DEFAULT_CONTENT_TITLE}
                                placeholder="Asset name"
                            />
                        </div>

                        <div data-test-id="block-description">
                            <RichTextEditor
                                id={`${appBridge.getBlockId().toString()}-description`}
                                plugins={getDescriptionPlugins(appBridge)}
                                isEditing={isEditing}
                                onTextChange={onDescriptionChange}
                                value={blockSettings.description ?? DEFAULT_CONTENT_DESCRIPTION}
                                placeholder="Add a description here"
                            />
                        </div>
                    </div>
                    {audio && !isEditing && (
                        <div className="tw-flex tw-gap-2" data-test-id="view-mode-addons">
                            {isDownloadable(
                                blockSettings.security,
                                blockSettings.downloadable,
                                assetDownloadEnabled,
                            ) && (
                                <DownloadButton
                                    onDownload={() => appBridge.dispatch({ name: 'downloadAsset', payload: audio })}
                                />
                            )}
                            <BlockAttachments appBridge={appBridge} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}, ATTACHMENTS_ASSET_ID);
