/* (c) Copyright Frontify Ltd., all rights reserved. */
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
                if (event.shiftKey) {
                    event.stopPropagation();
                } else {
                    editorRef.current?.blur();
                }
            }
        };

        return (
            <div className="tw-inline-flex">
                <div
                    role="textbox"
                    tabIndex={-1}
                    contentEditable={!readonly}
                    className="tw-block empty:before:tw-content-[attr(data-placeholder)] empty:before:tw-text-black-60 empty:before:tw-inline-block tw-bg-transparent tw-border-none tw-text-s tw-outline-none hover:tw-cursor-text tw-whitespace-pre-wrap tw-px-0.5"
                    data-placeholder={placeholder}
                    style={{ color: incompleteTextColor?.hex }}
                    onKeyDown={handleKeyPress}
                    onBlur={handleChange}
                    ref={editorRef}
                >
                    {value}
                </div>
            </div>
        );
    }
);

TextEditor.displayName = 'TextEditor';
