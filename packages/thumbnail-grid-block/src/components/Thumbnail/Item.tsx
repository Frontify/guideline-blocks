/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSortable } from '@dnd-kit/sortable';
import {
    AssetChooserObjectType,
    FileExtensionSets,
    closeAssetChooser,
    openAssetChooser,
    useAssetUpload,
    useFileInput,
} from '@frontify/app-bridge';
import { merge } from '@frontify/fondue/rte';
import {
    IconArrowCircleUp,
    IconArrowMove,
    IconImageStack,
    IconSpeechBubbleQuote,
    IconTrashBin,
} from '@frontify/fondue/icons';
import { BlockItemWrapper } from '@frontify/guideline-blocks-settings';
import { EditAltTextFlyout } from '@frontify/guideline-blocks-shared';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { type SortableThumbnailItemProps, type Thumbnail, type ThumbnailItemProps } from '../../types';

import { Image } from './Image';
import { RichTextEditors } from './RichTextEditors';

export const Item = forwardRef<HTMLDivElement, ThumbnailItemProps>(
    (
        {
            appBridge,
            item,
            image,
            isEditing,
            transformStyle = {},
            draggableProps = {},
            setActivatorNodeRef,
            isDragging = false,
            updateItem,
            onRemoveItem,
            showGrabHandle,
            showDeleteButton,
            thumbnailStyles,
            isLoading,
            onFilesSelected,
            onFilesUploaded,
            onAssetsSelected,
            replaceWithPlaceholder = false,
            isAssetViewerEnabled = false,
            openAssetInAssetViewer,
        },
        ref
    ) => {
        const [showAltTextMenu, setShowAltTextMenu] = useState(false);
        const { id, title, description, altText } = item;
        const [localAltText, setLocalAltText] = useState<string | undefined>(altText);
        const [openFileDialog, { selectedFiles }] = useFileInput({ accept: 'image/*', multiple: true });
        const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload();

        const onOpenAssetChooser = () => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            appBridge.dispatch(
                openAssetChooser({
                    multiSelection: true,
                    selectedValueId: image?.id,
                    objectTypes: [AssetChooserObjectType.ImageVideo],
                    extensions: FileExtensionSets.Images,
                })
            );
            const unsusbcribe = appBridge.subscribe('assetsChosen', ({ assets }) => {
                onAssetsSelected(assets, id);
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                appBridge.dispatch(closeAssetChooser());
                unsusbcribe();
            });
        };

        useEffect(() => {
            if (selectedFiles) {
                onFilesSelected(selectedFiles, id);
                uploadFile(selectedFiles);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [selectedFiles]);

        useEffect(() => {
            setLocalAltText(altText);
        }, [altText]);

        useEffect(() => {
            if (doneAll) {
                onFilesUploaded(uploadResults, id);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [doneAll, uploadResults]);

        const updateRTEItem = useCallback(
            (key: keyof Thumbnail, value: string) => updateItem({ ...item, [key]: value }),
            [item, updateItem]
        );

        return (
            <div
                key={id}
                ref={ref}
                style={{ ...transformStyle, ...(!isDragging ? { zIndex: undefined } : {}) }}
                className={merge([
                    !isEditing && !image && 'tw-hidden',
                    'tw-w-full tw-h-full',
                    isDragging && 'tw-bg-base',
                ])}
            >
                <BlockItemWrapper
                    isDragging={isDragging}
                    shouldFillContainer
                    shouldHideWrapper={replaceWithPlaceholder || !isEditing}
                    shouldHideComponent={replaceWithPlaceholder}
                    shouldBeShown={showAltTextMenu || isDragging}
                    toolbarItems={[
                        showGrabHandle
                            ? {
                                  type: 'dragHandle',
                                  icon: <IconArrowMove size={16} />,
                                  draggableProps,
                                  setActivatorNodeRef,
                              }
                            : undefined,
                        showDeleteButton
                            ? {
                                  type: 'button',
                                  icon: <IconTrashBin size={16} />,
                                  tooltip: 'Delete Item',
                                  onClick: () => onRemoveItem(id),
                              }
                            : undefined,
                        {
                            type: 'menu',
                            items: [
                                image
                                    ? [
                                          {
                                              title: 'Set alt text',
                                              onClick: () => setShowAltTextMenu(true),
                                              icon: <IconSpeechBubbleQuote size={20} />,
                                          },
                                      ]
                                    : [],
                                [
                                    {
                                        title: image ? 'Replace with upload' : 'Upload asset',
                                        icon: <IconArrowCircleUp size={20} />,
                                        onClick: openFileDialog,
                                    },
                                    {
                                        title: image ? 'Replace with asset' : 'Browse asset',
                                        icon: <IconImageStack size={20} />,
                                        onClick: onOpenAssetChooser,
                                    },
                                ],
                            ].filter((item) => item.length > 0),
                        },
                    ]}
                >
                    <div className={thumbnailStyles.captionPositionClassNames} data-test-id="thumbnail-item">
                        <EditAltTextFlyout
                            setShowAltTextMenu={setShowAltTextMenu}
                            showAltTextMenu={showAltTextMenu}
                            setLocalAltText={setLocalAltText}
                            defaultAltText={altText}
                            onSave={() => updateItem({ ...item, altText: localAltText || '' })}
                            localAltText={localAltText}
                        />
                        <Image
                            id={id}
                            image={image}
                            isLoading={isLoading}
                            isEditing={isEditing}
                            isAssetViewerEnabled={isAssetViewerEnabled}
                            thumbnailStyles={thumbnailStyles}
                            altText={altText}
                            onOpenFileDialog={openFileDialog}
                            onFilesDrop={(fileList) => onFilesSelected(fileList, id)}
                            onAssetChooserClick={onOpenAssetChooser}
                            openAssetInAssetViewer={openAssetInAssetViewer}
                        />
                        {(image || isEditing) && (
                            <RichTextEditors
                                id={id}
                                title={title}
                                isEditing={isEditing}
                                description={description}
                                updateItem={updateRTEItem}
                                appBridge={appBridge}
                            />
                        )}
                    </div>
                </BlockItemWrapper>
                <div
                    className={merge([
                        !replaceWithPlaceholder && 'tw-hidden',
                        'tw-absolute tw-left-0 tw-top-0 tw-border-2 tw-border-box-selected-strong tw-border-dashed tw-rounded tw-bg-box-selected-hover tw-h-full tw-w-full',
                    ])}
                />
            </div>
        );
    }
);

Item.displayName = 'Item';

export const SortableItem = (props: SortableThumbnailItemProps) => {
    const { item, isEditing } = props;
    const { id } = item;
    const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
        id,
    });
    const transformStyle = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
        transition,
        zIndex: isDragging ? 2 : 1,
    };
    const draggableProps = isEditing ? { ...attributes, ...listeners } : {};

    return (
        <Item
            ref={setNodeRef}
            {...props}
            isDragging={isDragging}
            setActivatorNodeRef={setActivatorNodeRef}
            replaceWithPlaceholder={isDragging}
            transformStyle={transformStyle}
            draggableProps={draggableProps}
        />
    );
};
