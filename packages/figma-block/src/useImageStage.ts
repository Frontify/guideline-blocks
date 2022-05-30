/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from 'react';
import { BitmapImageContainer, ImageContainer, ImageElement, ImageStage, VectorImageContainer } from './components';
import { UseImageStageProps, Zoom } from './types';

export const useImageStage = ({ height, isImageTypeVector }: UseImageStageProps) => {
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const imageStage = useRef<ImageStage>();
    const imageContainer = useRef<ImageContainer>();
    const imageRef = useRef<HTMLImageElement | null>(null);
    const stageRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const onZoomIn = () => imageContainer?.current?.resizeImageContainer(Zoom.IN);
    const onZoomOut = () => imageContainer?.current?.resizeImageContainer(Zoom.OUT);

    useEffect(() => {
        if (isImageLoaded && stageRef.current && containerRef.current && imageRef.current) {
            const imageElement = new ImageElement(imageRef.current);

            imageStage.current = new ImageStage(stageRef.current, height);
            imageStage.current.alterHeight(height);

            imageContainer.current = isImageTypeVector
                ? new VectorImageContainer(containerRef.current, imageStage.current, imageElement)
                : new BitmapImageContainer(containerRef.current, imageStage.current, imageElement);
        }
    }, [height, isImageLoaded, isImageTypeVector]);

    useEffect(() => {
        if (imageStage.current && isImageTypeVector) {
            imageStage.current.alterHeight(isFullScreen ? '100vh' : imageStage.current.customHeight);
        }
    }, [isFullScreen, isImageTypeVector]);

    return { isFullScreen, setIsFullScreen, onZoomIn, onZoomOut, stageRef, containerRef, imageRef, setIsImageLoaded };
};
