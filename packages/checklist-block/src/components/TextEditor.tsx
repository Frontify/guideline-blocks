/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toHex8String } from '@frontify/guideline-blocks-settings';
import {
    ClipboardEvent,
    FocusEvent,
    KeyboardEvent,
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';
import { SettingsContext } from '../SettingsContext';
import { ImperativeFocusHandle, TextEditorProps } from '../types';

export const TextEditor = forwardRef<ImperativeFocusHandle, TextEditorProps>(
    ({ value, onTextModified, readonly, placeholder, resetOnSave }, ref) => {
        const { textColor } = useContext(SettingsContext);
        const editorRef = useRef<HTMLDivElement | null>(null);

        useImperativeHandle(ref, () => ({
            focus: () => {
                editorRef.current?.focus();
            },
        }));

        const handleChange = (event: FocusEvent) => {
            const text = (event.target as HTMLDivElement).innerText;
            onTextModified && onTextModified(text);
            if (resetOnSave && editorRef.current && text !== '') {
                editorRef.current.innerText = '';
                editorRef.current.focus();
            }
        };
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.code === 'Enter') {
                if (event.shiftKey) {
                    event.stopPropagation();
                } else {
                    event.preventDefault();
                    editorRef.current?.blur();
                }
            }
        };

        const handlePaste = (event: ClipboardEvent) => {
            event.preventDefault();
            const text = event.clipboardData.getData('text/plain');
            document.execCommand('insertHTML', false, text);
        };

        useEffect(() => {
            if (editorRef.current) {
                editorRef.current.innerText = value;
            }
        }, [value]);

        return (
            <div className="tw-inline-flex tw-flex-initial tw-min-w-0">
                <div
                    role="textbox"
                    tabIndex={0}
                    contentEditable={!readonly}
                    className="tw-block tw-max-w-full tw-flex-initial [word-break:break-word] empty:before:tw-content-[attr(data-placeholder)] empty:before:tw-text-text-x-weak empty:before:tw-inline-block tw-bg-transparent tw-border-none tw-outline-none hover:tw-cursor-text tw-whitespace-pre-wrap tw-px-0.5"
                    data-placeholder={placeholder}
                    style={{ color: toHex8String(textColor) }}
                    onKeyDown={handleKeyPress}
                    onBlur={handleChange}
                    onPaste={handlePaste}
                    ref={editorRef}
                    data-test-id="text-editor"
                />
            </div>
        );
    }
);

TextEditor.displayName = 'TextEditor';
