/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import {
    Flyout,
    FlyoutPlacement,
    FormControl,
    HelperPosition,
    IconArrowCircleUp20,
    IconArrowMove16,
    IconImageStack20,
    IconSpeechBubbleQuote,
    IconTrashBin16,
    TextInput,
    merge,
} from '@frontify/fondue';
import { BlockItemWrapper } from '@frontify/guideline-blocks-shared';
import { Image } from './Image';
import { RichTextEditors } from './RichTextEditors';
import { ThumbnailItemProps } from '../../types';

export const Item = ({
    isEditing,
    onRemoveAsset,
    showGrabHandle,
    image,
    thumbnailStyles,
    updateItemWith,
    item,
    onFilesDrop,
    openFileDialog,
    openAssetChooser,
    setUploadedId,
    isLoading,
}: ThumbnailItemProps) => {
    const [showAltTextMenu, setShowAltTextMenu] = useState(false);
    const { id, title, description, altText } = item;
    const defaultAltText = altText ?? image?.title ?? image?.fileName ?? '';
    const [localAltText, setLocalAltText] = useState<string>('');

    const onOpenFileDialog = () => {
        setUploadedId(id);
        openFileDialog();
    };
    const onAssetChooserClick = () => openAssetChooser(id);

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
    });
    const transformStyle = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
        transition,
        zIndex: isDragging ? 2 : 1,
    };
    const draggableProps = isEditing ? { ...attributes, ...listeners } : {};

    return (
        <div
            key={id}
            ref={setNodeRef}
            style={{ ...transformStyle, ...(!isDragging ? { zIndex: undefined } : {}) }}
            className="tw-w-full tw-h-full tw-bg-white"
        >
            <BlockItemWrapper
                shouldHideWrapper={isDragging || !isEditing}
                shouldHideComponent={isDragging}
                isDragging={isDragging}
                shouldFillContainer={true}
                toolbarFlyoutItems={[
                    image
                        ? [
                              {
                                  title: 'Set alt text',
                                  onClick: () => setShowAltTextMenu(true),
                                  icon: <IconSpeechBubbleQuote />,
                              },
                          ]
                        : [],
                    [
                        {
                            title: 'Replace image with upload',
                            icon: <IconArrowCircleUp20 />,
                            onClick: onOpenFileDialog,
                        },
                        {
                            title: 'Replace image with asset',
                            icon: <IconImageStack20 />,
                            onClick: onAssetChooserClick,
                        },
                    ],
                ].filter((item) => item.length > 0)}
                toolbarItems={[
                    showGrabHandle
                        ? {
                              onClick: () => console.log('todo: handle drag (wait for shared component)'),
                              icon: <IconArrowMove16 />,
                              tooltip: 'Drag to move',
                              draggableProps,
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
                    <Image
                        id={id}
                        image={image}
                        isLoading={isLoading}
                        isEditing={isEditing}
                        thumbnailStyles={thumbnailStyles}
                        defaultAltText={defaultAltText}
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
                        />
                    )}
                </div>
            </BlockItemWrapper>
            <div
                className={merge([
                    !isDragging && 'tw-hidden',
                    'tw-absolute tw-left-0 tw-top-0 tw-border-2 tw-border-box-selected-strong tw-border-dashed tw-rounded tw-bg-box-selected-hover tw-h-full tw-w-full',
                ])}
            />
            <Flyout
                isTriggerDisabled
                trigger={<></>}
                onOpenChange={setShowAltTextMenu}
                fitContent
                hug={false}
                isOpen={showAltTextMenu}
                placement={FlyoutPlacement.Right}
                onConfirm={() => {
                    updateItemWith('altText', localAltText, id);
                    setShowAltTextMenu(false);
                }}
                onCancel={() => {
                    setLocalAltText(defaultAltText);
                    setShowAltTextMenu(false);
                }}
            >
                <div className="tw-flex tw-flex-col tw-gap-y-8 tw-p-8 tw-max-w-[20rem]">
                    <FormControl
                        label={{
                            children: 'Alt text',
                            htmlFor: 'alt-text-input',
                        }}
                        helper={{
                            text: 'The best alt text describes the most relevant content of the image.',
                            position: HelperPosition.After,
                        }}
                    >
                        <TextInput
                            value={localAltText || defaultAltText}
                            onChange={setLocalAltText}
                            id="alt-text-input"
                            placeholder="Enter alt text"
                        />
                    </FormControl>
                </div>
            </Flyout>
        </div>
    );
};
