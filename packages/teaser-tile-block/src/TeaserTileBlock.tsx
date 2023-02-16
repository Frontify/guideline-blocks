/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/fondue-tokens/styles';

import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockSettings, useColorPalettes, useEditorState } from '@frontify/app-bridge';
import { generateRandomId, merge } from '@frontify/fondue';
import { Nullable, Settings, Tile, TileDisplay, TileHeight, TilePadding, TileSettings, TileSpacing } from './types';
import { SortableTeaserTile, TeaserTile } from './components/TeaserTile';
import { useCallback, useEffect, useState } from 'react';
import { Radius } from '@frontify/guideline-blocks-shared';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';

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

export const objectFitMap: Record<TileDisplay, 'cover' | 'contain'> = {
    [TileDisplay.Fill]: 'cover',
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
    const [draggingTileId, setDraggingTileId] = useState<Nullable<UniqueIdentifier>>(null);
    const isEditing = useEditorState(appBridge);
    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));
    const { colorPalettes } = useColorPalettes(appBridge);
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

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setDraggingTileId(active.id);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = blockTiles?.findIndex((i) => i.id === active.id);
            const newIndex = blockTiles?.findIndex((i) => i.id === over.id);
            let sortedItems = blockTiles;
            if (oldIndex !== undefined && newIndex !== undefined) {
                sortedItems = arrayMove(blockTiles ?? [], oldIndex, newIndex);
            }
            setInternalTiles(sortedItems ?? []);
            setDraggingTileId(null);
        }
    };

    const draggedBlock = blockTiles?.find((block) => block.id === draggingTileId);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
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
                <SortableContext items={blockTiles ?? []}>
                    {blockTiles?.map(({ id, settings }) => (
                        <SortableTeaserTile
                            id={id}
                            key={id}
                            appBridge={appBridge}
                            tileSettings={settings}
                            onTileSettingsChange={(partialSettings) => updateTile(id, partialSettings)}
                            blockSettings={blockSettings}
                            onRemoveTile={() => removeTile(id)}
                            isEditing={isEditing}
                            palettes={colorPalettes.map((palette) => ({ ...palette, title: palette.name }))}
                        />
                    ))}
                </SortableContext>
                <DragOverlay>
                    {draggedBlock ? (
                        <TeaserTile
                            id={draggedBlock.id}
                            key={draggingTileId}
                            appBridge={appBridge}
                            tileSettings={draggedBlock.settings}
                            onTileSettingsChange={() => ({})}
                            blockSettings={blockSettings}
                            onRemoveTile={() => ({})}
                            isEditing={isEditing}
                            isDragPreview
                            palettes={colorPalettes.map((palette) => ({ ...palette, title: palette.name }))}
                        />
                    ) : null}
                </DragOverlay>
                {isEditing && (
                    <div
                        className={merge([
                            'tw-transition tw-bg-base-alt tw-rounded tw-border tw-h-full tw-border-dashed tw-border-line tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-box-neutral-hover',
                            'tw-min-h-[100px]',
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
        </DndContext>
    );
};
