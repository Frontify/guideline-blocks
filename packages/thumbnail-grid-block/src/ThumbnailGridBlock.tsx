/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import 'tailwindcss/tailwind.css';

import {
    Asset,
    AssetChooserObjectType,
    FileExtensionSets,
    useAssetUpload,
    useBlockAssets,
    useBlockSettings,
    useEditorState,
    useFileInput,
} from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { gutterSpacingStyleMap, useDndSensors } from '@frontify/guideline-blocks-shared';
import { generateRandomId } from '@frontify/fondue';

import { Settings, Thumbnail } from './types';
import { getThumbnailStyles } from './helper';
import { Grid, ImageWrapper, Item, RichTextEditors, SortableItem, UploadPlaceholder } from './components/';

export const ThumbnailGridBlock = ({ appBridge }: BlockProps) => {
    const isEditing = useEditorState(appBridge);

    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [itemsState, setItemsState] = useState(blockSettings.items ?? []);
    const [draggedItem, setDraggedItem] = useState<Thumbnail | undefined>(undefined);
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const [loadingIds, setLoadingIds] = useState<string[]>(['']);
    const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'image/*', multiple: true });
    const [uploadId, setUploadId] = useState<string | undefined>(undefined);
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload();
    const openAssetChooser = (id?: string) => {
        appBridge.openAssetChooser(
            async (uploadResults: Asset[]) => {
                updateImages([...uploadResults], id);
                appBridge.closeAssetChooser();
            },
            {
                multiSelection: id ? false : true,
                selectedValueId: id && blockAssets[id]?.[0]?.id,
                objectTypes: [AssetChooserObjectType.ImageVideo],
                extensions: FileExtensionSets.Images,
            }
        );
    };
    const onFilesDrop = (files: FileList, id?: string) => {
        if (files) {
            setLoadingIds((ids) => [...ids, id ?? 'placeholder']);
            setUploadId(id);
            uploadFile(files);
        }
    };
    useEffect(() => {
        if (selectedFiles) {
            setLoadingIds((ids) => [...ids, uploadId ?? 'placeholder']);
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);
    useEffect(() => {
        if (doneAll && uploadResults) {
            updateImages(uploadResults, uploadId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    const updateImages = async (images: Asset[], id?: string) => {
        if (!loadingIds.includes(id ?? 'placeholder')) {
            setLoadingIds((ids) => [...ids, id ?? 'placeholder']);
        }
        await updateItemWith('image', images, id);
    };
    const saveItems = (items: Thumbnail[]) => {
        setItemsState(items);
        setBlockSettings({ items });
    };
    const updateImage = async (image: Asset, id: string, loadingId?: string) => {
        await updateAssetIdsFromKey(id, [image.id]);
        setLoadingIds(loadingIds.filter((i) => i !== (loadingId ?? id)));
        setUploadId(undefined);
    };
    const addItem = (id: string, type: keyof Thumbnail, value: string) => {
        setItemsState((old) => [...old, { id, [type]: value }]); // cannot use saveItems here, as it overwrites the array when adding multiple image
        setBlockSettings({ items: [...itemsState, { id, [type]: value }] });
    };
    const updateItems = (id: string, type: keyof Thumbnail, value: string) => {
        saveItems(itemsState.map((item) => (item.id === id ? { ...item, [type]: value } : item)));
    };
    const updateItemWith = async (type: keyof Thumbnail, value: string | Asset[], updateId?: string) => {
        if (typeof value === 'string' && type !== 'image') {
            updateId ? updateItems(updateId, type, value) : addItem(generateRandomId(), type, value);
            return;
        }
        if (value.length === 0 || !Array.isArray(value)) {
            return;
        }
        for (const [index, file] of value.entries()) {
            if (index === 0 && updateId) {
                await updateImage(file, updateId, updateId);
                updateItems(updateId, type, updateId);
            } else {
                const newId = generateRandomId();
                addItem(newId, type, newId);
                setLoadingIds((ids) =>
                    index === value.length - 1 ? [...ids.filter((i) => i !== 'placeholder'), newId] : [...ids, newId]
                );
                await updateImage(file, newId, updateId ?? 'placeholder');
            }
        }
    };
    const onRemoveAsset = async (thumbnailId: string, assetId?: number) => {
        saveItems(itemsState.filter((item) => item.id !== thumbnailId));
        if (assetId) {
            await updateAssetIdsFromKey(thumbnailId, [assetId]);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = itemsState.findIndex((i) => i.id === active.id);
            const newIndex = itemsState.findIndex((i) => i.id === over.id);
            const sortedItems = arrayMove(itemsState, oldIndex, newIndex);
            saveItems(sortedItems);
            setDraggedItem(undefined);
        }
    };
    const handleDragStart = (event: DragEndEvent) => {
        const { active } = event;
        setDraggedItem(itemsState.find(({ id }) => id === active.id));
    };

    const thumbnailStyles = getThumbnailStyles(blockSettings);
    const thumbnailProps = {
        isEditing,
        thumbnailStyles,
        setUploadedId: setUploadId,
        onFilesDrop,
        openAssetChooser,
        openFileDialog,
        onRemoveAsset,
        updateItemWith,
        appBridge,
    };

    const gap = blockSettings.hasCustomSpacing
        ? blockSettings.spacingCustom
        : gutterSpacingStyleMap[blockSettings.spacingChoice];

    const sensors = useDndSensors(parseInt(gap), parseInt(gap));

    return (
        <Grid columnCount={blockSettings.columnCount} gap={gap}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                modifiers={[restrictToParentElement]}
            >
                <SortableContext items={itemsState} strategy={rectSortingStrategy}>
                    {itemsState.map((item) => (
                        <SortableItem
                            key={item.id}
                            item={item}
                            image={blockAssets?.[item.id]?.[0]}
                            isLoading={loadingIds.includes(item.id)}
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
                            isLoading={loadingIds.includes(draggedItem.id)}
                            isDragging
                            {...thumbnailProps}
                        />
                    )}
                </DragOverlay>
            </DndContext>
            {isEditing && (
                <div className={thumbnailStyles.captionPositionClassNames} data-test-id="thumbnail-item-placeholder">
                    <ImageWrapper thumbnailStyles={thumbnailStyles} placeholderWrapper>
                        <UploadPlaceholder
                            width={thumbnailStyles.width}
                            isLoading={loadingIds.includes('placeholder')}
                            openFileDialog={openFileDialog}
                            onFilesDrop={onFilesDrop}
                            openAssetChooser={openAssetChooser}
                        />
                    </ImageWrapper>
                    <RichTextEditors isEditing={isEditing} updateItemWith={updateItemWith} appBridge={appBridge} />
                </div>
            )}
        </Grid>
    );
};
