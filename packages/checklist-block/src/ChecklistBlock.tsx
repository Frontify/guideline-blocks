/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    Button,
    ButtonSize,
    IconSize,
    IconView,
    IconViewSlash,
    OrderableList,
    DragState,
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
import 'tailwindcss/tailwind.css';
import { calculateFraction, calculatePercentage } from './utilities/calculations';

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
        setBlockSettings({
            ...blockSettings,
            content: content.filter(({ id }) => id !== idToDelete),
        });
    };

    const updateItem = (idToUpdate: string, properties: any) => {
        const updatedContent = content.reduce((acc: ChecklistContent[], item: ChecklistContent) => {
            if (item.id === idToUpdate) return [...acc, { ...item, ...properties }];
            return [...acc, item];
        }, []);
        setBlockSettings({ ...blockSettings, content: updatedContent });
    };

    const modifyListPosition = (originalIndex: number, newIndex: number) => {
        const updatedContent = content.slice();
        const [itemToSwap] = updatedContent.splice(originalIndex, 1);
        updatedContent.splice(newIndex, 0, itemToSwap);

        setBlockSettings({ ...blockSettings, content: updatedContent });
    };

    const toggleCompletedVisibility = () => {
        setShowCompleted((prev) => !prev);
    };

    const completionFilter = ({ completed }: ChecklistContent): boolean => {
        if (!isEditing && !showCompleted && completed) return false;
        return true;
    };

    const onMove = (selectedGridItemKeys: React.Key[], gridItemLocation: ItemDropTarget) => {
        let newIndex = content.findIndex((item) => item.id === gridItemLocation.key);
        const oldIndex = content.findIndex((item) => item.id === selectedGridItemKeys[0]);
        if (oldIndex < newIndex) newIndex--;
        if (gridItemLocation.dropPosition === 'before') {
            modifyListPosition(oldIndex, newIndex);
        } else {
            modifyListPosition(oldIndex, newIndex + 1);
        }
    };

    const moveByIncrement = (id: string, positionChange: number) => {
        const index = content.findIndex((item) => item.id === id);
        modifyListPosition(index, index + positionChange);
    };

    const shouldShowProgress = !!content.length && progressBarVisible;

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
                    <div className="tw-my-1.5"></div>
                    <OrderableList
                        items={content.filter(completionFilter).map((c) => ({ ...c, alt: c.text, type: 'item' }))}
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
                                    onChange={(text) => updateItem(value.id, { text })}
                                />
                            );
                            //Preview is rendered in external DOM, requires own context provider
                            return componentDragState === DragState.Preview ? (
                                <SettingsContext.Provider value={settings}>{content}</SettingsContext.Provider>
                            ) : (
                                content
                            );
                        }}
                    />
                    {isEditing && (
                        <>
                            <hr className="tw-my-2 tw-border-black-40" />
                            <ChecklistItem mode={ChecklistItemMode.Create} onChange={addNewItem} />
                        </>
                    )}
                </div>
            </div>
        </SettingsContext.Provider>
    );
};
