import { BoundingClientRectProperties } from '../types';
import { MouseProperties } from './MouseProperties';

export class ImageStage {
    public isMouseInsideImageStage = false;
    private boundaries: BoundingClientRectProperties;

    constructor(protected imageStage: HTMLDivElement, public customHeight: string) {
        this.boundaries = this.imageStage.getBoundingClientRect();

        document.addEventListener('mousemove', this.checkIfMouseIsInside.bind(this));
    }

    get height(): number {
        return this.boundaries.height;
    }

    get width(): number {
        return this.boundaries.width;
    }

    public alterHeight(height: string) {
        this.imageStage.style.height = height;
        this.boundaries = this.imageStage.getBoundingClientRect();
    }

    public aspectRatio(): number {
        return this.width / this.height;
    }

    private checkIfMouseIsInside(event: MouseEvent) {
        const currentMousePosition = MouseProperties.getCurrentPosition(event);

        this.isMouseInsideImageStage =
            currentMousePosition.x > this.boundaries.left &&
            currentMousePosition.x < this.boundaries.right &&
            currentMousePosition.y > this.boundaries.top &&
            currentMousePosition.y < this.boundaries.bottom;
    }
}
