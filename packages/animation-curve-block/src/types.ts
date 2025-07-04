/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import { BorderStyle, Color, GutterSpacing, Radius } from '@frontify/guideline-blocks-settings';

export type Size = {
    width: number;
    height: number;
};

export type Point = {
    x: number;
    y: number;
};

export enum ControlPoint {
    Start = 'Start',
    End = 'End',
}

export type AnimationCurve = {
    id: string;
    title?: string;
    description?: string;
    animationFunction: AnimationFunction;
};

export type AnimationCurvePatch = Partial<Omit<AnimationCurve, 'id' | 'colors'>>;

export type AnimationFunction = { type: AnimationCurveType; parameters: AnimationCurveParameters; duration: number };
export type AnimationFunctionPatch = Partial<AnimationFunction>;

export enum AnimationCurveType {
    Linear = 'linear',
    EaseIn = 'easeIn',
    EaseOut = 'easeOut',
    EaseInOut = 'easeInOut',
    Custom = 'custom',
    EaseInSine = 'easeInSine',
    EaseInQuad = 'easeInQuad',
    EaseInCubic = 'easeInCubic',
    EaseInQuart = 'easeInQuart',
    EaseInQuint = 'easeInQuint',
    EaseInExpo = 'easeInExpo',
    EaseInCirc = 'easeInCirc',
    EaseInBack = 'easeInBack',
    EaseOutSine = 'easeOutSine',
    EaseOutQuad = 'easeOutQuad',
    EaseOutCubic = 'easeOutCubic',
    EaseOutQuart = 'easeOutQuart',
    EaseOutQuint = 'easeOutQuint',
    EaseOutExpo = 'easeOutExpo',
    EaseOutCirc = 'easeOutCirc',
    EaseOutBack = 'easeOutBack',
    EaseInOutSine = 'easeInOutSine',
    EaseInOutQuad = 'easeInOutQuad',
    EaseInOutCubic = 'easeInOutCubic',
    EaseInOutQuart = 'easeInOutQuart',
    EaseInOutQuint = 'easeInOutQuint',
    EaseInOutExpo = 'easeInOutExpo',
    EaseInOutCirc = 'easeInOutCirc',
    EaseInOutBack = 'easeInOutBack',
}

export const defaultAnimationCurveTypeValues: Record<AnimationCurveType, AnimationCurveParameters> = {
    [AnimationCurveType.Linear]: { x1: 0.0, y1: 0.0, x2: 1.0, y2: 1.0 },
    [AnimationCurveType.EaseIn]: { x1: 0.42, y1: 0.0, x2: 1.0, y2: 1.0 },
    [AnimationCurveType.EaseOut]: { x1: 0.0, y1: 0.0, x2: 0.58, y2: 1.0 },
    [AnimationCurveType.EaseInOut]: { x1: 0.42, y1: 0.0, x2: 0.58, y2: 1.0 },
    [AnimationCurveType.Custom]: { x1: 0.42, y1: 0.0, x2: 0.58, y2: 1.0 },
    [AnimationCurveType.EaseInSine]: { x1: 0.12, y1: 0.0, x2: 0.39, y2: 0 },
    [AnimationCurveType.EaseInQuad]: { x1: 0.11, y1: 0.0, x2: 0.5, y2: 0 },
    [AnimationCurveType.EaseInCubic]: { x1: 0.32, y1: 0.0, x2: 0.67, y2: 0 },
    [AnimationCurveType.EaseInQuart]: { x1: 0.5, y1: 0.0, x2: 0.75, y2: 0 },
    [AnimationCurveType.EaseInQuint]: { x1: 0.64, y1: 0.0, x2: 0.78, y2: 0 },
    [AnimationCurveType.EaseInExpo]: { x1: 0.7, y1: 0.0, x2: 0.84, y2: 0 },
    [AnimationCurveType.EaseInCirc]: { x1: 0.55, y1: 0.0, x2: 1.0, y2: 0.45 },
    [AnimationCurveType.EaseInBack]: { x1: 0.36, y1: 0.0, x2: 0.66, y2: -0.56 },
    [AnimationCurveType.EaseOutSine]: { x1: 0.61, y1: 1.0, x2: 0.88, y2: 1.0 },
    [AnimationCurveType.EaseOutQuad]: { x1: 0.5, y1: 1.0, x2: 0.89, y2: 1.0 },
    [AnimationCurveType.EaseOutCubic]: { x1: 0.33, y1: 1.0, x2: 0.68, y2: 1.0 },
    [AnimationCurveType.EaseOutQuart]: { x1: 0.25, y1: 1.0, x2: 0.5, y2: 1.0 },
    [AnimationCurveType.EaseOutQuint]: { x1: 0.22, y1: 1.0, x2: 0.36, y2: 1.0 },
    [AnimationCurveType.EaseOutExpo]: { x1: 0.16, y1: 1.0, x2: 0.3, y2: 1.0 },
    [AnimationCurveType.EaseOutCirc]: { x1: 0.0, y1: 0.55, x2: 0.45, y2: 1.0 },
    [AnimationCurveType.EaseOutBack]: { x1: 0.34, y1: 1.56, x2: 0.64, y2: 1.0 },
    [AnimationCurveType.EaseInOutSine]: { x1: 0.37, y1: 0.0, x2: 0.63, y2: 1.0 },
    [AnimationCurveType.EaseInOutQuad]: { x1: 0.45, y1: 0.0, x2: 0.55, y2: 1.0 },
    [AnimationCurveType.EaseInOutCubic]: { x1: 0.65, y1: 0.0, x2: 0.35, y2: 1.0 },
    [AnimationCurveType.EaseInOutQuart]: { x1: 0.76, y1: 0.0, x2: 0.24, y2: 1.0 },
    [AnimationCurveType.EaseInOutQuint]: { x1: 0.83, y1: 0.0, x2: 0.17, y2: 1.0 },
    [AnimationCurveType.EaseInOutExpo]: { x1: 0.87, y1: 0.0, x2: 0.13, y2: 1.0 },
    [AnimationCurveType.EaseInOutCirc]: { x1: 0.85, y1: 0.0, x2: 0.15, y2: 1.0 },
    [AnimationCurveType.EaseInOutBack]: { x1: 0.68, y1: -0.6, x2: 0.32, y2: 1.6 },
};

