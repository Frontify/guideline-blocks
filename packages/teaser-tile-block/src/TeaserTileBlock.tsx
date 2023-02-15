/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/fondue-tokens/styles';

import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { generateRandomId } from '@frontify/fondue';
import { Settings, Tile, TileDisplay, TileHeight, TilePadding, TileSettings, TileSpacing, TileType } from './types';
import {
    TeaserTile,
    TeaserTileImageProps,
    TeaserTileImageTextProps,
    TeaserTileTextProps,
} from './components/TeaserTile';
import { useCallback, useEffect, useMemo, useState } from 'react';
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

const paddingMap: Record<TilePadding, string> = {
    [TilePadding.Small]: '12px',
    [TilePadding.Medium]: '30px',
    [TilePadding.Large]: '50px',
};

const radiusMap: Record<Radius, string> = {
    [Radius.None]: '0px',
    [Radius.Small]: '2px',
    [Radius.Medium]: '4px',
    [Radius.Large]: '12px',
};

const objectFitMap: Record<TileDisplay, string> = {
    [TileDisplay.Fill]: 'fill',
    [TileDisplay.Fit]: 'contain',
};

const INIT_TILE_SETTINGS: TileSettings = {
    link: null,
    backgroundVisibility: null,
    backgroundColor: null,
    display: null,
};

export const TeaserTileBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    // Required workaround for bug in clarify
    const [blockTiles, setBlockTiles] = useState(blockSettings.tiles);
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
                positioning: blockSettings.positioning,
            },
        }),
        [height, blockSettings.positioning, padding, textAlign, border, background, borderRadius, objectFit]
    );

    const setInternalTiles = useCallback(
        (tiles: Tile[]) => {
            setBlockSettings({ tiles });
            setBlockTiles(tiles);
        },
        [setBlockSettings, setBlockTiles]
    );

    const updateTile = (id: string, partialSettings: Partial<TileSettings>) => {
        if (!blockTiles) {
            return;
        }
        const newTiles = blockTiles.map((tile) => {
            if (tile.id === id) {
                return { ...tile, settings: { ...tile.settings, ...partialSettings } };
            } else {
                return tile;
            }
        });
        setInternalTiles(newTiles);
    };

    const removeTile = (id: string) => {
        const newTiles = (blockTiles ?? [])?.filter((tile) => tile.id !== id);
        setInternalTiles(newTiles);
    };

    const addTile = () => {
        const tiles = [...(blockTiles ?? []), { id: generateRandomId(), settings: { ...INIT_TILE_SETTINGS } }];
        setInternalTiles(tiles);
    };

    // Used on first render to create tiles array of when number of columns changes
    useEffect(() => {
        const currentColumnCount = parseInt(blockSettings.columns);
        const columnDifference = currentColumnCount - (blockTiles?.length ?? 0);
        if (columnDifference > 0) {
            const tiles = [...(blockTiles ?? [])];
            for (let i = 0; i < columnDifference; i++) {
                tiles.push({ id: generateRandomId(), settings: { ...INIT_TILE_SETTINGS } });
            }
            setInternalTiles(tiles);
        }
    }, [blockTiles, blockSettings.columns, setBlockSettings, setInternalTiles]);

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
            {blockTiles?.map(({ id, settings }) => (
                <TeaserTile
                    id={id}
                    key={id}
                    appBridge={appBridge}
                    tileSettings={settings}
                    onTileSettingsChange={(partialSettings) => updateTile(id, partialSettings)}
                    {...props[blockSettings.type]}
                />
            ))}
            <div
                className="tw-bg-base-alt tw-rounded tw-border tw-border-dashed tw-border-line tw-flex tw-items-center tw-justify-center"
                style={{ height: '200px' }}
                onClick={addTile}
            >
                Add New Tile
            </div>
        </div>
    );
};
