/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from 'react';
import { BoundingClientRectProperties, Cursor, Point, UseMediaStageProps, Zoom } from './types';

const magnification = 0.2; // in percentage
const imagePadding = 0; // in percentage

class MouseProperties {
    public static getCurrentPosition(event: MouseEvent): Point {
        return {
            x: event.pageX,
            y: event.pageY,
        };
    }
}

class ImageContainer {
    private startImageContainerPosition!: Point;
    private startMousePosition!: Point;
    private mouseMoveListener: (this: Document, ev: MouseEvent) => void;
    private mouseUpListener: (this: HTMLDivElement, ev: MouseEvent) => void;

    constructor(private imageContainer: HTMLDivElement, private mediaStage: MediaStage, private image: Image) {
        imageContainer.addEventListener('mouseover', this.onMouseOver.bind(this));
        imageContainer.addEventListener('mousedown', this.onMouseDown.bind(this));

        this.mouseMoveListener = this.onMouseMove.bind(this);
        this.mouseUpListener = this.onMouseUp.bind(this);

        this.fitImageContainerToMediaStage();
        this.centerImageContainerWithinTheMediaStage();
    }

    public resizeImageContainer = (zoom = Zoom.OUT) => {
        this.setImageContainerStyleProperty('width', this.imageContainer.clientWidth * (1 + zoom * magnification));
        this.setImageContainerStyleProperty('height', this.imageContainer.clientHeight * (1 + zoom * magnification));
    };

    private fitImageContainerToMediaStage() {
        const scale =
            this.mediaStage.aspectRatio() < this.image.aspectRatio()
                ? this.mediaStage.width / this.image.width
                : this.mediaStage.height / this.image.height;

        const newWidth = this.image.width * scale;
        const newHeight = this.image.height * scale;

        this.setImageContainerStyleProperty('width', newWidth * (1 - imagePadding));
        this.setImageContainerStyleProperty('height', newHeight * (1 - imagePadding));
    }

    private centerImageContainerWithinTheMediaStage = () => {
        this.setImageContainerStyleProperty('left', (this.mediaStage.width - this.imageContainer.clientWidth) / 2);
        this.setImageContainerStyleProperty('top', (this.mediaStage.height - this.imageContainer.clientHeight) / 2);
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

    private setImageContainerStyleProperty(property: any, value: number) {
        this.imageContainer.style[property] = `${value}px`;
    }
}

class MediaStage {
    public isMouseInsideMediaStage = false;
    private boundaries: BoundingClientRectProperties;

    constructor(protected mediaStage: HTMLDivElement, public stageHeight: string) {
        this.boundaries = this.mediaStage.getBoundingClientRect();

        document.addEventListener('mousemove', this.checkIfMouseIsInside.bind(this));
    }

    get height(): number {
        return this.boundaries.height;
    }

    get width(): number {
        return this.boundaries.width;
    }

    public alterHeight(height: string) {
        this.mediaStage.style.height = height;
    }

    public aspectRatio(): number {
        return this.width / this.height;
    }

    private checkIfMouseIsInside(event: MouseEvent) {
        const currentMousePosition = MouseProperties.getCurrentPosition(event);

        this.isMouseInsideMediaStage =
            currentMousePosition.x > this.boundaries.left &&
            currentMousePosition.x < this.boundaries.right &&
            currentMousePosition.y > this.boundaries.top &&
            currentMousePosition.y < this.boundaries.bottom;
    }
}

class Image {
    constructor(protected image: HTMLImageElement) {}

    get height(): number {
        return this.image.height;
    }

    get width(): number {
        return this.image.width;
    }

    aspectRatio() {
        return this.width / this.height;
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
            const image = new Image(imageRef.current);

            mediaStage.current = new MediaStage(stageRef.current, height);
            mediaStage.current.alterHeight(height);

            imageContainer.current = new ImageContainer(containerRef.current, mediaStage.current, image);
        }
    }, [height, isImageLoaded]);

    useEffect(() => {
        if (mediaStage.current) {
            mediaStage.current.alterHeight(isFullScreen ? '100vh' : mediaStage.current.stageHeight);
        }
    }, [isFullScreen]);

    return { isFullScreen, setIsFullScreen, onZoomIn, onZoomOut, stageRef, containerRef, imageRef, setIsImageLoaded };
};
