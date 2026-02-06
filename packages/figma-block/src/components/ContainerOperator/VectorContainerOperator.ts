/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Cursor, type Point, Zoom } from '../../types';
import { type ImageContainer } from '../ImageContainer';
import { type ImageElement } from '../ImageElement';
import { type ImageStage } from '../ImageStage';
import { MouseProperties } from '../MouseProperties';

import { ContainerOperator } from './ContainerOperator';
import { MAGNIFICATION_PERCENTAGE_DEFAULT } from './constants';

export class VectorContainerOperator extends ContainerOperator {
    private startImageContainerPosition: Point = { x: 0, y: 0 };
    private startMousePosition: Point = { x: 0, y: 0 };
    private readonly mouseMoveListener: (this: Document, event: MouseEvent) => void;
    private readonly mouseUpListener: (this: HTMLDivElement, event: MouseEvent) => void;

    constructor(
        protected imageContainer: ImageContainer,
        protected imageStage: ImageStage,
        protected imageElement: ImageElement,
        protected isFullScreen: boolean
    ) {
        super(imageContainer, imageStage, imageElement);
        imageContainer.node.addEventListener('mouseover', this.onMouseOver.bind(this));
        imageContainer.node.addEventListener('mousedown', this.onMouseDown.bind(this));

        this.mouseMoveListener = this.onMouseMove.bind(this);
        this.mouseUpListener = this.onMouseUp.bind(this);
        if (!isFullScreen) {
            this.imageStage.alterHeight(this.imageStage.customHeight);
        }
        this.imageContainer.setContainerToAbsolute();
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

    public resize(zoom = Zoom.OUT): this {
        this.imageContainer.setImageContainerSize(
            this.imageContainer.width * (1 + zoom * MAGNIFICATION_PERCENTAGE_DEFAULT),
            this.imageContainer.height * (1 + zoom * MAGNIFICATION_PERCENTAGE_DEFAULT)
        );
        this.centerImageContainerWithinTheImageStage();
        return this;
    }

    public fitAndCenterTheImageContainerWithinTheImageStage(): this {
        this.imageElement.hide();
        this.resizeImageContainerToFitWithinImageStage();
        this.centerImageContainerWithinTheImageStage();
        this.imageElement.show();
        return this;
    }
}
