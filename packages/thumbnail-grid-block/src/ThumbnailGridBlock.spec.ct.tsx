/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react18';
import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { ThumbnailGridBlock } from './ThumbnailGridBlock';
import { CaptionPosition, HorizontalAlignment, Thumbnail, VerticalAlignment } from './types';
import { BorderStyle, GutterSpacing, Radius } from '@frontify/guideline-blocks-shared';

const ThumbnailGridBlockSelector = '[data-test-id="thumbnail-grid-block"]';
const ThumbnailCaption = '[data-test-id="thumbnail-rte"]';
const ThumbnailImageWrapper = '[data-test-id="thumbnail-image-wrapper"]';
const ThumbnailImage = '[data-test-id="thumbnail-image"]';
const ThumbnailImagePlaceholder = '[data-test-id="thumbnail-image-placeholder"]';
const ThumbnailItem = '[data-test-id="thumbnail-item"]';
const ThumbnailItemPlaceholder = '[data-test-id="thumbnail-item-placeholder"]';
const BlockItemWrapperBtn = '[data-test-id="block-item-wrapper-toolbar-btn"]';

const defaultSettings = {
    columnCount: '3',
    hasCustomSpacing: false,
    spacingCustom: '10px',
    spacingChoice: GutterSpacing.M,
    items: [],
    imagePosition: CaptionPosition.Right,
    hasCustomImageWidth: false,
    imageWidthPreset: '25%',
    verticalImageAlignment: VerticalAlignment.Start,
    hasBackground: false,
    backgroundColor: { red: 45, green: 50, blue: 50, alpha: 1, name: 'Background color' },
};

class ThumbnailDummy {
    static with(id = '1'): Thumbnail {
        return {
            id,
            title: `Title ${id}`,
            description: `Test Description ${id}`,
            image: id,
            altText: `A custom alt text ${id}`,
        };
    }
}

