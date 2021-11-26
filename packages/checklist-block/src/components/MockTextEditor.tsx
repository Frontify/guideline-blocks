import { ReactElement, useContext, useRef, KeyboardEvent, FocusEvent } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE } from '../utilities/focusStyle';
import { SettingsContext } from '..';
import { joinClassNames } from '@frontify/guideline-blocks-shared';

type MockTextEditorProps = {
    value: string;
    onChange?: (text: string) => void;
    placeholder?: string;
    readonly?: boolean;
    resetOnChange: boolean;
};

export default function MockTextEditor({
    value,
    onChange,
    readonly,
    placeholder,
    resetOnChange,
}: MockTextEditorProps): ReactElement {
    const { isFocusVisible } = useFocusRing({ isTextInput: true });
    const { incompleteTextColor } = useContext(SettingsContext);
    const editorRef = useRef<HTMLDivElement>(null);

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
                contentEditable={!readonly}
                className={joinClassNames([
                    'tw-block tw-bg-transparent tw-border-none tw-text-s tw-outline-none tw-transition tw-placeholder-black-60',
                    'hover:tw-cursor-text tw-whitespace-pre-wrap tw-px-0.5',
                    isFocusVisible && FOCUS_STYLE,
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
}
