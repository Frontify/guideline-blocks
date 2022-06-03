/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MouseProperties } from './MouseProperties';
import { ImageStage } from './ImageStage';
import { ImageElement } from './ImageElement';
import { Cursor, Point, Zoom } from '../types';

const magnification = 0.2; // in percentage
const imagePadding = 0; // in percentage

export abstract class ImageContainer {
    constructor(
        protected imageContainer: HTMLDivElement,
        protected imageStage: ImageStage,
        protected imageElement: ImageElement
    ) {
        this.fitAndCenterTheImageContainerWithinTheImageStage();
    }

    public fitAndCenterTheImageContainerWithinTheImageStage() {
        this.imageElement.hide();
        this.resizeImageContainerToFitWithinImageStage();
        this.centerImageContainerWithinTheImageStage();
        this.imageElement.show();
    }

    public centerTheImageContainerWithinTheImageStage() {
        this.imageElement.hide();
        this.centerImageContainerWithinTheImageStage();
        this.imageElement.show();
    }

    protected centerImageContainerWithinTheImageStage() {
        this.setImageContainerPosition(
            (this.imageStage.width - this.imageContainer.clientWidth) / 2,
            (this.imageStage.height - this.imageContainer.clientHeight) / 2
        );
    }

    protected setImageContainerPosition(left: number, top: number) {
        this.imageContainer.style.left = `${left}px`;
        this.imageContainer.style.top = `${top}px`;
    }

    protected resizeImageContainerToFitWithinImageStage() {
        const { width, height } = this.calculateTheImageContainerSizeToFitInImageStage();
        this.setImageContainerSize(width * (1 - imagePadding), height * (1 - imagePadding));
    }

    protected setImageContainerSize(width: number, height: number) {
        this.imageContainer.style.width = `${width}px`;
        this.imageContainer.style.height = `${height}px`;
    }

    protected calculateTheImageContainerSizeToFitInImageStage(): { width: number; height: number } {
        const scale =
            this.imageStage.aspectRatio() < this.imageElement.aspectRatio()
                ? this.imageStage.width / this.imageElement.width
                : this.imageStage.height / this.imageElement.height;

        return { width: this.imageElement.width * scale, height: this.imageElement.height * scale };
    }

    protected changeMouseCursor = (cursor: Cursor) => {
        this.imageContainer.style.cursor = cursor;
    };

    abstract resizeImageContainer(zoom: Zoom): void;
}

export class BitmapImageContainer extends ImageContainer {
    constructor(
        protected imageContainer: HTMLDivElement,
        protected imageStage: ImageStage,
        protected imageElement: ImageElement
    ) {
        super(imageContainer, imageStage, imageElement);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public resizeImageContainer = () => {};
}

export class VectorImageContainer extends ImageContainer {
    private startImageContainerPosition!: Point;
    private startMousePosition!: Point;
    private mouseMoveListener: (this: Document, ev: MouseEvent) => void;
    private mouseUpListener: (this: HTMLDivElement, ev: MouseEvent) => void;

    constructor(
        protected imageContainer: HTMLDivElement,
        protected imageStage: ImageStage,
        protected imageElement: ImageElement
    ) {
        super(imageContainer, imageStage, imageElement);

        imageContainer.addEventListener('mouseover', this.onMouseOver.bind(this));
        imageContainer.addEventListener('mousedown', this.onMouseDown.bind(this));

        this.mouseMoveListener = this.onMouseMove.bind(this);
        this.mouseUpListener = this.onMouseUp.bind(this);
    }

    private onMouseOver() {
        this.changeMouseCursor(Cursor.GRAB);
    }

    private onMouseDown(event: MouseEvent) {
        this.changeMouseCursor(Cursor.GRABBING);

        this.startMousePosition = MouseProperties.getCurrentPosition(event);
        this.startImageContainerPosition = { x: this.imageContainer.offsetLeft, y: this.imageContainer.offsetTop };

        document.addEventListener('mousemove', this.mouseMoveListener);
        this.imageContainer.addEventListener('mouseup', this.mouseUpListener);
        this.imageContainer.ondragstart = () => false;
    }

    private onMouseMove(event: MouseEvent) {
        if (this.imageStage.isMouseInsideImageStage) {
            this.changeMouseCursor(Cursor.GRABBING);
        }

        this.moveImageContainer(event);
    }

    private moveImageContainer(event: MouseEvent) {
        const currentMousePos = MouseProperties.getCurrentPosition(event);
        const mouseMoved: Point = {
            x: currentMousePos.x - this.startMousePosition.x,
            y: currentMousePos.y - this.startMousePosition.y,
        };

        this.setImageContainerPosition(
            this.startImageContainerPosition.x + mouseMoved.x,
            this.startImageContainerPosition.y + mouseMoved.y
        );
    }

    private onMouseUp() {
        this.changeMouseCursor(Cursor.GRAB);
        this.imageContainer.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('mousemove', this.mouseMoveListener);
    }

    public resizeImageContainer = (zoom = Zoom.OUT) => {
        this.setImageContainerSize(
            this.imageContainer.clientWidth * (1 + zoom * magnification),
            this.imageContainer.clientHeight * (1 + zoom * magnification)
        );
    };
}
