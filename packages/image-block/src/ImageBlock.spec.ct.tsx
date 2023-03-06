/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { mount } from 'cypress/react';
import { ImageBlock } from './ImageBlock';
import { ATTACHMENTS_SETTING_ID, IMAGE_SETTING_ID } from './settings';
import {
    Alignment,
    CaptionPosition,
    Ratio,
    mapAlignmentClasses,
    mapCaptionPositionClasses,
    rationValues,
} from './types';

const ImageBlockSelector = '[data-test-id="image-block"]';
const ImageBlockImageWrapperSelector = '[data-test-id="image-block-img-wrapper"]';
const ImageBlockImageSelector = '[data-test-id="image-block-img"]';
const PlaceholderSelector = '[data-test-id="block-inject-button"]';
const DownloadSelector = '[data-test-id="attachments-download"]';
const AttachmentsSelector = '[data-test-id="attachments-flyout-button"]';

describe('Image Block', () => {
    it('renders an image block', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {});
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockSelector).should('exist');
    });

    it('should render a placeholder if in edit mode and there is no image uploaded yet', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, { editorState: true });
        mount(<ImageBlockWithStubs />);
        cy.get(PlaceholderSelector).should('exist');
    });

    it('should not render a placeholder if in view mode and there is no image uploaded yet', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {});
        mount(<ImageBlockWithStubs />);
        cy.get(PlaceholderSelector).should('not.exist');
    });

    it('should render the image if it is uploaded', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockAssets: {
                [IMAGE_SETTING_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockImageSelector).should('exist');
    });

    it('should render the download button if the image is uploaded', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockAssets: {
                [IMAGE_SETTING_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(DownloadSelector).should('exist');
    });

    it('should render the download button if the image is uploaded', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockAssets: {},
        });
        mount(<ImageBlockWithStubs />);
        cy.get(DownloadSelector).should('not.exist');
    });

    it('should render the attachments dropdown there are attachments uploaded', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockAssets: {
                [IMAGE_SETTING_ID]: [AssetDummy.with(1)],
                [ATTACHMENTS_SETTING_ID]: [AssetDummy.with(2)],
            },
            blockSettings: {
                [ATTACHMENTS_SETTING_ID]: [{ id: 2 }],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(AttachmentsSelector).should('exist');
    });

    it('should render the title if it is provided', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                name: 'Test Name',
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockSelector).should('contain.text', 'Test Name');
    });

    it('should render the description if it is provided', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                description: 'Test Description',
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockSelector).should('contain.text', 'Test Description');
    });

    it('should be a link if it is provided', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                hasLink: true,
                linkObject: {
                    link: { link: 'https://frontify.com' },
                },
            },
            blockAssets: {
                [IMAGE_SETTING_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockSelector).get('a').should('have.attr', 'href', 'https://frontify.com');
    });

    it('should add border if provided', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                hasBorder: true,
                borderWidth: '1px',
                borderColor: { r: 0, g: 0, b: 255 },
                borderStyle: 'solid',
            },
            blockAssets: {
                [IMAGE_SETTING_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockImageWrapperSelector).should('have.css', 'border', '1px solid rgb(0, 0, 255)');
    });

    it('should change layout according to provided positioning', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                positioning: CaptionPosition.Right,
            },
            blockAssets: {
                [IMAGE_SETTING_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockSelector).should('have.class', mapCaptionPositionClasses[CaptionPosition.Right]);
    });

    it('should change width according to provided ratio', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                ratio: Ratio.Ratio1To2,
            },
            blockAssets: {
                [IMAGE_SETTING_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockImageWrapperSelector).should('have.class', rationValues[Ratio.Ratio1To2]);
    });

    it('should add background color if provided', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                hasBackground: true,
                backgroundColor: { r: 0, g: 0, b: 255 },
            },
            blockAssets: {
                [IMAGE_SETTING_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockImageWrapperSelector).should('have.css', 'backgroundColor', 'rgb(0, 0, 255)');
    });

    it('should add padding provided', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                hasCustomPadding: true,
                paddingCustom: '16px',
            },
            blockAssets: {
                [IMAGE_SETTING_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockImageWrapperSelector).should('have.css', 'padding', '16px');
    });

    it('should add alignment of the image if provided', () => {
        const [ImageBlockWithStubs] = withAppBridgeBlockStubs(ImageBlock, {
            blockSettings: {
                alignment: Alignment.Right,
            },
            blockAssets: {
                [IMAGE_SETTING_ID]: [AssetDummy.with(1)],
            },
        });
        mount(<ImageBlockWithStubs />);
        cy.get(ImageBlockImageWrapperSelector).should('have.class', mapAlignmentClasses[Alignment.Right]);
    });
});
