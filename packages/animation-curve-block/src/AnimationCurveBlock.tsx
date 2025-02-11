/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';

import { AnimationCurve, AnimationCurvePatch, Settings } from './types';
import { gridClasses } from './constants';
import { BlankSlate, Card, SortableCard } from './components';
import { BlockProps, gutterSpacingStyleMap, useDndSensors } from '@frontify/guideline-blocks-settings';
import { StyleProvider } from '@frontify/guideline-blocks-shared';

export const AnimationCurveBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [activeItem, setActiveItem] = useState<AnimationCurve | null>(null);
    const [canvasHeight, setCanvasHeight] = useState(0);
    const { content, hasCustomSpacing, spacingCustom, spacingChoice, columns, hasBorder } = blockSettings;
    const [localItems, setLocalItems] = useState<AnimationCurve[]>(content ?? []);
    const isEditing = useEditorState(appBridge);
    const gap = hasCustomSpacing ? spacingCustom : gutterSpacingStyleMap[spacingChoice];
    const gapNumber = parseInt(gap ?? '0');
    const sensors = useDndSensors(gapNumber, gapNumber);

    const deleteAnimationCurve = (id: string) => {
        const newContent = content.filter((animationCurve) => animationCurve.id !== id);
        setLocalItems(newContent);
        setBlockSettings({ content: newContent });
    };

    const updateAnimationCurve = (id: string, animationCurvePatch: AnimationCurvePatch): void => {
        const updatedContent = content.map((item) => (item.id === id ? { ...item, ...animationCurvePatch } : item));
        setLocalItems(updatedContent);
        setBlockSettings({ content: updatedContent });
    };

    const handleDragStart = (event: DragStartEvent) => {
        const activeCard = content.find((item) => item.id === event.active.id);
        setActiveItem(activeCard ?? null);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = localItems.findIndex((i) => i.id === active.id);
            const newIndex = localItems.findIndex((i) => i.id === over.id);
            const content = arrayMove(localItems, oldIndex, newIndex);
            setLocalItems(content);
            setActiveItem(null);
            setBlockSettings({ content });
        }
    };

    return (
        <div className="animation-curve-block tw-@container">
            <StyleProvider>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                    modifiers={[restrictToParentElement]}
                >
                    <div
                        data-test-id="animation-curve-block"
                        className={`tw-grid tw-auto-rows-auto ${gridClasses[columns]}`}
                        style={{
                            gap,
                        }}
                    >
                        <SortableContext items={localItems} strategy={rectSortingStrategy}>
                            {localItems?.map((animationCurve) => (
                                <SortableCard
                                    appBridge={appBridge}
                                    key={animationCurve.id}
                                    animationCurve={animationCurve}
                                    isEditing={isEditing}
                                    blockSettings={blockSettings}
                                    onDelete={deleteAnimationCurve}
                                    onUpdate={updateAnimationCurve}
                                    setCanvasHeight={setCanvasHeight}
                                />
                            ))}
                            <DragOverlay>
                                {activeItem && (
                                    <Card
                                        appBridge={appBridge}
                                        key={activeItem.id}
                                        animationCurve={activeItem}
                                        isEditing={isEditing}
                                        isDragging={true}
                                        blockSettings={blockSettings}
                                        onDelete={deleteAnimationCurve}
                                        onUpdate={updateAnimationCurve}
                                        setCanvasHeight={setCanvasHeight}
                                    />
                                )}
                            </DragOverlay>
                        </SortableContext>
                        {isEditing && (
                            <BlankSlate
                                key={localItems.length}
                                appBridge={appBridge}
                                content={localItems}
                                hasBorder={hasBorder}
                                setLocalItems={setLocalItems}
                                setBlockSettings={setBlockSettings}
                                canvasHeight={canvasHeight}
                            />
                        )}
                    </div>
                </DndContext>
            </StyleProvider>
        </div>
    );
};
