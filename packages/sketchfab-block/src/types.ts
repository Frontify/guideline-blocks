/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BorderStyle, type Color, Radius } from '@frontify/guideline-blocks-settings';

export enum SketchfabSettings {
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
    ALLOW_LIGHT_ROTATION = 'allowLightRotation',
    NAVIGATION_CONSTRAINTS = 'navigationConstraints',
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
    STARTING_ANNOTATION_VALUE = 'startingAnnotationValue',
    UI_THEME = 'uiTheme',
    UI_DOF = 'uiDOF',
    SHOW_UI = 'showUI',
    UI_DISABLE_VIEWER = 'uiDisableViewer',
    UI_COLOR = 'uiColor',
    UI_COLOR_VALUE = 'uiColorValue',
    UI_ANIMATIONS = 'uiAnimations',
    UI_ANNOTATIONS = 'uiAnnotations',
    UI_FADEOUT = 'uiFadeout',
    SHOW_BUTTONS = 'showButtons',
    UI_FULLSCREEN = 'uiFullscreen',
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
    [SketchfabSettings.ACCOUNT_TYPE]: SketchfabAccount;
    [SketchfabSettings.URL]: string;
    [SketchfabSettings.HEIGHT]: SketchfabHeight;
    [SketchfabSettings.HAS_BORDER]: boolean;
    [SketchfabSettings.BORDER_COLOR]: Color;
    [SketchfabSettings.BORDER_STYLE]: BorderStyle;
    [SketchfabSettings.BORDER_WIDTH]: string;
    [SketchfabSettings.HAS_RADIUS]: boolean;
    [SketchfabSettings.RADIUS_VALUE]: string;
    [SketchfabSettings.RADIUS_CHOICE]: Radius;
    [SketchfabSettings.IS_CUSTOM_HEIGHT]: boolean;
    [SketchfabSettings.CUSTOM_HEIGHT]: string;
    [SketchfabSettings.AUTO_START]: boolean;
    [SketchfabSettings.AUTO_PLAY]: boolean;
    [SketchfabSettings.TEXTURE_SIZE]: boolean;
    [SketchfabSettings.TEXTURE_SIZE_VALUE]: string;
    [SketchfabSettings.FPS]: boolean;
    [SketchfabSettings.FPS_VALUE]: string;
    [SketchfabSettings.PRELOAD_TEXTURES]: boolean;
    [SketchfabSettings.VIEWERS_TRACKING]: boolean;
    [SketchfabSettings.API_LOG]: boolean;
    [SketchfabSettings.TRANSPARENT_BACKGROUND]: boolean;
    [SketchfabSettings.NAVIGATION_MODE]: SketchfabNavigation;
    [SketchfabSettings.SCROLL_WHEEL]: boolean;
    [SketchfabSettings.DOUBLE_CLICK]: boolean;
    [SketchfabSettings.STARTING_SPIN]: boolean;
    [SketchfabSettings.AUTO_SPIN]: boolean;
    [SketchfabSettings.AUTO_SPIN_COUNT]: string;
    [SketchfabSettings.ALLOW_LIGHT_ROTATION]: boolean;
    [SketchfabSettings.NAVIGATION_CONSTRAINTS]: boolean;
    [SketchfabSettings.ORBIT_CONSTRAINT_PAN]: boolean;
    [SketchfabSettings.ORBIT_CONSTRAINT_PITCH]: boolean;
    [SketchfabSettings.ORBIT_CONTRAINT_PITCH_LIMITS_UP]: string;
    [SketchfabSettings.ORBIT_CONTRAINT_PITCH_LIMITS_DOWN]: string;
    [SketchfabSettings.ORBIT_CONTRAINT_YAW]: boolean;
    [SketchfabSettings.ORBIT_CONTRAINT_YAW_LIMITS_LEFT]: string;
    [SketchfabSettings.ORBIT_CONTRAINT_YAW_LIMITS_RIGHT]: string;
    [SketchfabSettings.ORBIT_CONTRAINT_ZOOM_IN]: boolean;
    [SketchfabSettings.ORBIT_CONTRAINT_ZOOM_IN_COUNT]: string;
    [SketchfabSettings.ORBIT_CONTRAINT_ZOOM_OUT]: boolean;
    [SketchfabSettings.ORBIT_CONTRAINT_ZOOM_OUT_COUNT]: string;
    [SketchfabSettings.SHOW_ANNOTATIONS]: boolean;
    [SketchfabSettings.ANNOTATION_CYCLE]: boolean;
    [SketchfabSettings.ANNOTATION_CYCLE_COUNT]: string;
    [SketchfabSettings.ANNOTATION_TOOLTIP_VISIBLE]: boolean;
    [SketchfabSettings.STARTING_ANNOTATION]: boolean;
    [SketchfabSettings.STARTING_ANNOTATION_VALUE]: string;
    [SketchfabSettings.UI_THEME]: SketchfabTheme;
    [SketchfabSettings.UI_DOF]: boolean;
    [SketchfabSettings.SHOW_UI]: boolean;
    [SketchfabSettings.UI_DISABLE_VIEWER]: boolean;
    [SketchfabSettings.UI_COLOR]: boolean;
    [SketchfabSettings.UI_COLOR_VALUE]: Color;
    [SketchfabSettings.UI_ANIMATIONS]: boolean;
    [SketchfabSettings.UI_ANNOTATIONS]: boolean;
    [SketchfabSettings.UI_FADEOUT]: boolean;
    [SketchfabSettings.SHOW_BUTTONS]: boolean;
    [SketchfabSettings.UI_FULLSCREEN]: boolean;
    [SketchfabSettings.UI_HELP]: boolean;
    [SketchfabSettings.UI_HINT]: boolean;
    [SketchfabSettings.UI_INFOS]: boolean;
    [SketchfabSettings.UI_INSPECTOR]: boolean;
    [SketchfabSettings.UI_LOADING]: boolean;
    [SketchfabSettings.UI_SETTINGS]: boolean;
    [SketchfabSettings.UI_SOUND]: boolean;
    [SketchfabSettings.UI_START]: boolean;
    [SketchfabSettings.UI_VR]: boolean;
    [SketchfabSettings.UI_AR]: boolean;
    [SketchfabSettings.UI_AR_HELP]: boolean;
    [SketchfabSettings.UI_QR]: boolean;
    [SketchfabSettings.UI_WATERMARK]: boolean;
};

export enum SketchfabHeight {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export const borderStyles: Record<BorderStyle, string> = {
    [BorderStyle.Solid]: 'solid',
    [BorderStyle.Dotted]: 'dotted',
    [BorderStyle.Dashed]: 'dashed',
};

export const heights: Record<SketchfabHeight, string> = {
    [SketchfabHeight.Small]: '300px',
    [SketchfabHeight.Medium]: '500px',
    [SketchfabHeight.Large]: '700px',
};

export const radiusClassMap: Record<Radius, string> = {
    [Radius.None]: '',
    [Radius.Small]: 'tw-rounded-sm',
    [Radius.Medium]: 'tw-rounded',
    [Radius.Large]: 'tw-rounded-xl',
};

export enum SketchfabAccount {
    Premium = 'Premium',
    Pro = 'Pro',
    Basic = 'Basic',
}

export enum SketchfabTheme {
    Default = 'default',
    Dark = 'dark',
}

export enum SketchfabNavigation {
    Orbit = 'orbit',
    Fps = 'fps',
}
