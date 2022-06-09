/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MouseProperties } from './MouseProperties';
import { ImageContainer } from './ImageContainer';
import { ImageStage } from './ImageStage';
import { ImageElement } from './ImageElement';
import { Cursor, Point, Zoom } from '../types';

const MAGNIFICATION_PERCENTAGE = 0.2;
const IMAGE_PADDING_PERCENTAGE = 0;

export abstract class ContainerOperator {
    constructor(
        protected imageContainer: ImageContainer,
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

    protected resizeImageContainerToFitWithinImageStage() {
        const { width, height } = this.calculateTheImageContainerSizeToFitInImageStage();
        this.imageContainer.setImageContainerSize(
            width * (1 - IMAGE_PADDING_PERCENTAGE),
            height * (1 - IMAGE_PADDING_PERCENTAGE)
        );
    }

    private calculateTheImageContainerSizeToFitInImageStage(): { width: number; height: number } {
        const scale =
            this.imageStage.aspectRatio() < this.imageElement.aspectRatio()
                ? this.imageStage.width / this.imageElement.width
                : this.imageStage.height / this.imageElement.height;

        return { width: this.imageElement.width * scale, height: this.imageElement.height * scale };
    }

    public centerTheImageContainerWithinTheImageStage() {
        this.imageElement.hide();
        this.centerImageContainerWithinTheImageStage();
        this.imageElement.show();
    }

    protected centerImageContainerWithinTheImageStage() {
        this.imageContainer.setImageContainerPosition(
            (this.imageStage.width - this.imageContainer.width) / 2,
            (this.imageStage.height - this.imageContainer.height) / 2
        );
    }

    abstract resizeImageContainer(zoom: Zoom): void;
}

export class BitmapContainerOperator extends ContainerOperator {
    constructor(
        protected imageContainer: ImageContainer,
        protected imageStage: ImageStage,
        protected imageElement: ImageElement
    ) {
        super(imageContainer, imageStage, imageElement);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public resizeImageContainer() {}
}

export class VectorContainerOperator extends ContainerOperator {
    private startImageContainerPosition: Point = { x: 0, y: 0 };
    private startMousePosition: Point = { x: 0, y: 0 };
    private mouseMoveListener: (this: Document, event: MouseEvent) => void;
    private mouseUpListener: (this: HTMLDivElement, event: MouseEvent) => void;

    constructor(
        protected imageContainer: ImageContainer,
        protected imageStage: ImageStage,
        protected imageElement: ImageElement
    ) {
        super(imageContainer, imageStage, imageElement);

        imageContainer.node.addEventListener('mouseover', this.onMouseOver.bind(this));
        imageContainer.node.addEventListener('mousedown', this.onMouseDown.bind(this));

        this.mouseMoveListener = this.onMouseMove.bind(this);
        this.mouseUpListener = this.onMouseUp.bind(this);
    }

    private onMouseOver() {
        this.imageContainer.changeMouseCursor(Cursor.GRAB);
    }

    private onMouseDown(event: MouseEvent) {
        this.imageContainer.changeMouseCursor(Cursor.GRABBING);

        this.startMousePosition = MouseProperties.getCurrentPosition(event);
        this.startImageContainerPosition = { x: this.imageContainer.offsetLeft, y: this.imageContainer.offsetTop };

        document.addEventListener('mousemove', this.mouseMoveListener);
        this.imageContainer.node.addEventListener('mouseup', this.mouseUpListener);
    }

    private onMouseMove(event: MouseEvent) {
        if (this.imageStage.isMouseInsideImageStage) {
            this.imageContainer.changeMouseCursor(Cursor.GRABBING);
        }

        this.moveImageContainer(event);
    }

    private moveImageContainer(event: MouseEvent) {
        const currentMousePos = MouseProperties.getCurrentPosition(event);
        const mouseMoved: Point = {
            x: currentMousePos.x - this.startMousePosition.x,
            y: currentMousePos.y - this.startMousePosition.y,
        };

        this.imageContainer.setImageContainerPosition(
            this.startImageContainerPosition.x + mouseMoved.x,
            this.startImageContainerPosition.y + mouseMoved.y
        );
    }

    private onMouseUp() {
        this.imageContainer.changeMouseCursor(Cursor.GRAB);
        this.imageContainer.node.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('mousemove', this.mouseMoveListener);
    }

    public resizeImageContainer(zoom = Zoom.OUT) {
        this.imageContainer.setImageContainerSize(
            this.imageContainer.width * (1 + zoom * MAGNIFICATION_PERCENTAGE),
            this.imageContainer.height * (1 + zoom * MAGNIFICATION_PERCENTAGE)
        );
    }
}
