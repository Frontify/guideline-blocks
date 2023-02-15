/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject, useState } from 'react';

import { Button, ButtonEmphasis, ButtonSize, IconDotsVertical, IconPlus32, merge } from '@frontify/fondue';
import { AppBridgeBlock } from '@frontify/app-bridge';

import { useTileAsset } from '../hooks';
import { TileImagePositioning, TileSettings, TileType } from '../types';

import { TileSettingsFlyout, TileSettingsFlyoutProps } from './TileSettingsFlyout';

export type TeaserTileBaseProps = {
    id: string;
    border?: string;
    variant?: TileType;
    background?: string;
    borderRadius?: string;
    appBridge: AppBridgeBlock;
    tileSettings: TileSettings;
    onTileSettingsChange: (partialSettings: Partial<TileSettings>) => void;
};

export type TeaserTileImageProps = {
    height?: never;
    padding?: never;
    textAlign?: never;
    objectFit?: 'fill' | 'contain'; // ? TODO: use csstype
    imageHeight: string;
    positioning?: never;
    variant: TileType.Image;
};

export type TeaserTileTextProps = {
    height?: string;
    padding?: string;
    objectFit?: never;
    positioning?: never;
    imageHeight?: never;
    variant: TileType.Text;
    textAlign?: 'left' | 'right' | 'center'; // ? TODO: use csstype
};

export type TeaserTileImageTextProps = {
    height?: never;
    padding?: string;
    objectFit?: 'fill' | 'contain'; // ? TODO: use csstype
    imageHeight?: string;
    variant: TileType.ImageText;
    positioning?: TileImagePositioning;
    textAlign?: 'left' | 'right' | 'center'; // ? TODO: use csstype
};

type TeaserTileProps = TeaserTileBaseProps & (TeaserTileImageProps | TeaserTileTextProps | TeaserTileImageTextProps);

const twPositioningMap: Record<TileImagePositioning, string> = {
    [TileImagePositioning.Top]: 'tw-flex-col',
    [TileImagePositioning.Bottom]: 'tw-flex-col-reverse',
    [TileImagePositioning.Left]: 'tw-flex-row',
    [TileImagePositioning.Right]: 'tw-flex-row-reverse',
    [TileImagePositioning.Behind]: '', // ! TODO: missing positioning inside picture
};

const twBorderMap: Record<TileImagePositioning, string> = {
    [TileImagePositioning.Top]: 'tw-border-b',
    [TileImagePositioning.Bottom]: 'tw-border-t',
    [TileImagePositioning.Left]: 'tw-border-r',
    [TileImagePositioning.Right]: 'tw-border-l',
    [TileImagePositioning.Behind]: '',
};

export const TeaserTile = ({
    id,
    height,
    border,
    objectFit,
    appBridge,
    background,
    imageHeight,
    borderRadius,
    textAlign = 'left',
    padding, // ! TODO: check with Simone about padding. As there is mismatch between design and settings.
    variant = TileType.ImageText,
    positioning = TileImagePositioning.Top,
    onTileSettingsChange,
    tileSettings,
}: TeaserTileProps) => {
    const { tileAsset, isAssetLoading, openFileDialog, onOpenAssetChooser } = useTileAsset(appBridge, id);
    const [isPlaceholderImageFlyoutOpen, setIsPlaceholderImageFlyoutOpen] = useState(false);
    const [isMenuFlyoutOpen, setIsMenuFlyoutOpen] = useState(false);

    const imageClassName = merge([
        'tw-w-full tw-bg-base-alt tw-flex tw-justify-center tw-items-center',
        imageHeight === 'auto' ? 'tw-aspect-square' : undefined,
        variant === TileType.ImageText ? `${twBorderMap[positioning]} tw-border-line-weak` : undefined,
    ]);

    const textClassName = merge([
        'tw-flex tw-flex-col tw-space-y-1 tw-mx-4',
        variant === TileType.Text ? 'tw-my-4' : 'tw-mb-4 tw-mt-2',
    ]);

    const tileFlyoutProps: Omit<TileSettingsFlyoutProps, 'isOpen' | 'setIsOpen' | 'children'> = {
        link: tileSettings.link ?? null,
        display: tileSettings.display ?? null,
        variant,
        asset: tileAsset,
        backgroundColor: tileSettings.backgroundColor ?? null,
        onLinkChange: (link) => onTileSettingsChange({ link }),
        backgroundVisibility: tileSettings.backgroundVisibility ?? Boolean(background),
        onDisplayChange: (display) => onTileSettingsChange({ display }),
        isAssetLoading,
        onBackgroundColorChange: (backgroundColor) => onTileSettingsChange({ backgroundColor }),
        onReplaceAssetFromUpload: openFileDialog,
        onBackgroundVisibilityChange: (backgroundVisibility) => onTileSettingsChange({ backgroundVisibility }),
        onReplaceAssetFromWorkspace: onOpenAssetChooser,
    };

    return (
        <div className="tw-relative tw-group">
            <div
                style={{ background, borderRadius, border }}
                className={merge(['tw-flex tw-overflow-auto ', twPositioningMap[positioning]])}
            >
                {variant !== TileType.Text && (
                    <>
                        {tileAsset?.originUrl ? (
                            <img
                                className={imageClassName}
                                src={tileAsset?.originUrl}
                                style={{ height: imageHeight, objectFit }}
                            />
                        ) : (
                            <TileSettingsFlyout
                                {...tileFlyoutProps}
                                variant={variant}
                                isOpen={isPlaceholderImageFlyoutOpen}
                                setIsOpen={setIsPlaceholderImageFlyoutOpen}
                            >
                                {(props, triggerRef: MutableRefObject<HTMLDivElement>) => (
                                    <div {...props} className={imageClassName} style={{ height: imageHeight }}>
                                        <div ref={triggerRef}>
                                            <IconPlus32 />
                                        </div>
                                    </div>
                                )}
                            </TileSettingsFlyout>
                        )}
                    </>
                )}
                {variant !== TileType.Image && (
                    <div style={{ height, padding, textAlign }} className={textClassName}>
                        <h6 className="tw-text-base tw-text-blank-state-weak tw-font-semibold">Teaser Title</h6>
                        <p className="tw-text-sm tw-text-blank-state-weak tw-font-normal">Add a description</p>
                    </div>
                )}
            </div>
            {(variant === TileType.Text || !!tileAsset?.originUrl) && (
                <TileSettingsFlyout {...tileFlyoutProps} isOpen={isMenuFlyoutOpen} setIsOpen={setIsMenuFlyoutOpen}>
                    {(_, triggerRef: MutableRefObject<HTMLButtonElement>) => (
                        <div
                            className={merge([
                                'tw-absolute tw-right-2 tw-top-2 focus-within:tw-z-[200] group-hover:tw-z-[200]',
                                isMenuFlyoutOpen ? 'tw-z-[200]' : 'tw-z-[-1]',
                            ])}
                        >
                            <Button
                                emphasis={ButtonEmphasis.Weak}
                                icon={<IconDotsVertical />}
                                ref={triggerRef}
                                size={ButtonSize.Small}
                                onClick={() => setIsMenuFlyoutOpen((open) => !open)}
                            ></Button>
                        </div>
                    )}
                </TileSettingsFlyout>
            )}
        </div>
    );
};
