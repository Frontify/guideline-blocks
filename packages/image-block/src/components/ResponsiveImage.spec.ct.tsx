/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset, AssetDummy } from '@frontify/app-bridge';
import { mount } from 'cypress/react18';
import { ResponsiveImage } from './ResponsiveImage';
import { ImageFormat } from '../types';

const ResponsiveImageSelector = '[data-test-id="image-block-img"]';

const HIGH_RES_ASSET: Asset = {
    ...AssetDummy.with(1),
    genericUrl: 'https://generic.url?width={width}',
    width: 2000,
    height: 1000,
};

describe('ResponsiveImage', () => {
    it('should render an image block', () => {
        mount(<ResponsiveImage image={HIGH_RES_ASSET} containerWidth={800} />);
        cy.get(ResponsiveImageSelector).should('exist');
    });

    it('should add the webp format and quality by default', () => {
        mount(<ResponsiveImage image={HIGH_RES_ASSET} containerWidth={800} />);
        cy.get(ResponsiveImageSelector).should(
            'have.attr',
            'src',
            'https://generic.url?width=800&format=webp&quality=100'
        );
    });

    it('should not add the webp format and quality if the image is a gif', () => {
        mount(<ResponsiveImage image={{ ...HIGH_RES_ASSET, extension: 'gif' }} containerWidth={800} />);
        cy.get(ResponsiveImageSelector).should('have.attr', 'src', 'https://origin.url');
    });

    it('should add the jpg format if requested', () => {
        mount(<ResponsiveImage format={ImageFormat.JPG} image={HIGH_RES_ASSET} containerWidth={800} />);
        cy.get(ResponsiveImageSelector).should(
            'have.attr',
            'src',
            'https://generic.url?width=800&format=jpg&quality=100'
        );
    });

    it('should add the quality that is provided', () => {
        mount(<ResponsiveImage quality={50} image={HIGH_RES_ASSET} containerWidth={800} />);
        cy.get(ResponsiveImageSelector).should(
            'have.attr',
            'src',
            'https://generic.url?width=800&format=webp&quality=50'
        );
    });

    it('should request the image width to match the container width', () => {
        mount(<ResponsiveImage image={HIGH_RES_ASSET} containerWidth={600} />);
        cy.get(ResponsiveImageSelector).should(
            'have.attr',
            'src',
            'https://generic.url?width=600&format=webp&quality=100'
        );
    });

    it('should take device pixel ratio into account', () => {
        cy.window().then((win) => {
            Object.defineProperty(win, 'devicePixelRatio', {
                value: 2,
                writable: true,
            });
            mount(<ResponsiveImage image={HIGH_RES_ASSET} containerWidth={600} />);
            cy.get(ResponsiveImageSelector).should(
                'have.attr',
                'src',
                'https://generic.url?width=1200&format=webp&quality=100'
            );
        });
    });

    it('should request original image width if container is bigger than that', () => {
        mount(<ResponsiveImage image={{ ...HIGH_RES_ASSET, width: 200, height: 200 }} containerWidth={600} />);
        cy.get(ResponsiveImageSelector).should(
            'have.attr',
            'src',
            'https://generic.url?width=200&format=webp&quality=100'
        );
    });

    it('should use original image width and height as attributes', () => {
        mount(<ResponsiveImage image={HIGH_RES_ASSET} containerWidth={800} />);
        cy.get(ResponsiveImageSelector).should('have.attr', 'width', '2000');
        cy.get(ResponsiveImageSelector).should('have.attr', 'height', '1000');
    });

    it('should use original image width as max height', () => {
        mount(<ResponsiveImage image={HIGH_RES_ASSET} containerWidth={800} />);
        cy.get(ResponsiveImageSelector).should('have.attr', 'style', 'max-width: 2000px;');
    });

    it('should add alt text', () => {
        mount(<ResponsiveImage altText="Frontify" image={AssetDummy.with(1)} containerWidth={800} />);
        cy.get(ResponsiveImageSelector).should('have.attr', 'alt', 'Frontify');
    });

    it('should have lazy loading enabled', () => {
        mount(<ResponsiveImage image={AssetDummy.with(1)} containerWidth={800} />);
        cy.get(ResponsiveImageSelector).should('have.attr', 'loading', 'lazy');
    });
});
