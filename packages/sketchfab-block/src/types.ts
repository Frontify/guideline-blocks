/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '@frontify/app-bridge';
import { Color } from '@frontify/arcade';
import { BorderStyle, Radius } from '@frontify/guideline-blocks-shared';

export type Props = {
    appBridge: AppBridgeNative;
};

export enum SketchFabSettings {
    ACCOUNT_TYPE = 'accountType',
    URL = 'url',
    HEIGHT = 'height',
    HAS_BORDER = 'hasBorder',
    BORDER_COLOR = 'borderColor',
    BORDER_STYLE = 'borderStyle',
    BORDER_WIDTH = 'borderWidth',
    HAS_RADIUS = 'hasRadius',
    RADIUS_VALUE = 'radiusValue',
    RADIUS_CHOICE = 'radiusChoice',
    IS_CUSTOM_HEIGHT = 'isCustomHeight',
    CUSTOM_HEIGHT = 'customHeight',
    AUTO_START = 'autoStart',
    AUTO_PLAY = 'autoPlay',
    TEXTURE_SIZE = 'textureSize',
    TEXTURE_SIZE_VALUE = 'textureSizeValue',
    FPS = 'fps',
    FPS_VALUE = 'fpsValue',
    PRELOAD_TEXTURES = 'preloadTextures',
    VIEWERS_TRACKING = 'viewersTracking',
    API_LOG = 'apiLog',
    TRANSPARENT_BACKGROUND = 'transparentBackground',
    NAVIGATION_MODE = 'navigationMode',
    SCROLL_WHEEL = 'scrollWheel',
    DOUBLE_CLICK = 'doubleClick',
    STARTING_SPIN = 'startingSpin',
    AUTO_SPIN = 'autoSpin',
    AUTO_SPIN_COUNT = 'autoSpinCount',
    PREVENT_LIGHT_ROTATION = 'preventLightRotation',
    ORBIT_CONSTRAINT_PAN = 'orbitConstraintPan',
    ORBIT_CONSTRAINT_PITCH = 'orbitConstraintPitch',
    ORBIT_CONTRAINT_PITCH_LIMITS_UP = 'orbitConstraintPitchLimitsUp',
    ORBIT_CONTRAINT_PITCH_LIMITS_DOWN = 'orbitConstraintPitchLimitsDown',
    ORBIT_CONTRAINT_YAW = 'orbitConstraintYaw',
    ORBIT_CONTRAINT_YAW_LIMITS_LEFT = 'orbitConstraintYawLimitsLeft',
    ORBIT_CONTRAINT_YAW_LIMITS_RIGHT = 'orbitConstraintYawLimitsRight',
    ORBIT_CONTRAINT_ZOOM_IN = 'orbitConstraintZoomIn',
    ORBIT_CONTRAINT_ZOOM_IN_COUNT = 'orbitConstraintZoomInCount',
    ORBIT_CONTRAINT_ZOOM_OUT = 'orbitConstraintZoomOut',
    ORBIT_CONTRAINT_ZOOM_OUT_COUNT = 'orbitConstraintZoomOutCount',
    SHOW_ANNOTATIONS = 'showAnnotations',
    ANNOTATION_CYCLE = 'annotationCycle',
    ANNOTATION_CYCLE_COUNT = 'annotationCycleCount',
    ANNOTATION_TOOLTIP_VISIBLE = 'annotationTooltipVisible',
    STARTING_ANNOTATION = 'startingAnnotation',
    UI_THEME = 'uiTheme',
    UI_DOF = 'uiDOF',
    UI_DISABLE_VIEWER = 'uiDisableViewer',
    UI_COLOR = 'uiColor',
    UI_ANIMATIONS = 'uiAnimations',
    UI_ANNOTATIONS = 'uiAnnotations',
    UI_CONTROLS = 'uiControls',
    UI_FADEOUT = 'uiFadeout',
    UI_FULLSCREEN = 'uiFullscreen',
    UI_GENERAL_CONTROLS = 'uiGeneralControls',
    UI_HELP = 'uiHelp',
    UI_HINT = 'uiHint',
    UI_INFOS = 'uiInfos',
    UI_INSPECTOR = 'uiInspector',
    UI_LOADING = 'uiLoading',
    UI_SETTINGS = 'uiSettings',
    UI_SOUND = 'uiSound',
    UI_START = 'uiStart',
    UI_VR = 'uiVR',
    UI_AR = 'uiAR',
    UI_AR_HELP = 'uiARHelp',
    UI_QR = 'uiQR',
    UI_WATERMARK = 'uiWatermark',
}

