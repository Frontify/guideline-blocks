import 'tailwindcss/tailwind.css';
import { ReactElement, useState } from 'react';
import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    Button,
    ButtonSize,
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
    DecorationStyle,
    DefaultValues,
    PaddingClasses,
    ProgressBarType,
    Settings,
} from './types';
import ChecklistItemCreator from './components/ChecklistItemCreator';
import ChecklistItem from './components/ChecklistItem';
import { provideDefaults } from './utilities/provideDefaults';
import ChecklistButton from './components/ChecklistButton';
import ProgressBar from './components/ProgressBar';
import ProgressHeader from './components/ProgressHeader';
import { useHover } from '@react-aria/interactions';
import { merge } from './utilities/merge';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './index.css';

export type ChecklistProps = {
    appBridge: AppBridgeNative;
};

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
        const trimmed = text.trim();
        if (!trimmed) return;
        const creationDate = Date.now();
        const id = Math.ceil(Math.random() * creationDate).toString();
        const newChecklistItem = {
            id,
            text: trimmed,
            createdAt: creationDate,
            updatedAt: creationDate,
            completed: false,
        };
        const updatedContent = [...content, newChecklistItem];
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

    const decorationStyles = ((type: ChecklistDecoration): DecorationStyle => {
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

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        modifyListPosition(result.source.index, result.destination.index);
    };

    return (
        <div
            className={merge([!paddingAdvanced && PaddingClasses[paddingBasic]])}
            style={{
                paddingTop: paddingAdvanced ? paddingCustom[0] : '',
                paddingLeft: paddingAdvanced ? paddingCustom[1] : '',
                paddingRight: paddingAdvanced ? paddingCustom[2] : '',
                paddingBottom: paddingAdvanced ? paddingCustom[3] : '',
            }}
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
                <div className="tw-my-1.5"></div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {content
                                    .filter(completionFilter)
                                    .map(({ id, text, updatedAt, completed }, index, ctx) => (
                                        <Draggable key={id} draggableId={id} index={index} isDragDisabled={!isEditing}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={merge([
                                                        snapshot.isDragging && 'tw-bg-white tw-shadow-mid-bottom',
                                                        !snapshot.isDragging && isEditing && 'tw-cursor-grab',
                                                    ])}
                                                    style={{ ...provided.draggableProps.style }}
                                                >
                                                    <ChecklistItem
                                                        id={id}
                                                        key={id}
                                                        text={text}
                                                        resetOnChange={false}
                                                        isBeingDragged={snapshot.isDragging}
                                                        checkboxDisabled={!isEditing}
                                                        checked={completed}
                                                        toggleCompleted={(value: boolean) =>
                                                            updateItem(id, { completed: value, updatedAt: Date.now() })
                                                        }
                                                        decorationStyle={decorationStyles}
                                                        onChange={(text) => updateItem(id, { text })}
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
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                {isEditing && (
                    <>
                        <hr className="tw-my-2 tw-border-black-40" />
                        <ChecklistItem
                            resetOnChange
                            id="Create new Checklist Item"
                            checked={false}
                            text={''}
                            readonly={false}
                            dateVisible={false}
                            checkboxDisabled
                            onChange={addNewItem}
                            checkboxStyle={{
                                checked: DefaultValues.completeCheckboxColor.hex,
                                unchecked: '#b3b5b5',
                            }}
                            labelStyle={{
                                checked: DefaultValues.completeTextColor.hex,
                                unchecked: incompleteTextColor.hex,
                            }}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
