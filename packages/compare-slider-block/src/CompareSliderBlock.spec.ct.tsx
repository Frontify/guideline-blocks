/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { CompareSliderBlock } from './CompareSliderBlock';
import { convertToRteValue } from '@frontify/guideline-blocks-settings';
import { Height } from './types';

const CompareSliderBlockSelector = '[data-test-id="compare-slider-block"]';
const CompareSliderSelector = '[data-test-id="compare-slider-block-slider"]';
const BlockInjectButtonSelector = '[data-test-id="block-inject-button"]';
const LabelWrapperSelector = '[data-test-id="compare-slider-block-label-wrapper"]';
const StrikethroughWrapperSelector = '[data-test-id="compare-slider-block-strikethrough-wrapper"]';
const FirstAssetSelector = '[data-test-id="slider-item-first"]';
const SecondAssetSelector = '[data-test-id="slider-item-second"]';

describe('Compare Slider Block', () => {
    it('should render compare slider block', () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(CompareSliderBlock, {});

        mount(<CompareSliderBlockWithStubs />);
        cy.get(CompareSliderBlockSelector).should('exist');
    });

    it('should render upload buttons if there are no assets uploaded yet', () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(CompareSliderBlock, { editorState: true });

        mount(<CompareSliderBlockWithStubs />);
        cy.get(BlockInjectButtonSelector).should('have.length', 2);
    });

    it('should render upload buttons if there are is only one asset uploaded', () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: { firstAsset: [{ ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/200' }] },
            editorState: true,
        });

        mount(<CompareSliderBlockWithStubs />);
        cy.get(BlockInjectButtonSelector).should('have.length', 1);
    });

    it('should render the compare slider if there are two assets uploaded', () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [{ ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/200' }],
                secondAsset: [{ ...AssetDummy.with(2), previewUrl: 'https://picsum.photos/200/200' }],
            },
            editorState: true,
        });
        mount(<CompareSliderBlockWithStubs />);
        cy.get(CompareSliderSelector).should('exist');
    });

    it('should render label in view mode if content exists', () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [{ ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/200' }],
                secondAsset: [{ ...AssetDummy.with(2), previewUrl: 'https://picsum.photos/200/200' }],
            },
            blockSettings: {
                firstAssetLabel: convertToRteValue(undefined, 'first Asset Label'),
            },
            editorState: false,
        });
        mount(<CompareSliderBlockWithStubs />);
        cy.get('[data-test-id="rte-content-html"').should('have.text', 'first Asset Label');
    });

    it('should render 2 labels in view mode if content exists', () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [{ ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/200' }],
                secondAsset: [{ ...AssetDummy.with(2), previewUrl: 'https://picsum.photos/200/200' }],
            },
            blockSettings: {
                firstAssetLabel: convertToRteValue(undefined, 'Test'),
                secondAssetLabel: convertToRteValue(undefined, 'Test2'),
            },
            editorState: false,
        });
        mount(<CompareSliderBlockWithStubs />);
        cy.get('[data-test-id="rte-content-html"').should('contain', 'Test', 'Test2');
    });

    it('should render 2 labels in edit mode', () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [{ ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/200' }],
                secondAsset: [{ ...AssetDummy.with(2), previewUrl: 'https://picsum.photos/200/200' }],
            },
            editorState: true,
        });
        mount(<CompareSliderBlockWithStubs />);
        cy.get(LabelWrapperSelector).should('have.length', 2);
    });

    it('should render a strikethrough line', () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [{ ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/200' }],
                secondAsset: [{ ...AssetDummy.with(2), previewUrl: 'https://picsum.photos/200/200' }],
            },
            blockSettings: {
                firstAssetHasStrikethrough: true,
            },
        });
        mount(<CompareSliderBlockWithStubs />);
        cy.get(StrikethroughWrapperSelector).should('exist');
    });

    it('should render the alt texts', () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [{ ...AssetDummy.with(1), previewUrl: 'https://picsum.photos/200/200' }],
                secondAsset: [{ ...AssetDummy.with(2), previewUrl: 'https://picsum.photos/200/200' }],
            },
            blockSettings: {
                firstAssetAlt: 'First alt text',
                secondAssetAlt: 'Second alt text',
            },
        });
        mount(<CompareSliderBlockWithStubs />);
        cy.get(FirstAssetSelector).should('exist');
        cy.get(FirstAssetSelector).should('have.attr', 'alt', 'First alt text');
        cy.get(SecondAssetSelector).should('exist');
        cy.get(SecondAssetSelector).should('have.attr', 'alt', 'Second alt text');
    });

    it('should use the correct aspect ratio for the images if height is auto', () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [{ ...AssetDummy.with(1), height: 200, width: 100 }],
                secondAsset: [{ ...AssetDummy.with(2), width: 100, height: 200 }],
            },
            blockSettings: {
                height: Height.Auto,
            },
        });
        mount(<CompareSliderBlockWithStubs />);
        cy.get(CompareSliderBlockSelector).should('have.css', 'aspect-ratio', '0.5 / 1');
    });

    it('should not  aspect ratio for the images if height is set', () => {
        const [CompareSliderBlockWithStubs] = withAppBridgeBlockStubs(CompareSliderBlock, {
            blockAssets: {
                firstAsset: [{ ...AssetDummy.with(1), height: 200, width: 100 }],
                secondAsset: [{ ...AssetDummy.with(2), width: 100, height: 200 }],
            },
            blockSettings: {
                height: '200px',
            },
        });
        mount(<CompareSliderBlockWithStubs />);
        cy.get(CompareSliderBlockSelector).should('have.css', 'aspect-ratio', 'auto');
    });
});
