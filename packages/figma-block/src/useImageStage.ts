/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';

import {
    BitmapContainerOperator,
    type ContainerOperator,
    ImageContainer,
    ImageElement,
    ImageStage,
    VectorContainerOperator,
} from './components';
import { getHeightOfBlock } from './helpers';
import { type UseImageStageProps, Zoom } from './types';

export const useImageStage = ({ height, hasLimitedOptions, isMobile }: UseImageStageProps) => {
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const imageStage = useRef<ImageStage>();
    const containerOperator = useRef<ContainerOperator>();
    const hasLimitedOptionsRef = useRef<boolean>(hasLimitedOptions);
    const isFullScreenRef = useRef<boolean>(isFullScreen);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const stageRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const onZoomIn = () => containerOperator?.current?.resize(Zoom.IN);
    const onZoomOut = () => containerOperator?.current?.resize(Zoom.OUT);
    useEffect(() => {
        if (isImageLoaded && stageRef.current) {
            const calculatedHeight = getHeightOfBlock(height, isMobile);
            imageStage.current = new ImageStage(stageRef.current, calculatedHeight);
            if (!hasLimitedOptions) {
                imageStage.current.alterHeight(calculatedHeight);
            }
        }
    }, [height, isImageLoaded, isMobile, hasLimitedOptions, isFullScreen]);

    useEffect(() => {
        if (imageStage.current) {
            imageStage.current.alterHeight(isFullScreen ? '100vh' : 'auto');
            containerOperator.current?.centerTheImageContainerWithinTheImageStage();
        }
    }, [isFullScreen, hasLimitedOptions, isMobile]);

    useEffect(() => {
        if (stageRef.current) {
            new ResizeObserver(() => {
                if (imageRef.current && containerRef.current && imageStage.current) {
                    const imageElement = new ImageElement(imageRef.current);
                    const imageContainer = new ImageContainer(containerRef.current);
                    containerOperator.current = hasLimitedOptionsRef.current
                        ? new BitmapContainerOperator(imageContainer, imageStage.current, imageElement)
                        : new VectorContainerOperator(
                              imageContainer,
                              imageStage.current,
                              imageElement,
                              isFullScreenRef.current
                          );
                    containerOperator.current.fitAndCenterTheImageContainerWithinTheImageStage();
                }
            }).observe(stageRef.current);
        }
    }, []);

    useEffect(() => {
        hasLimitedOptionsRef.current = hasLimitedOptions;
    }, [hasLimitedOptions]);

    useEffect(() => {
        isFullScreenRef.current = isFullScreen;
    }, [isFullScreen]);

    return { isFullScreen, setIsFullScreen, onZoomIn, onZoomOut, stageRef, containerRef, imageRef, setIsImageLoaded };
};
