/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useRef, useState } from 'react';

import { toHexString } from '@frontify/guideline-blocks-settings';

import { AnimationCurveCanvasGrid, Circle, Line } from './';
import { AnimationCanvasProps, AnimationCurveType, AnimationFunction, ControlPoint, Point, Size } from '../types';
import '../styles.css';
import { DEFAULT_LINE_COLOR } from '../constants';
export const getPositionWithinViewBoxFromAnimationPoint = (viewBox: Size, animationPoint: Point): Point => {
    return {
        x: viewBox.width * animationPoint.x,
        y: viewBox.height - animationPoint.y * viewBox.height,
    };
};

export const AnimationCanvas = ({
    animationFunction,
    lineColor = DEFAULT_LINE_COLOR,
    endpointColor,
    gridColor,
    showGrid,
    showEndPoints,
    showHandles = false,
    viewBox,
    shouldAnimate = false,
    title,
    setCanvasHeight,
    setAnimationFunction,
}: AnimationCanvasProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const animationCurvePathRef = useRef<SVGPathElement>(null);
    const [animationCurvePathLength, setAnimationCurvePathLength] = useState(0);
    const [scale, setScale] = useState(1);
    const [draggingPoint, setDraggingPoint] = useState<ControlPoint | null>(null);

    const handleColor = {
        red: 113,
        green: 89,
        blue: 215,
    };
    const startPoint: Point = { x: 0.0, y: viewBox.height };
    const startHandlePoint: Point = getPositionWithinViewBoxFromAnimationPoint(viewBox, {
        x: animationFunction.parameters.x1,
        y: animationFunction.parameters.y1,
    });

    const endPoint: Point = { x: viewBox.width, y: 0.0 };
    const endHandlePoint: Point = getPositionWithinViewBoxFromAnimationPoint(viewBox, {
        x: animationFunction.parameters.x2,
        y: animationFunction.parameters.y2,
    });

    const cubicBezier = `M ${startPoint.x}, ${startPoint.y} C ${startHandlePoint.x},${startHandlePoint.y} ${endHandlePoint.x},${endHandlePoint.y} ${endPoint.x}, ${endPoint.y}`;
    const animationCurvePathAnimation = `animateDash ${animationFunction.duration}s cubic-bezier(${animationFunction.parameters.x1}, ${animationFunction.parameters.y1}, ${animationFunction.parameters.x2}, ${animationFunction.parameters.y2}) forwards`;
    const animationCurvePathStyle = shouldAnimate ? { animation: animationCurvePathAnimation } : {};

    const updateScale = useCallback(() => {
        const svg = svgRef.current;

        if (svg) {
            setScale(svg.getBoundingClientRect().width / viewBox.width);
        }
    }, [viewBox.width]);

    useEffect(() => {
        const animationCurvePath = animationCurvePathRef.current;

        if (!animationCurvePath) {
            return;
        }

        setAnimationCurvePathLength(animationCurvePath.getTotalLength() * scale);
    }, [scale, animationFunction]);

    useEffect(() => {
        updateScale();
    }, [updateScale, viewBox.width, viewBox.height]);

    useEffect(() => {
        const svg = svgRef.current;
        if (svg && setCanvasHeight) {
            setCanvasHeight(svgRef.current.parentElement?.getBoundingClientRect().height || 0);
        }
    });

    const handleMovePoint = useCallback(
        (event: MouseEvent) => {
            if (!draggingPoint || !svgRef.current) {
                return;
            }

            const clientPosition: Point = { x: event.clientX, y: event.clientY };
            const svgBoundingBox = svgRef.current.getBoundingClientRect();

            const positionRelativeToSvg: Point = {
                x: clientPosition.x - svgBoundingBox.left,
                y: clientPosition.y - svgBoundingBox.top,
            };

            const positionWithinViewBox: Point = {
                x: (positionRelativeToSvg.x * viewBox.width) / svgBoundingBox.width,
                y: (positionRelativeToSvg.y * viewBox.height) / svgBoundingBox.height,
            };

            const animationValues = {
                x: Math.max(Math.min(positionWithinViewBox.x / viewBox.width, 1), 0),
                y: 1 - positionWithinViewBox.y / viewBox.height,
            };

            setAnimationFunction && setAnimationFunction(updatedAnimationFunction(animationValues, draggingPoint));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [draggingPoint, viewBox.width, viewBox.height]
    );

    const updatedAnimationFunction = (animationValues: Point, draggingPoint: ControlPoint): AnimationFunction => {
        if (draggingPoint === ControlPoint.Start) {
            return {
                ...animationFunction,
                type: AnimationCurveType.Custom,
                parameters: {
                    ...animationFunction.parameters,
                    x1: Math.round(animationValues.x * 100) / 100,
                    y1: Math.round(animationValues.y * 100) / 100,
                },
            };
        } else {
            return {
                ...animationFunction,
                type: AnimationCurveType.Custom,
                parameters: {
                    ...animationFunction.parameters,
                    x2: Math.round(animationValues.x * 100) / 100,
                    y2: Math.round(animationValues.y * 100) / 100,
                },
            };
        }
    };

    const handleDragEnd = useCallback(() => {
        if (!draggingPoint) {
            return;
        }
        setAnimationFunction && setAnimationFunction(animationFunction);
        setDraggingPoint(null);
    }, [draggingPoint, animationFunction, setAnimationFunction]);

    useEffect(() => {
        window.addEventListener('pointerup', handleDragEnd);
        window.addEventListener('pointermove', handleMovePoint);

        return () => {
            window.removeEventListener('pointerup', handleDragEnd);
            window.removeEventListener('pointermove', handleMovePoint);
        };
    }, [handleDragEnd, handleMovePoint]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            updateScale();
        });

        const svgNode = svgRef.current;
        if (!svgNode) {
            return;
        }
        resizeObserver.observe(svgNode);
        return () => {
            resizeObserver.unobserve(svgNode);
        };
    }, [updateScale, svgRef]);

    return (
        <svg
            viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
            ref={svgRef}
            className="tw-overflow-visible tw-w-full tw-select-none"
            role="img"
        >
            <title>{title ? title : 'Animation Curve'}</title>
            {showGrid && gridColor && <AnimationCurveCanvasGrid viewBox={viewBox} lineColor={gridColor} />}

            <path
                data-test-id="animation-curves-canvas-path"
                ref={animationCurvePathRef}
                className="animated"
                style={shouldAnimate ? animationCurvePathStyle : {}}
                d={cubicBezier}
                fill="none"
                stroke={toHexString(lineColor)}
                strokeWidth={2}
                strokeDasharray={shouldAnimate ? animationCurvePathLength : 0}
                strokeDashoffset={shouldAnimate ? animationCurvePathLength : 0}
                vectorEffect="non-scaling-stroke"
            />

            {showHandles && (
                <>
                    <Line start={startPoint} end={startHandlePoint} dashed={true} strokeColor={handleColor} />

                    <Circle
                        testId="startPoint"
                        center={startHandlePoint}
                        radius={5}
                        scale={scale}
                        isDraggable={true}
                        fillColor={handleColor}
                        onPointerDown={() => setDraggingPoint(ControlPoint.Start)}
                    />

                    <Line start={endPoint} end={endHandlePoint} dashed={true} strokeColor={handleColor} />

                    <Circle
                        testId="endpoint"
                        center={endHandlePoint}
                        radius={5}
                        scale={scale}
                        isDraggable={true}
                        fillColor={handleColor}
                        onPointerDown={() => setDraggingPoint(ControlPoint.End)}
                    />
                </>
            )}

            {showEndPoints && endpointColor && (
                <>
                    <Circle
                        testId="animation-canvas-endpoint"
                        center={startPoint}
                        radius={3}
                        scale={scale}
                        fillColor={endpointColor}
                    />
                    <Circle
                        testId="animation-canvas-endpoint"
                        center={endPoint}
                        radius={3}
                        scale={scale}
                        fillColor={endpointColor}
                    />
                </>
            )}
        </svg>
    );
};
