/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/fondue-tokens/styles';

import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';

import { Settings, TileHeight, TileSpacing, TileType } from './types';
import { TeaserTile } from './components/TeaserTile';
import { useMemo } from 'react';

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

const MOCK_TILES = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];

export const TeaserTileBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const height = blockSettings.height ? blockSettings.heightCustom : heightMap[blockSettings.heightChoice];
    const gridGap = blockSettings.spacing ? blockSettings.spacingCustom : spacingMap[blockSettings.spacingChoice];

    const tileProps: Record<TileType, any> = useMemo(
        () => ({
            [TileType.Text]: {
                height,
            },
            [TileType.Image]: {
                imageHeight: height,
            },
            [TileType.ImageText]: {
                imageHeight: height,
            },
        }),
        [height]
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
                <TeaserTile
                    id={id}
                    key={id}
                    appBridge={appBridge}
                    variant={blockSettings.type}
                    {...tileProps[blockSettings.type]}
                />
            ))}
        </div>
    );
};
