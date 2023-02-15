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
    PluginComposer,
    InitPlugin,
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    StrikethroughPlugin,
    AlignCenterPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    AlignJustifyPlugin,
    ResetFormattingPlugin,
    CodePlugin,
    LinkPlugin,
    OrderedListPlugin,
    UnorderedListPlugin,
    CheckboxListPlugin,
} from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import 'tailwindcss/tailwind.css';
import { BlockSettings, TextPosition } from './types';
import { AUDIO_ID } from './settings';

const customTitlePlugin = new PluginComposer();
customTitlePlugin
    .setPlugin([new InitPlugin()])
    .setPlugin([new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()])
    .setPlugin([new AlignCenterPlugin(), new AlignLeftPlugin(), new AlignRightPlugin(), new AlignJustifyPlugin()])
    .setPlugin([new ResetFormattingPlugin()]);

const customDescriptionPlugin = new PluginComposer();
customDescriptionPlugin
    .setPlugin([new InitPlugin()])
    .setPlugin([
        new BoldPlugin(),
        new ItalicPlugin(),
        new UnderlinePlugin(),
        new StrikethroughPlugin(),
        new LinkPlugin(),
        new CodePlugin(),
    ])
    .setPlugin([
        new AlignCenterPlugin(),
        new AlignLeftPlugin(),
        new AlignRightPlugin(),
        new AlignJustifyPlugin(),
        new UnorderedListPlugin(),
        new CheckboxListPlugin(),
        new OrderedListPlugin(),
    ])
    .setPlugin([new ResetFormattingPlugin()]);

export const AudioBlock = ({ appBridge }: BlockProps) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const { description } = blockSettings;
    let { title } = blockSettings;
    const audio = blockAssets?.[AUDIO_ID]?.[0];
    const mimeType = 'audio/' + audio?.extension;

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
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
            });
    };

    return (
        <div data-test-id="audio-block">
            {audio ? (
                <div data-test-id="audio-block-container" className={audioDivClassNames}>
                    <audio
                        data-test-id="audio-block-audio-tag"
                        key={audio.id}
                        controls
                        className="tw-w-full"
                        controlsList="nodownload"
                        preload="auto"
                    >
                        <source src={audio.genericUrl} type={mimeType} />
                    </audio>
                    <div className="tw-flex tw-gap-4 tw-justify-between tw-w-full">
                        <div className="tw-self-stretch">
                            <RichTextEditor
                                plugins={customTitlePlugin}
                                designTokens={{
                                    p: {
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        lineHeight: '18px',
                                    },
                                }}
                                value={title}
                                border={false}
                                onTextChange={saveTitle}
                                onBlur={saveTitle}
                                placeholder={isEditing ? 'add a title here' : undefined}
                                readonly={!isEditing}
                            />
                            <RichTextEditor
                                plugins={customDescriptionPlugin}
                                designTokens={{
                                    p: {
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '11px',
                                        fontWeight: '400',
                                        lineHeight: '13px',
                                    },
                                }}
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
                            onClick={() => downloadAudio(audio.genericUrl, audio.fileName)}
                            emphasis={ButtonEmphasis.Weak}
                            icon={<IconArrowCircleDown />}
                            rounding={ButtonRounding.Full}
                        />
                    </div>
                </div>
            ) : (
                <p>Add Audio asset</p>
            )}
        </div>
    );
};
