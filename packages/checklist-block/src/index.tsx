import 'tailwindcss/tailwind.css';
import { ReactElement, useState } from 'react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Divider } from '@frontify/arcade';
import { ChecklistContent, ChecklistProps, Settings } from './types';
import ChecklistItemCreator from './ChecklistItemCreator';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import RemoveButton from './RemoveButton';
import ChecklistItem from './ChecklistItem';

export default function Checklist({ appBridge }: ChecklistProps): ReactElement {
    const isEditing = useEditorState();

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
        const updatedContent = blockSettings.content.reduce((acc: ChecklistContent[], item: ChecklistContent) => {
            if (item.id === idToEdit) return [...acc, { ...item, text }];
            return [...acc, item];
        }, []);

        setBlockSettings({ ...blockSettings, content: updatedContent });
    };

    const modifyListPosition = (originalIndex: number, newIndex: number) => {
        const updatedContent = blockSettings.content.slice();
        const [itemToSwap] = updatedContent.splice(originalIndex, 1);
        updatedContent.splice(newIndex, 0, itemToSwap);

        setBlockSettings({ ...blockSettings, content: updatedContent });
    };

    return (
        <div>
            {blockSettings.content.map(({ id, text, updatedAt }, index, ctx) => (
                <ChecklistItem
                    key={id}
                    text={text}
                    completed={true}
                    onBlur={(text) => editLabel(text, id)}
                    completeStyle={{
                        color: blockSettings.completeTextColor?.hex,
                        checkbox: blockSettings.completeCheckboxColor?.hex,
                    }}
                    completedDecoration={blockSettings.completedDecoration}
                    incompleteStyle={{
                        color: blockSettings.incompleteTextColor?.hex,
                        checkbox: blockSettings.incompleteCheckboxColor?.hex,
                    }}
                    highlightColor={blockSettings.highlightColor?.hex}
                    strikethroughStyle={{
                        color: blockSettings.strikethroughMultiInput?.[2]?.hex,
                        width: blockSettings.strikethroughMultiInput?.[1],
                        style: blockSettings.strikethroughMultiInput?.[0],
                    }}
                    dateCompleted={updatedAt}
                    dateVisible={blockSettings.dateVisible}
                    readonly={!isEditing}
                    controlButtons={
                        <>
                            <IncrementButton
                                disabled={index < 1}
                                onClick={() => modifyListPosition(index, index - 1)}
                            />
                            <DecrementButton
                                disabled={index === ctx.length - 1}
                                onClick={() => modifyListPosition(index, index + 1)}
                            />
                            <RemoveButton onClick={() => removeItem(id)} />
                        </>
                    }
                />
            ))}
            <Divider />
            <ChecklistItemCreator onBlur={addNewItem} />
        </div>
    );
}