export type Settings = {
    [SketchFabSettings.ACCOUNT_TYPE]: 'Basic' | 'Pro' | 'Premium';
    [SketchFabSettings.URL]: string;
    [SketchFabSettings.HEIGHT]: SketchFabHeight;
    [SketchFabSettings.HAS_BORDER]?: boolean;
    [SketchFabSettings.BORDER_COLOR]: Color;
    [SketchFabSettings.BORDER_STYLE]: BorderStyle;
    [SketchFabSettings.BORDER_WIDTH]: string;
    [SketchFabSettings.HAS_RADIUS]?: boolean;
    [SketchFabSettings.RADIUS_VALUE]?: string;
    [SketchFabSettings.RADIUS_CHOICE]?: Radius;
    [SketchFabSettings.IS_CUSTOM_HEIGHT]: boolean;
    [SketchFabSettings.CUSTOM_HEIGHT]: string;
    [SketchFabSettings.AUTO_START]: boolean;
    [SketchFabSettings.AUTO_PLAY]: boolean;
    [SketchFabSettings.TEXTURE_SIZE]: boolean;
    [SketchFabSettings.TEXTURE_SIZE_VALUE]: string;
    [SketchFabSettings.FPS]: boolean;
    [SketchFabSettings.FPS_VALUE]: string;
    [SketchFabSettings.PRELOAD_TEXTURES]: boolean;
    [SketchFabSettings.VIEWERS_TRACKING]: boolean;
    [SketchFabSettings.API_LOG]: boolean;
    [SketchFabSettings.TRANSPARENT_BACKGROUND]: boolean;
    [SketchFabSettings.NAVIGATION_MODE]: 'orbit' | 'fps';
    [SketchFabSettings.SCROLL_WHEEL]: boolean;
    [SketchFabSettings.DOUBLE_CLICK]: boolean;
    [SketchFabSettings.STARTING_SPIN]: boolean;
    [SketchFabSettings.AUTO_SPIN]: boolean;
    [SketchFabSettings.AUTO_SPIN_COUNT]: string;
    [SketchFabSettings.PREVENT_LIGHT_ROTATION]: boolean;
    [SketchFabSettings.ORBIT_CONSTRAINT_PAN]: boolean;
    [SketchFabSettings.ORBIT_CONSTRAINT_PITCH]: boolean;
    [SketchFabSettings.ORBIT_CONTRAINT_PITCH_LIMITS_UP]: string;
    [SketchFabSettings.ORBIT_CONTRAINT_PITCH_LIMITS_DOWN]: string;
    [SketchFabSettings.ORBIT_CONTRAINT_YAW]: boolean;
    [SketchFabSettings.ORBIT_CONTRAINT_YAW_LIMITS_LEFT]: string;
    [SketchFabSettings.ORBIT_CONTRAINT_YAW_LIMITS_RIGHT]: string;
    [SketchFabSettings.ORBIT_CONTRAINT_ZOOM_IN]: boolean;
    [SketchFabSettings.ORBIT_CONTRAINT_ZOOM_IN_COUNT]: string;
    [SketchFabSettings.ORBIT_CONTRAINT_ZOOM_OUT]: boolean;
    [SketchFabSettings.ORBIT_CONTRAINT_ZOOM_OUT_COUNT]: string;
    [SketchFabSettings.SHOW_ANNOTATIONS]: boolean;
    [SketchFabSettings.ANNOTATION_CYCLE]: boolean;
    [SketchFabSettings.ANNOTATION_CYCLE_COUNT]: string;
    [SketchFabSettings.ANNOTATION_TOOLTIP_VISIBLE]: boolean;
    [SketchFabSettings.STARTING_ANNOTATION]: string;
    [SketchFabSettings.UI_THEME]: 'default' | 'dark';
    [SketchFabSettings.UI_DOF]: boolean;
    [SketchFabSettings.UI_DISABLE_VIEWER]: boolean;
    [SketchFabSettings.UI_COLOR]: Color;
    [SketchFabSettings.UI_ANIMATIONS]: boolean;
    [SketchFabSettings.UI_ANNOTATIONS]: boolean;
    [SketchFabSettings.UI_CONTROLS]: boolean;
    [SketchFabSettings.UI_FADEOUT]: boolean;
    [SketchFabSettings.UI_FULLSCREEN]: boolean;
    [SketchFabSettings.UI_GENERAL_CONTROLS]: boolean;
    [SketchFabSettings.UI_HELP]: boolean;
    [SketchFabSettings.UI_HINT]: boolean;
    [SketchFabSettings.UI_INFOS]: boolean;
    [SketchFabSettings.UI_INSPECTOR]: boolean;
    [SketchFabSettings.UI_LOADING]: boolean;
    [SketchFabSettings.UI_SETTINGS]: boolean;
    [SketchFabSettings.UI_SOUND]: boolean;
    [SketchFabSettings.UI_START]: boolean;
    [SketchFabSettings.UI_VR]: boolean;
    [SketchFabSettings.UI_AR]: boolean;
    [SketchFabSettings.UI_AR_HELP]: boolean;
    [SketchFabSettings.UI_QR]: boolean;
    [SketchFabSettings.UI_WATERMARK]: boolean;
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
