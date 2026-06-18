/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { BlockContainerStub } from '../../tests/BlockContainerStub';
import { type ImageContainer } from '../ImageContainer';
import { type ImageElement } from '../ImageElement';
import { type ImageStage } from '../ImageStage';

import { VectorContainerOperator } from './VectorContainerOperator';

const IMAGE_CONTAINER_TEST_ID = 'image-container';

describe('VectorContainerOperator', () => {
    afterEach(() => {
        vi.restoreAllMocks();
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

        fireEvent.mouseUp(document);

        expect(containerElement.style.left).toBe(`${initialLeft + 300}px`);
        expect(containerElement.style.top).toBe(`${initialTop + 100}px`);
    });

    it('removes event listeners on destroy', () => {
        const containerNode = document.createElement('div');

        const removeContainerEventListenerSpy = vi.spyOn(containerNode, 'removeEventListener');
        const removeDocumentEventListenerSpy = vi.spyOn(document, 'removeEventListener');

        const imageContainer = {
            node: containerNode,
            width: 100,
            height: 100,
            offsetLeft: 0,
            offsetTop: 0,
            setContainerToAbsolute: vi.fn(),
            changeMouseCursor: vi.fn(),
            setImageContainerSize: vi.fn(),
            setImageContainerPosition: vi.fn(),
        } as unknown as ImageContainer;

        const imageStage = {
            customHeight: '400px',
            alterHeight: vi.fn(),
            isPointInside: vi.fn().mockReturnValue(true),
        } as unknown as ImageStage;

        const imageElement = {
            hide: vi.fn(),
            show: vi.fn(),
        } as unknown as ImageElement;

        const operator = new VectorContainerOperator(imageContainer, imageStage, imageElement, false);

        operator.destroy();

        expect(removeContainerEventListenerSpy).toHaveBeenCalledWith('mouseover', expect.any(Function));
        expect(removeContainerEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
        expect(removeDocumentEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
        expect(removeDocumentEventListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
    });
});
