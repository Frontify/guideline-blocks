/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toHex8String } from '@frontify/guideline-blocks-shared';
import { FocusEvent, KeyboardEvent, forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { SettingsContext } from '../SettingsContext';
import { ImperativeFocusHandle, TextEditorProps } from '../types';

export const TextEditor = forwardRef<ImperativeFocusHandle, TextEditorProps>(
    ({ value, onTextModified, readonly, placeholder, resetOnSave }, ref) => {
        const { incompleteTextColor } = useContext(SettingsContext);
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

        return (
            <div className="tw-inline-flex tw-flex-initial tw-min-w-0">
                <div
                    role="textbox"
                    tabIndex={0}
                    contentEditable={!readonly}
                    className="tw-block tw-max-w-full tw-flex-initial [word-break:break-word] empty:before:tw-content-[attr(data-placeholder)] empty:before:tw-text-black-60 empty:before:tw-inline-block tw-bg-transparent tw-border-none tw-text-s tw-outline-none hover:tw-cursor-text tw-whitespace-pre-wrap tw-px-0.5"
                    data-placeholder={placeholder}
                    style={{ color: toHex8String(incompleteTextColor) }}
                    onKeyDown={handleKeyPress}
                    onBlur={handleChange}
                    ref={editorRef}
                    data-test-id="text-editor"
                >
                    {value}
                </div>
            </div>
        );
    }
);

TextEditor.displayName = 'TextEditor';
