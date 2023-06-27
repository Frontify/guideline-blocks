/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import {
    IconArrowCircleUp20,
    IconArrowMove16,
    IconImageStack20,
    IconSpeechBubbleQuote20,
    IconTrashBin16,
    merge,
} from '@frontify/fondue';
import { BlockItemWrapper, EditAltTextFlyout } from '@frontify/guideline-blocks-shared';
import { Image } from './Image';
import { RichTextEditors } from './RichTextEditors';
import { SortableThumbnailItemProps, ThumbnailItemProps } from '../../types';

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
            setUploadedId,
            openAssetChooser,
            openFileDialog,
            updateItemWith,
            onRemoveAsset,
            showGrabHandle,
            thumbnailStyles,
            isLoading,
            onFilesDrop,
            replaceWithPlaceholder = false,
        },
        ref
    ) => {
        const [showAltTextMenu, setShowAltTextMenu] = useState(false);
        const { id, title, description, altText } = item;
        const [localAltText, setLocalAltText] = useState<string | undefined>(altText);

        const onOpenFileDialog = () => {
            setUploadedId(id);
            openFileDialog();
        };
        const onAssetChooserClick = () => openAssetChooser(id);

        return (
            <div
                key={id}
                ref={ref}
                style={{ ...transformStyle, ...(!isDragging ? { zIndex: undefined } : {}) }}
                className={merge([!isEditing && !image && 'tw-hidden', 'tw-w-full tw-h-full tw-bg-white'])}
            >
                <BlockItemWrapper
                    isDragging={isDragging}
                    shouldFillContainer={true}
                    shouldHideWrapper={replaceWithPlaceholder || !isEditing}
                    shouldHideComponent={replaceWithPlaceholder}
                    shouldBeShown={showAltTextMenu || isDragging}
                    toolbarFlyoutItems={[
                        image
                            ? [
                                  {
                                      title: 'Set alt text',
                                      onClick: () => setShowAltTextMenu(true),
                                      icon: <IconSpeechBubbleQuote20 />,
                                  },
                              ]
                            : [],
                        [
                            {
                                title: 'Replace with upload',
                                icon: <IconArrowCircleUp20 />,
                                onClick: onOpenFileDialog,
                            },
                            {
                                title: 'Replace with asset',
                                icon: <IconImageStack20 />,
                                onClick: onAssetChooserClick,
                            },
                        ],
                    ].filter((item) => item.length > 0)}
                    toolbarItems={[
                        showGrabHandle
                            ? {
                                  icon: <IconArrowMove16 />,
                                  tooltip: 'Drag or press ↵ to move',
                                  draggingTooltip: 'Move with ↑↓←→ and confirm with ↵',
                                  draggableProps,
                                  setActivatorNodeRef,
                              }
                            : undefined,
                        {
                            icon: <IconTrashBin16 />,
                            tooltip: 'Delete Item',
                            onClick: () => onRemoveAsset(id, image?.id),
                        },
                    ]}
                >
                    <div className={thumbnailStyles.captionPositionClassNames} data-test-id="thumbnail-item">
                        <EditAltTextFlyout
                            setShowAltTextMenu={setShowAltTextMenu}
                            showAltTextMenu={showAltTextMenu}
                            setLocalAltText={setLocalAltText}
                            defaultAltText={altText}
                            onSave={() => updateItemWith('altText', localAltText ?? '', id)}
                            localAltText={localAltText}
                        />
                        <Image
                            id={id}
                            image={image}
                            isLoading={isLoading}
                            isEditing={isEditing}
                            thumbnailStyles={thumbnailStyles}
                            altText={altText}
                            onOpenFileDialog={onOpenFileDialog}
                            onFilesDrop={onFilesDrop}
                            onAssetChooserClick={onAssetChooserClick}
                        />
                        {(image || isEditing) && (
                            <RichTextEditors
                                id={id}
                                title={title}
                                isEditing={isEditing}
                                description={description}
                                updateItemWith={updateItemWith}
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
