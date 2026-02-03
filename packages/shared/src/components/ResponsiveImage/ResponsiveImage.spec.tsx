/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset, AssetDummy } from '@frontify/app-bridge';
import { fireEvent, render } from '@testing-library/react';
// eslint-disable-next-line no-restricted-syntax
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import { ImageFormat } from '../../types';

import { ResponsiveImage } from './ResponsiveImage';

const ResponsiveImageSelector = 'responsive-image';

const HIGH_RES_ASSET: Asset = {
    ...AssetDummy.with(1),
    genericUrl: 'https://generic.url?width={width}',
    width: 2000,
    height: 1000,
};

describe('ResponsiveImage', () => {
    it('should render an image block', () => {
        const { getByTestId } = render(<ResponsiveImage image={HIGH_RES_ASSET} containerWidth={800} alt="" />);
        expect(getByTestId(ResponsiveImageSelector)).toBeTruthy();
    });

    it('should add the webp format and quality by default', () => {
        const { getByTestId } = render(<ResponsiveImage image={HIGH_RES_ASSET} containerWidth={800} alt="" />);
        expect(getByTestId(ResponsiveImageSelector).getAttribute('src')).toBe(
            'https://generic.url?width=800&format=webp&quality=100'
        );
    });

    it('should not add the webp format and quality if the image is a gif', () => {
        const { getByTestId } = render(
            <ResponsiveImage image={{ ...HIGH_RES_ASSET, extension: 'gif' }} containerWidth={800} alt="" />
        );
        expect(getByTestId(ResponsiveImageSelector).getAttribute('src')).toBe('https://origin.url');
    });

    it('should add the jpg format if requested', () => {
        const { getByTestId } = render(
            <ResponsiveImage format={ImageFormat.JPG} image={HIGH_RES_ASSET} containerWidth={800} alt="" />
        );
        expect(getByTestId(ResponsiveImageSelector).getAttribute('src')).toBe(
            'https://generic.url?width=800&format=jpg&quality=100'
        );
    });

    it('should add the quality that is provided', () => {
        const { getByTestId } = render(
            <ResponsiveImage quality={50} image={HIGH_RES_ASSET} containerWidth={800} alt="" />
        );
        expect(getByTestId(ResponsiveImageSelector).getAttribute('src')).toBe(
            'https://generic.url?width=800&format=webp&quality=50'
        );
    });

    it('should request the image width to match the container width', () => {
        const { getByTestId } = render(<ResponsiveImage image={HIGH_RES_ASSET} containerWidth={600} alt="" />);
        expect(getByTestId(ResponsiveImageSelector).getAttribute('src')).toBe(
            'https://generic.url?width=600&format=webp&quality=100'
        );
    });

    it('should take device pixel ratio into account', () => {
        Object.defineProperty(window, 'devicePixelRatio', {
            value: 2,
            writable: true,
        });
        const { getByTestId } = render(<ResponsiveImage image={HIGH_RES_ASSET} containerWidth={600} alt="" />);
        expect(getByTestId(ResponsiveImageSelector).getAttribute('src')).toBe(
            'https://generic.url?width=1200&format=webp&quality=100'
        );
    });

    it('should request original image width if container is bigger than that', () => {
        const { getByTestId } = render(
            <ResponsiveImage image={{ ...HIGH_RES_ASSET, width: 200, height: 200 }} containerWidth={600} alt="" />
        );
        expect(getByTestId(ResponsiveImageSelector).getAttribute('src')).toBe(
            'https://generic.url?width=200&format=webp&quality=100'
        );
    });

    it('should use original image width and height as attributes', () => {
        const { getByTestId } = render(<ResponsiveImage image={HIGH_RES_ASSET} containerWidth={800} alt="" />);
        expect(getByTestId(ResponsiveImageSelector).getAttribute('width')).toBe('2000');
        expect(getByTestId(ResponsiveImageSelector).getAttribute('height')).toBe('1000');
    });

    it('should set aspect-ratio to imageWidth/imageHeight if user set one is auto', () => {
        const { getByTestId } = render(
            <ResponsiveImage image={HIGH_RES_ASSET} containerWidth={800} alt="" style={{ aspectRatio: 'auto' }} />
        );
        const img = getByTestId(ResponsiveImageSelector);

        expect(img.getAttribute('style')).toContain('aspect-ratio: 2000 / 1000');
    });

    it('should pass through aspect-ratio any ratio different than auto', () => {
        const { getByTestId } = render(
            <ResponsiveImage image={HIGH_RES_ASSET} containerWidth={800} alt="" style={{ aspectRatio: '1/2' }} />
        );
        const img = getByTestId(ResponsiveImageSelector);

        expect(img.getAttribute('style')).toContain('aspect-ratio: 1 / 2');
    });

    it('should use provided style', () => {
        const { getByTestId } = render(
            <ResponsiveImage image={HIGH_RES_ASSET} containerWidth={800} style={{ maxWidth: 2000 }} alt="" />
        );
        expect(getByTestId(ResponsiveImageSelector).getAttribute('style')).toContain('max-width: 2000px;');
    });

    it('should use provided classnames', () => {
        const { getByTestId } = render(
            <ResponsiveImage image={HIGH_RES_ASSET} containerWidth={800} className="test-class" alt="" />
        );
        expect(getByTestId(ResponsiveImageSelector).getAttribute('class')).toBe(
            'tw-flex tw-w-full tw-bg-box-neutral test-class'
        );
    });

    it('should remove placeholder after load', () => {
        const { getByTestId } = render(
            <ResponsiveImage image={HIGH_RES_ASSET} containerWidth={800} className="test-class" alt="" />
        );

        expect(getByTestId(ResponsiveImageSelector).getAttribute('class')).toBe(
            'tw-flex tw-w-full tw-bg-box-neutral test-class'
        );

        const img = getByTestId(ResponsiveImageSelector);
        fireEvent.load(img);
        expect(img.getAttribute('class')).toBe('tw-flex tw-w-full test-class');
    });

    it('should add alt text', () => {
        const { getByTestId } = render(
            <ResponsiveImage alt="Frontify" image={AssetDummy.with(1)} containerWidth={800} />
        );
        expect(getByTestId(ResponsiveImageSelector).getAttribute('alt')).toBe('Frontify');
    });

    it('should have lazy loading enabled', () => {
        const { getByTestId } = render(<ResponsiveImage image={AssetDummy.with(1)} containerWidth={800} alt="" />);
        expect(getByTestId(ResponsiveImageSelector).getAttribute('loading')).toBe('lazy');
    });
});
