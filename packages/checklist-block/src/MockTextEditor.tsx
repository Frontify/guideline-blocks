import { ReactElement, useState } from 'react';

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

    const isControlled = value !== undefined && onChange !== undefined;

    const handleChange = (e: any) => {
        setInternalValue(e.target.value);
        onChange && onChange(e.target.value);
    };

    return (
        <textarea
            className="tw-w-full tw-resize-none tw-placeholder-black-60 tw-bg-transparent"
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
