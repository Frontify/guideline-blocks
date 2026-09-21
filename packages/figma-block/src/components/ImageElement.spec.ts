/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { ImageElement } from './ImageElement';

describe('ImageElement', () => {
    it('return the intrinsic height', () => {
        const imageElement = {
            naturalHeight: 1,
        } as HTMLImageElement;

        const result = new ImageElement(imageElement).height;
        expect(result).toEqual(1);
    });

    it('return the intrinsic width', () => {
        const imageElement = {
            naturalWidth: 1,
        } as HTMLImageElement;

        const result = new ImageElement(imageElement).width;
        expect(result).toEqual(1);
    });

    it('should show the container', () => {
        const imageElement = {
            style: {
                visibility: 'hidden',
            },
        } as HTMLImageElement;

        new ImageElement(imageElement).show();
        expect(imageElement.style.visibility).toEqual('visible');
    });

    it('should hide the container', () => {
        const imageElement = {
            style: {
                visibility: 'visible',
            },
        } as HTMLImageElement;

        new ImageElement(imageElement).hide();
        expect(imageElement.style.visibility).toEqual('hidden');
    });

    it('give the correct aspectRatio', () => {
        const imageElement = {
            naturalWidth: 1,
            naturalHeight: 2,
        } as HTMLImageElement;

        const result = new ImageElement(imageElement).aspectRatio();
        expect(result).toEqual(0.5);
    });

    it('give the correct aspectRatio when width is 0', () => {
        const imageElement = {
            naturalWidth: 0,
            naturalHeight: 2,
        } as HTMLImageElement;

        const result = new ImageElement(imageElement).aspectRatio();
        expect(result).toEqual(0);
    });

    it('ignores the rendered size so a collapsed container cannot latch the image at zero', () => {
        const imageElement = {
            width: 0,
            height: 0,
            naturalWidth: 1200,
            naturalHeight: 800,
        } as HTMLImageElement;

        const result = new ImageElement(imageElement);
        expect(result.width).toEqual(1200);
        expect(result.height).toEqual(800);
        expect(result.aspectRatio()).toEqual(1.5);
    });

    it('give the correct aspectRatio when height is 0', () => {
        const imageElement = {
            naturalWidth: 1,
            naturalHeight: 0,
        } as HTMLImageElement;

        const result = new ImageElement(imageElement).aspectRatio();
        expect(result).toEqual(0);
    });
});
