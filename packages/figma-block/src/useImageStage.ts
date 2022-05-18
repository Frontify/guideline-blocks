import { RefObject, useEffect, useRef, useState } from 'react';

enum Zoom {
    IN = -1,
    OUT = 1,
}

enum Cursor {
    GRAB = 'grab',
    GRABBING = 'grabbing',
    DEFAULT = 'default',
}

const magnification = 0.2; // in percentage
const stagePadding = 0; // in percentage

const initStage = (
    imageBoundingClientRect: ImageProperties | undefined,
    imageContainerRef: RefObject<HTMLDivElement>,
    stageRef: RefObject<HTMLDivElement>
) => {
    if (imageBoundingClientRect && imageContainerRef.current && stageRef.current) {
        // console.log('imageContainerRef.current', imageContainerRef.current);
        // stageRef.current.style.height = `${imageBoundingClientRect.height}px`;

        adjustImageContainerSize(imageBoundingClientRect, imageContainerRef.current);
        centerImageContainerWithinStage(imageContainerRef.current, stageRef.current);
    }
};

const adjustImageContainerSize = (imageBoundingClientRect: ImageProperties, imageContainer: HTMLDivElement) => {
    imageContainer.style.width = `${imageBoundingClientRect.width * (1 - stagePadding)}px`;
    imageContainer.style.height = `${imageBoundingClientRect.height * (1 - stagePadding)}px`;
};

const centerImageContainerWithinStage = (imageContainer: HTMLDivElement, wrapper: HTMLDivElement) => {
    imageContainer.style.left = `${(wrapper.clientWidth - imageContainer.clientWidth) / 2}px`;
    imageContainer.style.top = `${(wrapper.clientHeight - imageContainer.clientHeight) / 2}px`;
};

const onZoom = (imageContainerRef: RefObject<HTMLDivElement>, zoom = Zoom.OUT) => {
    if (imageContainerRef.current) {
        imageContainerRef.current.style.width = `${
            imageContainerRef.current.clientWidth * (1 + zoom * magnification)
        }px`;
        imageContainerRef.current.style.height = `${
            imageContainerRef.current.clientHeight * (1 + zoom * magnification)
        }px`;
    }
};

const hasMouseLeftTheStage = (event: MouseEvent, stageBoundingRect: DOMRect): boolean => {
    const currentMousePosition = {
        x: event.pageX - stageBoundingRect.left,
        y: event.pageY - stageBoundingRect.top,
    };

    return (
        currentMousePosition.x > stageBoundingRect.width ||
        currentMousePosition.x < 0 ||
        currentMousePosition.y > stageBoundingRect.height ||
        currentMousePosition.y < 0
    );
};

const updateMouseCursor = (imageContainerRef: RefObject<HTMLDivElement>, cursor: Cursor) => {
    if (imageContainerRef.current) {
        imageContainerRef.current.style.cursor = cursor;
    }
};

type ImageProperties = {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
    x: number;
    y: number;
};
export const useImageStage = () => {
    const [imageBoundingClientRect, setImageBoundingClientRect] = useState<ImageProperties>();
    const [stageBoundingClientRect, setStageBoundingClientRect] = useState<DOMRect>();
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const stageRef = useRef<HTMLDivElement | null>(null);
    const imageContainerRef = useRef<HTMLDivElement | null>(null);

    let isMouseDown = false;
    let isMouseOnStage = false;

    const onZoomIn = () => onZoom(imageContainerRef, Zoom.IN);
    const onZoomOut = () => onZoom(imageContainerRef, Zoom.OUT);

    useEffect(() => {
        if (imageBoundingClientRect) {
            initStage(imageBoundingClientRect, imageContainerRef, stageRef);
            setStageBoundingClientRect(stageRef.current?.getBoundingClientRect());
        }
    }, [imageBoundingClientRect]);

    const onMouseMoveUpdateCursor = (event: MouseEvent) => {
        if (imageContainerRef.current && stageBoundingClientRect) {
            isMouseOnStage = !hasMouseLeftTheStage(event, stageBoundingClientRect);

            updateMouseCursor(
                imageContainerRef,
                isMouseOnStage ? (isMouseDown ? Cursor.GRABBING : Cursor.GRAB) : Cursor.DEFAULT
            );
        }
    };

    const onMouseOver = () => {
        updateMouseCursor(imageContainerRef, Cursor.GRAB);
    };

    const onMouseDown = (event: React.MouseEvent) => {
        if (!imageContainerRef.current || !stageRef.current) {
            return;
        }

        isMouseDown = true;
        updateMouseCursor(imageContainerRef, Cursor.GRABBING);

        const image = imageContainerRef.current;
        const startMousePosition = { x: event.pageX, y: event.pageY };
        const startImagePosition = { x: image.offsetLeft, y: image.offsetTop };

        document.addEventListener('mousemove', onMoveImage);

        function onMoveImage(event: MouseEvent) {
            if (!isMouseOnStage) {
                return;
            }

            if (!isMouseDown) {
                document.removeEventListener('mousemove', onMoveImage);
            }

            const currentMousePos = { x: event.pageX, y: event.pageY };
            const mouseMoved = {
                x: currentMousePos.x - startMousePosition.x,
                y: currentMousePos.y - startMousePosition.y,
            };

            image.style.left = `${startImagePosition.x + mouseMoved.x}px`;
            image.style.top = `${startImagePosition.y + mouseMoved.y}px`;
        }

        image.onmouseup = () => {
            document.removeEventListener('mousemove', onMoveImage);
            image.onmouseup = null;
            isMouseDown = false;
            updateMouseCursor(imageContainerRef, Cursor.GRAB);
        };

        image.ondragstart = () => false;
    };

    document.addEventListener('mousemove', onMouseMoveUpdateCursor);
    window.addEventListener('resize', () => initStage(imageBoundingClientRect, imageContainerRef, wrapperRef), false);

    return {
        wrapperRef,
        stageRef,
        imageContainerRef,
        onZoomIn,
        onZoomOut,
        onMouseOver,
        onMouseDown,
        setImageBoundingClientRect,
    };
};