describe('Thumbnail Grid Block', () => {
    // BASIC states without images
    it('renders an empty thumbnail grid block with default settings', () => {
        const [ThumbnailGridBlockWithStubs] = withAppBridgeBlockStubs(ThumbnailGridBlock, {
            editorState: true,
            blockSettings: { ...defaultSettings },
        });

        mount(<ThumbnailGridBlockWithStubs />);
        cy.get(ThumbnailGridBlockSelector)
            .should('exist')
            .should('have.class', 'xs:tw-grid-cols-2 md:tw-grid-cols-3')
            .should('have.css', 'gap', '30px');
        cy.get(ThumbnailItem).should('not.exist');
        cy.get(ThumbnailImage).should('not.exist');
        cy.get(ThumbnailImagePlaceholder).should('exist');
        cy.get(ThumbnailImageWrapper).should('have.class', 'tw-place-self-start');
        cy.get(ThumbnailItemPlaceholder).should('have.class', 'tw-flex-row');
    });

    it('should render one item if it is provided', () => {
        const [ThumbnailGridBlockWithStubs] = withAppBridgeBlockStubs(ThumbnailGridBlock, {
            editorState: true,
            blockSettings: {
                items: [ThumbnailDummy.with('1')],
            },
        });
        mount(<ThumbnailGridBlockWithStubs />);
        cy.get(ThumbnailCaption).first().should('contain.text', 'Title', 'Test Description');
        cy.get(ThumbnailItemPlaceholder).should('exist');
    });

    it('should not render the item in view mode if no image is provided', () => {
        const [ThumbnailGridBlockWithStubs] = withAppBridgeBlockStubs(ThumbnailGridBlock, {
            editorState: false,
            blockSettings: {
                items: [ThumbnailDummy.with('1')],
            },
        });
        mount(<ThumbnailGridBlockWithStubs />);
        cy.get(ThumbnailCaption).should('not.exist');
        cy.get(ThumbnailItem).should('not.be.visible');
        cy.get(ThumbnailItemPlaceholder).should('not.exist');
    });

    it('should render multiple items in edit mode if provided', () => {
        const [ThumbnailGridBlockWithStubs] = withAppBridgeBlockStubs(ThumbnailGridBlock, {
            editorState: true,
            blockSettings: {
                ...defaultSettings,
                items: [ThumbnailDummy.with('1'), ThumbnailDummy.with('2')],
            },
        });
        mount(<ThumbnailGridBlockWithStubs />);
        cy.get(ThumbnailCaption).should('have.length', 3);
        cy.get(ThumbnailItem).should('have.length', 2);
        cy.get(ThumbnailItemPlaceholder).should('have.length', 1);
    });

    // IMAGES
    it('should render multiple items with images in view mode', () => {
        const [ThumbnailGridBlockWithStubs] = withAppBridgeBlockStubs(ThumbnailGridBlock, {
            editorState: false,
            blockSettings: {
                ...defaultSettings,
                items: [ThumbnailDummy.with('1'), ThumbnailDummy.with('2')],
            },
            blockAssets: {
                ['1']: [AssetDummy.with(1)],
                ['2']: [AssetDummy.with(2)],
            },
        });
        mount(<ThumbnailGridBlockWithStubs />);
        cy.get(ThumbnailCaption)
            .should('have.length', 2)
            .should('contain.text', 'Title 1', 'Title 2')
            .should('contain.text', 'Test Description 1', 'Test Description 2');
        cy.get(ThumbnailItem).should('have.length', 2);
        cy.get(ThumbnailImage).should('have.length', 2).first().should('have.attr', 'src', 'https://generic.url');
        cy.get(ThumbnailImagePlaceholder).should('not.exist');
    });

    it('should render the image styles if they are provided', () => {
        const [ThumbnailGridBlockWithStubs] = withAppBridgeBlockStubs(ThumbnailGridBlock, {
            editorState: false,
            blockSettings: {
                ...defaultSettings,
                items: [ThumbnailDummy.with('1')],
                height: '50%',
                radiusValue: '12px',
                hasRadius: false,
                radiusChoice: Radius.Medium,
                hasCustomImageWidth: true,
                customImageWidth: '34%',
                imageWidthPreset: '50%',
                hasBackground: true,
                backgroundColor: { red: 0, green: 0, blue: 0, alpha: 1, name: 'black' },
                hasBorder: true,
                borderStyle: BorderStyle.Dashed,
                borderWidth: '2px',
                borderColor: { red: 255, green: 255, blue: 255, alpha: 1, name: 'white' },
            },
            blockAssets: {
                ['1']: [AssetDummy.with(1)],
            },
        });
        mount(<ThumbnailGridBlockWithStubs />);
        cy.get(ThumbnailImageWrapper).should('have.attr', 'style', 'width: 34%;');
        cy.get(ThumbnailImage)
            .should('have.css', 'border', '2px dashed rgb(255, 255, 255)')
            .should('have.css', 'backgroundColor', 'rgb(0, 0, 0)')
            .should('have.css', 'borderRadius', '4px');
    });

    it('it should render a custom alt text', () => {
        const [ThumbnailGridBlockWithStubs] = withAppBridgeBlockStubs(ThumbnailGridBlock, {
            editorState: true,
            blockSettings: {
                ...defaultSettings,
                items: [ThumbnailDummy.with('1')],
            },
            blockAssets: {
                ['1']: [AssetDummy.with(1)],
            },
        });
        mount(<ThumbnailGridBlockWithStubs />);
        cy.get(ThumbnailImage)
            .first()
            .should('have.attr', 'alt', 'A custom alt text 1')
            .should('have.attr', 'src', 'https://generic.url');
        cy.get(ThumbnailImage).first().click();
    });

    // ALIGNMENT
    it('should render the image alignment in horizontal caption alignment', () => {
        const [ThumbnailGridBlockWithStubs] = withAppBridgeBlockStubs(ThumbnailGridBlock, {
            editorState: true,
            blockSettings: {
                ...defaultSettings,
                items: [ThumbnailDummy.with('1')],
                imagePosition: CaptionPosition.Left,
                verticalImageAlignment: VerticalAlignment.Center,
                horizontalImageAlignment: HorizontalAlignment.Left,
            },
            blockAssets: {
                ['1']: [AssetDummy.with(1)],
            },
        });
        mount(<ThumbnailGridBlockWithStubs />);
        cy.get(ThumbnailItem).should('have.class', 'tw-flex-row-reverse');
        cy.get(ThumbnailImageWrapper).should('have.class', 'tw-place-self-center');
    });

    it('should render the image alignment in vertical caption alignment', () => {
        const [ThumbnailGridBlockWithStubs] = withAppBridgeBlockStubs(ThumbnailGridBlock, {
            editorState: false,
            blockSettings: {
                ...defaultSettings,
                items: [ThumbnailDummy.with('1')],
                imagePosition: CaptionPosition.Above,
                verticalImageAlignment: VerticalAlignment.Start,
                horizontalImageAlignment: HorizontalAlignment.Right,
            },
            blockAssets: {
                ['1']: [AssetDummy.with(1)],
            },
        });
        mount(<ThumbnailGridBlockWithStubs />);
        cy.get(ThumbnailItem).should('have.class', 'tw-flex-col-reverse tw-justify-end');
        cy.get(ThumbnailImageWrapper)
            .should('have.class', 'tw-grid tw-justify-items-end tw-w-full')
            .should('not.have.class', 'tw-flex-col');
        cy.get(ThumbnailImagePlaceholder).should('not.exist');
    });

    // ADDING ITEMS
    it('should add an item by adding a text in the title', () => {
        const [ThumbnailGridBlockWithStubs] = withAppBridgeBlockStubs(ThumbnailGridBlock, {
            editorState: true,
            blockSettings: {
                ...defaultSettings,
            },
        });
        mount(<ThumbnailGridBlockWithStubs />);
        cy.get(ThumbnailImagePlaceholder).should('have.length', 1);
        cy.get(ThumbnailCaption).first().click().type('Test Title');
        cy.get(ThumbnailImageWrapper).click('left');
        cy.get(ThumbnailCaption).should('have.length', 2);
    });

    it('should add an item by adding a text in the description', () => {
        const [ThumbnailGridBlockWithStubs] = withAppBridgeBlockStubs(ThumbnailGridBlock, {
            editorState: true,
            blockSettings: {
                ...defaultSettings,
            },
        });
        mount(<ThumbnailGridBlockWithStubs />);
        cy.get(ThumbnailCaption).should('have.length', 1);
        cy.get(ThumbnailCaption).get('[contenteditable=true]').eq(1).click().type('Test Description');
        cy.get(ThumbnailImageWrapper).click('left');
        cy.get(ThumbnailCaption).should('have.length', 2);
    });

    it('should delete an item by clicking the delete toolbar button', () => {
        const [ThumbnailGridBlockWithStubs] = withAppBridgeBlockStubs(ThumbnailGridBlock, {
            editorState: true,
            blockSettings: {
                ...defaultSettings,
                items: [ThumbnailDummy.with('1'), ThumbnailDummy.with('2')],
            },
            blockAssets: {
                ['1']: [AssetDummy.with(1)],
                ['2']: [AssetDummy.with(2)],
            },
        });
        mount(
            <div className="tw-mt-12">
                <ThumbnailGridBlockWithStubs />
            </div>
        );
        cy.get(ThumbnailCaption).should('have.length', 3);
        cy.get(ThumbnailCaption).first().click();
        cy.get(BlockItemWrapperBtn).eq(1).click();
        cy.get(ThumbnailCaption).should('have.length', 2);
    });

    it('should move the first item to fifth position by keyboard', () => {
        const [ThumbnailGridBlockWithStubs] = withAppBridgeBlockStubs(ThumbnailGridBlock, {
            editorState: true,
            blockSettings: {
                ...defaultSettings,
                items: [
                    ThumbnailDummy.with('1'),
                    ThumbnailDummy.with('2'),
                    ThumbnailDummy.with('3'),
                    ThumbnailDummy.with('4'),
                    ThumbnailDummy.with('5'),
                    ThumbnailDummy.with('6'),
                ],
            },
            blockAssets: {
                ['1']: [AssetDummy.with(1)],
                ['2']: [AssetDummy.with(2)],
                ['3']: [AssetDummy.with(3)],
                ['4']: [AssetDummy.with(4)],
                ['5']: [AssetDummy.with(5)],
                ['6']: [AssetDummy.with(6)],
            },
        });
        mount(
            <div className="tw-mt-12">
                <ThumbnailGridBlockWithStubs />
            </div>
        );

        cy.get(ThumbnailItem)
            .first()
            .then((first) => {
                cy.wrap(first).parent().find(BlockItemWrapperBtn).eq(0).focus();
                cy.realPress('Enter');
                cy.realPress('ArrowDown');
                cy.realPress('ArrowRight');
                cy.realPress('Enter');
                cy.get(ThumbnailItem)
                    .eq(4)
                    .then((fifth) => {
                        expect(fifth.get(0).textContent).contains(first.get(0).textContent);
                    });
            });
    });

    it('should move the fifth position to first by keyboard', () => {
        const [ThumbnailGridBlockWithStubs] = withAppBridgeBlockStubs(ThumbnailGridBlock, {
            editorState: true,
            blockSettings: {
                ...defaultSettings,
                items: [
                    ThumbnailDummy.with('1'),
                    ThumbnailDummy.with('2'),
                    ThumbnailDummy.with('3'),
                    ThumbnailDummy.with('4'),
                    ThumbnailDummy.with('5'),
                    ThumbnailDummy.with('6'),
                ],
            },
            blockAssets: {
                ['1']: [AssetDummy.with(1)],
                ['2']: [AssetDummy.with(2)],
                ['3']: [AssetDummy.with(3)],
                ['4']: [AssetDummy.with(4)],
                ['5']: [AssetDummy.with(5)],
                ['6']: [AssetDummy.with(6)],
            },
        });
        mount(
            <div className="tw-mt-12">
                <ThumbnailGridBlockWithStubs />
            </div>
        );

        cy.get(ThumbnailItem)
            .eq(4)
            .then((fifth) => {
                cy.wrap(fifth).parent().find(BlockItemWrapperBtn).eq(0).focus();
                cy.realPress('Enter');
                cy.realPress('ArrowUp');
                cy.realPress('ArrowLeft');
                cy.realPress('Enter');
                cy.get(ThumbnailItem)
                    .first()
                    .then((first) => {
                        expect(first.get(0).textContent).contains(fifth.get(0).textContent);
                    });
            });
    });
});
