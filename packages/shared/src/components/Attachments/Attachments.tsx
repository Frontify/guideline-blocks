/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
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
import { useEffect, useState } from 'react';
import { useGuidelineDesignTokens } from '../../hooks';
import { AttachmentItem, SortableAttachmentItem } from './AttachmentItem';
import { AttachmentsProps } from './types';

export const Attachments = ({
    attachmentItems,
    onAttachmentDelete,
    onAttachmentReplaceWithBrowse,
    onAttachmentReplaceWithUpload,
    onBrowseAttachments,
    onUploadAttachments,
    onAttachmentsSorted,
    appBridge,
}: AttachmentsProps) => {
    const [internalItems, setInternalItems] = useState<Asset[] | undefined>(attachmentItems || []);
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
    const sensors = useSensors(useSensor(PointerSensor));
    const [draggedAssetId, setDraggedAssetId] = useState<number | undefined>(undefined);
    const { designTokens } = useGuidelineDesignTokens();
    const [isUploadLoading, setIsUploadLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const isEditing = useEditorState(appBridge);

    const draggedAttachment = internalItems?.find((item) => item.id === draggedAssetId);

    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isUploadLoading && setIsUploadLoading(true),
    });

    useEffect(() => {
        setInternalItems(attachmentItems);
    }, [attachmentItems]);

    useEffect(() => {
        if (selectedFiles) {
            setIsUploadLoading(true);
            uploadFile(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (doneAll) {
            onUploadAttachments(uploadResults);
            setIsUploadLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    const onOpenAssetChooser = () => {
        setIsFlyoutOpen(false);
        appBridge.openAssetChooser(
            (result: Asset[]) => {
                onBrowseAttachments(result);
                appBridge.closeAssetChooser();
            },
            {
                multiSelection: true,
            }
        );
    };

    const onReplaceAttachmentWithBrowse = (attachmentToReplace: Asset) => {
        setIsFlyoutOpen(false);
        appBridge.openAssetChooser(
            (result: Asset[]) => {
                onAttachmentReplaceWithBrowse(attachmentToReplace, result[0]);
                appBridge.closeAssetChooser();
            },
            {
                multiSelection: false,
            }
        );
    };

    const onReplaceAttachmentWithUpload = (attachmentToReplace: Asset, uploadedAsset: Asset) => {
        onAttachmentReplaceWithUpload(attachmentToReplace, uploadedAsset);
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
            onAttachmentsSorted(sortedItems);
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
                                <div>{(attachmentItems?.length || 0) > 0 ? attachmentItems?.length : 'Add'}</div>
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
                                            {(internalItems || []).map((attachmentItem) => (
                                                <SortableAttachmentItem
                                                    isEditing={isEditing}
                                                    designTokens={designTokens}
                                                    key={attachmentItem.id}
                                                    item={attachmentItem}
                                                    onAttachmentDelete={() => onAttachmentDelete(attachmentItem)}
                                                    onAttachmentReplaceWithBrowse={() =>
                                                        onReplaceAttachmentWithBrowse(attachmentItem)
                                                    }
                                                    onAttachmentReplaceWithUpload={(uploadedAsset: Asset) =>
                                                        onReplaceAttachmentWithUpload(attachmentItem, uploadedAsset)
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </SortableContext>
                                    <DragOverlay>
                                        {draggedAttachment ? (
                                            <AttachmentItem
                                                isOverlay={true}
                                                isEditing={isEditing}
                                                key={draggedAssetId}
                                                designTokens={designTokens}
                                                item={draggedAttachment}
                                                isDragging={true}
                                                onAttachmentDelete={() => onAttachmentDelete(draggedAttachment)}
                                                onAttachmentReplaceWithBrowse={() =>
                                                    onReplaceAttachmentWithBrowse(draggedAttachment)
                                                }
                                                onAttachmentReplaceWithUpload={(uploadedAsset: Asset) =>
                                                    onReplaceAttachmentWithUpload(draggedAttachment, uploadedAsset)
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
