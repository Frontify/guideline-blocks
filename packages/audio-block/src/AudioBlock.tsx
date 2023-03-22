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
    IconTrashBin20,
    ItalicPlugin,
    LoadingCircle,
    PluginComposer,
    Position,
    ResetFormattingPlugin,
    RichTextEditor,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    TextStyles,
    UnderlinePlugin,
    parseRawValue,
    serializeRawToHtml,
} from '@frontify/fondue';
import {
    BlockItemWrapper,
    DownloadButton,
    convertToRTEValue,
    downloadAsset,
    hasRichTextValue,
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
} from '@frontify/app-bridge';
import 'tailwindcss/tailwind.css';
import { BlockSettings, TextPosition } from './types';
import { AUDIO_ID } from './settings';
import { BlockAttachments, UploadPlaceholder } from './components';
import { useEffect, useMemo, useState } from 'react';

const DEFAULT_CONTENT_TITLE = convertToRTEValue('', TextStyles.ELEMENT_HEADING3);
const DEFAULT_CONTENT_DESCRIPTION = convertToRTEValue('', TextStyles.ELEMENT_PARAGRAPH);

export const AudioBlock = ({ appBridge }: BlockProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'audio/*' });
    const { designTokens } = useGuidelineDesignTokens();
    const { title, description, downloadable, positioning } = blockSettings;
    const audio = blockAssets?.[AUDIO_ID]?.[0];

    const rawTitleValue = JSON.stringify(parseRawValue({ raw: title }));
    const htmlTitle = serializeRawToHtml(rawTitleValue, designTokens);
    const rawDescriptionValue = JSON.stringify(parseRawValue({ raw: description }));
    const htmlDescription = serializeRawToHtml(rawDescriptionValue, designTokens);

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

    const saveTitle = (title: string) => {
        if (title !== blockSettings.title) {
            setBlockSettings({ title });
        }
    };

    const saveDescription = (description: string) => {
        if (description !== blockSettings.description) {
            setBlockSettings({ description });
        }
    };

    const onRemoveAsset = () => {
        deleteAssetIdsFromKey(AUDIO_ID, [audio?.id]);
    };

    const updateAudioAsset = async (audio: Asset) => {
        if (!hasRichTextValue(title)) {
            saveTitle(convertToRTEValue(audio?.title, TextStyles.ELEMENT_HEADING3));
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
                objectTypes: [AssetChooserObjectType.File],
                extensions: FileExtensionSets.Audio,
            }
        );
    };

    const onFilesDrop = (files: FileList) => {
        if (files) {
            const droppedFileExtension = files[0].name.split('.').pop() as FileExtension;
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
                        [
                            {
                                title: 'Delete',
                                icon: <IconTrashBin20 />,
                                onClick: () => onRemoveAsset(),
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
                    {isEditing ? (
                        <RichTextEditor
                            designTokens={designTokens}
                            border={false}
                            onBlur={saveTitle}
                            placeholder="Asset name"
                            value={title ?? DEFAULT_CONTENT_TITLE}
                            plugins={customTitlePlugins}
                            updateValueOnChange
                        />
                    ) : (
                        <>
                            {hasRichTextValue(title) && (
                                <div data-test-id="block-title-html" dangerouslySetInnerHTML={{ __html: htmlTitle }} />
                            )}
                        </>
                    )}
                    {isEditing ? (
                        <RichTextEditor
                            designTokens={designTokens}
                            border={false}
                            position={Position.FLOATING}
                            onBlur={saveDescription}
                            placeholder="Add a description here"
                            value={description ?? DEFAULT_CONTENT_DESCRIPTION}
                        />
                    ) : (
                        <>
                            {hasRichTextValue(description) && (
                                <div
                                    data-test-id="block-description-html"
                                    dangerouslySetInnerHTML={{ __html: htmlDescription }}
                                />
                            )}
                        </>
                    )}
                </div>
                {audio && (
                    <div className="tw-flex tw-gap-2">
                        {downloadable && <DownloadButton onDownload={() => downloadAsset(audio)} />}
                        <BlockAttachments appBridge={appBridge} />
                    </div>
                )}
            </div>
        </div>
    );
};
