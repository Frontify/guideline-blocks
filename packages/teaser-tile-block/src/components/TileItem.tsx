/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties, MutableRefObject, forwardRef, useEffect, useMemo, useState } from 'react';

import {
    Color,
    FlyoutPlacement,
    IconHeartCircle32,
    IconPlus32,
    LoadingCircle,
    RichTextEditor,
    merge,
} from '@frontify/fondue';

import { useTileAsset, useTileStyles } from '../hooks';
import {
    BaseFlyoutProps,
    ImageFlyoutProps,
    ImageTextFlyoutProps,
    Link,
    TextFlyoutProps,
    TileDisplay,
    TileItemProps,
    TileType,
} from '../types';
import { TileSettingsFlyout } from './TileSettingsFlyout';
import { getImageSrc } from '../utils';
import { TileToolbar } from './TileToolbar';

type TileFlyoutVariantProps = {
    [TileType.Text]: Omit<TextFlyoutProps, 'children'>;
    [TileType.Image]: Omit<ImageFlyoutProps, 'children'>;
    [TileType.ImageText]: Omit<ImageTextFlyoutProps, 'children'>;
};

const TilePlaceholder = ({ style }: { style: CSSProperties }) => (
    <div
        className="tw-border-2 tw-border-dashed tw-border-box-selected-strong tw-bg-box-selected tw-w-full tw-h-full tw-absolute tw-top-0 tw-left-0"
        style={style}
        data-test-id="tile-placeholder"
    />
);

