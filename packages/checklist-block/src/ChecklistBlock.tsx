/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    Button,
    ButtonEmphasis,
    ButtonSize,
    IconEye,
    IconEyeOff,
    IconSize,
    LegacyDragProperties,
    LegacyItemDragState,
    LegacyOrderableList,
    LegacyOrderableListItem,
} from '@frontify/fondue';

import { BlockProps, joinClassNames, toHex8String } from '@frontify/guideline-blocks-settings';
import { useHover } from '@react-aria/interactions';
import { FC, useState } from 'react';
import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';
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
    updateItemById,
} from './helpers';
import { SettingsContext } from './SettingsContext';
import { ChecklistContent, ChecklistItemMode, DefaultValues, ProgressBarType, Settings } from './types';
import { reorderList } from './utilities';

export const ChecklistBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Partial<Settings>>(appBridge);
    const [showCompleted, setShowCompleted] = useState(true);
    const { hoverProps, isHovered } = useHover({});
    const settings = { ...DefaultValues, ...blockSettings };

    const { content, progressBarVisible, progressBarFillColor, progressBarTrackColor, progressBarType } = settings;

    const addNewItem = (text: string): void => {
        const trimmed = text.trim();
        if (!trimmed) {
            return;
        }
        const newItem = createItem(trimmed, content.length | 0);
        const updatedContent = [...content, newItem];
        setBlockSettings({ content: updatedContent });
    };

    const removeItem = (idToDelete: string): Promise<void> =>
        setBlockSettings({
            content: content.filter(({ id }) => id !== idToDelete),
        });

    const updateItem = (idToUpdate: string, properties: Partial<ChecklistContent>) =>
        setBlockSettings({ content: updateItemById(content, idToUpdate, properties) });

    const toggleCompletedVisibility = () => setShowCompleted((prev) => !prev);

    const moveByIncrement = (id: string, positionChange: number) => {
        const index = findIndexById(content, id);
        setBlockSettings({ content: reorderList(content, index, index + positionChange) });
    };

    const renderChecklistItem = (
        { text, id, completed, updatedAt }: LegacyOrderableListItem<ChecklistContent>,
        { componentDragState, isFocusVisible }: LegacyDragProperties
    ) => {
        const index = findIndexById(displayableItems, id);
        displayableItems.sort((previousItem, currentItem) => previousItem.sort - currentItem.sort);

        const content = (
            <ChecklistItem
                item={{ text, id, completed, updatedAt }}
                key={id}
                isDragFocusVisible={isFocusVisible}
                isFirst={index === 0}
                isLast={index === displayableItems.length - 1}
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
        return componentDragState === LegacyItemDragState.Preview ? (
            <SettingsContext.Provider value={settings}>{content}</SettingsContext.Provider>
        ) : (
            content
        );
    };

    const shouldShowProgress = content.length > 0 && progressBarVisible;

    const displayableItems = isEditing || showCompleted ? content : filterCompleteItems(content);

    const handleMove = (modifiedItems: LegacyOrderableListItem<ChecklistContent>[]) => {
        const modifiedArray = displayableItems.map((item) => {
            const matchingModifiedItem = modifiedItems.find((modifiedItem) => modifiedItem.id === item.id);
            if (matchingModifiedItem) {
                return { ...matchingModifiedItem };
            }

            return { ...item };
        });

        setBlockSettings({ content: modifiedArray });
    };

    const orderableListItems = displayableItems.map(
        ({ id, completed, sort, text, updatedAt }: LegacyOrderableListItem<ChecklistContent>, index: number) => {
            return {
                id,
                text,
                updatedAt,
                completed,
                key: id,
                alt: text,
                sort: sort !== undefined ? sort : index,
            };
        }
    );

    return (
        <SettingsContext.Provider value={settings}>
            <div className="checklist-block">
                <div data-test-id="checklist-block" className="tw-relative">
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
                                emphasis={ButtonEmphasis.Default}
                                icon={
                                    showCompleted ? (
                                        <IconEye size={IconSize.Size16} />
                                    ) : (
                                        <IconEyeOff size={IconSize.Size16} />
                                    )
                                }
                                onClick={toggleCompletedVisibility}
                            >
                                {showCompleted ? 'Hide completed tasks' : 'Show completed tasks'}
                            </Button>
                        </div>
                        <div className="tw-mt-3" data-test-id="checklist-container">
                            {displayableItems.length > 0 && (
                                <LegacyOrderableList
                                    items={orderableListItems}
                                    dragDisabled={!isEditing}
                                    renderContent={renderChecklistItem}
                                    onMove={handleMove}
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
            </div>
        </SettingsContext.Provider>
    );
};
