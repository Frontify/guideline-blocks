/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { BlockContainerStub } from '../../tests/BlockContainerStub';

const IMAGE_CONTAINER_TEST_ID = 'image-container';
const IMAGE_STAGE_TEST_ID = 'image-stage';
const IMAGE_ELEMENT_TEST_ID = 'image-element';

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

describe('BitmapContainerOperator', () => {
    it('centers the image element within a 400px stage', async () => {
        render(<BlockContainerStub height="400px" />);

        const stageElement = document.getElementById(IMAGE_STAGE_TEST_ID) as HTMLDivElement;
        const containerElement = document.getElementById(IMAGE_CONTAINER_TEST_ID) as HTMLDivElement;
        const imageElement = document.getElementById(IMAGE_ELEMENT_TEST_ID) as HTMLImageElement;

        mockBoundingClientRect(stageElement, 400, 400);
        mockBoundingClientRect(containerElement, 200, 200);
        mockBoundingClientRect(imageElement, 200, 200);

        fireEvent.load(imageElement);

        await waitFor(() => {
            expect(containerElement.style.left).toBe('200px');
            expect(containerElement.style.top).toBe('200px');
        });
    });

    it('centers the image element within a 700px stage', async () => {
        render(<BlockContainerStub height="700px" />);

        const stageElement = document.getElementById(IMAGE_STAGE_TEST_ID) as HTMLDivElement;
        const containerElement = document.getElementById(IMAGE_CONTAINER_TEST_ID) as HTMLDivElement;
        const imageElement = document.getElementById(IMAGE_ELEMENT_TEST_ID) as HTMLImageElement;

        mockBoundingClientRect(stageElement, 700, 700);
        mockBoundingClientRect(containerElement, 300, 300);
        mockBoundingClientRect(imageElement, 300, 300);

        fireEvent.load(imageElement);

        await waitFor(() => {
            expect(containerElement.style.left).toBe('350px');
            expect(containerElement.style.top).toBe('350px');
        });
    });

    it('centers the image element within a padded stage (padding=0.2)', async () => {
        render(<BlockContainerStub height="500px" padding={0.2} />);

        const stageElement = document.getElementById(IMAGE_STAGE_TEST_ID) as HTMLDivElement;
        const containerElement = document.getElementById(IMAGE_CONTAINER_TEST_ID) as HTMLDivElement;
        const imageElement = document.getElementById(IMAGE_ELEMENT_TEST_ID) as HTMLImageElement;

        mockBoundingClientRect(stageElement, 500, 500);
        mockBoundingClientRect(containerElement, 200, 200);
        mockBoundingClientRect(imageElement, 200, 200);

        fireEvent.load(imageElement);

        await waitFor(() => {
            expect(containerElement.style.left).toBe('250px');
            expect(containerElement.style.top).toBe('250px');
        });
    });
});
