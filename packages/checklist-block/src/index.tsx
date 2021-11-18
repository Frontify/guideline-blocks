import 'tailwindcss/tailwind.css';
import { ReactElement, useState } from 'react';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    Button,
    ButtonSize,
    Divider,
    IconCaretDown,
    IconCaretUp,
    IconReject,
    IconSize,
    IconView,
    IconViewSlash,
} from '@frontify/arcade';
import {
    ChecklistContent,
    ChecklistDecoration,
    ChecklistProps,
    DefaultValues,
    PaddingClasses,
    ProgressBarType,
    Settings,
} from './types';
import ChecklistItemCreator from './ChecklistItemCreator';
import ChecklistItem from './ChecklistItem';
import { provideDefaults } from './utilities/provideDefaults';
import ChecklistButton from './ChecklistButton';
import ProgressBar from './ProgressBar';
import ProgressHeader from './ProgressHeader';
import { useHover } from '@react-aria/interactions';
import { merge } from './utilities/merge';

export default function Checklist({ appBridge }: ChecklistProps): ReactElement {
    const isEditing = useEditorState();
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [showCompleted, setShowCompleted] = useState(true);
    const { hoverProps, isHovered } = useHover({});
    const {
        content,
        paddingAdvanced,
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

    const totalCompletedCount = (array: ChecklistContent[]) =>
        array.reduce((acc, item) => (item.completed ? acc + 1 : acc), 0);

    const calculatePercentage = (c: ChecklistContent[]): number => {
        return +((totalCompletedCount(c) / c.length) * 100).toFixed(0);
    };

    const calculateFraction = (c: ChecklistContent[]): string => {
        return `${totalCompletedCount(c)}/${c.length}`;
    };

    const toggleCompletedVisibility = () => {
        setShowCompleted((prev) => !prev);
    };

    const completionFilter = ({ completed }: ChecklistContent): boolean => {
        if (!isEditing && !showCompleted && completed) return false;
        return true;
    };

    const decorationStyles = ((type: ChecklistDecoration): Record<string, string> => {
        switch (type) {
            case ChecklistDecoration.Strikethrough:
                return {
                    textDecoration: 'line-through',
                    textDecorationStyle: strikethroughMultiInput[0],
                    textDecorationThickness: strikethroughMultiInput[1],
                    textDecorationColor: strikethroughMultiInput[2].hex,
                };
            case ChecklistDecoration.Highlight:
                return {
                    backgroundColor: highlightColor.hex,
                };
            default:
                return {};
        }
    })(completedDecoration);

    const shouldShowProgress = !!content.length && progressBarVisible;

    return (
        <div
            className={merge([!paddingAdvanced && PaddingClasses[paddingBasic]])}
            style={{ padding: paddingAdvanced ? paddingCustom : '' }}
        >
            <div {...hoverProps} className="tw-relative">
                {shouldShowProgress && progressBarType === ProgressBarType.Bar && (
                    <ProgressBar
                        fillColor={progressBarFillColor.hex}
                        trackColor={progressBarTrackColor.hex}
                        percentage={calculatePercentage(content)}
                    />
                )}
                {shouldShowProgress && progressBarType === ProgressBarType.Fraction && (
                    <ProgressHeader value={`${calculatePercentage(content)}%`} />
                )}
                {shouldShowProgress && progressBarType === ProgressBarType.Percentage && (
                    <ProgressHeader value={calculateFraction(content)} />
                )}
                <div
                    className={merge([
                        'tw-absolute tw-right-0 tw-top-0',
                        isHovered && !isEditing && 'tw-visible',
                        (!isHovered || isEditing) && 'tw-invisible',
                    ])}
                >
                    <Button
                        size={ButtonSize.Small}
                        icon={
                            showCompleted ? (
                                <IconView size={IconSize.Size16} />
                            ) : (
                                <IconViewSlash size={IconSize.Size16} />
                            )
                        }
                        onClick={toggleCompletedVisibility}
                    >
                        {showCompleted ? 'Hide completed tasks' : 'Show completed tasks'}
                    </Button>
                </div>
                <div className="tw-my-3"></div>
                {content.filter(completionFilter).map(({ id, text, updatedAt, completed }, index, ctx) => (
                    <ChecklistItem
                        key={id}
                        id={id}
                        text={text}
                        checkboxDisabled={!isEditing}
                        completed={completed}
                        toggleCompleted={(value: boolean) =>
                            updateItem(id, { completed: value, updatedAt: Date.now() })
                        }
                        decorationStyle={decorationStyles}
                        onBlur={(text) => updateItem(id, { text })}
                        checkboxStyle={{
                            checked: completeCheckboxColor.hex,
                            unchecked: incompleteCheckboxColor.hex,
                        }}
                        labelStyle={{
                            checked: completeTextColor.hex,
                            unchecked: incompleteTextColor.hex,
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
                        <ChecklistItemCreator
                            onBlur={addNewItem}
                            readonly={false}
                            color={incompleteTextColor.hex}
                            checkboxStyle={{
                                checked: DefaultValues.completeCheckboxColor.hex,
                                unchecked: '#b3b5b5',
                            }}
                            labelStyle={{
                                checked: DefaultValues.completeTextColor.hex,
                                unchecked: DefaultValues.incompleteTextColor.hex,
                            }}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
