/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';

import { TeaserTileBlock } from './TeaserTileBlock';

const TeaserTileBlockSelector = '[data-test-id="teaser-tile-block"]';

describe('TeaserTileBlock', () => {
    it('renders', () => {
        const [TeaserTileBlockWithStubs] = withAppBridgeBlockStubs(TeaserTileBlock, {});

        mount(<TeaserTileBlockWithStubs />);

        cy.get(TeaserTileBlockSelector).should('exist');
    });
});
