import { ReactElement, useState, useEffect } from 'react';
import {
    convertFromRaw,
    ContentState,
    convertToRaw,
    EditorState,
    RawDraftContentBlock,
    RawDraftEntity,
} from 'draft-js';
import { convertFromHTML } from 'draft-convert';
import { createNativeAppBridge } from '@frontify/app-bridge';
import { useEditorState } from '@frontify/app-bridge/dist/react';
import { PLACEHOLDER } from './constant';
import './TextBlock.css';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const { RichTextEditor } = window.DesignSystemComponents;

export default function TextBlock(): ReactElement {
    const [blockRef, setBlockRef] = useState<HTMLElement | null>(null);
    const [text, setText] = useState<ContentState | null>(null);
    const appBridge = createNativeAppBridge();

    useEffect(() => {
        if (blockRef) {
            const blockSettings = appBridge.block.getBlockSettings(blockRef);
            let textFromSettings: ContentState = ContentState.createFromText('');

            if (blockSettings.blocks && blockSettings.entityMap) {
                console.log('New way');
                console.log('Normal ContentState');

                textFromSettings = convertFromRaw({
                    blocks: blockSettings.blocks as RawDraftContentBlock[],
                    entityMap: blockSettings.entityMap as Record<string, RawDraftEntity>,
                });
            } else if (blockSettings.content) {
                console.log('Old way');
                console.log('HTML converted ContentState');

                textFromSettings = convertFromHTML({
                    htmlToEntity: (nodeName: string, element: Element, createEntity: any) => {
                        if (nodeName === 'a') {
                            return createEntity('LINK', 'MUTABLE', {
                                url: (element as HTMLAnchorElement).href,
                                newWindow: element.getAttribute('target') === '_blank',
                            });
                        }
                    },
                })(blockSettings.content as string);
            }

            textFromSettings && setText(textFromSettings);
        }
    }, [blockRef]);

    const onTextChange = (editorState: EditorState) => {
        if (blockRef) {
            const currentContent = editorState.getCurrentContent();
            setText(currentContent);
            const rawContentState = convertToRaw(currentContent);
            appBridge.block.updateBlockSettings(blockRef, { ...rawContentState });
        }
    };

    const isEditing = useEditorState();

    return (
        <div ref={setBlockRef}>
            {text && (
                <RichTextEditor
                    value={text}
                    placeholder={PLACEHOLDER}
                    readonly={!isEditing}
                    onTextChange={onTextChange}
                />
            )}
        </div>
    );
}
