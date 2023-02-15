/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/fondue-tokens/styles';

import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';

import { Settings, TileDisplay, TileHeight, TilePadding, TileSpacing, TileType } from './types';
import {
    TeaserTile,
    TeaserTileImageProps,
    TeaserTileImageTextProps,
    TeaserTileTextProps,
} from './components/TeaserTile';
import { useMemo } from 'react';
import { Radius, toRgbaString } from '@frontify/guideline-blocks-shared';

type VariantProps = {
    [TileType.Text]: TeaserTileTextProps;
    [TileType.Image]: TeaserTileImageProps;
    [TileType.ImageText]: TeaserTileImageTextProps;
};

// ? TODO: If values are set in settings by default then there is no need for mappings.
const spacingMap: Record<TileSpacing, string> = {
    [TileSpacing.None]: '0px',
    [TileSpacing.Small]: '10px',
    [TileSpacing.Medium]: '30px',
    [TileSpacing.Large]: '50px',
};

const heightMap: Record<TileHeight, string> = {
    [TileHeight.Auto]: 'auto',
    [TileHeight.Small]: '150px',
    [TileHeight.Medium]: '200px',
    [TileHeight.Large]: '300px',
};

// ! TODO: add proper map value
const paddingMap: Record<TilePadding, string> = {
    [TilePadding.Small]: '15px',
    [TilePadding.Medium]: '20px',
    [TilePadding.Large]: '30px',
};

// ! TODO: add proper map value
const radiusMap: Record<Radius, string> = {
    [Radius.None]: '0px',
    [Radius.Small]: '6px',
    [Radius.Medium]: '10px',
    [Radius.Large]: '14px',
};

const objectFitMap: Record<TileDisplay, string> = {
    [TileDisplay.Fill]: 'fill',
    [TileDisplay.Fit]: 'contain',
};

const MOCK_TILES = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];

export const TeaserTileBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const height = blockSettings.height ? blockSettings.heightCustom : heightMap[blockSettings.heightChoice];
    const gridGap = blockSettings.spacing ? blockSettings.spacingCustom : spacingMap[blockSettings.spacingChoice];
    const padding = blockSettings.padding ? blockSettings.paddingCustom : paddingMap[blockSettings.paddingChoice];

    // TODO: should be by default lowercase instead of uppercase
    // ! TODO: missing vertical Alignment
    const textAlign = blockSettings.horizontalAlignment.toLowerCase() as 'left' | 'right' | 'center';

    // TODO: should be by default lowercase instead of uppercase
    const border = blockSettings.hasBorder
        ? `${blockSettings.borderWidth} ${blockSettings.borderStyle.toLowerCase()} ${toRgbaString(
              blockSettings.borderColor
          )}`
        : undefined;

    const objectFit = objectFitMap[blockSettings.display] as 'fill' | 'contain';
    const background = blockSettings.background ? toRgbaString(blockSettings.backgroundColor) : undefined;
    const borderRadius = blockSettings.hasRadius ? blockSettings.radiusValue : radiusMap[blockSettings.radiusChoice];

    const props: VariantProps = useMemo(
        () => ({
            [TileType.Text]: {
                height,
                border,
                padding,
                textAlign,
                background,
                borderRadius,
                variant: TileType.Text,
            },
            [TileType.Image]: {
                border,
                objectFit,
                background,
                borderRadius,
                imageHeight: height,
                variant: TileType.Image,
            },
            [TileType.ImageText]: {
                border,
                padding,
                objectFit,
                textAlign,
                background,
                borderRadius,
                imageHeight: height,
                variant: TileType.ImageText,
            },
        }),
        [height, blockSettings.positioning, padding, textAlign, border, background, borderRadius, objectFit]
    );

    return (
        <div
            className="tw-relative"
            data-test-id="teaser-tile-block"
            style={{
                gridGap,
                display: 'grid',
                gridAutoFlow: 'row',
                gridTemplateRows: 'auto',
                gridTemplateColumns: `repeat(${blockSettings.columns}, 1fr)`,
            }}
        >
            {MOCK_TILES.map(({ id }) => (
                <TeaserTile id={id} key={id} appBridge={appBridge} {...props[blockSettings.type]} />
            ))}
        </div>
    );
};
