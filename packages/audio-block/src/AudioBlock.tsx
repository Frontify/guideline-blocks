/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    Button,
    ButtonEmphasis,
    ButtonRounding,
    IconArrowCircleDown,
    RichTextEditor,
    Position,
} from '@frontify/fondue';
import { joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import 'tailwindcss/tailwind.css';
import { BlockSettings, TextPosition } from './types';
import { AUDIO_ID } from './settings';
import { UploadPlaceholder } from './UploadPlaceholder';

export const AudioBlock = ({ appBridge }: BlockProps) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const { designTokens } = useGuidelineDesignTokens();
    const { description } = blockSettings;
    const audio = blockAssets?.[AUDIO_ID]?.[0];

    let { title } = blockSettings;

    if (audio && title === undefined && description === undefined) {
        title = audio.fileName;
        setBlockSettings({
            title: audio.fileName,
        });
    }

    const audioDivClassNames = joinClassNames([
        'tw-flex tw-flex-col tw-gap-2',
        blockSettings.positioning === TextPosition.Above && 'tw-flex-col-reverse',
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
                a.download = fileName + '.mp3';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
    };

    return (
        <div data-test-id="audio-block" className={audioDivClassNames}>
            {audio ? (
                <div>
                    <audio
                        data-test-id="audio-block-audio-tag"
                        key={audio.id}
                        controls
                        className="tw-w-full"
                        controlsList="nodownload"
                        preload="auto"
                    >
                        <source src={audio.genericUrl} type="audio/mp3" />
                    </audio>
                </div>
            ) : (
                isEditing && <UploadPlaceholder appBridge={appBridge} />
            )}
            <div className="tw-flex tw-gap-4 tw-justify-between tw-w-full">
                <div className="tw-self-stretch">
                    <RichTextEditor
                        designTokens={designTokens ?? undefined}
                        value={title}
                        border={false}
                        onBlur={saveTitle}
                        placeholder={isEditing ? 'add a title here' : undefined}
                        readonly={!isEditing}
                    />
                    <RichTextEditor
                        designTokens={designTokens ?? undefined}
                        value={description}
                        border={false}
                        position={Position.FLOATING}
                        onBlur={saveDescription}
                        placeholder={isEditing ? 'add a description here' : undefined}
                        readonly={!isEditing}
                    />
                </div>
                <Button
                    onClick={() => downloadAudio(audio.genericUrl, audio.title)}
                    emphasis={ButtonEmphasis.Weak}
                    icon={<IconArrowCircleDown />}
                    rounding={ButtonRounding.Full}
                />
            </div>
        </div>
    );
};
