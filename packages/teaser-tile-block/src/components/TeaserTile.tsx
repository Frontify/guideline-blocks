/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject } from 'react';

import { IconPlus32, merge } from '@frontify/fondue';
import { AppBridgeBlock } from '@frontify/app-bridge';

import { useTileAsset } from '../hooks';
import { TileImagePositioning, TilePadding, TileType } from '../types';

import { TileSettingsFlyout } from './TileSettingsFlyout';

export type TeaserTileBaseProps = {
    id: string;
    border?: string;
    variant?: TileType;
    background?: string;
    borderRadius?: string;
    appBridge: AppBridgeBlock;
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
    padding = TilePadding.Small, // ! TODO: check with Simone about padding. As there is mismatch between design and settings.
    variant = TileType.ImageText,
    positioning = TileImagePositioning.Top,
}: TeaserTileProps) => {
    const { tileAsset, isAssetLoading, openFileDialog, onOpenAssetChooser } = useTileAsset(appBridge, id);

    const imageClassName = merge([
        'tw-w-full tw-bg-base-alt tw-flex tw-justify-center tw-items-center',
        imageHeight === 'auto' ? 'tw-aspect-square' : undefined,
        variant === TileType.ImageText ? `${twBorderMap[positioning]} tw-border-line-weak` : undefined,
    ]);

    const textClassName = merge([
        'tw-flex tw-flex-col tw-space-y-1 tw-mx-4',
        variant === TileType.Text ? 'tw-my-4' : 'tw-mb-4 tw-mt-2',
    ]);

    return (
        <div
            style={{ background, borderRadius, border }}
            className={merge(['tw-flex tw-overflow-auto', twPositioningMap[positioning]])}
        >
            {variant !== TileType.Text && (
                <TileSettingsFlyout
                    link={null}
                    display={null}
                    variant={variant}
                    asset={tileAsset}
                    backgroundColor={null}
                    onLinkChange={console.log}
                    backgroundVisibility={null}
                    onDisplayChange={console.log}
                    isAssetLoading={isAssetLoading}
                    onBackgroundColorChange={console.log}
                    onReplaceAssetFromUpload={openFileDialog}
                    onBackgroundVisibilityChange={console.log}
                    onReplaceAssetFromWorkspace={onOpenAssetChooser}
                >
                    {(props, triggerRef: MutableRefObject<HTMLDivElement>) => {
                        return tileAsset?.originUrl ? (
                            <img
                                {...props}
                                className={imageClassName}
                                src={tileAsset?.originUrl}
                                style={{ height: imageHeight, objectFit }}
                            />
                        ) : (
                            <div {...props} className={imageClassName} style={{ height: imageHeight }}>
                                <div ref={triggerRef}>
                                    <IconPlus32 />
                                </div>
                            </div>
                        );
                    }}
                </TileSettingsFlyout>
            )}
            {variant !== TileType.Image && (
                <div style={{ height, padding, textAlign }} className={textClassName}>
                    <h6 className="tw-text-base tw-text-blank-state-weak tw-font-semibold">Teaser Title</h6>
                    <p className="tw-text-sm tw-text-blank-state-weak tw-font-normal">Add a description</p>
                </div>
            )}
        </div>
    );
};
