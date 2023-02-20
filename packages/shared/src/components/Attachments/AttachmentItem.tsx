/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Asset, useAssetUpload, useFileInput } from '@frontify/app-bridge';
import { useSortable } from '@dnd-kit/sortable';
import {
    ActionMenu,
    Button,
    ButtonEmphasis,
    Flyout,
    FlyoutPlacement,
    IconArrowCircleUp20,
    IconDocument24,
    IconGrabHandle20,
    IconImage24,
    IconImageStack20,
    IconMusicNote24,
    IconPen20,
    IconPlayFrame24,
    IconTrashBin20,
    MenuItemContentSize,
    MenuItemStyle,
} from '@frontify/fondue';
import { forwardRef, useEffect, useState } from 'react';
import { AttachmentItemProps, SortableAttachmentItemProps } from './types';

const getDecorator = (type: string) => {
    if (type === 'IMAGE') {
        return <IconImage24 />;
    } else if (type === 'VIDEO') {
        return <IconPlayFrame24 />;
    } else if (type === 'AUDIO') {
        return <IconMusicNote24 />;
    } else {
        return <IconDocument24 />;
    }
};

export const AttachmentItem = forwardRef<HTMLDivElement, AttachmentItemProps>(
    (
        {
            item,
            isEditing,
            designTokens,
            draggableProps,
            transformStyle,
            isDragging,
            onAttachmentDelete,
            onAttachmentReplaceWithBrowse,
            onAttachmentReplaceWithUpload,
        },
        ref
    ) => {
        const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>();
        const [openFileDialog, { selectedFiles }] = useFileInput({ multiple: true, accept: 'image/*' });
        const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload();

        useEffect(() => {
            if (selectedFiles) {
                uploadFile(selectedFiles[0]);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [selectedFiles]);

        useEffect(() => {
            if (doneAll) {
                onAttachmentReplaceWithUpload(uploadResults[0]);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [doneAll, uploadResults]);

        const downloadAttachment = (attachmentUrl: string, filename: string) => {
            fetch(attachmentUrl).then((response) => {
                response.blob().then((blob) => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    a.click();
                });
            });
        };

        return (
            <div
                data-test-id="attachments-item"
                onClick={() => downloadAttachment(item.genericUrl, item.fileName)}
                ref={ref}
                style={{ ...transformStyle, opacity: isDragging ? 0.3 : 1, fontFamily: designTokens?.p?.fontFamily }}
                className="tw-cursor-pointer tw-relative tw-flex tw-gap-3 tw-px-5 tw-py-3 tw-items-center tw-group hover:tw-bg-box-neutral-hover"
            >
                <div className="tw-text-text-weak group-hover:tw-text-box-neutral-inverse-hover">
                    {getDecorator(item.objectType)}
                </div>
                <div className="tw-text-s tw-flex-1 tw-min-w-0">
                    <div className="tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis tw-font-bold tw-text-text-weak group-hover:tw-text-box-neutral-inverse-hover">
                        {item.title}
                    </div>
                    <div className="tw-text-text-weak">{`${item.fileSizeHumanReadable} - ${item.extension}`}</div>
                </div>
                {isEditing && (
                    <div
                        data-test-id="attachments-actionbar"
                        className="tw-flex tw-gap-[2px] tw-invisible group-hover:tw-visible"
                    >
                        <div {...draggableProps}>
                            <button className="tw-bg-button-background tw-border-button-border hover:tw-bg-button-background-hover active:tw-bg-button-background-pressed tw-group tw-border tw-box-box tw-relative tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-outline-none tw-font-medium tw-rounded tw-h-9 tw-w-9 ">
                                <IconGrabHandle20 />
                            </button>
                        </div>
                        <div className="-tw-mx-3">
                            <Flyout
                                placement={FlyoutPlacement.Right}
                                isOpen={selectedAsset?.id === item.id}
                                fitContent
                                legacyFooter={false}
                                onOpenChange={(isOpen) => setSelectedAsset(isOpen ? item : undefined)}
                                trigger={
                                    <Button
                                        icon={<IconPen20 />}
                                        emphasis={ButtonEmphasis.Default}
                                        onClick={() => setSelectedAsset(item)}
                                    />
                                }
                            >
                                <ActionMenu
                                    menuBlocks={[
                                        {
                                            id: 'menu',
                                            menuItems: [
                                                {
                                                    id: 'upload',
                                                    size: MenuItemContentSize.XSmall,
                                                    title: 'Replace with upload',
                                                    onClick: () => {
                                                        openFileDialog();
                                                        setSelectedAsset(undefined);
                                                    },

                                                    initialValue: true,
                                                    decorator: (
                                                        <div className="tw-mr-2">
                                                            <IconArrowCircleUp20 />
                                                        </div>
                                                    ),
                                                },

                                                {
                                                    id: 'asset',
                                                    size: MenuItemContentSize.XSmall,
                                                    title: 'Replace with asset',
                                                    onClick: () => {
                                                        onAttachmentReplaceWithBrowse();
                                                        setSelectedAsset(undefined);
                                                    },
                                                    initialValue: true,
                                                    decorator: (
                                                        <div className="tw-mr-2">
                                                            <IconImageStack20 />
                                                        </div>
                                                    ),
                                                },
                                            ],
                                        },
                                        {
                                            id: 'menu-delete',
                                            menuItems: [
                                                {
                                                    id: 'delete',
                                                    size: MenuItemContentSize.XSmall,
                                                    title: 'Delete',
                                                    style: MenuItemStyle.Danger,
                                                    onClick: () => {
                                                        onAttachmentDelete();
                                                        setSelectedAsset(undefined);
                                                    },

                                                    initialValue: true,
                                                    decorator: (
                                                        <div className="tw-mr-2">
                                                            <IconTrashBin20 />
                                                        </div>
                                                    ),
                                                },
                                            ],
                                        },
                                    ]}
                                />
                            </Flyout>
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

AttachmentItem.displayName = 'AttachmentItem';

export const SortableAttachmentItem = (props: SortableAttachmentItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: props.item.id,
    });

    const transformStyle = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
        transition,
        zIndex: isDragging ? 2 : 1,
    };

    const draggableProps = { ...attributes, ...listeners };

    return (
        <AttachmentItem
            ref={setNodeRef}
            isDragging={isDragging}
            transformStyle={transformStyle}
            draggableProps={draggableProps}
            {...props}
        />
    );
};
