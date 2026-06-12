/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

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
    afterEach(() => {
        vi.restoreAllMocks();
    });

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

    it('removes the mousemove listener on destroy', () => {
        const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
        const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

        const imageStage = new ImageStage(document.createElement('div'));
        const handler = addEventListenerSpy.mock.calls.find(([type]) => type === 'mousemove')?.[1];

        imageStage.destroy();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', handler);
    });

    it('removes the scroll and resize listeners on destroy', () => {
        const addWindowEventListenerSpy = vi.spyOn(window, 'addEventListener');
        const removeWindowEventListenerSpy = vi.spyOn(window, 'removeEventListener');

        const imageStage = new ImageStage(document.createElement('div'));

        const scrollHandler = addWindowEventListenerSpy.mock.calls.find(([type]) => type === 'scroll')?.[1];
        const resizeHandler = addWindowEventListenerSpy.mock.calls.find(([type]) => type === 'resize')?.[1];

        imageStage.destroy();

        expect(removeWindowEventListenerSpy).toHaveBeenCalledWith('scroll', scrollHandler, true);
        expect(removeWindowEventListenerSpy).toHaveBeenCalledWith('resize', resizeHandler);
    });

    it('only recalculates boundaries after scroll or resize invalidates them', () => {
        const element = document.createElement('div');
        const getBoundingClientRectSpy = vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
            width: 200,
            height: 100,
            x: 0,
            y: 0,
            top: 0,
            left: 0,
            right: 200,
            bottom: 100,
            toJSON: vi.fn(),
        });

        const imageStage = new ImageStage(element);

        document.dispatchEvent(new MouseEvent('mousemove', { clientX: 50, clientY: 50 }));
        document.dispatchEvent(new MouseEvent('mousemove', { clientX: 60, clientY: 60 }));

        expect(getBoundingClientRectSpy).toHaveBeenCalledTimes(1);

        window.dispatchEvent(new Event('resize'));
        document.dispatchEvent(new MouseEvent('mousemove', { clientX: 70, clientY: 70 }));

        expect(getBoundingClientRectSpy).toHaveBeenCalledTimes(2);

        imageStage.destroy();
    });
});
