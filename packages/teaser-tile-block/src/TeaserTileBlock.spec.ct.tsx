/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { Asset, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { TeaserTileBlock as TeaserTileBlockComponent } from './TeaserTileBlock';
import {
    Settings,
    Tile,
    TileColumns,
    TileDisplay,
    TileHeight,
    TileHorizontalAlignment,
    TileImagePositioning,
    TilePadding,
    TileSpacing,
    TileType,
    TileVerticalAlignment,
} from './types';
import { defaultValues } from './settings';
import {
    heightMap,
    objectFitMap,
    paddingMap,
    radiusMap,
    spacingMap,
    twHorizontalAligmentMap,
    twPositioningMap,
    twVerticalAlignmentMap,
} from './helpers';
import { BorderStyle, Radius, toRgbaString } from '@frontify/guideline-blocks-shared';
import { INIT_TILE_SETTINGS } from './hooks';

const TILE_GRID_ID = '[data-test-id="tile-grid"]';
const TEASER_TILE_ID = '[data-test-id="teaser-tile"]';
const TILE_IMAGE_TRIGGER_ID = '[data-test-id="tile-image-flyout-trigger"]';
const TILE_FLYOUT_ID = '[data-test-id="tile-settings-flyout"]';
const TILE_IMAGE_ID = '[data-test-id="tile-image"]';
const TILE_TEXT_ID = '[data-test-id="tile-text"]';
const TILE_LINK_ID = '[data-test-id="tile-link"]';
const TILE_CONTENT_ID = '[data-test-id="tile-content"]';
const TILE_TITLE_ID = '[data-test-id="tile-title"]';
const TOOLBAR_SETTINGS_ID = '[data-test-id="tile-toolbar-settings"]';
const TOOLBAR_DELETE_ID = '[data-test-id="tile-toolbar-delete"]';
const TOOLBAR_DRAG_ID = '[data-test-id="tile-toolbar-drag"]';
const ADD_TILE_BUTTON_ID = '[data-test-id="add-tile"]';
const TILE_PLACEHOLDER_ID = '[data-test-id="tile-placeholder"]';
const ASSET_INPUT_ID = '[data-test-id="asset-input-placeholder"]';
const SLIDER_ID = '[data-test-id="slider"]';
const SWITCH_ID = '[data-test-id="switch"]';
const EDITABLE_RICH_TEXT_ID = '[contenteditable=true]';
const DISABLED_RICH_TEXT_ID = '[contenteditable=false]';

const BASE_COLOR = { red: 100, green: 150, blue: 200, alpha: 0.6 };

const TILES: Tile[] = [
    {
        id: '1',
        settings: { ...INIT_TILE_SETTINGS },
    },
];

const getMockAsset = (url: string) => ({
    id: Math.random() * 1000,
    genericUrl: url,
    previewUrl: url,
    creatorName: 'test',
    extension: 'jpg',
    fileName: 'testfile',
    externalUrl: url,
    title: 'title',
    objectType: 'image',
    status: 'FINISHED',
    height: '200px',
    width: '200px',
    originUrl: url,
    projectId: 1,
    fileSizeHumanReadable: '1mb',
    fileSize: 1024,
    fileId: 'id-1',
    token: 'token',
});

const ASSETS: Record<string, Asset[]> = {
    '1': [getMockAsset('https://picsum.photos/200/300')],
};

const TeaserTileBlock = ({
    blockSettings = {},
    isEditing = false,
    blockAssets = {},
}: {
    blockSettings?: Partial<Settings>;
    isEditing?: boolean;
    blockAssets?: Record<string, Asset[]>;
}) => {
    const [TeaserTileBlockWithStubs] = withAppBridgeBlockStubs(TeaserTileBlockComponent, {
        blockSettings: { ...defaultValues, ...{ columns: 1, tiles: TILES }, ...blockSettings },
        editorState: isEditing,
        blockAssets,
    });

    return (
        <div className="tw-pt-10">
            <TeaserTileBlockWithStubs />
        </div>
    );
};

describe('TeaserTileBlock', () => {
    it('renders without crashing', () => {
        mount(<TeaserTileBlock />);

        cy.get(TILE_GRID_ID).should('exist');
    });

    it('populates columns on first render if empty', () => {
        mount(<TeaserTileBlock blockSettings={{ columns: 3, tiles: undefined }} />);

        cy.get(TEASER_TILE_ID).should('have.length', 3);
    });

    it('displays correct number of columns', () => {
        for (const column of [1, 2, 3, 4]) {
            mount(
                <TeaserTileBlock
                    blockSettings={{
                        columns: column as TileColumns,
                        spacingChoice: TileSpacing.None,
                        tiles: undefined,
                    }}
                />
            );

            cy.get(TILE_GRID_ID).should(($grid) => {
                const cols = $grid.css('gridTemplateColumns');
                expect(cols?.match(/px/g)?.length).to.equal(column);
            });
        }
    });

    it('displays columns with spacing choice', () => {
        for (const spacingChoice of Object.values(TileSpacing)) {
            mount(<TeaserTileBlock blockSettings={{ spacingChoice, columns: 2 }} />);

            cy.get(TILE_GRID_ID).should(
                'have.css',
                'gridGap',
                `${spacingMap[spacingChoice]} ${spacingMap[spacingChoice]}`
            );
        }
    });

    it('displays columns with custom spacing', () => {
        mount(<TeaserTileBlock blockSettings={{ isSpacingCustom: true, spacingCustom: '150px', columns: 2 }} />);

        cy.get(TILE_GRID_ID).should('have.css', 'gridGap', '150px 150px');
    });

    it('displays a flyout placeholder if in edit mode', () => {
        mount(<TeaserTileBlock isEditing />);

        cy.get(TILE_FLYOUT_ID).should('not.exist');
        cy.get(TILE_IMAGE_TRIGGER_ID).should('be.visible');
        cy.get(TILE_IMAGE_TRIGGER_ID).click();
        cy.get(TILE_FLYOUT_ID).should('be.visible');
    });

    it('displays limited info in flyout if text type', () => {
        mount(<TeaserTileBlock isEditing blockSettings={{ type: TileType.Text }} />);

        cy.get(TOOLBAR_SETTINGS_ID).focus();
        cy.get(TOOLBAR_SETTINGS_ID).click();
        cy.get(TILE_FLYOUT_ID).should('be.visible');
        cy.get(ASSET_INPUT_ID).should('not.exist');
        cy.get(SLIDER_ID).should('not.exist');
    });

    it('deletes tile', () => {
        mount(<TeaserTileBlock isEditing blockSettings={{ type: TileType.Text }} />);

        cy.get(TOOLBAR_DELETE_ID).focus();
        cy.get(TOOLBAR_DELETE_ID).click();
        cy.get(TEASER_TILE_ID).should('not.exist');
    });

    it('drags tile with keyboard', () => {
        mount(
            <TeaserTileBlock
                isEditing
                blockSettings={{
                    type: TileType.Text,
                    tiles: [
                        { id: '1', settings: { ...INIT_TILE_SETTINGS, title: 'Tile 1' } },
                        { id: '2', settings: { ...INIT_TILE_SETTINGS, title: 'Tile 2' } },
                    ],
                    columns: 2,
                }}
            />
        );

        cy.get(TOOLBAR_DRAG_ID).first().focus().type('{enter}');
        cy.get(TEASER_TILE_ID).first().find(TILE_PLACEHOLDER_ID).should('be.visible');
        cy.get(TEASER_TILE_ID).should('have.length', 3);

        let dragCount = 0;
        while (dragCount < 10) {
            cy.get('body').type('{rightArrow}');
            dragCount++;
        }
        cy.get('body').type('{enter}');
        cy.get(TEASER_TILE_ID).should('have.length', 2);
        cy.get(TILE_TITLE_ID).first().should('have.text', 'Tile 2');
    });

    it('displays full info in flyout if imageText/image type', () => {
        mount(<TeaserTileBlock isEditing blockSettings={{ heightChoice: TileHeight.Medium }} />);

        cy.get(TILE_IMAGE_TRIGGER_ID).click();
        cy.get(TILE_FLYOUT_ID).should('be.visible');
        cy.get(ASSET_INPUT_ID).should('be.visible');
        cy.get(SLIDER_ID).should('be.visible');
    });

    it('displays a placeholder icon if in view mode', () => {
        mount(<TeaserTileBlock />);

        cy.get(TILE_FLYOUT_ID).should('not.exist');
        cy.get(TILE_IMAGE_TRIGGER_ID).should('be.visible');
        cy.get(TILE_IMAGE_TRIGGER_ID).click();
        cy.get(TILE_FLYOUT_ID).should('not.exist');
    });

    it('uses 1/1 aspect ratio for imagetext image if height is auto', () => {
        mount(<TeaserTileBlock blockSettings={{ tiles: TILES }} blockAssets={ASSETS} />);

        cy.get(TILE_IMAGE_ID).should('be.visible');
        cy.get(TILE_IMAGE_ID).should('have.css', 'aspectRatio', '1 / 1');
    });

    it('uses 3/4 aspect ratio for image image if height is auto', () => {
        mount(<TeaserTileBlock blockSettings={{ type: TileType.Image }} blockAssets={ASSETS} />);

        cy.get(TILE_IMAGE_ID).should('have.css', 'aspectRatio', '3 / 4');
    });

    it('uses height choice for image in image/imageText types', () => {
        for (const type of [TileType.Image, TileType.ImageText]) {
            for (const heightChoice of [TileHeight.Small, TileHeight.Medium, TileHeight.Large]) {
                mount(<TeaserTileBlock blockSettings={{ heightChoice, type }} blockAssets={ASSETS} />);

                cy.get(TILE_IMAGE_ID).should('have.css', 'height', heightMap[heightChoice]);
            }
        }
    });

    it('uses height choice for text in text type', () => {
        for (const heightChoice of [TileHeight.Large, TileHeight.Medium, TileHeight.Small]) {
            mount(<TeaserTileBlock blockSettings={{ heightChoice, type: TileType.Text }} blockAssets={ASSETS} />);

            cy.get(TILE_TEXT_ID).should('have.css', 'height', heightMap[heightChoice]);
        }
    });

    it('uses custom height for image in image/imageText types', () => {
        for (const type of [TileType.Image, TileType.ImageText]) {
            mount(
                <TeaserTileBlock
                    blockSettings={{ isHeightCustom: true, heightCustom: '150px', type }}
                    blockAssets={ASSETS}
                />
            );

            cy.get(TILE_IMAGE_ID).should('have.css', 'height', '150px');
        }
    });

    it('uses custom height for text in text type', () => {
        mount(
            <TeaserTileBlock
                blockSettings={{
                    isHeightCustom: true,
                    heightCustom: '150px',
                    type: TileType.Text,
                }}
                blockAssets={ASSETS}
            />
        );

        cy.get(TILE_TEXT_ID).should('have.css', 'height', '150px');
    });

    it('sets image objectFit to user choice when height is not auto', () => {
        for (const display of Object.values(TileDisplay)) {
            mount(
                <TeaserTileBlock blockSettings={{ display, heightChoice: TileHeight.Medium }} blockAssets={ASSETS} />
            );

            cy.get(TILE_IMAGE_ID).should('have.css', 'objectFit', objectFitMap[display]);
        }
    });

    it('sets image objectFit to cover when height is auto', () => {
        for (const display of Object.values(TileDisplay)) {
            mount(<TeaserTileBlock blockSettings={{ display }} blockAssets={ASSETS} />);

            cy.get(TILE_IMAGE_ID).should('have.css', 'objectFit', 'cover');
        }
    });

    it('uses padding choice for text in text/imageText types', () => {
        for (const type of [TileType.Text, TileType.ImageText]) {
            for (const paddingChoice of Object.values(TilePadding)) {
                mount(<TeaserTileBlock blockSettings={{ paddingChoice, type }} blockAssets={ASSETS} />);

                cy.get(TILE_TEXT_ID).should('have.css', 'padding', paddingMap[paddingChoice]);
            }
        }
    });

    it('uses custom padding for text in text/imageText types', () => {
        for (const type of [TileType.Text, TileType.ImageText]) {
            mount(
                <TeaserTileBlock
                    blockSettings={{ paddingCustom: '150px', isPaddingCustom: true, type }}
                    blockAssets={ASSETS}
                />
            );

            cy.get(TILE_TEXT_ID).should('have.css', 'padding', '150px');
        }
    });

    it('has editable title and description in edit mode', () => {
        mount(<TeaserTileBlock blockSettings={{ tiles: TILES }} blockAssets={ASSETS} isEditing />);

        cy.get(EDITABLE_RICH_TEXT_ID).should('have.length', 2);
    });

    it('has readonly title and description in edit mode', () => {
        mount(<TeaserTileBlock blockSettings={{ tiles: TILES }} blockAssets={ASSETS} isEditing />);

        cy.get(DISABLED_RICH_TEXT_ID).should('have.length', 2);
    });

    it('displays text to the top/right/bottom/left of image', () => {
        for (const positioning of [
            TileImagePositioning.Left,
            TileImagePositioning.Right,
            TileImagePositioning.Top,
            TileImagePositioning.Bottom,
        ]) {
            mount(<TeaserTileBlock blockSettings={{ positioning }} blockAssets={ASSETS} isEditing />);

            cy.get(TILE_CONTENT_ID).should('have.class', twPositioningMap[positioning]);
        }
    });

    it('displays text above image', () => {
        mount(
            <TeaserTileBlock
                blockSettings={{ positioning: TileImagePositioning.Behind }}
                blockAssets={ASSETS}
                isEditing
            />
        );

        cy.get(TILE_TEXT_ID).should('have.class', 'tw-absolute');
    });

    it('displays text with correct horizontal alignment when positioned relatively', () => {
        for (const horizontalAlignment of Object.values(TileHorizontalAlignment)) {
            mount(
                <TeaserTileBlock
                    blockSettings={{
                        horizontalAlignment,
                        verticalAlignment: TileVerticalAlignment.Bottom,
                    }}
                    blockAssets={ASSETS}
                    isEditing
                />
            );
            cy.get(TILE_TEXT_ID).should('have.class', twHorizontalAligmentMap[horizontalAlignment]);
            cy.get(TILE_TEXT_ID).should('have.css', 'justify-content', 'normal');
        }
    });

    it('displays text with correct vertical alignment when positioned absolutely', () => {
        for (const verticalAlignment of Object.values(TileVerticalAlignment)) {
            mount(
                <TeaserTileBlock
                    blockSettings={{
                        verticalAlignment,
                        horizontalAlignment: TileHorizontalAlignment.Right,
                        positioning: TileImagePositioning.Behind,
                    }}
                    blockAssets={ASSETS}
                    isEditing
                />
            );
            cy.get(TILE_TEXT_ID).should('have.css', 'textAlign', 'start');
            cy.get(TILE_TEXT_ID).should('have.class', twVerticalAlignmentMap[verticalAlignment]);
        }
    });

    it('displays text with default alignment on text type', () => {
        for (const horizontalAlignment of Object.values(TileHorizontalAlignment)) {
            mount(
                <TeaserTileBlock
                    blockSettings={{
                        horizontalAlignment,
                        type: TileType.Text,
                    }}
                    blockAssets={ASSETS}
                    isEditing
                />
            );
            cy.get(TILE_TEXT_ID).should('have.css', 'textAlign', 'start');
        }
        for (const verticalAlignment of Object.values(TileVerticalAlignment)) {
            mount(
                <TeaserTileBlock
                    blockSettings={{
                        verticalAlignment,
                        type: TileType.Text,
                    }}
                    blockAssets={ASSETS}
                    isEditing
                />
            );
            cy.get(TILE_TEXT_ID).should('have.css', 'justifyContent', 'normal');
        }
    });

    it('hides background styles if visibility is off', () => {
        mount(
            <TeaserTileBlock
                blockSettings={{
                    backgroundColor: BASE_COLOR,
                    isBackgroundVisible: false,
                }}
            />
        );

        cy.get(TILE_CONTENT_ID).should('have.css', 'backgroundColor', 'rgb(255, 255, 255)');
    });

    it('shows background if visibility is on', () => {
        mount(
            <TeaserTileBlock
                blockSettings={{
                    backgroundColor: BASE_COLOR,
                    isBackgroundVisible: true,
                }}
            />
        );

        cy.get(TILE_CONTENT_ID).should('have.css', 'backgroundColor', toRgbaString(BASE_COLOR));
    });

    it('applies border radius choice to tile and "add button"', () => {
        for (const radiusChoice of Object.values(Radius)) {
            mount(
                <TeaserTileBlock
                    blockSettings={{
                        backgroundColor: BASE_COLOR,
                        isBackgroundVisible: true,
                        radiusChoice,
                    }}
                    isEditing
                />
            );

            cy.get(TILE_CONTENT_ID).should('have.css', 'borderRadius', radiusMap[radiusChoice]);
            cy.get(ADD_TILE_BUTTON_ID).should('have.css', 'borderRadius', radiusMap[radiusChoice]);
        }
    });

    it('applies custom border radius to tile and "add button"', () => {
        mount(
            <TeaserTileBlock
                blockSettings={{
                    backgroundColor: BASE_COLOR,
                    isBackgroundVisible: true,
                    hasRadius: true,
                    radiusValue: '150px',
                }}
                isEditing
            />
        );

        cy.get(TILE_CONTENT_ID).should('have.css', 'borderRadius', '150px');
        cy.get(ADD_TILE_BUTTON_ID).should('have.css', 'borderRadius', '150px');
    });

    it('hides border if border is not selected', () => {
        mount(
            <TeaserTileBlock
                blockSettings={{
                    hasBorder: false,
                    borderColor: BASE_COLOR,
                    borderStyle: BorderStyle.Solid,
                    borderWidth: '1px',
                }}
                isEditing
            />
        );

        cy.get(TILE_CONTENT_ID).should('have.css', 'border', '0px solid rgb(0, 0, 0)');
    });

    it('shows border', () => {
        mount(
            <TeaserTileBlock
                blockSettings={{
                    hasBorder: true,
                    borderColor: BASE_COLOR,
                    borderStyle: BorderStyle.Solid,
                    borderWidth: '1px',
                }}
                isEditing
            />
        );

        cy.get(TILE_CONTENT_ID).should('have.css', 'border', `1px solid ${toRgbaString(BASE_COLOR)}`);
    });

    it('makes tile clickable if link is defined', () => {
        mount(
            <TeaserTileBlock
                blockSettings={{
                    tiles: [
                        {
                            id: '1',
                            settings: {
                                ...INIT_TILE_SETTINGS,
                                link: { href: 'https://www.example.com', target: '_blank' },
                            },
                        },
                    ],
                    backgroundColor: BASE_COLOR,
                    isBackgroundVisible: true,
                }}
            />
        );

        cy.get(TILE_LINK_ID).should('be.visible').and('have.attr', 'href', 'https://www.example.com');
    });

    it('displays "add tile" button in edit mode', () => {
        mount(<TeaserTileBlock isEditing blockSettings={{}} />);

        cy.get(ADD_TILE_BUTTON_ID).should('be.visible').click();
        cy.get(TEASER_TILE_ID).should('have.length', TILES.length + 1);
    });

    it('hides "add tile" button in view mode', () => {
        mount(<TeaserTileBlock blockSettings={{}} />);

        cy.get(ADD_TILE_BUTTON_ID).should('not.exist');
    });

    it('overwrites global data with tile-specific data', () => {
        mount(
            <TeaserTileBlock
                blockSettings={{
                    tiles: [
                        {
                            id: '1',
                            settings: {
                                ...INIT_TILE_SETTINGS,
                                isBackgroundVisible: true,
                                backgroundColor: BASE_COLOR,
                                display: TileDisplay.Fit,
                            },
                        },
                    ],
                    backgroundColor: undefined,
                    isBackgroundVisible: false,
                    display: TileDisplay.Fill,
                    heightChoice: TileHeight.Medium,
                }}
                blockAssets={ASSETS}
            />
        );

        cy.get(TILE_CONTENT_ID).should('have.css', 'backgroundColor', toRgbaString(BASE_COLOR));
        cy.get(TILE_IMAGE_ID).should('have.css', 'objectFit', objectFitMap[TileDisplay.Fit]);
    });
});
