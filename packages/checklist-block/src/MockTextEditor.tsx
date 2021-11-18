import { ReactElement, useState } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { merge } from './utilities/merge';
import { FOCUS_STYLE } from './utilities/focusStyle';

type MockTextEditorProps = {
    value?: string;
    onChange?: (text: string) => void;
    onBlur?: (text: string) => void;
    placeholder?: string;
    readonly?: boolean;
    color: string;
};

export default function MockTextEditor({
    value,
    onChange,
    onBlur,
    readonly,
    placeholder,
    color,
}: MockTextEditorProps): ReactElement {
    const [internalValue, setInternalValue] = useState(value);
    const { isFocusVisible } = useFocusRing({ isTextInput: true });
    const isControlled = value !== undefined && onChange !== undefined;

    const handleChange = (e: any) => {
        setInternalValue(e.target.value);
        onChange && onChange(e.target.value);
    };

    return (
        <textarea
            className={merge([
                'tw-inline-block tw-bg-transparent tw-resize-none tw-py-2 tw-border-none tw-text-s tw-outline-none tw-transition tw-placeholder-black-60',
                ' hover:tw-border-black-90',
                isFocusVisible && FOCUS_STYLE,
            ])}
            rows={1}
            value={isControlled ? value : internalValue}
            style={{ color }}
            onChange={handleChange}
            onBlur={(e) => onBlur && onBlur(e.target.value)}
            readOnly={readonly}
            placeholder={placeholder}
        />
    );
}
