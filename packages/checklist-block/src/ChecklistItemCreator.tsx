import { ReactElement, useState } from 'react';
import ChecklistItem from './ChecklistItem';

type ChecklistItemCreatorProps = {
    onBlur: (text: string) => void;
    readonly: boolean;
    color: string;
    checkboxStyle: any;
    labelStyle: any;
};

export default function ChecklistItemCreator({
    onBlur,
    readonly,
    checkboxStyle,
    labelStyle,
}: ChecklistItemCreatorProps): ReactElement {
    const [text, setText] = useState('');
    const createItem = (text: string) => {
        onBlur(text);
        setText('');
    };

    console.log(labelStyle);
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
            checkboxStyle={checkboxStyle}
            labelStyle={labelStyle}
        />
    );
}
