/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BlockContainerStub } from '../../tests/BlockContainerStub';

const IMAGE_CONTAINER_ID = 'image-container';

describe('VectorContainerOperator', () => {
    it('renders the image container', () => {
        render(<BlockContainerStub height="400px" />);

        const containerElement = document.getElementById(IMAGE_CONTAINER_ID) as HTMLDivElement;

        expect(containerElement).toBeInTheDocument();
    });

    it('moves image on mouse move', () => {
        render(<BlockContainerStub height="400px" />);

        const containerElement = document.getElementById(IMAGE_CONTAINER_ID) as HTMLDivElement;

        fireEvent.mouseDown(containerElement);
        fireEvent.mouseMove(containerElement, { buttons: 1, pageX: 300, pageY: 100 });
        fireEvent.mouseUp(containerElement);

        expect(containerElement).toBeInTheDocument();
    });
});
