import 'tailwindcss/tailwind.css';
import { ReactElement, useState } from 'react';
import ChecklistItem from './ChecklistItem';

type ChecklistItemCreatorProps = {
    onBlur: (text: string) => void;
};

export default function ChecklistItemCreator({ onBlur }: ChecklistItemCreatorProps): ReactElement {
    const [text, setText] = useState('');
    const createItem = (text: string) => {
        onBlur(text);
        setText('');
    };
    return (
        <ChecklistItem
            text={text}
            onChange={setText}
            onBlur={createItem}
            incompleteStyle={{ color: '#fff', checkbox: '#fff' }}
        />
    );
}