export type AnimationCurveParameters = { x1: number; y1: number; x2: number; y2: number };
export type AnimationCurveParametersPatch = Partial<AnimationCurveParameters>;

export type Settings = {
    content: AnimationCurve[];
    columns: number;
    hasCustomSpacing: boolean;
    spacingCustom?: string;
    spacingChoice: GutterSpacing;
    duration: boolean;
    parameter: boolean;
    hasBackground: boolean;
    backgroundColor: Color | null;
    hasBorder: boolean;
    borderStyle: BorderStyle;
    borderWidth: string;
    borderColor: Color | null;
    hasRadius: boolean;
    radiusChoice: Radius;
    radiusValue?: number;
    lineColor: Color | null;
    hasEndpoints: boolean;
    endpointsColor: Color | null;
    hasGrid: boolean;
    gridColor: Color | null;
    hasMotion: boolean;
    hasParameter: boolean;
    hasDuration: boolean;
    displayCss: boolean;
};

export type AnimationCurveCanvasGridProps = {
    viewBox: Size;
    lineColor: Color;
};

export type BlankSlateProps = {
    appBridge: AppBridgeBlock;
    content: AnimationCurve[];
    hasBorder: boolean;
    canvasHeight: number;
    setBlockSettings: (newSettings: Partial<Settings>) => Promise<void>;
    setLocalItems: (items: AnimationCurve[]) => void;
};

export type SortableCardProps = {
    appBridge: AppBridgeBlock;
    animationCurve: AnimationCurve;
    isEditing: boolean;
    blockSettings: Settings;
    onDelete: (id: string) => void;
    onUpdate: (id: string, animationCurvePatch: AnimationCurvePatch) => void;
    setCanvasHeight: (height: number) => void;
};

export type CardProps = SortableCardProps & {
    isDragging?: boolean;
    setActivatorNodeRef?: (node: HTMLElement | null) => void;
    replaceWithPlaceholder?: boolean;
    transformStyle?: Record<string, unknown>;
    draggableProps?: Record<string, unknown>;
};

export type CardTextProps = {
    appBridge: AppBridgeBlock;
    title: string;
    description: string;
    hasBorder: boolean;
    isEditing: boolean;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
};

export type AnimationCanvasProps = {
    animationFunction: AnimationFunction;
    lineColor?: Color;
    endpointColor?: Color;
    gridColor?: Color;
    showGrid: boolean;
    showEndPoints: boolean;
    showHandles?: boolean;
    viewBox: Size;
    shouldAnimate?: boolean;
    title?: string;
    setCanvasHeight?: (height: number) => void;
    setAnimationFunction?: (animationFunction: AnimationFunction) => void;
};

export type AnimationCurveFlyoutProps = {
    animationCurve: AnimationCurve;
    isFlyoutOpen: boolean;
    initialAnimationFunction?: AnimationFunction;
    onSave: (id: string, animationCurvePatch: AnimationCurvePatch) => void;
    onCancel: () => void;
    onOpenChange: (isOpen: boolean) => void;
    onAnimationCurveUpdate?: (id: string, animationCurve: AnimationCurve) => void;
    onAnimationCurveChange?: (animationCurve: AnimationCurve) => void;
};

export type LineProps = {
    start: Point;
    end: Point;
    strokeColor: Color;
    strokeWidth?: number;
    dashed?: boolean;
    dashArray?: number;
};

export type CircleProps = {
    center: Point;
    radius: number;
    scale?: number;
    fillColor: Color;
    isDraggable?: boolean;
    testId?: string;
    onPointerDown?: () => void;
};
