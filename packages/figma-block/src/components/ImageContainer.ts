/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MouseProperties } from './MouseProperties';
import { ImageStage } from './ImageStage';
import { ImageElement } from './ImageElement';
import { Cursor, ImageStyleProperty, Point, Zoom } from '../types';

const magnification = 0.2; // in percentage
const imagePadding = 0; // in percentage

export abstract class ImageContainer {
    constructor(
        protected imageContainer: HTMLDivElement,
        protected mediaStage: ImageStage,
        protected imageElement: ImageElement
    ) {
        this.fitImageContainerToMediaStage();
        this.centerImageContainerWithinTheMediaStage();
        this.imageElement.show();
    }

    abstract resizeImageContainer(zoom: Zoom): void;

    protected fitImageContainerToMediaStage() {
        const scale =
            this.mediaStage.aspectRatio() < this.imageElement.aspectRatio()
                ? this.mediaStage.width / this.imageElement.width
                : this.mediaStage.height / this.imageElement.height;

        const newWidth = this.imageElement.width * scale;
        const newHeight = this.imageElement.height * scale;

        this.setImageContainerStyleProperty('width', newWidth * (1 - imagePadding));
        this.setImageContainerStyleProperty('height', newHeight * (1 - imagePadding));
    }

    protected centerImageContainerWithinTheMediaStage = () => {
        this.setImageContainerStyleProperty('left', (this.mediaStage.width - this.imageContainer.clientWidth) / 2);
        this.setImageContainerStyleProperty('top', (this.mediaStage.height - this.imageContainer.clientHeight) / 2);
    };

    protected setImageContainerStyleProperty(property: ImageStyleProperty, value: number) {
        this.imageContainer.style[property] = `${value}px`;
    }
}

export class BitmapImageContainer extends ImageContainer {
    constructor(
        protected imageContainer: HTMLDivElement,
        protected mediaStage: ImageStage,
        protected imageElement: ImageElement
    ) {
        super(imageContainer, mediaStage, imageElement);
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
        protected mediaStage: ImageStage,
        protected imageElement: ImageElement
    ) {
        super(imageContainer, mediaStage, imageElement);

        imageContainer.addEventListener('mouseover', this.onMouseOver.bind(this));
        imageContainer.addEventListener('mousedown', this.onMouseDown.bind(this));

        this.mouseMoveListener = this.onMouseMove.bind(this);
        this.mouseUpListener = this.onMouseUp.bind(this);
    }

    public resizeImageContainer = (zoom = Zoom.OUT) => {
        this.setImageContainerStyleProperty('width', this.imageContainer.clientWidth * (1 + zoom * magnification));
        this.setImageContainerStyleProperty('height', this.imageContainer.clientHeight * (1 + zoom * magnification));
    };

    private onMouseMove(event: MouseEvent) {
        if (this.mediaStage.isMouseInsideMediaStage) {
            this.changeMouseCursorStyleOnImageContainer(Cursor.GRABBING);
        }

        this.moveImageContainer(event);
    }

    private moveImageContainer(event: MouseEvent) {
        const currentMousePos = MouseProperties.getCurrentPosition(event);
        const mouseMoved: Point = {
            x: currentMousePos.x - this.startMousePosition.x,
            y: currentMousePos.y - this.startMousePosition.y,
        };

        this.setImageContainerStyleProperty('left', this.startImageContainerPosition.x + mouseMoved.x);
        this.setImageContainerStyleProperty('top', this.startImageContainerPosition.y + mouseMoved.y);
    }

    private onMouseOver() {
        this.changeMouseCursorStyleOnImageContainer(Cursor.GRAB);
    }

    private onMouseDown(event: MouseEvent) {
        this.changeMouseCursorStyleOnImageContainer(Cursor.GRABBING);

        this.startMousePosition = MouseProperties.getCurrentPosition(event);
        this.startImageContainerPosition = { x: this.imageContainer.offsetLeft, y: this.imageContainer.offsetTop };

        document.addEventListener('mousemove', this.mouseMoveListener);
        this.imageContainer.addEventListener('mouseup', this.mouseUpListener);
        this.imageContainer.ondragstart = () => false;
    }

    private onMouseUp() {
        this.changeMouseCursorStyleOnImageContainer(Cursor.GRAB);
        this.imageContainer.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('mousemove', this.mouseMoveListener);
    }

    private changeMouseCursorStyleOnImageContainer = (cursor: Cursor) => {
        this.imageContainer.style.cursor = cursor;
    };
}
