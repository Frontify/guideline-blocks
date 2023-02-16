/* (c) Copyright Frontify Ltd., all rights reserved. */

import { generateRandomId } from '@frontify/fondue';
import { useCallback, useEffect, useState } from 'react';
import { Settings, Tile, TileSettings } from '../types';

const INIT_TILE_SETTINGS: TileSettings = {
    link: null,
    backgroundVisibility: null,
    backgroundColor: null,
    display: null,
    description: null,
    title: null,
};

export const useTileArray = (blockSettings: Settings, setBlockSettings: (settings: Partial<Settings>) => void) => {
    // Required workaround for bug in clarify
    const [tiles, setTiles] = useState(blockSettings.tiles);
    const setInternalTiles = useCallback(
        (newTiles: Tile[]) => {
            setBlockSettings({ tiles: newTiles });
            setTiles(newTiles);
        },
        [setBlockSettings, setTiles]
    );

    const updateTile = (id: string, partialSettings: Partial<TileSettings>) => {
        if (!tiles) {
            return;
        }
        const newTiles = tiles.map((tile) => {
            if (tile.id === id) {
                return { ...tile, settings: { ...tile.settings, ...partialSettings } };
            } else {
                return tile;
            }
        });
        setInternalTiles(newTiles);
    };

    const removeTile = (id: string) => {
        const newTiles = (tiles ?? [])?.filter((tile) => tile.id !== id);
        setInternalTiles(newTiles);
    };

    const addTile = () => {
        const newTiles = [...(tiles ?? []), { id: generateRandomId(), settings: { ...INIT_TILE_SETTINGS } }];
        setInternalTiles(newTiles);
    };

    // Used on first render to create tiles array of when number of columns changes
    useEffect(() => {
        if (!tiles) {
            const currentColumnCount = parseInt(blockSettings.columns);
            const tiles: Tile[] = [];
            for (let i = 0; i < currentColumnCount; i++) {
                tiles.push({ id: generateRandomId(), settings: { ...INIT_TILE_SETTINGS } });
            }
            setInternalTiles(tiles);
        }
    }, [tiles, blockSettings.columns, setBlockSettings, setInternalTiles]);

    return {
        updateTile,
        addTile,
        removeTile,
        reorderTiles: setInternalTiles,
        tiles: tiles ?? [],
    };
};
