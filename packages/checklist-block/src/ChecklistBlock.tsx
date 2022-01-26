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
import { GridNode } from '@react-types/grid';
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
    provideDefaults,
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
    const settings = provideDefaults(DefaultValues, blockSettings);

    const {
        hasCustomPadding,
        paddingValues,
        paddingBasic,
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
        // Preview is rendered in external DOM, requires own context provider
        return componentDragState === ItemDragState.Preview ? (
            <SettingsContext.Provider value={settings}>{content}</SettingsContext.Provider>
        ) : (
            content
        );
    };

    const shouldShowProgress = !!content.length && progressBarVisible;

    const displayableItems = isEditing || showCompleted ? content : filterCompleteItems(content);

    return (
        <SettingsContext.Provider value={settings}>
            <div
                data-test-id="checklist-block"
                className="tw-relative"
                style={{
                    padding: hasCustomPadding ? generatePaddingString(paddingValues) : paddingStyleMap[paddingBasic],
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
                        {!!displayableItems.length && (
                            <OrderableList
                                items={displayableItems.map((item) => ({ ...item, alt: item.text, type: 'item' }))}
                                onMove={onMove}
                                disableTypeAhead
                                dragDisabled={!isEditing}
                                renderContent={renderChecklistItem}
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
