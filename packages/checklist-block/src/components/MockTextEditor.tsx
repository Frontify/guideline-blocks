import { ReactElement, useContext, useRef, KeyboardEvent, FocusEvent, forwardRef, useImperativeHandle } from 'react';
import { SettingsContext } from '..';

type MockTextEditorProps = {
    value: string;
    onChange?: (text: string) => void;
    placeholder?: string;
    readonly?: boolean;
    resetOnChange: boolean;
};

type ImperativeHandle = {
    focus: () => void;
};

const TextEditor = forwardRef<ImperativeHandle, MockTextEditorProps>(
    ({ value, onChange, readonly, placeholder, resetOnChange }, ref): ReactElement => {
        const { incompleteTextColor } = useContext(SettingsContext);
        const editorRef = useRef() as React.MutableRefObject<HTMLDivElement>;

        useImperativeHandle(ref, () => ({
            focus: () => {
                editorRef.current.focus();
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
                    editorRef.current.blur();
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

TextEditor.displayName = 'MockTextEditor';

export const MockTextEditor = TextEditor;
