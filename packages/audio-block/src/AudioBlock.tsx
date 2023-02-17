/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    Button,
    ButtonEmphasis,
    ButtonRounding,
    IconArrowCircleDown,
    LoadingCircle,
    Position,
    RichTextEditor,
} from '@frontify/fondue';
import { joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import {
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
import { useEffect, useState } from 'react';

const DEFAULT_CONTENT_TITLE = '[{"type":"heading3","children":[{"text":""}]}]';
const DEFAULT_CONTENT_DESCRIPTION = '[{"type":"paragraph","children":[{"text":""}]}]';

export const AudioBlock = ({ appBridge }: BlockProps) => {
    const [hoveringAudio, setHoveringAudio] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [droppedFiles, setDroppedFiles] = useState<FileList | null>(null);
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets, deleteAssetIdsFromKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [openFileDialog, { selectedFiles }] = useFileInput({ multiple: false, accept: 'audio/*' });
    const { designTokens } = useGuidelineDesignTokens();
    const { description } = blockSettings;
    const audio = blockAssets?.[AUDIO_ID]?.[0];
    let { title } = blockSettings;

    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isLoading && setIsLoading(true),
    });

    if (audio && title === undefined && description === undefined) {
        title = audio.fileName;
        setBlockSettings({
            title: audio.fileName,
        });
    }

    const audioBlockClassNames = joinClassNames([
        'tw-flex tw-flex-col tw-gap-2',
        blockSettings.positioning === TextPosition.Above && 'tw-flex-col-reverse',
    ]);

    const audiotTagClassNames = joinClassNames([
        'tw-w-full',
        hoveringAudio && isEditing && 'tw-border tw-border-box-selected-inverse tw-rounded-[4px]',
    ]);

    const saveTitle = (value: string) =>
        value !== blockSettings.title &&
        setBlockSettings({
            title: value,
        });

    const saveDescription = (value: string) =>
        value !== blockSettings.description &&
        setBlockSettings({
            description: value,
        });

    const downloadAudio = (url: string, fileName: string) => {
        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                const blobURL = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobURL;
                a.download = `${fileName}.mp3`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
    };

    const onRemoveAsset = () => {
        const id = audio?.id;
        deleteAssetIdsFromKey(AUDIO_ID, [id]);
    };

    const openAssetChooser = () => {
        appBridge.openAssetChooser(
            async (result) => {
                await updateAssetIdsFromKey(AUDIO_ID, [result[0].id]);
                setIsLoading(false);
                appBridge.closeAssetChooser();
            },
            {
                multiSelection: false,
                objectTypes: [AssetChooserObjectType.File],
                extensions: AUDIO_EXTENSIONS,
            }
        );
    };

    const onUploadClick = () => {
        openFileDialog();
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
            const resultId = uploadResults[0].id;
            updateAssetIdsFromKey(AUDIO_ID, [resultId]).then(() => {
                setIsLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    return (
        <div data-test-id="audio-block" className={audioBlockClassNames}>
            {audio ? (
                <div onMouseEnter={() => setHoveringAudio(true)} onMouseLeave={() => setHoveringAudio(false)}>
                    {hoveringAudio && isEditing && (
                        <ItemToolbar
                            onRemoveAsset={onRemoveAsset}
                            onUploadClick={onUploadClick}
                            onAssetChooseClick={openAssetChooser}
                        />
                    )}

                    {!hoveringAudio && isEditing && <div className="tw-h-[28px]"></div>}
                    {isLoading ? (
                        <div className="tw-flex tw-items-center tw-justify-center tw-h-[54px]">
                            <LoadingCircle />
                        </div>
                    ) : (
                        <audio
                            data-test-id="audio-block-audio-tag"
                            key={audio.fileSize}
                            controls
                            className={audiotTagClassNames}
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
                        onUploadClick={onUploadClick}
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
                <div className="tw-min-w-[36px]">
                    {audio && (
                        <Button
                            onClick={() => downloadAudio(audio.genericUrl, audio.title)}
                            emphasis={ButtonEmphasis.Weak}
                            icon={<IconArrowCircleDown />}
                            rounding={ButtonRounding.Full}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
