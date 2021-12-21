/* (c) Copyright Frontify Ltd., all rights reserved. */

import { colorToHexAlpha } from '@frontify/guideline-blocks-shared';
import { useContext, useRef, KeyboardEvent, FocusEvent, forwardRef, useImperativeHandle } from 'react';
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
            const trimmedText = (event.target as HTMLDivElement).innerText.trim();
            onTextModified && onTextModified(trimmedText);
            if (resetOnSave && editorRef.current) {
                editorRef.current.innerText = '';
            }
        };
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.code === 'Enter') {
                event.shiftKey ? event.stopPropagation() : editorRef.current?.blur();
            }
        };

        return (
            <div className="tw-inline-flex tw-flex-initial tw-min-w-0">
                <div
                    role="textbox"
                    tabIndex={-1}
                    contentEditable={!readonly}
                    className="tw-block tw-max-w-full tw-flex-initial [word-break:break-word] empty:before:tw-content-[attr(data-placeholder)] empty:before:tw-text-black-60 empty:before:tw-inline-block tw-bg-transparent tw-border-none tw-text-s tw-outline-none hover:tw-cursor-text tw-whitespace-pre-wrap tw-px-0.5"
                    data-placeholder={placeholder}
                    style={{ color: colorToHexAlpha(incompleteTextColor) }}
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
