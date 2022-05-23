import { useEffect, useRef, useState } from 'react';
import { BoundingRectProperties, Cursor, Point, UseMediaStageProps } from './types';

// const magnification = 0.2; // in percentage
const stagePadding = 0; // in percentage

class MouseProperties {
    public static getCurrentPosition(event: MouseEvent): Point {
        return {
            x: event.pageX,
            y: event.pageY,
        };
    }
}

class ImageContainer {
    private isMouseDown = false;
    // private isMouseOnStage = false;
    private startImageContainerPosition!: Point;
    private startMousePosition!: Point;

    private mouseMoveListener: (this: Document, ev: MouseEvent) => void;
    private mouseUpListener: (this: HTMLDivElement, ev: MouseEvent) => void;

    constructor(private imageContainer: HTMLDivElement, private image: HTMLDivElement) {
        imageContainer.addEventListener('mouseover', this.onMouseOver.bind(this));
        imageContainer.addEventListener('mousedown', this.onMouseDown.bind(this));

        this.mouseMoveListener = this.onMouseMove.bind(this);
        this.mouseUpListener = this.onMouseUp.bind(this);

        this.adjustImageContainerSize(image.getBoundingClientRect());
    }

    public centerImageContainerWithinTheMediaStage = (mediaStage: MediaStage) => {
        this.imageContainer.style.left = `${(mediaStage.width - this.imageContainer.clientWidth) / 2}px`;
        this.imageContainer.style.top = `${(mediaStage.height - this.imageContainer.clientHeight) / 2}px`;
    };

    private adjustImageContainerSize(imageBoundingClientRect: BoundingRectProperties) {
        this.imageContainer.style.width = `${imageBoundingClientRect.width * (1 - stagePadding)}px`;
        this.imageContainer.style.height = `${imageBoundingClientRect.height * (1 - stagePadding)}px`;
    }

    private onMouseMove(event: MouseEvent) {
        // console.log('onMouseMove', this.isMouseDown);
        // if (!this.isMouseDown) {
        //     return;
        // }

        // console.log('onMouseMove serious!!!!!!');
        // if (!isMouseOnStage) {
        //     return;
        // }
        if (!this.isMouseDown) {
            console.log('I want to stop moving!!!!');
            document.removeEventListener('mousemove', this.mouseMoveListener);
        }

        const currentMousePos = MouseProperties.getCurrentPosition(event);
        // console.log(currentMousePos);
        // console.log(this.startMousePosition);
        const mouseMoved = {
            x: currentMousePos.x - this.startMousePosition.x,
            y: currentMousePos.y - this.startMousePosition.y,
        };
        // console.log('startImageContainerPosition', this.startImageContainerPosition);
        this.imageContainer.style.left = `${this.startImageContainerPosition.x + mouseMoved.x}px`;
        this.imageContainer.style.top = `${this.startImageContainerPosition.y + mouseMoved.y}px`;
    }

    private onMouseOver() {
        this.changeMouseCursorStyleWithinImageContainer(Cursor.GRAB);
    }

    private onMouseDown(event: MouseEvent) {
        // console.log('onMouseDown', MouseProperties.getCurrentPosition(event));
        this.isMouseDown = true;
        this.changeMouseCursorStyleWithinImageContainer(Cursor.GRABBING);

        this.startMousePosition = MouseProperties.getCurrentPosition(event);
        this.startImageContainerPosition = { x: this.imageContainer.offsetLeft, y: this.imageContainer.offsetTop };

        // console.log('this.startMousePosition', this.startMousePosition);
        document.addEventListener('mousemove', this.mouseMoveListener);
        this.imageContainer.addEventListener('mouseup', this.mouseUpListener);
        this.imageContainer.ondragstart = () => false;
    }

    private onMouseUp() {
        this.isMouseDown = false;
        this.changeMouseCursorStyleWithinImageContainer(Cursor.GRAB);
        this.imageContainer.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('mousemove', this.mouseMoveListener);
    }

    private changeMouseCursorStyleWithinImageContainer = (cursor: Cursor) => {
        this.imageContainer.style.cursor = cursor;
    };
}

class MediaStage {
    constructor(protected mediaStage: HTMLDivElement, protected stageHeight: string) {
        // console.log('mediaStage', mediaStage.clientHeight, mediaStage.clientWidth);
        mediaStage.style.height = stageHeight;
    }

    get height() {
        return this.mediaStage.clientHeight;
    }

    get width() {
        return this.mediaStage.clientWidth;
    }
}

export const useMediaStage = ({ height }: UseMediaStageProps) => {
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const stageRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const onZoomIn = () => console.log('onZoomIn');
    const onZoomOut = () => console.log('onZoomOut');

    useEffect(() => {
        if (isImageLoaded) {
            if (stageRef.current && containerRef.current && imageRef.current) {
                const mediaStage = new MediaStage(stageRef.current, height);
                // console.log('stage', mediaStage.height, mediaStage.width);

                const imageContainer = new ImageContainer(containerRef.current, imageRef.current);
                imageContainer.centerImageContainerWithinTheMediaStage(mediaStage);
            }
        }
    }, [height, isImageLoaded]);

    return { isFullScreen, setIsFullScreen, onZoomIn, onZoomOut, stageRef, containerRef, imageRef, setIsImageLoaded };
};
