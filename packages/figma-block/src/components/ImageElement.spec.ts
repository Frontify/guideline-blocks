/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';
import { ImageElement } from './ImageElement';

describe('ImageElement', () => {
    it('return height', () => {
        const imageElement = {
            height: 1,
        } as HTMLImageElement;

        const result = new ImageElement(imageElement).height;
        expect(result).toEqual(1);
    });

    it('return width', () => {
        const imageElement = {
            width: 1,
        } as HTMLImageElement;

        const result = new ImageElement(imageElement).width;
        expect(result).toEqual(1);
    });

    it('show', () => {
        const imageElement = {
            style: {
                visibility: 'hidden',
            },
        } as HTMLImageElement;

        new ImageElement(imageElement).show();
        expect(imageElement.style.visibility).toEqual('visible');
    });

    it('hide', () => {
        const imageElement = {
            style: {
                visibility: 'visible',
            },
        } as HTMLImageElement;

        new ImageElement(imageElement).hide();
        expect(imageElement.style.visibility).toEqual('hidden');
    });

    it('aspectRatio', () => {
        const imageElement = {
            width: 1,
            height: 2,
        } as HTMLImageElement;

        const result = new ImageElement(imageElement).aspectRatio();
        expect(result).toEqual(0.5);
    });
});
