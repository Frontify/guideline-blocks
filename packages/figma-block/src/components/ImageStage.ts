/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type BoundingClientRectProperties } from '../types';

import { MouseProperties } from './MouseProperties';

export class ImageStage {
    public isMouseInsideImageStage = false;
    private boundaries: BoundingClientRectProperties;
    private boundariesDirty = false;

    constructor(
        protected imageStage: HTMLDivElement,
        public customHeight = '0px'
    ) {
        this.boundaries = this.getBoundaries();

        document.addEventListener('mousemove', this.checkIfMouseIsInside);
        window.addEventListener('scroll', this.invalidateBoundaries, true);
        window.addEventListener('resize', this.invalidateBoundaries);
    }

    private readonly invalidateBoundaries = () => {
        this.boundariesDirty = true;
    };

    private readonly checkIfMouseIsInside = (event: MouseEvent) => {
        const currentMousePosition = MouseProperties.getCurrentPosition(event);

        if (this.boundariesDirty) {
            this.boundaries = this.getBoundaries();
            this.boundariesDirty = false;
        }

        this.isMouseInsideImageStage =
            currentMousePosition.x > this.boundaries.left &&
            currentMousePosition.x < this.boundaries.right &&
            currentMousePosition.y > this.boundaries.top &&
            currentMousePosition.y < this.boundaries.bottom;
    };

    private getBoundaries(): BoundingClientRectProperties {
        return this.imageStage.getBoundingClientRect();
    }

    get height(): number {
        return this.boundaries.height;
    }

    get width(): number {
        return this.boundaries.width;
    }

    public alterHeight(height: string) {
        this.imageStage.style.height = height;
        this.boundaries = this.getBoundaries();
        this.boundariesDirty = false;
    }

    public destroy(): void {
        document.removeEventListener('mousemove', this.checkIfMouseIsInside);
        window.removeEventListener('scroll', this.invalidateBoundaries, true);
        window.removeEventListener('resize', this.invalidateBoundaries);
    }

    public aspectRatio(): number {
        return this.height === 0 ? 0 : this.width / this.height;
    }
}
