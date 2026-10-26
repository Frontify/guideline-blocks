/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { BlockContainerStub } from '../../tests/BlockContainerStub';

const IMAGE_CONTAINER_TEST_ID = 'image-container';
const IMAGE_STAGE_TEST_ID = 'image-stage';
const IMAGE_ELEMENT_TEST_ID = 'image-element';

type Size = { width: number; height: number };

// Must run before render: happy-dom decodes data: URLs synchronously, so the image's load event
// (and the stub's layout effect) fire during render. happy-dom has no layout engine, so the
// container reports the size it was styled with.
const mockLayout = ({ stage, image }: { stage: Size; image: Size }) => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
        const { width, height } = this.id === IMAGE_STAGE_TEST_ID ? stage : { width: 0, height: 0 };
        return { width, height, x: 0, y: 0, top: 0, left: 0, right: width, bottom: height, toJSON: vi.fn() };
    });
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function (this: HTMLElement) {
        return parseFloat(this.style.width) || 0;
    });
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(function (this: HTMLElement) {
        return parseFloat(this.style.height) || 0;
    });
    vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(image.width);
    vi.spyOn(HTMLImageElement.prototype, 'naturalHeight', 'get').mockReturnValue(image.height);
};

const renderStub = (props: { height: string; padding?: number }) => {
    render(<BlockContainerStub {...props} />);
    fireEvent.load(document.getElementById(IMAGE_ELEMENT_TEST_ID) as HTMLImageElement);
    return document.getElementById(IMAGE_CONTAINER_TEST_ID) as HTMLDivElement;
};

describe('BitmapContainerOperator', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should center the image element horizontally within a wide 400px stage', async () => {
        mockLayout({ stage: { width: 800, height: 400 }, image: { width: 200, height: 200 } });

        const containerElement = renderStub({ height: '400px' });

        await waitFor(() => {
            expect(containerElement.style.width).toBe('400px');
            expect(containerElement.style.height).toBe('400px');
            expect(containerElement.style.left).toBe('200px');
            expect(containerElement.style.top).toBe('0px');
        });
    });

    it('should center a wide image element vertically within a 700px stage', async () => {
        mockLayout({ stage: { width: 700, height: 700 }, image: { width: 1400, height: 700 } });

        const containerElement = renderStub({ height: '700px' });

        await waitFor(() => {
            expect(containerElement.style.width).toBe('700px');
            expect(containerElement.style.height).toBe('350px');
            expect(containerElement.style.left).toBe('0px');
            expect(containerElement.style.top).toBe('175px');
        });
    });

    it('should center the image element within a padded stage (padding=0.2)', async () => {
        mockLayout({ stage: { width: 500, height: 500 }, image: { width: 200, height: 200 } });

        const containerElement = renderStub({ height: '500px', padding: 0.2 });

        await waitFor(() => {
            expect(containerElement.style.width).toBe('400px');
            expect(containerElement.style.height).toBe('400px');
            expect(containerElement.style.left).toBe('50px');
            expect(containerElement.style.top).toBe('50px');
        });
    });
});
