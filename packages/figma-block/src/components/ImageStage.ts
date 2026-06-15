/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type BoundingClientRectProperties } from '../types';

export class ImageStage {
    private boundaries: BoundingClientRectProperties;

    constructor(
        protected imageStage: HTMLDivElement,
        public customHeight = '0px'
    ) {
        this.boundaries = this.getBoundaries();
    }

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
    }

    public isPointInside({ x, y }: { x: number; y: number }): boolean {
        const boundaries = this.getBoundaries();

        return x > boundaries.left && x < boundaries.right && y > boundaries.top && y < boundaries.bottom;
    }

    public destroy(): void {}

    public aspectRatio(): number {
        return this.height === 0 ? 0 : this.width / this.height;
    }
}
