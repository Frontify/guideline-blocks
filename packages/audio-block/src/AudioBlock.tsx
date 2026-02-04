/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type Asset,
    AssetChooserObjectType,
    type FileExtension,
    FileExtensionSets,
    useAssetChooser,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
    usePrivacySettings,
} from '@frontify/app-bridge';
import { generateRandomId } from '@frontify/fondue';
import {
    AttachmentOperationsProvider,
    type BlockProps,
    RichTextEditor,
    TextStyles,
    convertToRteValue,
    hasRichTextValue,
    isDownloadable,
    joinClassNames,
} from '@frontify/guideline-blocks-settings';
import { DownloadButton, StyleProvider } from '@frontify/guideline-blocks-shared';
import { useEffect, useState } from 'react';

import { AudioPlayer, BlockAttachments, UploadPlaceholder } from './components';
import { getDescriptionPlugins, titlePlugins } from './helpers/plugins';
import { ATTACHMENTS_ASSET_ID, AUDIO_ID } from './settings';
import { type BlockSettings, TextPosition } from './types';

const DEFAULT_CONTENT_TITLE = convertToRteValue(TextStyles.imageTitle);
const DEFAULT_CONTENT_DESCRIPTION = convertToRteValue(TextStyles.imageCaption);

export const AudioBlock = ({ appBridge }: BlockProps) => {
    const [isLoading, setIsLoading] = useState(false);
    // eslint-disable-next-line @eslint-react/prefer-use-state-lazy-initialization
    const [titleKey, setTitleKey] = useState(generateRandomId());
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const blockAssetsBundle = useBlockAssets(appBridge);
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = blockAssetsBundle;
    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'audio/*' });
    const { assetDownloadEnabled } = usePrivacySettings(appBridge);
    const audio = blockAssets?.[AUDIO_ID]?.[0];
    const blockId = appBridge.context('blockId').get();

    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isLoading && setIsLoading(true),
    });

    const onRemoveAsset = () => deleteAssetIdsFromKey(AUDIO_ID, [audio?.id]);
    const updateAudioAsset = async (audio: Asset) => {
        if (!hasRichTextValue(blockSettings.title)) {
            await onTitleChange(convertToRteValue(TextStyles.imageTitle, audio.title));
            setTitleKey(generateRandomId());
        }
        await updateAssetIdsFromKey(AUDIO_ID, [audio.id]);
        setIsLoading(false);
    };

    const onOpenAssetChooser = () => {
        openAssetChooser(
            // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/require-await
            async (result) => {
                setIsLoading(true);
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                updateAudioAsset(result[0]);
                closeAssetChooser();
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

    const onTitleChange = async (title: string) => {
        if (title !== blockSettings.title) {
            await setBlockSettings({ title });
        }
    };

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
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            updateAudioAsset(uploadResults[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    const titleValue = blockSettings.title ?? DEFAULT_CONTENT_TITLE;
    const descriptionValue = blockSettings.description ?? DEFAULT_CONTENT_DESCRIPTION;

    return (
        <AttachmentOperationsProvider
            blockAssetBundle={blockAssetsBundle}
            assetId={ATTACHMENTS_ASSET_ID}
            appBridge={appBridge}
        >
            <div className="audio-block">
                <StyleProvider>
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
                                        key={titleKey}
                                        id={`${blockId}-title`}
                                        plugins={titlePlugins}
                                        isEditing={isEditing}
                                        onTextChange={onTitleChange}
                                        value={titleValue}
                                        placeholder="Asset name"
                                        showSerializedText={hasRichTextValue(titleValue)}
                                    />
                                </div>

                                <div data-test-id="block-description">
                                    <RichTextEditor
                                        id={`${blockId}-description`}
                                        plugins={getDescriptionPlugins(appBridge)}
                                        isEditing={isEditing}
                                        onTextChange={onDescriptionChange}
                                        value={descriptionValue}
                                        placeholder="Add a description here"
                                        showSerializedText={hasRichTextValue(descriptionValue)}
                                    />
                                </div>
                            </div>
                            {audio && !isEditing && (
                                <div className="tw-flex tw-gap-2 tw-leading-normal" data-test-id="view-mode-addons">
                                    {isDownloadable(
                                        blockSettings.security,
                                        blockSettings.downloadable,
                                        assetDownloadEnabled
                                    ) && (
                                        <DownloadButton
                                            onDownload={() =>
                                                appBridge.dispatch({ name: 'downloadAsset', payload: audio })
                                            }
                                        />
                                    )}
                                    <BlockAttachments appBridge={appBridge} />
                                </div>
                            )}
                        </div>
                    </div>
                </StyleProvider>
            </div>
        </AttachmentOperationsProvider>
    );
};
