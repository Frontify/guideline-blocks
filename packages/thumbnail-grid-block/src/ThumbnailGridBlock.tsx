/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';
import 'tailwindcss/tailwind.css';

import { Asset, useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';

import { BlockProps, gutterSpacingStyleMap, useDndSensors } from '@frontify/guideline-blocks-settings';
import { generateRandomId } from '@frontify/fondue';

import type { Settings, Thumbnail } from './types';
import { getThumbnailStyles } from './helper';
import { Grid, Item, SortableItem } from './components/';

export const ThumbnailGridBlock = ({ appBridge }: BlockProps) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [itemsState, setItemsState] = useState(blockSettings.items ?? []);
    const [draggedItem, setDraggedItem] = useState<Thumbnail | undefined>(undefined);
    const { blockAssets, updateAssetIdsFromKey, deleteAssetIdsFromKey } = useBlockAssets(appBridge);
    const [uploadingItemIds, setUploadingItemIds] = useState<Record<string, string[]>>({});

    const addNewItemsIfNeeded = (assetsToAdd: Asset[] | FileList) => {
        const [, ...newAssets] = Array.from(assetsToAdd as Asset[]);
        const newItemsToAdd: Thumbnail[] = (newAssets || []).map(() => ({
            id: generateRandomId(),
        }));
        addItems(newItemsToAdd);

        return newItemsToAdd;
    };

    const onAssetsSelected = async (selectedAssets: Asset[], itemId: string) => {
        const newItemsToAdd = addNewItemsIfNeeded(selectedAssets);
        const newUploadingItemIds = {
            ...uploadingItemIds,
            [itemId]: [itemId, ...newItemsToAdd.map((item) => item.id)],
        };
        setUploadingItemIds(newUploadingItemIds);
        const updateAssetIdPromises = newUploadingItemIds[itemId].map((uploadingItemId, i) =>
            updateAssetIdsFromKey(uploadingItemId, [selectedAssets[i].id])
        );
        await Promise.all(updateAssetIdPromises);
        setUploadingItemIds({ ...newUploadingItemIds, [itemId]: [] });
    };

    const onFilesSelected = (files: FileList, itemId: string) => {
        if (files) {
            const newItemsToAdd = addNewItemsIfNeeded(files);
            setUploadingItemIds({ ...uploadingItemIds, [itemId]: [itemId, ...newItemsToAdd.map((item) => item.id)] });
        }
    };

    const onFilesUploaded = async (uploadedAssets: Asset[], itemId: string) => {
        if (!uploadingItemIds[itemId]) {
            return;
        }

        const updateAssetIdPromises = uploadingItemIds[itemId].map((uploadingItemId, i) =>
            uploadedAssets[i] ? updateAssetIdsFromKey(uploadingItemId, [uploadedAssets[i].id]) : Promise.resolve()
        );
        await Promise.all(updateAssetIdPromises);
        setUploadingItemIds({ ...uploadingItemIds, [itemId]: [] });
    };

    useEffect(() => {
        setBlockSettings({ items: itemsState });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemsState]);

    const addItems = useCallback(
        (items: Thumbnail[]) => {
            setItemsState([...itemsState, ...items]);
        },
        [itemsState, setItemsState]
    );

    const updateItems = (updatedItems: Thumbnail[]) => {
        const newItemsState = itemsState.map((item) => {
            const updatedItem = updatedItems.find((i) => i.id === item.id);
            return updatedItem ?? item;
        });
        setItemsState(newItemsState);
    };

    const onRemoveItem = async (itemId: string) => {
        if ((blockAssets[itemId] || []).length > 0) {
            await deleteAssetIdsFromKey(
                itemId,
                blockAssets[itemId].map((asset) => asset.id)
            );
        }
        setUploadingItemIds({ ...uploadingItemIds, [itemId]: [] });
        setItemsState(itemsState.filter((item) => item.id !== itemId));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = itemsState.findIndex((i) => i.id === active.id);
            const newIndex = itemsState.findIndex((i) => i.id === over.id);
            const sortedItems = arrayMove(itemsState, oldIndex, newIndex);
            setItemsState(sortedItems);
            setDraggedItem(undefined);
        }
    };
    const handleDragStart = (event: DragEndEvent) => {
        const { active } = event;
        setDraggedItem(itemsState.find(({ id }) => id === active.id));
    };

    useEffect(() => {
        const lastItemInState = itemsState[itemsState.length - 1];

        const shouldAddNewItem =
            !lastItemInState ||
            lastItemInState.title ||
            lastItemInState.description ||
            blockAssets[lastItemInState.id]?.[0];
        if (shouldAddNewItem) {
            addItems([{ id: generateRandomId() }]);
        }
    }, [blockAssets, itemsState, addItems]);

    const thumbnailStyles = getThumbnailStyles(blockSettings);
    const thumbnailProps = {
        isEditing,
        thumbnailStyles,
        showGrabHandle: isEditing && itemsState.length > 1,
        onFilesSelected,
        onFilesUploaded,
        onRemoveItem,
        onAssetsSelected,
        updateItem: (item: Thumbnail) => updateItems([item]),
        appBridge,
    };

    const gap = blockSettings.hasCustomSpacing
        ? blockSettings.spacingCustom
        : gutterSpacingStyleMap[blockSettings.spacingChoice];

    const sensors = useDndSensors(parseInt(gap), parseInt(gap));

    const getIsItemUploading = (itemId: string) => {
        return Object.entries(uploadingItemIds).some((entry) => entry[1].includes(itemId));
    };

    return (
        <div className="thumbnail-grid-block">
            <Grid columnCount={blockSettings.columnCount} gap={gap}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                    modifiers={[restrictToParentElement]}
                >
                    <SortableContext items={itemsState} strategy={rectSortingStrategy}>
                        {itemsState.map((item, i) => (
                            <SortableItem
                                key={item.id}
                                item={item}
                                image={blockAssets?.[item.id]?.[0]}
                                isLoading={getIsItemUploading(item.id)}
                                showDeleteButton={i !== itemsState.length - 1}
                                {...thumbnailProps}
                            />
                        ))}
                    </SortableContext>
                    <DragOverlay>
                        {draggedItem && (
                            <Item
                                key={draggedItem.id}
                                item={draggedItem}
                                image={blockAssets?.[draggedItem.id]?.[0]}
                                isLoading={getIsItemUploading(draggedItem.id)}
                                isDragging
                                showDeleteButton={itemsState[itemsState.length - 1]?.id !== draggedItem.id}
                                {...thumbnailProps}
                            />
                        )}
                    </DragOverlay>
                </DndContext>
            </Grid>
        </div>
    );
};
