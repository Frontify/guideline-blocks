/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { Asset, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { TeaserTileBlock as TeaserTileBlockComponent } from './TeaserTileBlock';
import { Settings, TileColumns, TileSpacing } from './types';
import { defaultValues } from './settings';
import { spacingMap } from './helpers';

const TILE_GRID_ID = '[data-test-id="tile-grid"]';
const TEASER_TILE_ID = '[data-test-id="teaser-tile"]';
const TILE_IMAGE_TRIGGER_ID = '[data-test-id="tile-image-flyout-trigger"]';
const TILE_FLYOUT_ID = '[data-test-id="tile-settings-flyout"]';

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
        blockSettings: { ...defaultValues, ...blockSettings },
        editorState: isEditing,
        blockAssets,
    });

    return <TeaserTileBlockWithStubs />;
};

describe('TeaserTileBlock', () => {
    it('renders without crashing', () => {
        mount(<TeaserTileBlock />);

        cy.get(TILE_GRID_ID).should('exist');
    });

    it('populates columns on first render if empty', () => {
        mount(<TeaserTileBlock blockSettings={{ columns: 3 }} />);

        cy.get(TEASER_TILE_ID).should('have.length', 3);
    });

    it('displays correct number of columns', () => {
        for (const column of [1, 2, 3, 4]) {
            mount(
                <TeaserTileBlock blockSettings={{ columns: column as TileColumns, spacingChoice: TileSpacing.None }} />
            );

            cy.get(TILE_GRID_ID).should(($grid) => {
                const cols = $grid.css('gridTemplateColumns');
                console.log(cols);
                expect(cols?.match(/px/g)?.length).to.equal(column);
            });
        }
    });

    it('displays columns with spacing choice', () => {
        for (const spacingChoice of Object.values(TileSpacing)) {
            mount(<TeaserTileBlock blockSettings={{ spacingChoice }} />);

            cy.get(TILE_GRID_ID).should(
                'have.css',
                'gridGap',
                `${spacingMap[spacingChoice]} ${spacingMap[spacingChoice]}`
            );
        }
    });

    it('displays columns with custom spacing', () => {
        mount(<TeaserTileBlock blockSettings={{ isSpacingCustom: true, spacingCustom: '150px' }} />);

        cy.get(TILE_GRID_ID).should('have.css', 'gridGap', '150px 150px');
    });

    it('displays a flyout placeholder if in edit mode', () => {
        mount(<TeaserTileBlock isEditing blockSettings={{ columns: 1 }} />);

        cy.get(TILE_FLYOUT_ID).should('not.exist');
        cy.get(TILE_IMAGE_TRIGGER_ID).should('be.visible');
        cy.get(TILE_IMAGE_TRIGGER_ID).click();
        cy.get(TILE_FLYOUT_ID).should('be.visible');
    });

    it('displays a placeholder icon if in view mode', () => {
        mount(<TeaserTileBlock blockSettings={{ columns: 1 }} />);

        cy.get(TILE_FLYOUT_ID).should('not.exist');
        cy.get(TILE_IMAGE_TRIGGER_ID).should('be.visible');
        cy.get(TILE_IMAGE_TRIGGER_ID).click();
        cy.get(TILE_FLYOUT_ID).should('not.exist');
    });
});
