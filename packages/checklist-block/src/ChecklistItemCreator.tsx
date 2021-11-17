import 'tailwindcss/tailwind.css';
import { ReactElement, useState } from 'react';
import ChecklistItem from './ChecklistItem';

type ChecklistItemCreatorProps = {
    onBlur: (text: string) => void;
    readonly: boolean;
    color: string;
};

export default function ChecklistItemCreator({ onBlur, readonly, color }: ChecklistItemCreatorProps): ReactElement {
    const [text, setText] = useState('');
    const createItem = (text: string) => {
        onBlur(text);
        setText('');
    };
    return (
        <ChecklistItem
            id="Create new Checklist Item"
            completed={false}
            text={text}
            readonly={readonly}
            dateVisible={false}
            checkboxDisabled
            onChange={setText}
            onBlur={createItem}
            incompleteStyle={{ color, checkbox: '#b3b5b5' }}
        />
    );
}
