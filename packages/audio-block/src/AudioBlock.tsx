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
import { UploadPlaceholder } from './components/UploadPlaceholder';
import { ItemToolbar } from './components/ItemToolbar';
import { BlockAttachments } from './components/BlockAttachments';
import { useEffect, useMemo, useState } from 'react';

const DEFAULT_CONTENT_TITLE = '[{"type":"heading3","children":[{"text":""}]}]';
const DEFAULT_CONTENT_DESCRIPTION = '[{"type":"paragraph","children":[{"text":""}]}]';

export const AudioBlock = ({ appBridge }: BlockProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'audio/*' });
    const { designTokens } = useGuidelineDesignTokens();
    const { title, description } = blockSettings;
    const audio = blockAssets?.[AUDIO_ID]?.[0];

    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isLoading && setIsLoading(true),
    });

    const customTitlePlugins = useMemo(() => {
        return new PluginComposer()
            .setPlugin([new InitPlugin(), new TextStylePlugin() as Plugin<PluginProps>])
            .setPlugin([new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()])
            .setPlugin([
                new AlignLeftPlugin(),
                new AlignRightPlugin(),
                new AlignCenterPlugin(),
                new AlignJustifyPlugin(),
            ])
            .setPlugin([new ResetFormattingPlugin()]);
    }, []);

    const audioBlockClassNames = joinClassNames([
        'tw-flex tw-flex-col tw-gap-3',
        blockSettings.positioning === TextPosition.Above && 'tw-flex-col-reverse',
    ]);

    const audioTagClassNames = joinClassNames([
        'tw-w-full tw-mt-5',
        isEditing &&
            'group-hover:tw-outline tw-outline-1 tw-outline-offset-1 tw-outline-box-selected-inverse tw-rounded',
    ]);

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

    const updateAudioAsset = (audio: Asset) => {
        updateAssetIdsFromKey(AUDIO_ID, [audio.id]).then(() => setIsLoading(false));
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
        console.log(files);
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
                        <div className="tw-flex tw-items-center tw-justify-center tw-h-14">
                            <LoadingCircle />
                        </div>
                    ) : (
                        <audio
                            data-test-id="audio-block-audio-tag"
                            key={audio.id}
                            controls
                            className={audioTagClassNames}
                            controlsList="nodownload"
                            preload="metadata"
                            src={audio.genericUrl}
                        />
                    )}
                </div>
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
                    <div data-test-id="audio-block-title">
                        <RichTextEditor
                            designTokens={designTokens}
                            border={false}
                            onBlur={saveTitle}
                            placeholder={isEditing ? 'Asset name' : undefined}
                            readonly={!isEditing}
                            value={title ?? DEFAULT_CONTENT_TITLE}
                            plugins={customTitlePlugins}
                        />
                    </div>
                    <div data-test-id="audio-block-description">
                        <RichTextEditor
                            designTokens={designTokens}
                            border={false}
                            position={Position.FLOATING}
                            onBlur={saveDescription}
                            placeholder={isEditing ? 'Add a description here' : undefined}
                            readonly={!isEditing}
                            value={description ?? DEFAULT_CONTENT_DESCRIPTION}
                        />
                    </div>
                </div>
                {audio ? <BlockAttachments assetToDownload={audio} appBridge={appBridge} /> : null}
            </div>
        </div>
    );
};
