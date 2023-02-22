/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
    InitPlugin,
    ItalicPlugin,
    LoadingCircle,
    PluginComposer,
    Position,
    ResetFormattingPlugin,
    RichTextEditor,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
} from '@frontify/fondue';
import { Plugin, PluginProps } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/Plugin';
import { joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import {
    Asset,
    AssetChooserObjectType,
    FileExtension,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
} from '@frontify/app-bridge';
import 'tailwindcss/tailwind.css';
import { BlockSettings, TextPosition } from './types';
import { AUDIO_EXTENSIONS, AUDIO_ID } from './settings';
import { UploadPlaceholder } from './components/UploadPlaceholder';
import { ItemToolbar } from './components/ItemToolbar';
import { BlockAttachments } from './components/BlockAttachments';
import { useEffect, useState } from 'react';

const DEFAULT_CONTENT_TITLE = '[{"type":"heading3","children":[{"text":""}]}]';
const DEFAULT_CONTENT_DESCRIPTION = '[{"type":"paragraph","children":[{"text":""}]}]';

const customTitlePlugins = new PluginComposer();
customTitlePlugins
    .setPlugin([new InitPlugin(), new TextStylePlugin() as Plugin<PluginProps>])
    .setPlugin([new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()])
    .setPlugin([new AlignLeftPlugin(), new AlignRightPlugin(), new AlignCenterPlugin(), new AlignJustifyPlugin()])
    .setPlugin([new ResetFormattingPlugin()]);

export const AudioBlock = ({ appBridge }: BlockProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [droppedFiles, setDroppedFiles] = useState<FileList | null>(null);
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ multiple: false, accept: 'audio/*' });
    const { designTokens } = useGuidelineDesignTokens();
    const { title, description } = blockSettings;
    const audio = blockAssets?.[AUDIO_ID]?.[0];

    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isLoading && setIsLoading(true),
    });

    const audioBlockClassNames = joinClassNames([
        'tw-flex tw-flex-col tw-gap-3',
        blockSettings.positioning === TextPosition.Above && 'tw-flex-col-reverse',
    ]);

    const audioTagClassNames = joinClassNames([
        'tw-w-full tw-mt-5',
        isEditing && 'group-hover:tw-border group-hover:tw-border-box-selected-inverse group-hover:tw-rounded-[4px]',
    ]);

    const saveTitle = (value: string) => {
        if (value !== blockSettings.title) {
            setBlockSettings({
                title: value,
            });
        }
    };

    const saveDescription = (value: string) => {
        if (value !== blockSettings.description) {
            setBlockSettings({
                description: value,
            });
        }
    };

    const onRemoveAsset = () => {
        deleteAssetIdsFromKey(AUDIO_ID, [audio?.id]);
    };

    const updateAudioAsset = async (audio: Asset) => {
        updateAssetIdsFromKey(AUDIO_ID, [audio.id]);
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
                multiSelection: false,
                objectTypes: [AssetChooserObjectType.File],
                extensions: AUDIO_EXTENSIONS,
            }
        );
    };

    useEffect(() => {
        if (selectedFiles) {
            setIsLoading(true);
            uploadFile(selectedFiles[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (droppedFiles) {
            if (AUDIO_EXTENSIONS.includes(droppedFiles[0].name.split('.').pop() as FileExtension)) {
                setIsLoading(true);
                uploadFile(droppedFiles[0]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [droppedFiles]);

    useEffect(() => {
        if (doneAll && uploadResults) {
            updateAudioAsset(uploadResults[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    return (
        <div data-test-id="audio-block" className={audioBlockClassNames}>
            {audio ? (
                <div className="tw-group">
                    {isEditing && (
                        <ItemToolbar
                            onRemoveAsset={onRemoveAsset}
                            onUploadClick={openFileDialog}
                            onAssetChooseClick={openAssetChooser}
                        />
                    )}

                    {isLoading ? (
                        <div className="tw-flex tw-items-center tw-justify-center tw-h-[54px]">
                            <LoadingCircle />
                        </div>
                    ) : (
                        <audio
                            data-test-id="audio-block-audio-tag"
                            key={audio.id}
                            controls
                            className={audioTagClassNames}
                            controlsList="nodownload"
                            preload="auto"
                        >
                            <source src={audio.genericUrl} type="audio/mp3" />
                        </audio>
                    )}
                </div>
            ) : (
                isEditing && (
                    <UploadPlaceholder
                        onUploadClick={openFileDialog}
                        onAssetChooseClick={openAssetChooser}
                        loading={isLoading}
                        setDroppedFiles={setDroppedFiles}
                    />
                )
            )}
            <div className="tw-flex tw-gap-4 tw-justify-between tw-w-full">
                <div className="tw-self-stretch">
                    <RichTextEditor
                        designTokens={designTokens ?? undefined}
                        border={false}
                        onBlur={saveTitle}
                        placeholder={isEditing ? 'add a title here' : undefined}
                        readonly={!isEditing}
                        value={title ?? DEFAULT_CONTENT_TITLE}
                        plugins={customTitlePlugins}
                    />
                    <RichTextEditor
                        designTokens={designTokens ?? undefined}
                        border={false}
                        position={Position.FLOATING}
                        onBlur={saveDescription}
                        placeholder={isEditing ? 'add a description here' : undefined}
                        readonly={!isEditing}
                        value={description ?? DEFAULT_CONTENT_DESCRIPTION}
                    />
                </div>
                {audio && <BlockAttachments assetToDownload={audio} appBridge={appBridge} />}
            </div>
        </div>
    );
};
