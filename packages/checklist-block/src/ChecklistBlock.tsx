/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    Button,
    ButtonSize,
    ButtonStyle,
    DragProperties,
    IconSize,
    IconView,
    IconViewSlash,
    ItemDragState,
    OrderableList,
    OrderableListItem,
} from '@frontify/arcade';
import '@frontify/arcade/style';
import {
    generatePaddingString,
    joinClassNames,
    paddingStyleMap,
    toHex8String,
} from '@frontify/guideline-blocks-shared';
import { useHover } from '@react-aria/interactions';
import { chain } from '@react-aria/utils';
import { ItemDropTarget } from '@react-types/shared';
import { FC, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { ChecklistItem } from './components/ChecklistItem';
import { ProgressBar } from './components/ProgressBar';
import { ProgressHeader } from './components/ProgressHeader';
import {
    calculateFraction,
    calculatePercentage,
    createItem,
    filterCompleteItems,
    findIndexById,
    findIndexesForMove,
    updateItemById,
} from './helpers';
import { SettingsContext } from './SettingsContext';
import { ChecklistContent, ChecklistItemMode, ChecklistProps, DefaultValues, ProgressBarType, Settings } from './types';
import { reorderList } from './utilities';

export const ChecklistBlock: FC<ChecklistProps> = ({ appBridge }: ChecklistProps) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Partial<Settings>>(appBridge);
    const [showCompleted, setShowCompleted] = useState(true);
    const { hoverProps, isHovered } = useHover({});
    const settings = { ...DefaultValues, ...blockSettings };

    const {
        hasExtendedCustomPadding,
        extendedPaddingTop,
        extendedPaddingRight,
        extendedPaddingBottom,
        extendedPaddingLeft,
        extendedPaddingChoice,
        content,
        progressBarVisible,
        progressBarFillColor,
        progressBarTrackColor,
        progressBarType,
    } = settings;

    const addNewItem = (text: string): void => {
        const trimmed = text.trim();
        if (!trimmed) {
            return;
        }
        const newItem = createItem(trimmed);
        const updatedContent = [...content, newItem];
        setBlockSettings({ ...blockSettings, content: updatedContent });
    };

    const removeItem = (idToDelete: string): Promise<void> =>
        setBlockSettings({
            ...blockSettings,
            content: content.filter(({ id }) => id !== idToDelete),
        });

    const updateItem = (idToUpdate: string, properties: Partial<ChecklistContent>) =>
        setBlockSettings({ ...blockSettings, content: updateItemById(content, idToUpdate, properties) });

    const toggleCompletedVisibility = () => setShowCompleted((prev) => !prev);

    const onMove = (selectedGridItemKeys: React.Key[], gridItemLocation: ItemDropTarget) => {
        const [oldIndex, newIndex] = findIndexesForMove(content, selectedGridItemKeys, gridItemLocation);
        setBlockSettings({ ...blockSettings, content: reorderList(content, oldIndex, newIndex) });
    };

    const moveByIncrement = (id: string, positionChange: number) => {
        const index = findIndexById(content, id);
        setBlockSettings({ ...blockSettings, content: reorderList(content, index, index + positionChange) });
    };
    const renderChecklistItem = (
        { text, id, sort, completed, updatedAt }: OrderableListItem<ChecklistContent>,
        { componentDragState, isFocusVisible }: DragProperties
    ) => {
        const content = (
            <ChecklistItem
                item={{ text, id, completed, updatedAt }}
                key={id}
                isDragFocusVisible={isFocusVisible}
                isFirst={sort === 0}
                isLast={sort === displayableItems.length - 1}
                mode={isEditing ? ChecklistItemMode.Edit : ChecklistItemMode.View}
                toggleCompleted={(completed: boolean) =>
                    updateItem(id, {
                        completed,
                        updatedAt: Date.now(),
                    })
                }
                dragState={componentDragState}
                onMoveItem={moveByIncrement}
                onRemoveItem={removeItem}
                onTextModified={(text) => updateItem(id, { text })}
            />
        );
        // Preview is rendered in external DOM, requires own context provider
        return componentDragState === ItemDragState.Preview ? (
            <SettingsContext.Provider value={settings}>{content}</SettingsContext.Provider>
        ) : (
            content
        );
    };

    const shouldShowProgress = content.length > 0 && progressBarVisible;

    const displayableItems = isEditing || showCompleted ? content : filterCompleteItems(content);

    const handleMove = (modifiedItems: ChecklistContent[]) => {
        const modifiedArray = displayableItems.map((item: ChecklistContent) => {
            const matchingModifiedItem = modifiedItems.find((modifiedItem) => modifiedItem.id === item.id);
            if (matchingModifiedItem) {
                return { ...matchingModifiedItem };
            }

            return { ...item };
        });
        setBlockSettings({ ...blockSettings, content: modifiedArray });
    };

    return (
        <SettingsContext.Provider value={settings}>
            <div
                data-test-id="checklist-block"
                className="tw-relative"
                style={{
                    padding: hasExtendedCustomPadding
                        ? generatePaddingString([
                              extendedPaddingTop,
                              extendedPaddingLeft,
                              extendedPaddingRight,
                              extendedPaddingBottom,
                          ])
                        : paddingStyleMap[extendedPaddingChoice],
                }}
            >
                <div className="tw-relative" {...hoverProps}>
                    {shouldShowProgress && progressBarType === ProgressBarType.Bar && (
                        <ProgressBar
                            fillColor={toHex8String(progressBarFillColor)}
                            trackColor={toHex8String(progressBarTrackColor)}
                            percentage={calculatePercentage(content)}
                        />
                    )}
                    {shouldShowProgress && progressBarType === ProgressBarType.Percentage && (
                        <ProgressHeader value={`${calculatePercentage(content)}%`} />
                    )}
                    {shouldShowProgress && progressBarType === ProgressBarType.Fraction && (
                        <ProgressHeader value={calculateFraction(content)} />
                    )}
                    <div
                        className={joinClassNames([
                            'tw-absolute tw-right-0 tw-top-0 tw-z-40',
                            isHovered && !isEditing && 'tw-visible',
                            (!isHovered || isEditing) && 'tw-invisible',
                        ])}
                        data-test-id="toggle-completed-visibility"
                    >
                        <Button
                            size={ButtonSize.Small}
                            style={ButtonStyle.Secondary}
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
                    <div className="tw-mt-3" data-test-id="checklist-container">
                        {displayableItems.length > 0 && (
                            <OrderableList
                                items={displayableItems.map((item: ChecklistContent, index: number) => ({
                                    key: item.id,
                                    completed: item.completed,
                                    sort: index,
                                    text: item.text,
                                    updatedAt: item.updatedAt,
                                    alt: item.text,
                                    id: item.id,
                                }))}
                                dragDisabled={!isEditing}
                                renderContent={renderChecklistItem}
                                onMove={chain(handleMove, onMove)}
                            />
                        )}
                    </div>
                    {isEditing && (
                        <>
                            <hr className="tw-my-2 tw-border-black-40" />
                            <ChecklistItem mode={ChecklistItemMode.Create} onTextModified={addNewItem} />
                        </>
                    )}
                </div>
            </div>
        </SettingsContext.Provider>
    );
};
