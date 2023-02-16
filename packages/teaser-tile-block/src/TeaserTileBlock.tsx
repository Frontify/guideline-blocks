/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/fondue-tokens/styles';

import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockAssets, useBlockSettings, useColorPalettes, useEditorState } from '@frontify/app-bridge';
import { merge } from '@frontify/fondue';
import { Settings } from './types';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { heightMap, radiusMap, spacingMap } from './helpers';
import { useDraggableGrid, useTileArray } from './hooks';
import { SortableTeaserTile, TeaserTile } from './components';

export const TeaserTileBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { tiles, addTile, removeTile, updateTile, reorderTiles } = useTileArray(blockSettings, setBlockSettings);
    const { dragContextProps, draggedBlock, draggingTileId } = useDraggableGrid(tiles, reorderTiles);

    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
    const isEditing = useEditorState(appBridge);
    const { colorPalettes } = useColorPalettes(appBridge);
    const gridGap = blockSettings.spacing ? blockSettings.spacingCustom : spacingMap[blockSettings.spacingChoice];

    const tileHeight = blockSettings.height ? blockSettings.heightCustom : heightMap[blockSettings.heightChoice];

    return (
        <DndContext {...dragContextProps}>
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
                <SortableContext items={tiles ?? []}>
                    {tiles.map(({ id, settings }) => (
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
                            blockAssets={blockAssets}
                            updateAssetIdsFromKey={updateAssetIdsFromKey}
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
                            blockAssets={blockAssets}
                            updateAssetIdsFromKey={updateAssetIdsFromKey}
                        />
                    ) : null}
                </DragOverlay>
                {isEditing && (
                    <div
                        className={merge([
                            'tw-transition tw-bg-base-alt tw-rounded tw-border-2 tw-h-full tw-border-dashed tw-border-line tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-box-neutral-hover',
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
