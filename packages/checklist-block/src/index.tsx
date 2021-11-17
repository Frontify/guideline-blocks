import 'tailwindcss/tailwind.css';
import { ReactElement } from 'react';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Divider, IconCaretDown, IconCaretUp, IconReject, IconSize } from '@frontify/arcade';
import { ChecklistContent, ChecklistProps, DefaultValues, ProgressBarType, Settings } from './types';
import ChecklistItemCreator from './ChecklistItemCreator';
import ChecklistItem from './ChecklistItem';
import { provideDefaults } from './utilities/provideDefaults';
import ChecklistButton from './ChecklistButton';
import ProgressBar from './ProgressBar';

export default function Checklist({ appBridge }: ChecklistProps): ReactElement {
    const isEditing = useEditorState();
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    const {
        content,
        paddingSwitch,
        paddingBasic,
        paddingCustom,
        incompleteTextColor,
        incompleteCheckboxColor,
        completeTextColor,
        completeCheckboxColor,
        completedDecoration,
        highlightColor,
        dateVisible,
        progressBarVisible,
        progressBarType,
        progressBarFillColor,
        progressBarTrackColor,
        strikethroughMultiInput,
    } = provideDefaults(DefaultValues, blockSettings);
    console.log(blockSettings);
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
        const updatedContent = [...(blockSettings.content || []), newChecklistItem];
        setBlockSettings({ ...blockSettings, content: updatedContent });
    };

    const removeItem = (idToDelete: string): void => {
        setBlockSettings({ ...blockSettings, content: blockSettings.content.filter(({ id }) => id !== idToDelete) });
    };

    const updateItem = (idToUpdate: string, properties: any) => {
        const updatedContent = blockSettings.content.reduce((acc: ChecklistContent[], item: ChecklistContent) => {
            if (item.id === idToUpdate) return [...acc, { ...item, ...properties }];
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

    const calculatePercentage = (c: ChecklistContent[]): number => {
        return (c.reduce((acc, item) => (item.completed ? acc + 1 : acc), 0) / c.length) * 100;
    };

    return (
        <div>
            {progressBarVisible && progressBarType === ProgressBarType.Bar && (
                <ProgressBar
                    fillColor={progressBarFillColor.hex}
                    trackColor={progressBarTrackColor.hex}
                    percentage={calculatePercentage(content)}
                />
            )}
            {content.map(({ id, text, updatedAt, completed }, index, ctx) => (
                <ChecklistItem
                    key={id}
                    id={id}
                    text={text}
                    checkboxDisabled={!isEditing}
                    completed={completed}
                    toggleCompleted={(value: boolean) => updateItem(id, { completed: value })}
                    onBlur={(text) => updateItem(id, { text })}
                    completeStyle={{
                        color: completeTextColor.hex,
                        checkbox: completeCheckboxColor.hex,
                    }}
                    completedDecoration={completedDecoration}
                    incompleteStyle={{
                        color: incompleteTextColor.hex,
                        checkbox: incompleteCheckboxColor.hex,
                    }}
                    highlightColor={highlightColor?.hex}
                    strikethroughStyle={{
                        color: strikethroughMultiInput[2].hex,
                        width: strikethroughMultiInput[1],
                        style: strikethroughMultiInput[0],
                    }}
                    dateCompleted={updatedAt}
                    dateVisible={dateVisible}
                    readonly={!isEditing}
                    controlButtons={
                        <>
                            <ChecklistButton
                                disabled={index < 1}
                                icon={<IconCaretUp size={IconSize.Size16} />}
                                onClick={() => modifyListPosition(index, index - 1)}
                            />
                            <ChecklistButton
                                disabled={index === ctx.length - 1}
                                icon={<IconCaretDown size={IconSize.Size16} />}
                                onClick={() => modifyListPosition(index, index + 1)}
                            />
                            <ChecklistButton
                                icon={<IconReject size={IconSize.Size16} />}
                                onClick={() => removeItem(id)}
                            />
                        </>
                    }
                />
            ))}
            {isEditing && (
                <>
                    <Divider />
                    <ChecklistItemCreator onBlur={addNewItem} readonly={false} color={incompleteTextColor.hex} />
                </>
            )}
        </div>
    );
}
