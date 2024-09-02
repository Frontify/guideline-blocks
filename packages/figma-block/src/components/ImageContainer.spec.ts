/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';
import { ImageContainer } from './ImageContainer';
import { Cursor } from '../types';

describe('ImageContainer', () => {
    it('Changes the mouse cursor', () => {
        const imageContainer = {
            style: {
                cursor: 'default',
            },
        } as HTMLDivElement;

        new ImageContainer(imageContainer).changeMouseCursor(Cursor.GRAB);
        expect(imageContainer.style.cursor).toEqual(Cursor.GRAB);
    });

    it('Set the image container position', () => {
        const imageContainer = {
            style: {
                left: '0px',
                top: '0px',
            },
        } as HTMLDivElement;

        new ImageContainer(imageContainer).setImageContainerPosition(10, 10);
        expect(imageContainer.style).toEqual({
            left: '10px',
            top: '10px',
        });
    });

    it('Set the image container position', () => {
        const imageContainer = {
            style: {
                width: '0px',
                height: '0px',
            },
        } as HTMLDivElement;

        new ImageContainer(imageContainer).setImageContainerSize(300, 300);
        expect(imageContainer.style).toEqual({
            width: '300px',
            height: '300px',
        });
    });

    it('return the correct height', () => {
        const imageContainer = {
            clientHeight: 10,
        } as HTMLDivElement;

        const result = new ImageContainer(imageContainer).height;
        expect(result).toEqual(10);
    });

    it('return the correct width', () => {
        const imageContainer = {
            clientWidth: 10,
        } as HTMLDivElement;

        const result = new ImageContainer(imageContainer).width;
        expect(result).toEqual(10);
    });

    it('return the correct offsetLeft', () => {
        const imageContainer = {
            offsetLeft: 10,
        } as HTMLDivElement;

        const result = new ImageContainer(imageContainer).offsetLeft;
        expect(result).toEqual(10);
    });

    it('return the correct offsetTop', () => {
        const imageContainer = {
            offsetTop: 10,
        } as HTMLDivElement;

        const result = new ImageContainer(imageContainer).offsetTop;
        expect(result).toEqual(10);
    });

    it('return the itself', () => {
        const imageContainer = {
            offsetTop: 10,
            clientWidth: 100,
        } as HTMLDivElement;

        const expectedContainer = {
            offsetTop: 10,
            clientWidth: 100,
        } as HTMLDivElement;

        const result = new ImageContainer(imageContainer).node;
        expect(JSON.stringify(result)).toBe(JSON.stringify(expectedContainer));
    });
});
