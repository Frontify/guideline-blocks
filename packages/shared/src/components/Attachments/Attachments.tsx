/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from 'react';
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
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { Asset, useAssetUpload, useEditorState } from '@frontify/app-bridge';
import {
    AssetInput,
    AssetInputSize,
    Flyout,
    FlyoutPlacement,
    IconCaretDown12,
    IconPaperclip16,
} from '@frontify/fondue';
import { useGuidelineDesignTokens } from '../../hooks';
import { AttachmentItem, SortableAttachmentItem } from './AttachmentItem';
import { AttachmentsProps } from './types';

export const Attachments = ({
    items,
    onDelete,
    onReplaceWithBrowse,
    onReplaceWithUpload,
    onBrowse,
    onUpload,
    onSorted,
    appBridge,
}: AttachmentsProps) => {
    const [internalItems, setInternalItems] = useState<Asset[] | undefined>(items || []);
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
    const sensors = useSensors(useSensor(PointerSensor));
    const [draggedAssetId, setDraggedAssetId] = useState<number | undefined>(undefined);
    const { designTokens } = useGuidelineDesignTokens();
    const [isUploadLoading, setIsUploadLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const isEditing = useEditorState(appBridge);

    const draggedItem = internalItems?.find((item) => item.id === draggedAssetId);

    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isUploadLoading && setIsUploadLoading(true),
    });

    useEffect(() => {
        setInternalItems(items);
    }, [items]);

    useEffect(() => {
        if (selectedFiles) {
            setIsUploadLoading(true);
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        const uploadDone = async () => {
            if (doneAll) {
                await onUpload(uploadResults);
                setIsUploadLoading(false);
            }
        };
        uploadDone();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    const onOpenAssetChooser = () => {
        setIsFlyoutOpen(false);
        appBridge.openAssetChooser(
            (result: Asset[]) => {
                onBrowse(result);
                appBridge.closeAssetChooser();
            },
            {
                multiSelection: true,
            }
        );
    };

    const onReplaceItemWithBrowse = (toReplace: Asset) => {
        setIsFlyoutOpen(false);
        appBridge.openAssetChooser(
            (result: Asset[]) => {
                onReplaceWithBrowse(toReplace, result[0]);
                appBridge.closeAssetChooser();
            },
            {
                multiSelection: false,
            }
        );
    };

    const onReplaceItemWithUpload = (toReplace: Asset, uploadedAsset: Asset) => {
        onReplaceWithUpload(toReplace, uploadedAsset);
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setDraggedAssetId(active.id as number);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id && internalItems) {
            const oldIndex = internalItems.findIndex((i) => i.id === active.id);
            const newIndex = internalItems.findIndex((i) => i.id === over.id);
            const sortedItems = arrayMove(internalItems, oldIndex, newIndex);
            setInternalItems(sortedItems);
            setDraggedAssetId(undefined);
            onSorted(sortedItems);
        }
    };

    return (
        <>
            {(isEditing || (internalItems?.length ?? 0) > 0) && (
                <div className="-tw-mx-3" data-test-id="attachments-flyout-button">
                    <Flyout
                        placement={FlyoutPlacement.BottomRight}
                        onOpenChange={setIsFlyoutOpen}
                        isOpen={isFlyoutOpen}
                        fitContent
                        legacyFooter={false}
                        trigger={
                            <button className="tw-flex tw-text-[13px] tw-font-body tw-items-center tw-gap-1 tw-rounded-full tw-bg-box-neutral-strong-inverse hover:tw-bg-box-neutral-strong-inverse-hover active:tw-bg-box-neutral-strong-inverse-pressed  tw-text-box-neutral-strong tw-outline tw-outline-1 tw-outline-offset-[1px] tw-p-[6px] tw-outline-line">
                                <IconPaperclip16 />
                                <div>{(items?.length || 0) > 0 ? items?.length : 'Add'}</div>
                                <IconCaretDown12 />
                            </button>
                        }
                    >
                        <div className="tw-w-[300px]">
                            {(internalItems?.length || 0) > 0 && (
                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                >
                                    <SortableContext items={internalItems || []} strategy={rectSortingStrategy}>
                                        <div className="tw-border-b tw-border-b-line">
                                            {(internalItems || []).map((item) => (
                                                <SortableAttachmentItem
                                                    isEditing={isEditing}
                                                    designTokens={designTokens}
                                                    key={item.id}
                                                    item={item}
                                                    onDelete={() => onDelete(item)}
                                                    onReplaceWithBrowse={() => onReplaceItemWithBrowse(item)}
                                                    onReplaceWithUpload={(uploadedAsset: Asset) =>
                                                        onReplaceItemWithUpload(item, uploadedAsset)
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </SortableContext>
                                    <DragOverlay>
                                        {draggedItem ? (
                                            <AttachmentItem
                                                isOverlay={true}
                                                isEditing={isEditing}
                                                key={draggedAssetId}
                                                designTokens={designTokens}
                                                item={draggedItem}
                                                isDragging={true}
                                                onDelete={() => onDelete(draggedItem)}
                                                onReplaceWithBrowse={() => onReplaceItemWithBrowse(draggedItem)}
                                                onReplaceWithUpload={(uploadedAsset: Asset) =>
                                                    onReplaceItemWithUpload(draggedItem, uploadedAsset)
                                                }
                                            />
                                        ) : null}
                                    </DragOverlay>
                                </DndContext>
                            )}
                            {isEditing && (
                                <div className="tw-px-5 tw-py-3">
                                    <div className="tw-font-body tw-font-medium tw-text-text tw-text-s tw-my-4">
                                        Add attachments
                                    </div>
                                    <AssetInput
                                        isLoading={isUploadLoading}
                                        onMultiAssetClick={() => {
                                            /* This enables multiple file inputs */
                                        }}
                                        size={AssetInputSize.Small}
                                        onUploadClick={(fileList) => setSelectedFiles(fileList)}
                                        onLibraryClick={onOpenAssetChooser}
                                    />
                                </div>
                            )}
                        </div>
                    </Flyout>
                </div>
            )}
        </>
    );
};
