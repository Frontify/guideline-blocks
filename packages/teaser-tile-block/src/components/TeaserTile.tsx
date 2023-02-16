/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject, forwardRef, useEffect, useMemo, useState } from 'react';

import {
    Color,
    FOCUS_VISIBLE_STYLE,
    FlyoutPlacement,
    IconHeartCircle32,
    IconPlus32,
    LoadingCircle,
    RichTextEditor,
    merge,
} from '@frontify/fondue';

import { useTileAsset, useTileStyles } from '../hooks';
import { Link, TeaserTileProps, TileDisplay, TileImagePositioning, TileType } from '../types';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { twBorderMap, twPositioningMap, twVerticalAlignmentMap } from '../helpers';
import { TeaserTileToolbar } from './TeaserTileToolbar';
import { TileSettingsFlyout } from './TileSettingsFlyout';

const TeaserTilePlaceholder = ({ borderRadius }: { borderRadius: string }) => (
    <div
        className="tw-border-2 tw-border-dashed tw-border-box-selected-strong tw-bg-box-selected tw-w-full tw-h-full tw-absolute tw-top-0 tw-left-0"
        style={{ borderRadius }}
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
        },
        ref
    ) => {
        const { tileAsset, isAssetLoading, uploadFile, onOpenAssetChooser, openFileDialog } = useTileAsset(
            appBridge,
            id,
            blockAssets,
            updateAssetIdsFromKey
        );
        const { positioning, type } = blockSettings;
        const [isPlaceholderImageFlyoutOpen, setIsPlaceholderImageFlyoutOpen] = useState(false);
        const { designTokens } = useGuidelineDesignTokens();
        const [toolbarFocus, setToolbarFocus] = useState(false);

        const { height, background, objectFit, padding, textAlign, border, borderRadius } = useTileStyles(
            blockSettings,
            tileSettings
        );

        useEffect(() => {
            // Mouseout event is not called when drag is cancelled so toolbar needs to be manually unfocused
            setToolbarFocus(false);
        }, [replaceWithPlaceholder]);

        const imageClassName = merge([
            'tw-z-[1] tw-bg-base-alt tw-min-w-0 tw-flex-initial',
            height === 'auto' && type === TileType.ImageText && 'tw-aspect-square',
            height === 'auto' && type === TileType.Image && 'tw-aspect-[3/4]',
            type === TileType.ImageText ? `${twBorderMap[positioning]} tw-border-line-weak` : undefined,
            height !== 'auto' && 'tw-w-full',
        ]);

        const textClassName = merge([
            'tw-flex tw-flex-col tw-space-y-1 tw-z-[2] tw-break-all tw-w-full',
            type === TileType.ImageText &&
                positioning === TileImagePositioning.Behind &&
                merge([
                    'tw-absolute tw-top-0 tw-bottom-0 tw-left-0 tw-right-0',
                    twVerticalAlignmentMap[blockSettings.verticalAlignment],
                ]),
            type === TileType.ImageText &&
                (positioning === TileImagePositioning.Left || positioning === TileImagePositioning.Right) &&
                'tw-basis-2/3',
        ]);

        const tileFlyoutProps = {
            link: tileSettings.link ?? null,
            display: tileSettings.display ?? blockSettings.display ?? null,
            height,
            type,
            asset: tileAsset,
            backgroundColor: tileSettings.backgroundColor ?? blockSettings.backgroundColor ?? null,
            onLinkChange: (link: Link) => onTileSettingsChange(id, { link }),
            backgroundVisibility: tileSettings.backgroundVisibility ?? blockSettings.background,
            onDisplayChange: (display: TileDisplay) => onTileSettingsChange(id, { display }),
            isAssetLoading,
            onBackgroundColorChange: (backgroundColor: Color) => onTileSettingsChange(id, { backgroundColor }),
            onReplaceAssetFromUpload: openFileDialog,
            onUploadFile: uploadFile,
            onBackgroundVisibilityChange: (backgroundVisibility: boolean) =>
                onTileSettingsChange(id, { backgroundVisibility }),
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
                {replaceWithPlaceholder && <TeaserTilePlaceholder borderRadius={borderRadius} />}
                {isEditing && !replaceWithPlaceholder && (
                    <TeaserTileToolbar
                        draggableProps={draggableProps}
                        onRemoveSelf={() => onRemoveTile(id)}
                        tileSettingsFlyoutProps={tileFlyoutProps}
                        onToolbarBlur={() => setToolbarFocus(false)}
                        onToolbarFocus={() => setToolbarFocus(true)}
                        isToolbarFocused={toolbarFocus}
                        isDragging={isDragPreview}
                    />
                )}
                {tileSettings.link?.href && !isEditing && (
                    <a
                        className={merge([
                            'tw-h-full tw-block tw-w-full tw-absolute tw-top-0 tw-left-0 tw-z-[3]',
                            FOCUS_VISIBLE_STYLE,
                        ])}
                        aria-label={`Navigate to ${tileSettings.link.href}`}
                        href={tileSettings.link.href}
                        target={tileSettings.link.target}
                        style={{ borderRadius }}
                    />
                )}
                <div
                    style={{ borderRadius, border, background }}
                    className={merge([
                        'tw-flex tw-overflow-hidden tw-h-full tw-relative tw-bg-base tw-w-full',
                        type === TileType.ImageText && twPositioningMap[positioning],
                        replaceWithPlaceholder && 'tw-invisible',
                        (toolbarFocus || isDragPreview) && 'tw-outline tw-outline-box-selected-inverse tw-outline-2',
                    ])}
                >
                    {type !== TileType.Text && (
                        <>
                            {tileAsset?.genericUrl ? (
                                <div
                                    className={merge([
                                        'tw-min-w-0 tw-flex tw-flex-initial tw-items-center tw-justify-center tw-bg-base-alt tw-w-full',
                                        type === TileType.ImageText &&
                                            (positioning === TileImagePositioning.Left ||
                                                positioning === TileImagePositioning.Right) &&
                                            'tw-basis-1/3',
                                    ])}
                                >
                                    <img
                                        className={imageClassName}
                                        src={tileAsset?.genericUrl.replace(
                                            '{width}',
                                            `${800 * window.devicePixelRatio}`
                                        )}
                                        style={{ height, objectFit }}
                                    />
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
                                            className={merge([
                                                imageClassName,
                                                'tw-bg-base-alt tw-w-full tw-flex tw-justify-center tw-items-center tw-text-text-disabled',
                                                FOCUS_VISIBLE_STYLE,
                                                'tw-ring-inset',
                                                isEditing ? 'hover:tw-text-text-x-weak' : 'tw-cursor-default',
                                                type === TileType.ImageText &&
                                                    (positioning === TileImagePositioning.Left ||
                                                        positioning === TileImagePositioning.Right) &&
                                                    'tw-basis-1/3',
                                            ])}
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
                        <div
                            style={{
                                height: type === TileType.Text ? height : undefined,
                                padding,
                                textAlign,
                                background:
                                    type === TileType.ImageText && positioning === TileImagePositioning.Behind
                                        ? background
                                        : undefined,
                            }}
                            className={textClassName}
                        >
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
