/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BlockContainerStub } from '../../tests/BlockContainerStub';

const IMAGE_CONTAINER_ID = 'image-container';
const IMAGE_STAGE_ID = 'image-stage';
const IMAGE_ELEMENT_ID = 'image-element';

describe('BitmapContainerOperator', () => {
    it('renders image element with 400px height', () => {
        render(<BlockContainerStub height="400px" />);

        const stageElement = document.getElementById(IMAGE_STAGE_ID) as HTMLDivElement;
        const imageElement = document.getElementById(IMAGE_ELEMENT_ID) as HTMLImageElement;

        expect(stageElement).toBeInTheDocument();
        expect(imageElement).toBeInTheDocument();
    });

    it('renders image container with 700px height', () => {
        render(<BlockContainerStub height="700px" />);

        const stageElement = document.getElementById(IMAGE_STAGE_ID) as HTMLDivElement;
        const containerElement = document.getElementById(IMAGE_CONTAINER_ID) as HTMLDivElement;

        expect(stageElement).toBeInTheDocument();
        expect(containerElement).toBeInTheDocument();
    });

    it('renders element with padding 0.2 (in percentages)', () => {
        render(<BlockContainerStub height="500px" padding={0.2} />);

        const stageElement = document.getElementById(IMAGE_STAGE_ID) as HTMLDivElement;
        const containerElement = document.getElementById(IMAGE_CONTAINER_ID) as HTMLDivElement;

        expect(stageElement).toBeInTheDocument();
        expect(containerElement).toBeInTheDocument();
    });
});
