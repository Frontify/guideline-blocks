/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    Button,
    ButtonSize,
    IconSize,
    IconView,
    IconViewSlash,
    OrderableList,
    ItemDragState,
    DragProperties,
    OrderableListItem,
} from '@frontify/arcade';
import { ItemDropTarget } from '@react-types/shared';
import { useHover } from '@react-aria/interactions';
import React, { useState, FC } from 'react';
import { ChecklistItem } from './components/ChecklistItem';
import { ProgressBar } from './components/ProgressBar';
import { GridNode } from '@react-types/grid';
import { ProgressHeader } from './components/ProgressHeader';
import {
    ChecklistContent,
    ChecklistItemMode,
    ChecklistProps,
    DefaultValues,
    PaddingClasses,
    ProgressBarType,
    Settings,
} from './types';
import { generatePaddingString } from '@frontify/guideline-blocks-shared';
import { provideDefaults } from './utilities/provideDefaults';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { SettingsContext } from './SettingsContext';
import { calculateFraction, calculatePercentage } from './utilities/calculations';
import { filterCompleteItems } from './utilities/filterCompletedItems';
import { reorderList } from './utilities/reorderList';
import { createItem, findIndexById, updateItemById } from './utilities/contentHelpers';
import '@frontify/arcade/style';
import 'tailwindcss/tailwind.css';

export const ChecklistBlock: FC<ChecklistProps> = ({ appBridge }: ChecklistProps) => {
    const isEditing = useEditorState();
    const [blockSettings, setBlockSettings] = useBlockSettings<Partial<Settings>>(appBridge);
    const [showCompleted, setShowCompleted] = useState(true);
    const { hoverProps, isHovered } = useHover({});

    const settings = provideDefaults(DefaultValues, blockSettings);

    const { paddingAdvanced, paddingCustom, paddingBasic, content, progressBarVisible } = settings;

    const addNewItem = (text: string): void => {
        const trimmed = text.trim();
        if (!trimmed) return;
        const newItem = createItem(trimmed);
        const updatedContent = [...content, newItem];
        setBlockSettings({ ...blockSettings, content: updatedContent });
    };

    const removeItem = (idToDelete: string): void => {
        setBlockSettings({
            ...blockSettings,
            content: content.filter(({ id }) => id !== idToDelete),
        });
    };

    const updateItem = (idToUpdate: string, properties: Partial<ChecklistContent>) => {
        const updatedContent = updateItemById(content, idToUpdate, properties);
        setBlockSettings({ ...blockSettings, content: updatedContent });
    };

    const modifyListPosition = (originalIndex: number, newIndex: number) => {
        const newList = reorderList(content, originalIndex, newIndex);
        setBlockSettings({ ...blockSettings, content: newList });
    };

    const toggleCompletedVisibility = () => {
        setShowCompleted((prev) => !prev);
    };

    const onMove = (selectedGridItemKeys: React.Key[], gridItemLocation: ItemDropTarget) => {
        let newIndex = findIndexById(content, gridItemLocation.key);
        const oldIndex = findIndexById(content, selectedGridItemKeys[0]);
        if (oldIndex < newIndex) {
            newIndex--;
        }
        if (gridItemLocation.dropPosition === 'before') {
            modifyListPosition(oldIndex, newIndex);
        } else {
            modifyListPosition(oldIndex, newIndex + 1);
        }
    };

    const moveByIncrement = (id: string, positionChange: number) => {
        const index = findIndexById(content, id);
        modifyListPosition(index, index + positionChange);
    };

    const shouldShowProgress = !!content.length && progressBarVisible;

    const displayableItems = isEditing || showCompleted ? content : filterCompleteItems(content);

    return (
        <SettingsContext.Provider value={settings}>
            <div
                className={joinClassNames([!paddingAdvanced && PaddingClasses[paddingBasic]])}
                style={{
                    padding: paddingAdvanced ? generatePaddingString(paddingCustom) : '',
                }}
            >
                <div {...hoverProps} className="tw-relative">
                    {shouldShowProgress && settings.progressBarType === ProgressBarType.Bar && (
                        <ProgressBar
                            fillColor={settings.progressBarFillColor.hex}
                            trackColor={settings.progressBarTrackColor.hex}
                            percentage={calculatePercentage(settings.content)}
                        />
                    )}
                    {shouldShowProgress && settings.progressBarType === ProgressBarType.Fraction && (
                        <ProgressHeader value={`${calculatePercentage(settings.content)}%`} />
                    )}
                    {shouldShowProgress && settings.progressBarType === ProgressBarType.Percentage && (
                        <ProgressHeader value={calculateFraction(settings.content)} />
                    )}
                    <div
                        className={joinClassNames([
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
                    <div className="tw-my-2"></div>
                    <OrderableList
                        items={displayableItems.map((item) => ({ ...item, alt: item.text, type: 'item' }))}
                        onMove={onMove}
                        showFocusRing={true}
                        disableTypeAhead
                        dragDisabled={!isEditing}
                        renderContent={(
                            { value, prevKey, nextKey }: GridNode<OrderableListItem<ChecklistContent>>,
                            { componentDragState, isFocusVisible }: DragProperties
                        ) => {
                            const content = (
                                <ChecklistItem
                                    item={value}
                                    key={value.id}
                                    isDragFocusVisible={isFocusVisible}
                                    isFirst={!prevKey}
                                    isLast={!nextKey}
                                    mode={isEditing ? ChecklistItemMode.Edit : ChecklistItemMode.View}
                                    toggleCompleted={(completed: boolean) =>
                                        updateItem(value.id, {
                                            completed,
                                            updatedAt: Date.now(),
                                        })
                                    }
                                    dragState={componentDragState}
                                    onMoveItem={moveByIncrement}
                                    onRemoveItem={removeItem}
                                    onTextModified={(text) => updateItem(value.id, { text })}
                                />
                            );
                            //Preview is rendered in external DOM, requires own context provider
                            return componentDragState === ItemDragState.Preview ? (
                                <SettingsContext.Provider value={settings}>{content}</SettingsContext.Provider>
                            ) : (
                                content
                            );
                        }}
                    />
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
