/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, MutableRefObject, useMemo, useState } from 'react';

import {
    ActionMenu,
    Button,
    ButtonEmphasis,
    ButtonRounding,
    ButtonSize,
    Flyout,
    FlyoutPlacement,
    IconCog,
    IconDotsVertical,
    IconPlus32,
    IconTrashBin,
    LoadingCircle,
    MenuItemStyle,
    RichTextEditor,
    merge,
    PluginComposer,
    InitPlugin,
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    Palette,
    FOCUS_VISIBLE_STYLE,
    IconHeartCircle32,
} from '@frontify/fondue';
import { AppBridgeBlock, useColorPalettes } from '@frontify/app-bridge';

import { useTileAsset } from '../hooks';
import { Nullable, Settings, TileImagePositioning, TileSettings, TileType, TileVerticalAlignment } from '../types';

import { TileSettingsFlyout, TileSettingsFlyoutProps } from './TileSettingsFlyout';
import { toRgbaString, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { heightMap, objectFitMap, paddingMap, radiusMap } from '../TeaserTileBlock';
import { useSortable } from '@dnd-kit/sortable';
import { TeaserTileToolbar } from './TeaserTileToolbar';

export type SortableTeaserTileProps = {
    id: string;
    blockSettings: Settings;
    appBridge: AppBridgeBlock;
    tileSettings: TileSettings;
    onTileSettingsChange: (partialSettings: Partial<TileSettings>) => void;
    onRemoveTile: () => void;
    isEditing: boolean;
    palettes: Nullable<Palette[]>;
};

export type TeaserTileProps = SortableTeaserTileProps & {
    isDragging?: boolean;
    replaceWithPlaceholder?: boolean;
    transformStyle?: Record<string, unknown>;
    draggableProps?: Record<string, unknown>;
    isDragPreview?: boolean;
};

const twPositioningMap: Record<TileImagePositioning, string> = {
    [TileImagePositioning.Top]: 'tw-flex-col',
    [TileImagePositioning.Bottom]: 'tw-flex-col-reverse',
    [TileImagePositioning.Left]: 'tw-flex-row',
    [TileImagePositioning.Right]: 'tw-flex-row-reverse',
    [TileImagePositioning.Behind]: '',
};

const twBorderMap: Record<TileImagePositioning, string> = {
    [TileImagePositioning.Top]: 'tw-border-b',
    [TileImagePositioning.Bottom]: 'tw-border-t',
    [TileImagePositioning.Left]: 'tw-border-r',
    [TileImagePositioning.Right]: 'tw-border-l',
    [TileImagePositioning.Behind]: '',
};

const twVerticalAlignmentMap: Record<TileVerticalAlignment, string> = {
    [TileVerticalAlignment.Top]: 'tw-justify-start',
    [TileVerticalAlignment.Center]: 'tw-justify-center',
    [TileVerticalAlignment.Bottom]: 'tw-justify-end',
};

const useTileStyles = (blockSettings: Settings, tileSettings: TileSettings) => {
    const height = blockSettings.height ? blockSettings.heightCustom : heightMap[blockSettings.heightChoice];
    const padding = blockSettings.padding ? blockSettings.paddingCustom : paddingMap[blockSettings.paddingChoice];

    // TODO: should be by default lowercase instead of uppercase
    const textAlign = blockSettings.horizontalAlignment.toLowerCase() as 'left' | 'right' | 'center';

    // TODO: should be by default lowercase instead of uppercase
    const border = blockSettings.hasBorder
        ? `${blockSettings.borderWidth} ${blockSettings.borderStyle.toLowerCase()} ${toRgbaString(
              blockSettings.borderColor
          )}`
        : undefined;

    const globalObjectFit = objectFitMap[blockSettings.display];
    const tileObjectFit = tileSettings.display ? objectFitMap[tileSettings.display] : undefined;
    const objectFit = height === 'auto' ? 'cover' : tileObjectFit ?? globalObjectFit;

    const globalBackground = blockSettings.background ? toRgbaString(blockSettings.backgroundColor) : undefined;
    const tileBackground = tileSettings.backgroundColor ? toRgbaString(tileSettings.backgroundColor) : undefined;
    const background = tileSettings.backgroundVisibility !== false ? tileBackground ?? globalBackground : undefined;
    const borderRadius = blockSettings.hasRadius ? blockSettings.radiusValue : radiusMap[blockSettings.radiusChoice];

    return { height, background, objectFit, padding, textAlign, border, borderRadius };
};

const headerPlugins = new PluginComposer()
    .setPlugin(new InitPlugin())
    .setPlugin([new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin()]);

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
        },
        ref
    ) => {
        const { tileAsset, isAssetLoading, uploadFile, onOpenAssetChooser, openFileDialog } = useTileAsset(
            appBridge,
            id
        );
        const { positioning, type } = blockSettings;
        const [isPlaceholderImageFlyoutOpen, setIsPlaceholderImageFlyoutOpen] = useState(false);
        const { designTokens } = useGuidelineDesignTokens();
        const [toolbarFocus, setToolbarFocus] = useState(false);

        const { height, background, objectFit, padding, textAlign, border, borderRadius } = useTileStyles(
            blockSettings,
            tileSettings
        );

        const imageClassName = merge([
            'tw-z-[1] tw-bg-base-alt tw-min-w-0 tw-flex-initial',
            height === 'auto' && type === TileType.ImageText && 'tw-aspect-square',
            height === 'auto' && type === TileType.Image && 'tw-aspect-[3/4]',
            type === TileType.ImageText ? `${twBorderMap[positioning]} tw-border-line-weak` : undefined,
        ]);

        const textClassName = merge([
            'tw-flex tw-flex-col tw-space-y-1 tw-z-[2] tw-break-all',
            positioning === TileImagePositioning.Behind &&
                merge([
                    'tw-absolute tw-top-0 tw-bottom-0 tw-left-0 tw-right-0',
                    twVerticalAlignmentMap[blockSettings.verticalAlignment],
                ]),
        ]);

        const tileFlyoutProps = {
            link: tileSettings.link ?? null,
            display: tileSettings.display ?? blockSettings.display ?? null,
            height,
            type,
            asset: tileAsset,
            backgroundColor: tileSettings.backgroundColor ?? blockSettings.backgroundColor ?? null,
            onLinkChange: (link) => onTileSettingsChange({ link }),
            backgroundVisibility: tileSettings.backgroundVisibility ?? blockSettings.background,
            onDisplayChange: (display) => onTileSettingsChange({ display }),
            isAssetLoading,
            onBackgroundColorChange: (backgroundColor) => onTileSettingsChange({ backgroundColor }),
            onReplaceAssetFromUpload: openFileDialog,
            onUploadFile: uploadFile,
            onBackgroundVisibilityChange: (backgroundVisibility) => onTileSettingsChange({ backgroundVisibility }),
            onReplaceAssetFromWorkspace: onOpenAssetChooser,
            palettes,
            disabled: !isEditing,
        } as Omit<TileSettingsFlyoutProps, 'isOpen' | 'setIsOpen' | 'children' | 'placement' | 'title' | 'description'>;

        const titleRichTextEditor = useMemo(
            () => (
                <RichTextEditor
                    readonly={!isEditing}
                    border={false}
                    designTokens={designTokens ?? undefined}
                    value={tileSettings.title ?? undefined}
                    placeholder="Teaser Title"
                    plugins={headerPlugins}
                    onBlur={(title) => onTileSettingsChange({ title })}
                />
            ),
            [designTokens, isEditing, tileSettings.title]
        );
        const descriptionRichTextEditor = useMemo(
            () => (
                <RichTextEditor
                    readonly={!isEditing}
                    border={false}
                    designTokens={designTokens ?? undefined}
                    value={tileSettings.description ?? undefined}
                    placeholder="Add a description"
                    onBlur={(description) => onTileSettingsChange({ description })}
                />
            ),
            [designTokens, isEditing, tileSettings.description]
        );

        return (
            <div
                className={merge(['tw-relative tw-group', isDragPreview && 'tw-pointer-events-none'])}
                ref={ref}
                style={{ ...transformStyle }}
            >
                {replaceWithPlaceholder ? (
                    <div
                        className="tw-border-2 tw-border-dashed tw-border-box-selected-strong tw-bg-box-selected tw-w-full tw-h-full"
                        style={{ borderRadius }}
                    ></div>
                ) : (
                    <>
                        {isEditing && (
                            <TeaserTileToolbar
                                draggableProps={draggableProps}
                                onRemoveSelf={onRemoveTile}
                                tileSettingsFlyoutProps={tileFlyoutProps}
                                onToolbarBlur={() => setToolbarFocus(false)}
                                onToolbarFocus={() => setToolbarFocus(true)}
                                isToolbarFocused={toolbarFocus}
                                isDragging={isDragPreview}
                            />
                        )}
                        {tileSettings.link?.href && !isEditing && (
                            <a
                                className="tw-h-full tw-block tw-w-full tw-absolute tw-top-0 tw-left-0 tw-z-[3]"
                                aria-label={`Navigate to ${tileSettings.link.href}`}
                                href={tileSettings.link.href}
                                target={tileSettings.link.target}
                            />
                        )}
                        <div
                            style={{ borderRadius, border, background }}
                            className={merge([
                                'tw-flex tw-overflow-hidden tw-h-full tw-relative tw-bg-base',
                                twPositioningMap[positioning],
                                (toolbarFocus || isDragPreview) &&
                                    'tw-outline tw-outline-box-selected-inverse tw-outline-2',
                            ])}
                        >
                            {type !== TileType.Text && (
                                <>
                                    {tileAsset?.genericUrl ? (
                                        <div className="tw-min-w-0 tw-flex tw-flex-initial tw-items-center tw-justify-center tw-bg-base-alt">
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
                                                    ])}
                                                    style={{ height }}
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
                    </>
                )}
            </div>
        );
    }
);

TeaserTile.displayName = 'TeaserTile';

export const SortableTeaserTile = (props: TeaserTileProps) => {
    const { id, isEditing } = props;
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
        <TeaserTile
            ref={setNodeRef}
            {...props}
            replaceWithPlaceholder={isDragging}
            transformStyle={transformStyle}
            draggableProps={draggableProps}
        />
    );
};
