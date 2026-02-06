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
    const imageStageRef = useRef<ImageStage>();
    const containerOperatorRef = useRef<ContainerOperator>();
    const hasLimitedOptionsRef = useRef<boolean>(hasLimitedOptions);
    const isFullScreenRef = useRef<boolean>(isFullScreen);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const stageRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const onZoomIn = () => containerOperatorRef?.current?.resize(Zoom.IN);
    const onZoomOut = () => containerOperatorRef?.current?.resize(Zoom.OUT);
    useEffect(() => {
        if (isImageLoaded && stageRef.current) {
            const calculatedHeight = getHeightOfBlock(height, isMobile);
            imageStageRef.current = new ImageStage(stageRef.current, calculatedHeight);
            imageStageRef.current.alterHeight(calculatedHeight);
        }
    }, [height, isImageLoaded, isMobile, hasLimitedOptions, isFullScreen]);

    useEffect(() => {
        if (imageStageRef.current) {
            const calculatedHeight = getHeightOfBlock(height, isMobile);
            imageStageRef.current.alterHeight(isFullScreen ? '100vh' : calculatedHeight);
            containerOperatorRef.current?.centerTheImageContainerWithinTheImageStage();
        }
    }, [isFullScreen, hasLimitedOptions, isMobile, height]);

    useEffect(() => {
        let resizeObserver: ResizeObserver | undefined;
        if (stageRef.current) {
            resizeObserver = new ResizeObserver(() => {
                if (imageRef.current && containerRef.current && imageStageRef.current) {
                    const imageElement = new ImageElement(imageRef.current);
                    const imageContainer = new ImageContainer(containerRef.current);
                    containerOperatorRef.current = hasLimitedOptionsRef.current
                        ? new BitmapContainerOperator(imageContainer, imageStageRef.current, imageElement)
                        : new VectorContainerOperator(
                              imageContainer,
                              imageStageRef.current,
                              imageElement,
                              isFullScreenRef.current
                          );
                    containerOperatorRef.current.fitAndCenterTheImageContainerWithinTheImageStage();
                }
            });
            resizeObserver.observe(stageRef.current);
        }
        return () => {
            resizeObserver?.disconnect();
        };
    }, []);

    useEffect(() => {
        hasLimitedOptionsRef.current = hasLimitedOptions;
    }, [hasLimitedOptions]);

    useEffect(() => {
        isFullScreenRef.current = isFullScreen;
    }, [isFullScreen]);

    return { isFullScreen, setIsFullScreen, onZoomIn, onZoomOut, stageRef, containerRef, imageRef, setIsImageLoaded };
};
