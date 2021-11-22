import { ReactElement, useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { merge } from '../utilities/merge';
import { FOCUS_STYLE } from '../utilities/focusStyle';

type MockTextEditorProps = {
    value: string;
    onChange?: (text: string) => void;
    onBlur?: (text: string) => void;
    placeholder?: string;
    readonly?: boolean;
    color: string;
    resetOnChange: boolean;
};

export default function MockTextEditor({
    value,
    onChange,
    readonly,
    placeholder,
    color,
    resetOnChange,
}: MockTextEditorProps): ReactElement {
    const { isFocusVisible } = useFocusRing({ isTextInput: true });
    const editorRef = useRef();

    const handleChange = (e: any) => {
        const trimmedText = e.target.innerText.trim();
        onChange && onChange(trimmedText);
        if (resetOnChange) {
            editorRef.current.innerText = '';
        }
    };
    const handleKeyPress = (e: any) => {
        if (e.code === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            e.target.blur();
        }
    };

    return (
        <div className="tw-inline-block">
            <div
                role="textbox"
                contentEditable={!readonly}
                className={merge([
                    'tw-block tw-bg-transparent tw-border-none tw-text-s tw-outline-none tw-transition tw-placeholder-black-60',
                    ' hover:tw-border-black-90 hover:tw-cursor-text tw-whitespace-pre-wrap',
                    isFocusVisible && FOCUS_STYLE,
                ])}
                data-placeholder={placeholder}
                style={{ color }}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
                onBlur={handleChange}
                ref={editorRef}
            >
                {value}
            </div>
        </div>
    );
}
