/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/fondue-tokens/styles';

import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { generateRandomId, merge } from '@frontify/fondue';
import { Settings, Tile, TileDisplay, TileHeight, TilePadding, TileSettings, TileSpacing, TileType } from './types';
import { TeaserTile } from './components/TeaserTile';
import { useCallback, useEffect, useState } from 'react';
import { Radius } from '@frontify/guideline-blocks-shared';

// ? TODO: If values are set in settings by default then there is no need for mappings.
export const spacingMap: Record<TileSpacing, string> = {
    [TileSpacing.None]: '0px',
    [TileSpacing.Small]: '10px',
    [TileSpacing.Medium]: '30px',
    [TileSpacing.Large]: '50px',
};

export const heightMap: Record<TileHeight, string> = {
    [TileHeight.Auto]: 'auto',
    [TileHeight.Small]: '150px',
    [TileHeight.Medium]: '200px',
    [TileHeight.Large]: '300px',
};

export const paddingMap: Record<TilePadding, string> = {
    [TilePadding.Small]: '12px',
    [TilePadding.Medium]: '30px',
    [TilePadding.Large]: '50px',
};

export const radiusMap: Record<Radius, string> = {
    [Radius.None]: '0px',
    [Radius.Small]: '2px',
    [Radius.Medium]: '4px',
    [Radius.Large]: '12px',
};

export const objectFitMap: Record<TileDisplay, 'fill' | 'contain'> = {
    [TileDisplay.Fill]: 'fill',
    [TileDisplay.Fit]: 'contain',
};

const INIT_TILE_SETTINGS: TileSettings = {
    link: null,
    backgroundVisibility: null,
    backgroundColor: null,
    display: null,
    description: null,
    title: null,
};

export const TeaserTileBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    // Required workaround for bug in clarify
    const [blockTiles, setBlockTiles] = useState(blockSettings.tiles);
    const isEditing = useEditorState(appBridge);

    const gridGap = blockSettings.spacing ? blockSettings.spacingCustom : spacingMap[blockSettings.spacingChoice];

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
        if (!blockTiles) {
            const currentColumnCount = parseInt(blockSettings.columns);
            const tiles: Tile[] = [];
            for (let i = 0; i < currentColumnCount; i++) {
                tiles.push({ id: generateRandomId(), settings: { ...INIT_TILE_SETTINGS } });
            }
            setInternalTiles(tiles);
        }
    }, [blockTiles, blockSettings.columns, setBlockSettings, setInternalTiles]);

    const tileHeight = blockSettings.height ? blockSettings.heightCustom : heightMap[blockSettings.heightChoice];

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
                    blockSettings={blockSettings}
                    onRemoveTile={() => removeTile(id)}
                    isEditing={isEditing}
                />
            ))}
            {isEditing && (
                <div
                    className={merge([
                        'tw-transition tw-bg-base-alt tw-rounded tw-border tw-h-full tw-border-dashed tw-border-line tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-box-neutral-hover',
                        tileHeight === 'auto' && 'tw-aspect-square',
                    ])}
                    style={{
                        height: tileHeight,
                        borderRadius: blockSettings.hasRadius
                            ? blockSettings.radiusValue
                            : radiusMap[blockSettings.radiusChoice],
                    }}
                    onClick={addTile}
                >
                    Add New Tile
                </div>
            )}
        </div>
    );
};