export const TileItem = forwardRef<HTMLDivElement, TileItemProps>(
    (
        {
            id,
            blockSettings,
            onTileSettingsChange,
            tileSettings,
            appBridge,
            onRemoveTile,
            isEditing,
            transformStyle,
            draggableProps,
            palettes,
            replaceWithPlaceholder = false,
            isDragPreview = false,
            blockAssets,
            updateAssetIdsFromKey,
            designTokens,
        },
        ref
    ) => {
        const { tileAsset, isAssetLoading, uploadFile, onOpenAssetChooser, openFileDialog } = useTileAsset(
            appBridge,
            id,
            blockAssets,
            updateAssetIdsFromKey
        );
        const { type } = blockSettings;

        const [isPlaceholderImageFlyoutOpen, setIsPlaceholderImageFlyoutOpen] = useState(false);
        const [isToolbarFocused, setToolbarFocus] = useState(false);

        const { height, textWrapper, tile, imageWrapper, image, imagePlaceholder, link, dragPreview } = useTileStyles(
            blockSettings,
            tileSettings,
            isEditing,
            isToolbarFocused,
            isDragPreview,
            replaceWithPlaceholder
        );

        useEffect(() => {
            // Mouseout event is not called when drag is cancelled so toolbar needs to be manually unfocused
            setToolbarFocus(false);
        }, [replaceWithPlaceholder]);

        const tileFlyoutBaseProps: Omit<BaseFlyoutProps, 'children'> = {
            height,
            disabled: !isEditing,
            palettes: palettes ?? [],
            link: tileSettings.link ?? null,
            placement: FlyoutPlacement.Bottom,
            isOpen: isPlaceholderImageFlyoutOpen,
            setIsOpen: setIsPlaceholderImageFlyoutOpen,
            display: tileSettings.display ?? blockSettings.display ?? null,
            onBackgroundVisibilityChange: (isBackgroundVisible: boolean) =>
                onTileSettingsChange(id, { isBackgroundVisible }),
            onLinkChange: (link: Link) => onTileSettingsChange(id, { link }),
            backgroundColor: tileSettings.backgroundColor ?? blockSettings.backgroundColor ?? null,
            isBackgroundVisible: tileSettings.isBackgroundVisible ?? blockSettings.isBackgroundVisible,
            onBackgroundColorChange: (backgroundColor: Color) => onTileSettingsChange(id, { backgroundColor }),
        };

        const tileFlyoutVariantProps: TileFlyoutVariantProps = {
            [TileType.Image]: {
                ...tileFlyoutBaseProps,
                isAssetLoading,
                asset: tileAsset,
                type: TileType.Image,
                onUploadFile: uploadFile,
                onReplaceAssetFromUpload: openFileDialog,
                onReplaceAssetFromWorkspace: onOpenAssetChooser,
                onDisplayChange: (display: TileDisplay) => onTileSettingsChange(id, { display }),
            },
            [TileType.Text]: {
                ...tileFlyoutBaseProps,
                type: TileType.Text,
            },
            [TileType.ImageText]: {
                ...tileFlyoutBaseProps,
                isAssetLoading,
                asset: tileAsset,
                type: TileType.ImageText,
                onUploadFile: uploadFile,
                onReplaceAssetFromUpload: openFileDialog,
                onReplaceAssetFromWorkspace: onOpenAssetChooser,
                onDisplayChange: (display: TileDisplay) => onTileSettingsChange(id, { display }),
            },
        };

        const titleRichTextEditor = useMemo(
            () => (
                <RichTextEditor
                    readonly={!isEditing}
                    border={false}
                    designTokens={designTokens ?? undefined}
                    value={tileSettings.title ?? undefined}
                    placeholder="Teaser Title"
                    onBlur={(title) => onTileSettingsChange(id, { title })}
                />
            ),
            [designTokens, isEditing, tileSettings.title, onTileSettingsChange, id]
        );
        const descriptionRichTextEditor = useMemo(
            () => (
                <RichTextEditor
                    border={false}
                    readonly={!isEditing}
                    placeholder="Add a description"
                    designTokens={designTokens ?? undefined}
                    value={tileSettings.description ?? undefined}
                    onBlur={(description) => onTileSettingsChange(id, { description })}
                />
            ),
            [designTokens, isEditing, tileSettings.description, onTileSettingsChange, id]
        );

        return (
            <div
                className={merge(['tw-relative tw-group tw-min-w-0', isDragPreview && 'tw-pointer-events-none'])}
                ref={ref}
                style={{ ...transformStyle }}
                data-test-id="teaser-tile"
            >
                {replaceWithPlaceholder && <TilePlaceholder style={dragPreview.style} />}
                {isEditing && !replaceWithPlaceholder && (
                    <TileToolbar
                        type={type}
                        isDragging={isDragPreview}
                        draggableProps={draggableProps}
                        isToolbarFocused={isToolbarFocused}
                        onRemoveSelf={() => onRemoveTile(id)}
                        onToolbarBlur={() => setToolbarFocus(false)}
                        onToolbarFocus={() => setToolbarFocus(true)}
                        tileSettingsFlyoutProps={tileFlyoutVariantProps}
                    />
                )}
                {tileSettings.link?.href && !isEditing && (
                    <a
                        className={link.className}
                        aria-label={`Navigate to ${tileSettings.link.href}`}
                        href={tileSettings.link.href}
                        target={tileSettings.link.target}
                        style={link.style}
                        data-test-id="tile-link"
                    />
                )}
                <div style={tile.style} className={tile.className} data-test-id="tile-content">
                    {type !== TileType.Text && (
                        <>
                            {tileAsset?.genericUrl ? (
                                <div className={imageWrapper.className}>
                                    <img
                                        className={image.className}
                                        src={getImageSrc(tileAsset)}
                                        style={image.style}
                                        data-test-id="tile-image"
                                    />
                                </div>
                            ) : (
                                <TileSettingsFlyout {...tileFlyoutVariantProps[type]}>
                                    {(props, triggerRef: MutableRefObject<HTMLDivElement>) => (
                                        <div
                                            {...(isEditing
                                                ? {
                                                      ...props,
                                                      'aria-label': isPlaceholderImageFlyoutOpen
                                                          ? 'Close tile settings'
                                                          : 'Open tile settings',
                                                  }
                                                : {})}
                                            className={imagePlaceholder.className}
                                            style={{ minHeight: height }}
                                            data-test-id="tile-image-flyout-trigger"
                                        >
                                            <div ref={triggerRef}>
                                                {isEditing && isAssetLoading && <LoadingCircle />}
                                                {isEditing && !isAssetLoading && <IconPlus32 />}
                                                {!isEditing && <IconHeartCircle32 />}
                                            </div>
                                        </div>
                                    )}
                                </TileSettingsFlyout>
                            )}
                        </>
                    )}
                    {type !== TileType.Image && (
                        <div style={textWrapper.style} className={textWrapper.className} data-test-id="tile-text">
                            <h6 className="tw-text-lg tw-font-semibold" data-test-id="tile-title">
                                {titleRichTextEditor}
                            </h6>
                            <p className="tw-text-sm tw-font-normal">{descriptionRichTextEditor}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

TileItem.displayName = 'TileItem';
