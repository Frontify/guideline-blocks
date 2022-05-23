/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from 'react';
import { BoundingRectProperties, Cursor, Point, UseMediaStageProps, Zoom } from './types';

const magnification = 0.2; // in percentage
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
    // private isMouseDown = false;
    private isMouseOnStage = false;
    private startImageContainerPosition!: Point;
    private startMousePosition!: Point;
    private mouseMoveListener: (this: Document, ev: MouseEvent) => void;
    private mouseUpListener: (this: HTMLDivElement, ev: MouseEvent) => void;

    constructor(private imageContainer: HTMLDivElement, private image: HTMLDivElement) {
        document.addEventListener('mousemove', this.onMouseMoveUpdateCursor.bind(this));
        imageContainer.addEventListener('mouseover', this.onMouseOver.bind(this));
        imageContainer.addEventListener('mousedown', this.onMouseDown.bind(this));

        this.mouseMoveListener = this.onMouseMove.bind(this);
        this.mouseUpListener = this.onMouseUp.bind(this);

        this.adjustImageContainerSize(image.getBoundingClientRect());
    }

    public resizeImageContainer = (zoom = Zoom.OUT) => {
        this.imageContainer.style.width = `${this.imageContainer.clientWidth * (1 + zoom * magnification)}px`;
        this.imageContainer.style.height = `${this.imageContainer.clientHeight * (1 + zoom * magnification)}px`;
    };

    public centerImageContainerWithinTheMediaStage = (mediaStage: MediaStage) => {
        this.imageContainer.style.left = `${(mediaStage.width - this.imageContainer.clientWidth) / 2}px`;
        this.imageContainer.style.top = `${(mediaStage.height - this.imageContainer.clientHeight) / 2}px`;
    };

    private onMouseMoveUpdateCursor(event: MouseEvent) {
        console.log(event);
        // this.isMouseOnStage = isMouseInsideBlock(getCurrentMousePosition(event), stageBoundingClientRect);

        // const cursorStyle = isMouseOnStage ? (isMouseDown ? Cursor.GRABBING : Cursor.GRAB) : Cursor.DEFAULT;
        // changeMouseCursorStyleWithinImageContainer(imageContainerRef, cursorStyle);
    }

    private adjustImageContainerSize(imageBoundingClientRect: BoundingRectProperties) {
        this.imageContainer.style.width = `${imageBoundingClientRect.width * (1 - stagePadding)}px`;
        this.imageContainer.style.height = `${imageBoundingClientRect.height * (1 - stagePadding)}px`;
    }

    private onMouseMove(event: MouseEvent) {
        this.moveImageContainer(event);
    }

    private moveImageContainer(event: MouseEvent) {
        // console.log('onMouseMove', this.isMouseDown);
        // if (!this.isMouseDown) {
        //     return;
        // }
        // console.log('onMouseMove serious!!!!!!');
        // if (!isMouseOnStage) {
        //     return;
        // }
        // if (!this.isMouseDown) {
        //     console.log('I want to stop moving!!!!');
        //     document.removeEventListener('mousemove', this.mouseMoveListener);
        // }
        const currentMousePos = MouseProperties.getCurrentPosition(event);
        const mouseMoved: Point = {
            x: currentMousePos.x - this.startMousePosition.x,
            y: currentMousePos.y - this.startMousePosition.y,
        };

        this.imageContainer.style.left = `${this.startImageContainerPosition.x + mouseMoved.x}px`;
        this.imageContainer.style.top = `${this.startImageContainerPosition.y + mouseMoved.y}px`;
    }

    private onMouseOver() {
        this.changeMouseCursorStyleOnImageContainer(Cursor.GRAB);
    }

    private onMouseDown(event: MouseEvent) {
        // console.log('onMouseDown', MouseProperties.getCurrentPosition(event));
        // this.isMouseDown = true;
        this.changeMouseCursorStyleOnImageContainer(Cursor.GRABBING);

        this.startMousePosition = MouseProperties.getCurrentPosition(event);
        this.startImageContainerPosition = { x: this.imageContainer.offsetLeft, y: this.imageContainer.offsetTop };

        // console.log('this.startMousePosition', this.startMousePosition);
        document.addEventListener('mousemove', this.mouseMoveListener);
        this.imageContainer.addEventListener('mouseup', this.mouseUpListener);
        this.imageContainer.ondragstart = () => false;
    }

    private onMouseUp() {
        // this.isMouseDown = false;
        this.changeMouseCursorStyleOnImageContainer(Cursor.GRAB);
        this.imageContainer.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('mousemove', this.mouseMoveListener);
    }

    private changeMouseCursorStyleOnImageContainer = (cursor: Cursor) => {
        this.imageContainer.style.cursor = cursor;
    };
}

class MediaStage {
    constructor(protected mediaStage: HTMLDivElement, public stageHeight: string) {}

    public alterHeight(height: string) {
        this.mediaStage.style.height = height;
    }

    get height(): number {
        return this.mediaStage.clientHeight;
    }

    get width(): number {
        return this.mediaStage.clientWidth;
    }
}

export const useMediaStage = ({ height }: UseMediaStageProps) => {
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const mediaStage = useRef<MediaStage>();
    const imageContainer = useRef<ImageContainer>();
    const imageRef = useRef<HTMLImageElement | null>(null);
    const stageRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const onZoomIn = () => imageContainer?.current?.resizeImageContainer(Zoom.IN);
    const onZoomOut = () => imageContainer?.current?.resizeImageContainer(Zoom.OUT);

    useEffect(() => {
        if (isImageLoaded && stageRef.current && containerRef.current && imageRef.current) {
            mediaStage.current = new MediaStage(stageRef.current, height);
            mediaStage.current.alterHeight(height);

            imageContainer.current = new ImageContainer(containerRef.current, imageRef.current);
            imageContainer.current.centerImageContainerWithinTheMediaStage(mediaStage.current);
        }
    }, [height, isImageLoaded]);

    useEffect(() => {
        if (mediaStage.current) {
            mediaStage.current.alterHeight(isFullScreen ? '100vh' : mediaStage.current.stageHeight);
        }
    }, [isFullScreen]);

    return { isFullScreen, setIsFullScreen, onZoomIn, onZoomOut, stageRef, containerRef, imageRef, setIsImageLoaded };
};
