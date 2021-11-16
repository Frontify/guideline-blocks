import 'tailwindcss/tailwind.css';
import { ReactElement, useState } from 'react';
import { AppBridgeNative, useBlockSettings } from '@frontify/app-bridge';
import { Divider } from '@frontify/arcade';
import ChecklistItem from './ChecklistItem';
import ChecklistItemCreator from './ChecklistItemCreator';

type ChecklistProps = {
    appBridge: AppBridgeNative;
};

type ChecklistItem = {
    text: string;
    id: string;
    createdAt: number;
    updatedAt: number;
    completed: boolean;
};

type Settings = {
    content: ChecklistItem[];
    padding: string;
    incompleteTextColor: string;
    incompleteCheckboxColor: string;
    completeTextColor: string;
    completeCheckboxColor: string;
    completedDecoration: string;
    highlightColor: string;
    dateVisible: boolean;
    progressBarVisible: boolean;
    progressBarType: string;
    progressBarFillColor: string;
    progressBarTrackColor: string;
};

export default function AnExampleBlock({ appBridge }: ChecklistProps): ReactElement {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    const addNewItem = (text: string): void => {
        if (!text) return;
        const creationDate = Date.now();
        const id = Math.ceil(Math.random() * creationDate).toString();
        const newChecklistItem = {
            id,
            text,
            createdAt: creationDate,
            updatedAt: creationDate,
            completed: false,
        };
        const updatedContent = [...blockSettings.content, newChecklistItem];
        setBlockSettings({ ...blockSettings, content: updatedContent });
    };

    const removeItem = (idToDelete: string): void => {
        setBlockSettings({ ...blockSettings, content: blockSettings.content.filter(({ id }) => id !== idToDelete) });
    };

    const editLabel = (text: string, idToEdit: string) => {
        const updatedContent = blockSettings.content.reduce((acc: ChecklistItem[], item: ChecklistItem) => {
            if (item.id === idToEdit) return [...acc, { ...item, text }];
            return [...acc, item];
        }, []);

        setBlockSettings({ ...blockSettings, content: updatedContent });
    };

    const changeListPosition = (idToFind: string, count: number) => {
        console.log(idToFind, count);
    };

    return (
        <div>
            {blockSettings.content.map(({ id, text }) => (
                <ChecklistItem
                    key={id}
                    text={text}
                    onRemove={() => removeItem(id)}
                    onIncrement={() => changeListPosition(id, +1)}
                    onDecrement={() => changeListPosition(id, -1)}
                />
            ))}
            <Divider />
            <ChecklistItemCreator onChange={addNewItem} />
        </div>
    );
}
