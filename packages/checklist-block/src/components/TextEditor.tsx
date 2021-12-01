/* (c) Copyright Frontify Ltd., all rights reserved. */
import { ReactElement, useContext, useRef, KeyboardEvent, FocusEvent, forwardRef, useImperativeHandle } from 'react';
import { SettingsContext } from '../SettingsContext';
import { ImperativeFocusHandle, TextEditorProps } from '../types';

const Editor = forwardRef<ImperativeFocusHandle, TextEditorProps>(
    ({ value, onChange, readonly, placeholder, resetOnChange }, ref): ReactElement => {
        const { incompleteTextColor } = useContext(SettingsContext);
        const editorRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(ref, () => ({
            focus: () => {
                editorRef.current?.focus();
            },
        }));

        const handleChange = (event: FocusEvent) => {
            const trimmedText = (event.target as HTMLDivElement).innerText.trim();
            onChange && onChange(trimmedText);
            if (resetOnChange && editorRef.current) {
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
            <div className="tw-inline-block">
                <div
                    role="textbox"
                    tabIndex={-1}
                    contentEditable={!readonly}
                    className={
                        'tw-block tw-bg-transparent tw-border-none tw-text-s tw-outline-none tw-placeholder-black-60 hover:tw-cursor-text tw-whitespace-pre-wrap tw-px-0.5'
                    }
                    data-placeholder={placeholder}
                    style={{ color: incompleteTextColor.hex }}
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

Editor.displayName = 'TextEditor';

export const TextEditor = Editor;
