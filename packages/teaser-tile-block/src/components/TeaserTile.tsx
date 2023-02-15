/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject, useMemo, useState } from 'react';

import {
    ActionMenu,
    ActionMenuItemType,
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
} from '@frontify/fondue';
import { AppBridgeBlock } from '@frontify/app-bridge';

import { useTileAsset } from '../hooks';
import { Settings, TileImagePositioning, TileSettings, TileType, TileVerticalAlignment } from '../types';

import { TileSettingsFlyout, TileSettingsFlyoutProps } from './TileSettingsFlyout';
import { toRgbaString, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { heightMap, objectFitMap, paddingMap, radiusMap } from '../TeaserTileBlock';

export type TeaserTileProps = {
    id: string;
    blockSettings: Settings;
    appBridge: AppBridgeBlock;
    tileSettings: TileSettings;
    onTileSettingsChange: (partialSettings: Partial<TileSettings>) => void;
    onRemoveTile: () => void;
    isEditing: boolean;
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
    const objectFit = height === 'auto' ? tileObjectFit ?? globalObjectFit : undefined;

    const globalBackground = blockSettings.background ? toRgbaString(blockSettings.backgroundColor) : undefined;
    const tileBackground = tileSettings.backgroundColor ? toRgbaString(tileSettings.backgroundColor) : undefined;
    const background = tileSettings.backgroundVisibility !== false ? tileBackground ?? globalBackground : undefined;
    const borderRadius = blockSettings.hasRadius ? blockSettings.radiusValue : radiusMap[blockSettings.radiusChoice];

    return { height, background, objectFit, padding, textAlign, border, borderRadius };
};

export const TeaserTile = ({
    id,
    blockSettings,
    onTileSettingsChange,
    tileSettings,
    appBridge,
    onRemoveTile,
    isEditing,
}: TeaserTileProps) => {
    const { tileAsset, isAssetLoading, uploadFile, onOpenAssetChooser, openFileDialog } = useTileAsset(appBridge, id);
    const { positioning, type } = blockSettings;
    const [isPlaceholderImageFlyoutOpen, setIsPlaceholderImageFlyoutOpen] = useState(false);
    const [isMenuFlyoutOpen, setIsMenuFlyoutOpen] = useState(false);
    const [isTopSettingsFlyoutOpen, setIsTopSettingsFlyoutOpen] = useState(false);
    const { designTokens } = useGuidelineDesignTokens();

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
        'tw-flex tw-flex-col tw-space-y-1 tw-z-[2]',
        positioning === TileImagePositioning.Behind &&
            merge([
                'tw-absolute tw-top-0 tw-bottom-0 tw-left-0 tw-right-0',
                twVerticalAlignmentMap[blockSettings.verticalAlignment],
            ]),
    ]);

    const tileFlyoutProps: Omit<TileSettingsFlyoutProps, 'isOpen' | 'setIsOpen' | 'children'> = {
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
    };

    const titleRichTextEditor = useMemo(
        () => (
            <RichTextEditor
                readonly={!isEditing}
                border={false}
                designTokens={designTokens ?? undefined}
                value={tileSettings.title ?? undefined}
                placeholder="Teaser Title"
                onBlur={(title) => onTileSettingsChange({ title })}
            />
        ),
        [designTokens, isEditing, onTileSettingsChange, tileSettings.title]
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
        [designTokens, isEditing, onTileSettingsChange, tileSettings.description]
    );

    return (
        <div className="tw-relative tw-group">
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
                className={merge(['tw-flex tw-overflow-auto tw-h-full tw-relative', twPositioningMap[positioning]])}
            >
                {type !== TileType.Text && (
                    <>
                        {tileAsset?.genericUrl ? (
                            <div className="tw-min-w-0 tw-flex tw-flex-initial tw-items-center tw-justify-center tw-bg-base-alt">
                                <img
                                    className={imageClassName}
                                    src={tileAsset?.genericUrl.replace('{width}', `${800 * window.devicePixelRatio}`)}
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
                                            'tw-bg-base-alt tw-w-full tw-flex tw-justify-center tw-items-center',
                                        ])}
                                        style={{ height }}
                                    >
                                        <div ref={triggerRef}>
                                            {isAssetLoading ? <LoadingCircle /> : <IconPlus32 />}
                                        </div>
                                    </div>
                                )}
                            </TileSettingsFlyout>
                        )}
                    </>
                )}
                {type !== TileType.Image && (
                    <div
                        style={{ height: type === TileType.Text ? height : undefined, padding, textAlign, background }}
                        className={textClassName}
                    >
                        <h6 className="tw-text-lg tw-font-semibold">{titleRichTextEditor}</h6>
                        <p className="tw-text-sm tw-font-normal">{descriptionRichTextEditor}</p>
                    </div>
                )}
            </div>

            <div
                className={merge([
                    'tw-absolute tw-right-2 tw-top-2 focus-within:tw-z-[200] group-hover:tw-z-[200]',
                    isMenuFlyoutOpen ? 'tw-z-[200]' : 'tw-z-[-1]',
                ])}
            >
                <TileSettingsFlyout
                    {...tileFlyoutProps}
                    placement={FlyoutPlacement.BottomRight}
                    isOpen={isTopSettingsFlyoutOpen}
                    setIsOpen={setIsTopSettingsFlyoutOpen}
                >
                    {(_, triggerRef: MutableRefObject<HTMLDivElement>) => (
                        <div className="tw-absolute tw-right-0" ref={triggerRef} />
                    )}
                </TileSettingsFlyout>
                <Flyout
                    isOpen={isMenuFlyoutOpen}
                    onOpenChange={setIsMenuFlyoutOpen}
                    fitContent
                    legacyFooter={false}
                    placement={FlyoutPlacement.BottomRight}
                    trigger={(_, triggerRef: MutableRefObject<HTMLButtonElement>) => (
                        <Button
                            rounding={ButtonRounding.Full}
                            emphasis={ButtonEmphasis.Weak}
                            icon={<IconDotsVertical />}
                            ref={triggerRef}
                            size={ButtonSize.Small}
                            onClick={() => setIsMenuFlyoutOpen((open) => !open)}
                        />
                    )}
                >
                    <ActionMenu
                        menuBlocks={[
                            {
                                id: 'menu-items',
                                menuItems: [
                                    (type === TileType.Text || !!tileAsset?.originUrl) && {
                                        id: 'opensettings',
                                        title: 'Open Settings',
                                        decorator: <IconCog />,
                                        onClick: () => setIsTopSettingsFlyoutOpen(true),
                                    },
                                    {
                                        id: 'delete',
                                        title: 'Delete',
                                        onClick: onRemoveTile,
                                        decorator: <IconTrashBin />,
                                        style: MenuItemStyle.Danger,
                                    },
                                ].filter(Boolean) as ActionMenuItemType[],
                            },
                        ]}
                    ></ActionMenu>
                </Flyout>
            </div>
        </div>
    );
};
