/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DndContext, type DragEndEvent, DragOverlay, closestCenter } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import {
    type Asset,
    useAssetViewer,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    usePrivacySettings,
} from '@frontify/app-bridge';
import { type BlockProps, Security, gutterSpacingStyleMap, useDndSensors } from '@frontify/guideline-blocks-settings';
import { generateRandomId, StyleProvider } from '@frontify/guideline-blocks-shared';
import { useCallback, useEffect, useState } from 'react';

import { Grid, Item, SortableItem } from './components/';
import { getThumbnailStyles } from './helper';
import { type Settings, type Thumbnail } from './types';

export const ThumbnailGridBlock = ({ appBridge }: BlockProps) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [itemsState, setItemsState] = useState(blockSettings.items ?? []);
    const [draggedItem, setDraggedItem] = useState<Thumbnail | undefined>(undefined);
    const { blockAssets, updateAssetIdsFromKey, deleteAssetIdsFromKey } = useBlockAssets(appBridge);
    const [uploadingItemIds, setUploadingItemIds] = useState<Record<string, string[]>>({});
    const { assetViewerEnabled: globalAssetViewerEnabled } = usePrivacySettings(appBridge);
    const { assetViewerEnabled, security } = blockSettings;
    const isAssetViewerEnabled = security === Security.Custom ? assetViewerEnabled : globalAssetViewerEnabled;
    const { open: openAssetInAssetViewer } = useAssetViewer(appBridge);

    const addNewItemsIfNeeded = (assetsToAdd: Asset[] | FileList) => {
        const [, ...newAssets] = Array.from(assetsToAdd as Asset[]);
        const newItemsToAdd: Thumbnail[] = (newAssets || []).map((asset) => ({
            id: generateRandomId(),
            altText: asset.title || asset.fileName,
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
        setItemsState((prev) =>
            prev.map((item) =>
                item.id === itemId ? { ...item, altText: selectedAssets[0].title || selectedAssets[0].fileName } : item
            )
        );
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
        setItemsState((prev) =>
            prev.map((item) =>
                item.id === itemId ? { ...item, altText: uploadedAssets[0].title || uploadedAssets[0].fileName } : item
            )
        );
        setUploadingItemIds({ ...uploadingItemIds, [itemId]: [] });
    };

    useEffect(() => {
        if (blockSettings.items !== itemsState && isEditing) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            setBlockSettings({ items: itemsState });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemsState]);

    const addItems = useCallback(
        (items: Thumbnail[]) => {
            setItemsState([...itemsState, ...items]);
        },
        [itemsState, setItemsState]
    );

    const updateItems = useCallback(
        (updatedItems: Thumbnail[]) => {
            const newItemsState = itemsState.map((item) => {
                const updatedItem = updatedItems.find((i) => i.id === item.id);
                return updatedItem ?? item;
            });
            setItemsState(newItemsState);
        },
        [itemsState]
    );

    const updateItem = useCallback(
        (item: Thumbnail) => {
            updateItems([item]);
        },
        [updateItems]
    );

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
        updateItem,
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
            <StyleProvider>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                    modifiers={[restrictToParentElement]}
                >
                    <SortableContext items={itemsState} strategy={rectSortingStrategy}>
                        <div className="tw-@container tw-translate-x-0 tw-isolate">
                            <Grid columnCount={blockSettings.columnCount} gap={gap}>
                                {itemsState.map((item, i) => (
                                    <SortableItem
                                        key={item.id}
                                        item={item}
                                        isAssetViewerEnabled={isAssetViewerEnabled}
                                        image={blockAssets?.[item.id]?.[0]}
                                        isLoading={getIsItemUploading(item.id)}
                                        showDeleteButton={i !== itemsState.length - 1}
                                        openAssetInAssetViewer={openAssetInAssetViewer}
                                        {...thumbnailProps}
                                    />
                                ))}
                            </Grid>
                        </div>
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
                    </SortableContext>
                </DndContext>
            </StyleProvider>
        </div>
    );
};
