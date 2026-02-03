/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { ImageElement } from './ImageElement';

describe('ImageElement', () => {
    it('return the correct height', () => {
        const imageElement = {
            height: 1,
        } as HTMLImageElement;

        const result = new ImageElement(imageElement).height;
        expect(result).toEqual(1);
    });

    it('return the correct width', () => {
        const imageElement = {
            width: 1,
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
            width: 1,
            height: 2,
        } as HTMLImageElement;

        const result = new ImageElement(imageElement).aspectRatio();
        expect(result).toEqual(0.5);
    });

    it('give the correct aspectRatio when width is 0', () => {
        const imageElement = {
            width: 0,
            height: 2,
        } as HTMLImageElement;

        const result = new ImageElement(imageElement).aspectRatio();
        expect(result).toEqual(0);
    });

    it('give the correct aspectRatio when height is 0', () => {
        const imageElement = {
            width: 1,
            height: 0,
        } as HTMLImageElement;

        const result = new ImageElement(imageElement).aspectRatio();
        expect(result).toEqual(0);
    });
});
