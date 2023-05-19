/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import 'tailwindcss/tailwind.css';

import '@frontify/fondue-tokens/styles';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import type { BlockProps } from '@frontify/guideline-blocks-settings';

import { AnimationCurve, AnimationCurvePatch, Settings } from './types';
import { gridClasses } from './constants';
import { BlankSlate, Card, SortableCard } from './components';
import { gutterSpacingStyleMap } from '@frontify/guideline-blocks-shared';

export const AnimationCurveBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [activeItem, setActiveItem] = useState<AnimationCurve | null>(null);
    const [canvasHeight, setCanvasHeight] = useState(0);
    const { content, hasCustomSpacing, spacingCustom, spacingChoice, columns, hasBorder } = blockSettings;
    const [localItems, setLocalItems] = useState<AnimationCurve[]>(content ?? []);
    const isEditing = useEditorState(appBridge);
    const sensors = useSensors(useSensor(PointerSensor));

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
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            <div
                data-test-id="animation-curve-block"
                className={`tw-grid tw-auto-rows-auto ${gridClasses[columns]}`}
                style={{
                    gap: hasCustomSpacing ? spacingCustom : gutterSpacingStyleMap[spacingChoice],
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
    );
};
