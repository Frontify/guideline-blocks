import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    Button,
    ButtonSize,
    IconSize,
    IconView,
    IconViewSlash,
    OrderableList,
    DragState,
    DragProperties,
    AcceptedItem,
} from '@frontify/arcade';
import { ItemDropTarget } from '@react-types/shared';
import { useHover } from '@react-aria/interactions';
import React, { ReactElement, useState } from 'react';
import 'tailwindcss/tailwind.css';
import ChecklistItem from './components/ChecklistItem';
import ProgressBar from './components/ProgressBar';
import { GridNode } from '@react-types/grid';
import ProgressHeader from './components/ProgressHeader';
import './index.css';
import { ChecklistContent, ChecklistItemMode, DefaultValues, PaddingClasses, ProgressBarType, Settings } from './types';
import { generatePaddingString } from './utilities/generatePaddingString';
import { provideDefaults } from './utilities/provideDefaults';
import { joinClassNames } from '../../divider-block/node_modules/@frontify/guideline-blocks-shared/src';

export type ChecklistProps = {
    appBridge: AppBridgeNative;
};

export const SettingsContext = React.createContext<Settings>(DefaultValues);

export default function Checklist({ appBridge }: ChecklistProps): ReactElement {
    const isEditing = useEditorState();
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
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

    const onMove = (selectedGridItemKeys: React.Key[], gridItemLocation: ItemDropTarget) => {
        let newIndex = content.findIndex((c) => c.id === gridItemLocation.key);
        const oldIndex = content.findIndex((c) => c.id === selectedGridItemKeys[0]);
        if (oldIndex < newIndex) newIndex--;
        if (gridItemLocation.dropPosition === 'before') {
            modifyListPosition(oldIndex, newIndex);
        } else {
            modifyListPosition(oldIndex, newIndex + 1);
        }
    };

    const moveByIncrement = (id: string, positionChange: number) => {
        const index = content.findIndex((c) => c.id === id);
        modifyListPosition(index, index + positionChange);
    };

    const shouldShowProgress = !!content.length && progressBarVisible;

    return (
        <SettingsContext.Provider value={settings}>
            <div
                className={joinClassNames([!paddingAdvanced && PaddingClasses[paddingBasic]])}
                style={{ padding: paddingAdvanced ? generatePaddingString(paddingCustom) : '' }}
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
                            {
                                value: { id, text, completed, updatedAt },
                                prevKey,
                                nextKey,
                            }: GridNode<AcceptedItem<ChecklistContent>>,
                            { componentDragState, isFocusVisible }: DragProperties
                        ) => {
                            const content = (
                                <ChecklistItem
                                    id={id}
                                    key={id}
                                    text={text}
                                    isDragFocusVisible={isFocusVisible}
                                    isFirst={!prevKey}
                                    isLast={!nextKey}
                                    dateCompleted={updatedAt}
                                    mode={isEditing ? ChecklistItemMode.Edit : ChecklistItemMode.View}
                                    checked={completed}
                                    toggleCompleted={(value: boolean) =>
                                        updateItem(id, { completed: value, updatedAt: Date.now() })
                                    }
                                    dragState={componentDragState}
                                    onMoveItem={moveByIncrement}
                                    onRemoveItem={removeItem}
                                    onChange={(text) => updateItem(id, { text })}
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
                            <ChecklistItem
                                id="Create new Checklist Item"
                                checked={false}
                                text={''}
                                mode={ChecklistItemMode.Create}
                                onChange={addNewItem}
                            />
                        </>
                    )}
                </div>
            </div>
        </SettingsContext.Provider>
    );
}
