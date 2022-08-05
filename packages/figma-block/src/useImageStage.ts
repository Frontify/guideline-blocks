/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';
import {
    BitmapContainerOperator,
    ContainerOperator,
    ImageContainer,
    ImageElement,
    ImageStage,
    VectorContainerOperator,
} from './components';
import { UseImageStageProps, Zoom } from './types';

export const useImageStage = ({ height, isContainerVector }: UseImageStageProps) => {
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const imageStage = useRef<ImageStage>();
    const containerOperator = useRef<ContainerOperator>();
    const imageRef = useRef<HTMLImageElement | null>(null);
    const stageRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const onZoomIn = () => containerOperator?.current?.resize(Zoom.IN);
    const onZoomOut = () => containerOperator?.current?.resize(Zoom.OUT);

    useEffect(() => {
        if (isImageLoaded && stageRef.current && containerRef.current && imageRef.current) {
            const imageElement = new ImageElement(imageRef.current);
            const imageContainer = new ImageContainer(containerRef.current);
            imageStage.current = new ImageStage(stageRef.current, height);

            containerOperator.current = isContainerVector
                ? new VectorContainerOperator(imageContainer, imageStage.current, imageElement)
                : new BitmapContainerOperator(imageContainer, imageStage.current, imageElement);

            containerOperator.current.fitAndCenterTheImageContainerWithinTheImageStage();
        }
    }, [height, isImageLoaded, isContainerVector]);

    useEffect(() => {
        if (imageStage.current && isContainerVector) {
            imageStage.current.alterHeight(isFullScreen ? '100vh' : imageStage.current.customHeight);
            containerOperator.current?.centerTheImageContainerWithinTheImageStage();
        }
    }, [isFullScreen, isContainerVector]);

    return { isFullScreen, setIsFullScreen, onZoomIn, onZoomOut, stageRef, containerRef, imageRef, setIsImageLoaded };
};
