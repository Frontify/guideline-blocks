/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/fondue-tokens/styles';

import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockAssets, useBlockSettings, useColorPalettes, useEditorState } from '@frontify/app-bridge';
import { merge } from '@frontify/fondue';
import { Settings } from './types';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { radiusMap, spacingMap } from './helpers';
import { useDraggableGrid, useTileArray } from './hooks';
import { SortableTeaserTile, TeaserTile, TileGrid } from './components';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { useMemo } from 'react';

export const TeaserTileBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const { designTokens } = useGuidelineDesignTokens();
    const isEditing = useEditorState(appBridge);
    const { colorPalettes } = useColorPalettes(appBridge);

    const { tiles, addTile, removeTile, updateTile, reorderTiles } = useTileArray(blockSettings, setBlockSettings);
    const { dragContextProps, draggedTile } = useDraggableGrid(tiles, reorderTiles);
    const gridGap = blockSettings.spacing ? blockSettings.spacingCustom : spacingMap[blockSettings.spacingChoice];

    const palettes = useMemo(
        () => colorPalettes.map((palette) => ({ ...palette, title: palette.name })),
        [colorPalettes]
    );

    return (
        <DndContext {...dragContextProps}>
            <TileGrid gridGap={gridGap} columns={blockSettings.columns}>
                <SortableContext items={tiles}>
                    {tiles.map(({ id, settings }) => (
                        <SortableTeaserTile
                            id={id}
                            key={id}
                            appBridge={appBridge}
                            tileSettings={settings}
                            onTileSettingsChange={updateTile}
                            blockSettings={blockSettings}
                            onRemoveTile={removeTile}
                            isEditing={isEditing}
                            palettes={palettes}
                            blockAssets={blockAssets}
                            designTokens={designTokens}
                            updateAssetIdsFromKey={updateAssetIdsFromKey}
                        />
                    ))}
                </SortableContext>
                <DragOverlay>
                    {draggedTile ? (
                        <TeaserTile
                            id={draggedTile.id}
                            key={draggedTile.id}
                            appBridge={appBridge}
                            tileSettings={draggedTile.settings}
                            blockSettings={blockSettings}
                            isEditing={isEditing}
                            designTokens={designTokens}
                            isDragPreview
                            palettes={palettes}
                            blockAssets={blockAssets}
                            updateAssetIdsFromKey={() =>
                                console.warn('Interacting with drag preview, this change will not be saved.')
                            }
                            onTileSettingsChange={() =>
                                console.warn('Interacting with drag preview, this change will not be saved.')
                            }
                            onRemoveTile={() =>
                                console.warn('Interacting with drag preview, this change will not be saved.')
                            }
                        />
                    ) : null}
                </DragOverlay>
                {isEditing && (
                    <div
                        className={merge([
                            'tw-transition tw-min-w-0 tw-bg-base-alt tw-text-text-disabled tw-rounded tw-border-2 tw-h-full tw-border-dashed tw-border-line tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-box-neutral-hover hover:tw-text-text-x-weak hover:tw-border-line-strong',
                            'tw-min-h-[100px]',
                        ])}
                        style={{
                            borderRadius: blockSettings.hasRadius
                                ? blockSettings.radiusValue
                                : radiusMap[blockSettings.radiusChoice],
                        }}
                        onClick={addTile}
                    >
                        Add New Tile
                    </div>
                )}
            </TileGrid>
        </DndContext>
    );
};
