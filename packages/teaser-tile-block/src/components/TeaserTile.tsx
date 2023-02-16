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
import { Link, TeaserTileProps, TileDisplay, TileType } from '../types';
import { TeaserTileToolbar } from './TeaserTileToolbar';
import { TileSettingsFlyout } from './TileSettingsFlyout';
import { getImageSrc } from '../utils';

const TeaserTilePlaceholder = ({ style }: { style: CSSProperties }) => (
    <div
        className="tw-border-2 tw-border-dashed tw-border-box-selected-strong tw-bg-box-selected tw-w-full tw-h-full tw-absolute tw-top-0 tw-left-0"
        style={style}
    />
);

export const TeaserTile = forwardRef<HTMLDivElement, TeaserTileProps>(
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
            replaceWithPlaceholder,
            isDragPreview,
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
            !!isDragPreview,
            !!replaceWithPlaceholder
        );

        useEffect(() => {
            // Mouseout event is not called when drag is cancelled so toolbar needs to be manually unfocused
            setToolbarFocus(false);
        }, [replaceWithPlaceholder]);

        const tileFlyoutProps = {
            link: tileSettings.link ?? null,
            display: tileSettings.display ?? blockSettings.display ?? null,
            height,
            type,
            asset: tileAsset,
            backgroundColor: tileSettings.backgroundColor ?? blockSettings.backgroundColor ?? null,
            onLinkChange: (link: Link) => onTileSettingsChange(id, { link }),
            isBackgroundVisible: tileSettings.isBackgroundVisible ?? blockSettings.isBackgroundVisible,
            onDisplayChange: (display: TileDisplay) => onTileSettingsChange(id, { display }),
            isAssetLoading,
            onBackgroundColorChange: (backgroundColor: Color) => onTileSettingsChange(id, { backgroundColor }),
            onReplaceAssetFromUpload: openFileDialog,
            onUploadFile: uploadFile,
            onBackgroundVisibilityChange: (isBackgroundVisible: boolean) =>
                onTileSettingsChange(id, { isBackgroundVisible }),
            onReplaceAssetFromWorkspace: onOpenAssetChooser,
            palettes: palettes ?? [],
            disabled: !isEditing,
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
                    readonly={!isEditing}
                    border={false}
                    designTokens={designTokens ?? undefined}
                    value={tileSettings.description ?? undefined}
                    placeholder="Add a description"
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
            >
                {replaceWithPlaceholder && <TeaserTilePlaceholder style={dragPreview.style} />}
                {isEditing && !replaceWithPlaceholder && (
                    <TeaserTileToolbar
                        draggableProps={draggableProps}
                        onRemoveSelf={() => onRemoveTile(id)}
                        tileSettingsFlyoutProps={tileFlyoutProps}
                        onToolbarBlur={() => setToolbarFocus(false)}
                        onToolbarFocus={() => setToolbarFocus(true)}
                        isToolbarFocused={isToolbarFocused}
                        isDragging={isDragPreview}
                    />
                )}
                {tileSettings.link?.href && !isEditing && (
                    <a
                        className={link.className}
                        aria-label={`Navigate to ${tileSettings.link.href}`}
                        href={tileSettings.link.href}
                        target={tileSettings.link.target}
                        style={link.style}
                    />
                )}
                <div style={tile.style} className={tile.className}>
                    {type !== TileType.Text && (
                        <>
                            {tileAsset?.genericUrl ? (
                                <div className={imageWrapper.className}>
                                    <img className={image.className} src={getImageSrc(tileAsset)} style={image.style} />
                                </div>
                            ) : (
                                <TileSettingsFlyout
                                    {...tileFlyoutProps}
                                    placement={FlyoutPlacement.Bottom}
                                    type={type}
                                    isOpen={isPlaceholderImageFlyoutOpen}
                                    setIsOpen={setIsPlaceholderImageFlyoutOpen}
                                >
                                    {(props, triggerRef: MutableRefObject<HTMLDivElement>) => (
                                        <div
                                            {...props}
                                            aria-label={
                                                isPlaceholderImageFlyoutOpen
                                                    ? 'Close tile settings'
                                                    : 'Open tile settings'
                                            }
                                            className={imagePlaceholder.className}
                                            style={{ minHeight: height }}
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
                        <div style={textWrapper.style} className={textWrapper.className}>
                            <h6 className="tw-text-lg tw-font-semibold">{titleRichTextEditor}</h6>
                            <p className="tw-text-sm tw-font-normal">{descriptionRichTextEditor}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

TeaserTile.displayName = 'TeaserTile';
