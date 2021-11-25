import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { IconReject } from '@frontify/arcade';
import { IconCaretUp } from '@frontify/arcade';
import { IconCaretDown, DragState } from '@frontify/arcade';
import { Button, ButtonSize, IconSize, IconView, IconViewSlash, OrderableList } from '@frontify/arcade';
import { useHover } from '@react-aria/interactions';
import { ReactElement, useState } from 'react';
import 'tailwindcss/tailwind.css';
import ChecklistButton from './components/ChecklistButton';
import ChecklistItem from './components/ChecklistItem';
import ProgressBar from './components/ProgressBar';
import ProgressHeader from './components/ProgressHeader';
import './index.css';
import {
    ChecklistContent,
    ChecklistDecoration,
    DecorationStyle,
    DefaultValues,
    PaddingClasses,
    ProgressBarType,
    Settings,
} from './types';
import { merge } from './utilities/merge';
import { provideDefaults } from './utilities/provideDefaults';

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

    const onMove = (selectedGridItemKeys: React.Key[], gridItemLocation: ItemDropTarget) => {
        console.log(selectedGridItemKeys, gridItemLocation);
        let newIndex = content.findIndex((c) => c.id === gridItemLocation.key);
        const oldIndex = content.findIndex((c) => c.id === selectedGridItemKeys[0]);
        if (oldIndex < newIndex) newIndex--;
        if (gridItemLocation.dropPosition === 'before') {
            modifyListPosition(oldIndex, newIndex);
        } else {
            modifyListPosition(oldIndex, newIndex + 1);
        }
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
                <OrderableList
                    items={content
                        .filter(completionFilter)
                        .map((c) => ({ ...c, alt: c.text, type: 'item', key: c.id }))}
                    onMove={onMove}
                    showFocusRing={true}
                    dragDisabled={!isEditing}
                    renderContent={(
                        { value: { id, text, completed, updatedAt }, prevKey, nextKey },
                        { componentDragState }
                    ) => (
                        <ChecklistItem
                            id={id}
                            key={id}
                            text={text}
                            resetOnChange={false}
                            isDragging={componentDragState === DragState.Dragging}
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
                                        disabled={!prevKey}
                                        icon={<IconCaretUp size={IconSize.Size16} />}
                                    />
                                    <ChecklistButton
                                        disabled={!nextKey}
                                        icon={<IconCaretDown size={IconSize.Size16} />}
                                    />
                                    <ChecklistButton icon={<IconReject size={IconSize.Size16} />} />
                                </>
                            }
                        />
                    )}
                />
                {/* <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {content
                                    .filter(completionFilter)s
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
                                                    
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext> */}
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
