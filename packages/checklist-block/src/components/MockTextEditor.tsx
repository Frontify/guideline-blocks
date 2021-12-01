import { ReactElement, useContext, useRef, KeyboardEvent, FocusEvent, forwardRef, useImperativeHandle } from 'react';
import { SettingsContext } from '..';
import { joinClassNames } from '@frontify/guideline-blocks-shared';

type MockTextEditorProps = {
    value: string;
    onChange?: (text: string) => void;
    placeholder?: string;
    readonly?: boolean;
    resetOnChange: boolean;
};

const TextEditor = (
    { value, onChange, readonly, placeholder, resetOnChange }: MockTextEditorProps,
    ref: any
): ReactElement => {
    const { incompleteTextColor } = useContext(SettingsContext);
    const editorRef = useRef<HTMLDivElement>(null);

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
        if (event.code === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            (event.target as HTMLDivElement).blur();
        }
    };

    return (
        <div className="tw-inline-block">
            <div
                role="textbox"
                tabIndex={-1}
                contentEditable={!readonly}
                className={joinClassNames([
                    'tw-block tw-bg-transparent tw-border-none tw-text-s tw-outline-none tw-transition tw-placeholder-black-60',
                    'hover:tw-cursor-text tw-whitespace-pre-wrap tw-px-0.5',
                ])}
                data-placeholder={placeholder}
                style={{ color: incompleteTextColor.hex }}
                onKeyPress={handleKeyPress}
                onBlur={handleChange}
                ref={editorRef}
            >
                {value}
            </div>
        </div>
    );
};

export const MockTextEditor = forwardRef(TextEditor);
