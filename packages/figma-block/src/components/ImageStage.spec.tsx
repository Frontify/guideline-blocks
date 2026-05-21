/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ImageStage } from './ImageStage';

const IMAGE_STAGE_ID = 'image-stage';

const ImageStageDivBlock = () => <div id={IMAGE_STAGE_ID}></div>;

const mockBoundingClientRect = (element: HTMLElement, width: number, height: number) => {
    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        width,
        height,
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: width,
        bottom: height,
        toJSON: vi.fn(),
    });
};

describe('ImageStage', () => {
    it('returns the correct width and height', () => {
        render(<ImageStageDivBlock />);

        const element = document.getElementById(IMAGE_STAGE_ID) as HTMLDivElement;
        mockBoundingClientRect(element, 200, 100);

        const imageStage = new ImageStage(element);

        expect(imageStage.height).toBe(100);
        expect(imageStage.width).toBe(200);
    });

    it('returns the correct aspect ratio', () => {
        render(<ImageStageDivBlock />);

        const element = document.getElementById(IMAGE_STAGE_ID) as HTMLDivElement;
        mockBoundingClientRect(element, 200, 100);

        const imageStage = new ImageStage(element);

        expect(imageStage.aspectRatio()).toBe(2);
    });

    it('correctly alters the height', () => {
        render(<ImageStageDivBlock />);

        const element = document.getElementById(IMAGE_STAGE_ID) as HTMLDivElement;

        const imageStage = new ImageStage(element);

        imageStage.alterHeight('300px');

        expect(element.style.height).toBe('300px');
    });
});
