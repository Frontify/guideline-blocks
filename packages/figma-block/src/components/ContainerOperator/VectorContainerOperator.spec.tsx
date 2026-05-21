/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BlockContainerStub } from '../../tests/BlockContainerStub';

const IMAGE_CONTAINER_TEST_ID = 'image-container';

describe('VectorContainerOperator', () => {
    it('renders the image container', () => {
        render(<BlockContainerStub height="400px" />);

        const containerElement = document.getElementById(IMAGE_CONTAINER_TEST_ID) as HTMLDivElement;

        expect(containerElement).toBeInTheDocument();
    });

    it('moves image on mouse move', () => {
        render(<BlockContainerStub height="400px" />);

        const containerElement = document.getElementById(IMAGE_CONTAINER_TEST_ID) as HTMLDivElement;
        const imageElement = document.getElementById('image-element') as HTMLImageElement;

        fireEvent.load(imageElement);

        const initialLeft = parseInt(containerElement.style.left, 10) || 0;
        const initialTop = parseInt(containerElement.style.top, 10) || 0;

        fireEvent.mouseDown(containerElement, { pageX: 0, pageY: 0 });

        const mouseMoveEvent = new MouseEvent('mousemove', { bubbles: true, buttons: 1 });
        Object.defineProperty(mouseMoveEvent, 'pageX', { value: 300 });
        Object.defineProperty(mouseMoveEvent, 'pageY', { value: 100 });
        document.dispatchEvent(mouseMoveEvent);

        fireEvent.mouseUp(containerElement);

        expect(containerElement.style.left).toBe(`${initialLeft + 300}px`);
        expect(containerElement.style.top).toBe(`${initialTop + 100}px`);
    });
});
