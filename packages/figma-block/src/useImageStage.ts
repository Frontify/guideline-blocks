import { RefObject, useEffect, useRef, useState } from 'react';
import { Cursor, ImageProperties, MousePosition, Zoom } from './types';

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
        centerImageContainerWithinTheStage(imageContainerRef.current, stageRef.current);
    }
};

const adjustImageContainerSize = (imageBoundingClientRect: ImageProperties, imageContainer: HTMLDivElement) => {
    imageContainer.style.width = `${imageBoundingClientRect.width * (1 - stagePadding)}px`;
    imageContainer.style.height = `${imageBoundingClientRect.height * (1 - stagePadding)}px`;
};

const centerImageContainerWithinTheStage = (imageContainer: HTMLDivElement, wrapper: HTMLDivElement) => {
    imageContainer.style.left = `${(wrapper.clientWidth - imageContainer.clientWidth) / 2}px`;
    imageContainer.style.top = `${(wrapper.clientHeight - imageContainer.clientHeight) / 2}px`;
};

const resizeImageContainer = (imageContainer: HTMLDivElement | null, zoom = Zoom.OUT) => {
    if (imageContainer) {
        imageContainer.style.width = `${imageContainer.clientWidth * (1 + zoom * magnification)}px`;
        imageContainer.style.height = `${imageContainer.clientHeight * (1 + zoom * magnification)}px`;
    }
};

const getCurrentMousePosition = (event: MouseEvent | React.MouseEvent): MousePosition => ({
    x: event.pageX,
    y: event.pageY,
});

const isMouseInsideBlock = (currentMousePosition: MousePosition, boundingClientRect: DOMRect): boolean => {
    const boundaries = {
        left: boundingClientRect.left,
        right: boundingClientRect.left + boundingClientRect.width,
        top: boundingClientRect.top,
        bottom: boundingClientRect.top + boundingClientRect.height,
    };

    return (
        currentMousePosition.x > boundaries.left &&
        currentMousePosition.x < boundaries.right &&
        currentMousePosition.y > boundaries.top &&
        currentMousePosition.y < boundaries.bottom
    );
};

const changeMouseCursorStyleWithinImageContainer = (imageContainerRef: RefObject<HTMLDivElement>, cursor: Cursor) => {
    if (imageContainerRef.current) {
        imageContainerRef.current.style.cursor = cursor;
    }
};

export const useImageStage = () => {
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [imageBoundingClientRect, setImageBoundingClientRect] = useState<ImageProperties>();
    const [stageBoundingClientRect, setStageBoundingClientRect] = useState<DOMRect>();
    const stageRef = useRef<HTMLDivElement | null>(null);
    const imageContainerRef = useRef<HTMLDivElement | null>(null);

    let isMouseDown = false;
    let isMouseOnStage = false;

    const onZoomIn = () => resizeImageContainer(imageContainerRef.current, Zoom.IN);
    const onZoomOut = () => resizeImageContainer(imageContainerRef.current, Zoom.OUT);

    useEffect(() => {
        if (imageBoundingClientRect) {
            initStage(imageBoundingClientRect, imageContainerRef, stageRef);
            setStageBoundingClientRect(stageRef.current?.getBoundingClientRect());
        }
    }, [imageBoundingClientRect]);

    const onMouseMoveUpdateCursor = (event: MouseEvent) => {
        if (imageContainerRef.current && stageBoundingClientRect) {
            isMouseOnStage = isMouseInsideBlock(getCurrentMousePosition(event), stageBoundingClientRect);

            const cursorStyle = isMouseOnStage ? (isMouseDown ? Cursor.GRABBING : Cursor.GRAB) : Cursor.DEFAULT;
            changeMouseCursorStyleWithinImageContainer(imageContainerRef, cursorStyle);
        }
    };

    const onMouseOver = () => {
        changeMouseCursorStyleWithinImageContainer(imageContainerRef, Cursor.GRAB);
    };

    const onMouseDown = (event: React.MouseEvent) => {
        if (!imageContainerRef.current || !stageRef.current) {
            return;
        }

        isMouseDown = true;
        changeMouseCursorStyleWithinImageContainer(imageContainerRef, Cursor.GRABBING);

        const image = imageContainerRef.current;
        const startMousePosition = getCurrentMousePosition(event);
        const startImagePosition = { x: image.offsetLeft, y: image.offsetTop };

        function onImageMove(event: MouseEvent) {
            if (!isMouseOnStage) {
                return;
            }

            if (!isMouseDown) {
                document.removeEventListener('mousemove', onImageMove);
            }

            const currentMousePos = getCurrentMousePosition(event);
            const mouseMoved = {
                x: currentMousePos.x - startMousePosition.x,
                y: currentMousePos.y - startMousePosition.y,
            };

            image.style.left = `${startImagePosition.x + mouseMoved.x}px`;
            image.style.top = `${startImagePosition.y + mouseMoved.y}px`;
        }
        document.addEventListener('mousemove', onImageMove);

        image.onmouseup = () => {
            document.removeEventListener('mousemove', onImageMove);
            image.onmouseup = null;
            isMouseDown = false;
            changeMouseCursorStyleWithinImageContainer(imageContainerRef, Cursor.GRAB);
        };

        image.ondragstart = () => false;
    };

    document.addEventListener('mousemove', onMouseMoveUpdateCursor);
    window.addEventListener('resize', () => initStage(imageBoundingClientRect, imageContainerRef, stageRef), false);

    return {
        stageRef,
        imageContainerRef,
        onZoomIn,
        onZoomOut,
        onMouseOver,
        onMouseDown,
        setImageBoundingClientRect,
        isFullScreen,
        setIsFullScreen,
    };
};
