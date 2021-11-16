import 'tailwindcss/tailwind.css';
import { ReactElement, useState } from 'react';
import ChecklistItem from './ChecklistItem';

type ChecklistItemCreatorProps = {
    onChange: (text: string) => void;
};

export default function ChecklistItemCreator({ onChange }: ChecklistItemCreatorProps): ReactElement {
    const [text, setText] = useState('');
    const createItem = (text: string) => {
        onChange(text);
        setText('');
    };
    return <ChecklistItem text={text} onChange={setText} onBlur={createItem} />;
}
