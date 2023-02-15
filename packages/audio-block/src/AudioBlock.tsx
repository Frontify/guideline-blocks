/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    Button,
    ButtonEmphasis,
    ButtonRounding,
    ButtonStyle,
    IconArrowCircleDown,
    RichTextEditor,
    Position,
} from '@frontify/fondue';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import 'tailwindcss/tailwind.css';
import { BlockSettings } from './types';

export const AudioBlock = ({ appBridge }: BlockProps) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const { designTokens } = useGuidelineDesignTokens();
    const { title, description } = blockSettings;
    const audio = blockAssets?.audio?.[0];

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
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
            });
    };

    return (
        <div data-test-id="audio-block" className="tw-flex tw-flex-col tw-gap-4">
            {audio ? (
                <>
                    <audio key={audio.id} controls className="tw-w-full" controlsList="nodownload" preload="metadata">
                        <source src={audio.genericUrl} type={audio['type']} />
                    </audio>
                    <div className="tw-flex tw-justify-between">
                        <div className="tw-self-stretch">
                            <RichTextEditor
                                designTokens={designTokens ?? undefined}
                                value={title}
                                border={false}
                                position={Position.FLOATING}
                                onTextChange={saveTitle}
                                onBlur={saveTitle}
                                placeholder={isEditing ? 'add a title here' : undefined}
                                readonly={!isEditing}
                            />
                            <RichTextEditor
                                designTokens={designTokens ?? undefined}
                                value={description}
                                border={false}
                                position={Position.FLOATING}
                                onTextChange={saveDescription}
                                onBlur={saveDescription}
                                placeholder={isEditing ? 'add a description here' : undefined}
                                readonly={!isEditing}
                            />
                        </div>
                        <Button
                            style={ButtonStyle.Default}
                            onClick={() => downloadAudio(audio.genericUrl, audio.fileName)}
                            emphasis={ButtonEmphasis.Weak}
                            icon={<IconArrowCircleDown />}
                            rounding={ButtonRounding.Full}
                        />
                    </div>
                </>
            ) : (
                <p>Add Audio asset</p>
            )}
        </div>
    );
};
