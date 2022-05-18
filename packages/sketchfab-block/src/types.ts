/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '@frontify/app-bridge';
import { Color } from '@frontify/arcade';
import { BorderStyle, Radius } from '@frontify/guideline-blocks-shared';

export type Props = {
    appBridge: AppBridgeNative;
};

export type Settings = {
    accountType: 'Basic' | 'Pro' | 'Premium';
    url: string;
    height: SketchFabHeight;
    hasBorder?: boolean;
    borderColor: Color;
    borderStyle: BorderStyle;
    borderWidth: string;
    hasRadius?: boolean;
    radiusValue?: string;
    radiusChoice?: Radius;
    isCustomHeight: boolean;
    customHeight: string;
    autoStart: boolean;
    autoPlay: boolean;
    textureSize: boolean;
    textureSizeValue: string;
    fps: boolean;
    fpsValue: string;
    preloadTextures: boolean;
    viewersTracking: boolean;
    apiLog: boolean;
    transparentBackground: boolean;
    navigationMode: 'orbit' | 'fps';
    scrollWheel: boolean;
    doubleClick: boolean;
    startingSpin: boolean;
    autoSpin: boolean;
    autoSpinCount: string;
    preventLightRotation: boolean;
    orbitConstraintPan: boolean;
    orbitConstraintPitch: boolean;
    orbitConstraintPitchLimitsUp: string;
    orbitConstraintPitchLimitsDown: string;
    orbitConstraintYaw: boolean;
    orbitConstraintYawLimitsLeft: string;
    orbitConstraintYawLimitsRight: string;
    orbitConstraintZoomIn: boolean;
    orbitConstraintZoomInCount: string;
    orbitConstraintZoomOut: boolean;
    orbitConstraintZoomOutCount: string;
    showAnnotations: boolean;
    annotationCycle: boolean;
    annotationCycleCount: string;
    annotationTooltipVisible: boolean;
    startingAnnotation: string;
    uiTheme: 'default' | 'dark';
    uiDOF: boolean;
    uiDisableViewer: boolean;
    uiColor: Color;
    uiAnimations: boolean;
    uiAnnotations: boolean;
    uiControls: boolean;
    uiFadeout: boolean;
    uiFullscreen: boolean;
    uiGeneralControls: boolean;
    uiHelp: boolean;
    uiHint: boolean;
    uiInfos: boolean;
    uiInspector: boolean;
    uiLoading: boolean;
    uiSettings: boolean;
    uiSound: boolean;
    uiStart: boolean;
    uiVR: boolean;
    uiAR: boolean;
    uiARHelp: boolean;
    uiQR: boolean;
    uiWatermark: boolean;
};

export enum SketchFabHeight {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const borderStyles: Record<BorderStyle, string> = {
    [BorderStyle.Solid]: 'solid',
    [BorderStyle.Dotted]: 'dotted',
    [BorderStyle.Dashed]: 'dashed',
};

export const borderRadiusClasses: Record<Radius, string> = {
    [Radius.None]: 'tw-rounded-none',
    [Radius.Small]: 'tw-rounded',
    [Radius.Medium]: 'tw-rounded-md',
    [Radius.Large]: 'tw-rounded-lg',
};

export const heights: Record<SketchFabHeight, string> = {
    [SketchFabHeight.Small]: '400px',
    [SketchFabHeight.Medium]: '600px',
    [SketchFabHeight.Large]: '800px',
};
