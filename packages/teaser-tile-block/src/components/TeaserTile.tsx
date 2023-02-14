/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject } from 'react';

import { AppBridgeBlock } from '@frontify/app-bridge';
import { IconPlus32, merge } from '@frontify/fondue';

import { TileType } from '../types';
import { useTileAsset } from '../hooks';

import { ImageFlyout } from './ImageFlyout';

type TeaserTileBaseProps = {
    id: string;
    variant?: TileType;
    appBridge: AppBridgeBlock;
};

type TeaserTileImageProps = {
    height?: never;
    imageHeight: string;
    variant: TileType.Image;
} & TeaserTileBaseProps;

type TeaserTileTextProps = {
    height: string;
    imageHeight?: never;
    variant: TileType.Text;
} & TeaserTileBaseProps;

type TeaserTileImageTextProps = {
    height?: never;
    imageHeight: string;
    variant: TileType.ImageText;
} & TeaserTileBaseProps;

type TeaserTileProps = TeaserTileImageProps | TeaserTileTextProps | TeaserTileImageTextProps;

export const TeaserTile = ({ appBridge, id, variant = TileType.ImageText, height, imageHeight }: TeaserTileProps) => {
    console.log('🚀 ~ TeaserTile ~ imageHeight', imageHeight);
    const { tileAsset, isAssetLoading, openFileDialog, onOpenAssetChooser } = useTileAsset(appBridge, id);

    return (
        <div className="tw-border tw-border-line tw-flex tw-flex-col">
            {variant !== TileType.Text && (
                <ImageFlyout
                    onReplaceAssetFromUpload={openFileDialog}
                    onReplaceAssetFromWorkspace={onOpenAssetChooser}
                    isAssetLoading={isAssetLoading}
                    asset={tileAsset}
                >
                    {(props, triggerRef: MutableRefObject<HTMLDivElement>) => {
                        return (
                            <div
                                {...props}
                                className={merge([
                                    'tw-w-full tw-bg-base-alt tw-flex tw-justify-center tw-items-center',
                                    variant === TileType.ImageText ? 'tw-border-b tw-border-line-weak' : undefined,
                                    imageHeight === 'auto' ? 'tw-aspect-square' : undefined,
                                ])}
                                style={{ height: imageHeight }}
                            >
                                <div ref={triggerRef}>
                                    <IconPlus32 />
                                </div>
                            </div>
                        );
                    }}
                    {/* <img>Image part</img> */}
                </ImageFlyout>
            )}
            {variant !== TileType.Image && (
                <div
                    style={{ height }}
                    className={merge([
                        'tw-flex tw-flex-col tw-space-y-1 tw-mx-4',
                        variant === TileType.Text ? 'tw-my-4' : 'tw-mb-4 tw-mt-2',
                    ])}
                >
                    <h6 className="tw-text-base tw-text-blank-state-weak tw-font-semibold">Teaser Title</h6>
                    <p className="tw-text-sm tw-text-blank-state-weak tw-font-normal">Add a description</p>
                </div>
            )}
        </div>
    );
};
