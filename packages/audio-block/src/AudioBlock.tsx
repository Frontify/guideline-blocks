/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
    IconArrowCircleUp20,
    IconImageStack20,
    IconTrashBin16,
    ItalicPlugin,
    LoadingCircle,
    PluginComposer,
    ResetFormattingPlugin,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    TextStyles,
    UnderlinePlugin,
} from '@frontify/fondue';
import {
    BlockItemWrapper,
    DownloadButton,
    RichTextEditor,
    convertToRteValue,
    downloadAsset,
    hasRichTextValue,
    isDownloadable,
    joinClassNames,
    useGuidelineDesignTokens,
} from '@frontify/guideline-blocks-shared';
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
import 'tailwindcss/tailwind.css';
import { BlockSettings, TextPosition } from './types';
import { AUDIO_ID } from './settings';
import { BlockAttachments, UploadPlaceholder } from './components';
import { useEffect, useMemo, useState } from 'react';

const DEFAULT_CONTENT_TITLE = convertToRteValue(TextStyles.ELEMENT_HEADING3);
const DEFAULT_CONTENT_DESCRIPTION = convertToRteValue(TextStyles.ELEMENT_PARAGRAPH);

export const AudioBlock = ({ appBridge }: BlockProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'audio/*' });
    const { designTokens } = useGuidelineDesignTokens();
    const { assetDownloadEnabled } = usePrivacySettings(appBridge);

    const { title, description, downloadable, positioning, security } = blockSettings;
    const audio = blockAssets?.[AUDIO_ID]?.[0];

    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isLoading && setIsLoading(true),
    });

    const customTitlePlugins = useMemo(() => {
        return new PluginComposer()
            .setPlugin([new SoftBreakPlugin(), new TextStylePlugin()])
            .setPlugin([new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()])
            .setPlugin([
                new AlignLeftPlugin(),
                new AlignCenterPlugin(),
                new AlignRightPlugin(),
                new AlignJustifyPlugin(),
                new ResetFormattingPlugin(),
            ]);
    }, []);

    const saveTitle = (title: string) => setBlockSettings({ title });
    const saveDescription = (description: string) => setBlockSettings({ description });

    const onRemoveAsset = () => deleteAssetIdsFromKey(AUDIO_ID, [audio?.id]);
    const updateAudioAsset = async (audio: Asset) => {
        if (!hasRichTextValue(title)) {
            saveTitle(convertToRteValue(TextStyles.ELEMENT_HEADING3, audio.title));
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
                positioning === TextPosition.Below ? 'tw-mt-5' : 'tw-flex-col-reverse',
            ])}
        >
            {audio ? (
                <BlockItemWrapper
                    shouldHideWrapper={!isEditing}
                    toolbarFlyoutItems={[
                        [
                            {
                                title: 'Replace with upload',
                                icon: <IconArrowCircleUp20 />,
                                onClick: openFileDialog,
                            },
                            {
                                title: 'Replace with asset',
                                icon: <IconImageStack20 />,
                                onClick: openAssetChooser,
                            },
                        ],
                    ]}
                    toolbarItems={[
                        { icon: <IconTrashBin16 />, tooltip: 'Delete Item', onClick: () => onRemoveAsset() },
                    ]}
                >
                    {isLoading ? (
                        <div className="tw-flex tw-items-center tw-justify-center tw-h-14">
                            <LoadingCircle />
                        </div>
                    ) : (
                        <audio
                            data-test-id="audio-block-audio-tag"
                            key={audio.id}
                            controls
                            className="tw-w-full tw-outline-none"
                            controlsList="nodownload"
                            preload="metadata"
                            src={audio.genericUrl}
                        />
                    )}
                </BlockItemWrapper>
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
                            designTokens={designTokens}
                            isEditing={isEditing}
                            value={title ?? DEFAULT_CONTENT_TITLE}
                            placeholder="Asset name"
                            plugins={customTitlePlugins}
                            updateValueOnChange
                            onBlur={saveTitle}
                        />
                    </div>

                    <div data-test-id="block-description">
                        <RichTextEditor
                            id={`${appBridge.getBlockId().toString()}-description`}
                            designTokens={designTokens}
                            isEditing={isEditing}
                            value={description ?? DEFAULT_CONTENT_DESCRIPTION}
                            placeholder="Add a description here"
                            onBlur={saveDescription}
                        />
                    </div>
                </div>
                {audio && (
                    <div className="tw-flex tw-gap-2">
                        {isDownloadable(security, downloadable, assetDownloadEnabled) && (
                            <DownloadButton onDownload={() => downloadAsset(audio)} />
                        )}
                        <BlockAttachments appBridge={appBridge} />
                    </div>
                )}
            </div>
        </div>
    );
};
