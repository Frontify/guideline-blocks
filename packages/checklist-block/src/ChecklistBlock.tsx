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
    ButtonStyle,
} from '@frontify/arcade';
import { ItemDropTarget } from '@react-types/shared';
import { useHover } from '@react-aria/interactions';
import { useState, FC } from 'react';
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
import { colorToHexAlpha, generatePaddingString, joinClassNames } from '@frontify/guideline-blocks-shared';
import { SettingsContext } from './SettingsContext';
import { reorderList } from './utilities';
import {
    createItem,
    calculateFraction,
    calculatePercentage,
    findIndexById,
    findIndexesForMove,
    updateItemById,
    provideDefaults,
    filterCompleteItems,
} from './helpers';
import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';

export const ChecklistBlock: FC<ChecklistProps> = ({ appBridge }: ChecklistProps) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Partial<Settings>>(appBridge);
    const [showCompleted, setShowCompleted] = useState(true);
    const { hoverProps, isHovered } = useHover({});
    const settings = provideDefaults(DefaultValues, blockSettings);

    const {
        paddingAdvanced,
        paddingCustom,
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
                className={joinClassNames(['tw-relative', !paddingAdvanced && PaddingClasses[paddingBasic]])}
                style={{
                    padding: paddingAdvanced ? generatePaddingString(paddingCustom) : '',
                }}
                {...hoverProps}
            >
                {shouldShowProgress && progressBarType === ProgressBarType.Bar && (
                    <ProgressBar
                        fillColor={colorToHexAlpha(progressBarFillColor)}
                        trackColor={colorToHexAlpha(progressBarTrackColor)}
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
                <div className="tw-mt-4" data-test-id="checklist-container">
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
        </SettingsContext.Provider>
    );
};
