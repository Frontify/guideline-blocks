import { ReactElement } from 'react';

type MockTextEditorProps = {
    value?: string;
    onChange?: (text: string) => void;
    onBlur?: (text: string) => void;
    placeholder?: string;
    readonly?: boolean;
};

export default function MockTextEditor({
    value,
    onChange,
    onBlur,
    readonly,
    placeholder,
}: MockTextEditorProps): ReactElement {
    const isControlled = value !== undefined && onChange !== undefined;

    return (
        <textarea
            value={isControlled ? value : undefined}
            onChange={(e) => onChange && onChange(e.target.value)}
            onBlur={(e) => onBlur && onBlur(e.target.value)}
            readOnly={readonly}
            placeholder={placeholder}
        />
    );
}
