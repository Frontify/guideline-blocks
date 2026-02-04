/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type BlockSettingsStructureExport,
    type Bundle,
    type NotificationBlock,
    NotificationBlockDividerPosition,
    NotificationStyleType,
    type SettingBlock,
    getBorderRadiusSettings,
    getBorderSettings,
    maximumNumericalRule,
    minimumNumericalOrPixelOrAutoRule,
    minimumNumericalRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';

import { parseSketchfabSettingsUrl, pitchRule, sketchfabUrlRule, yawRule } from './helpers';
import {
    SketchfabAccount,
    SketchfabHeight,
    SketchfabNavigation,
    SketchfabSettings,
    SketchfabTheme,
    heights,
} from './types';

export const BORDER_COLOR_DEFAULT_VALUE = {
    red: 234,
    green: 235,
    blue: 235,
    alpha: 1,
    name: 'Light Grey',
};
export const URL_INPUT_PLACEHOLDER = 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed';

export const DEFAULT_BORDER_WIDTH = '1px';

const TEXTURE_SIZES = ['32', '128', '256', '512', '1024', '2048', '4096', '8192'];

const isPremiumAccount = (bundle: Bundle): boolean =>
    bundle.getBlock(SketchfabSettings.ACCOUNT_TYPE)?.value === SketchfabAccount.Premium;

const isProOrPremiumAccount = (bundle: Bundle): boolean =>
    bundle.getBlock(SketchfabSettings.ACCOUNT_TYPE)?.value !== SketchfabAccount.Basic;

const isAvailablePremiumUIControl = (bundle: Bundle) =>
    isPremiumAccount(bundle) && bundle.getBlock(SketchfabSettings.SHOW_UI)?.value === true;

const isAvailablePremiumUIButton = (bundle: Bundle) =>
    isPremiumAccount(bundle) && bundle.getBlock(SketchfabSettings.SHOW_BUTTONS)?.value === true;

const isAvailableNavigationConstraint = (bundle: Bundle) =>
    bundle.getBlock(SketchfabSettings.NAVIGATION_CONSTRAINTS)?.value === true;

const isAvailableAnnotationControl = (bundle: Bundle) =>
    bundle.getBlock(SketchfabSettings.SHOW_ANNOTATIONS)?.value === true;

/* Navigation constraint settings lose all functionality if some other settings are switched on.
These edge-cases are documented in the link.href of this block */
const INCOMPATIBLE_SETTINGS_NOTIFICATION: Pick<NotificationBlock, 'type' | 'title' | 'styles' | 'footer'> = {
    type: 'notification',
    title: 'Incompatible settings',
    styles: {
        type: NotificationStyleType.Warning,
        icon: true,
        divider: NotificationBlockDividerPosition.Top,
    },
    footer: {
        href: 'https://help.sketchfab.com/hc/en-us/articles/115003399103-Camera-Limits##preview',
        label: 'More information',
    },
};

// Defaults reflected here https://help.sketchfab.com/hc/en-us/articles/360056963172-Customizing-your-embedded-3d-model
export const settings: BlockSettingsStructureExport & {
    UI: SettingBlock[];
    Annotations: SettingBlock[];
    'Navigation & Camera': SettingBlock[];
    Player: SettingBlock[];
} = {
    main: [
        {
            id: SketchfabSettings.ACCOUNT_TYPE,
            type: 'dropdown',
            size: 'large',
            defaultValue: SketchfabAccount.Basic,
            choices: [
                { value: SketchfabAccount.Basic, label: SketchfabAccount.Basic },
                { value: SketchfabAccount.Pro, label: 'Pro' },
                { value: SketchfabAccount.Premium, label: SketchfabAccount.Premium },
            ],
        },
    ],
    basics: [
        {
            id: SketchfabSettings.URL,
            label: '3D Model URL',
            type: 'input',
            clearable: true,
            onChange: parseSketchfabSettingsUrl,
            placeholder: 'Enter your URL here',
            rules: [sketchfabUrlRule],
        },
    ],
    style: [
        { id: 'style-sectionHeading-1', type: 'sectionHeading', label: '', blocks: [getBorderSettings()] },
        { id: 'style-sectionHeading-2', type: 'sectionHeading', label: '', blocks: [getBorderRadiusSettings()] },
    ],
    Player: [
        {
            id: 'player-sectionHeading-1',
            type: 'sectionHeading',
            blocks: [
                {
                    id: SketchfabSettings.IS_CUSTOM_HEIGHT,
                    type: 'switch',
                    switchLabel: 'Custom',
                    label: 'Height',
                    onChange: (bundle) =>
                        presetCustomValue(bundle, SketchfabSettings.HEIGHT, SketchfabSettings.CUSTOM_HEIGHT, heights),
                    on: [
                        {
                            id: SketchfabSettings.CUSTOM_HEIGHT,
                            type: 'input',
                            placeholder: '0px',
                            defaultValue: '500px',
                            rules: [minimumNumericalOrPixelOrAutoRule(0)],
                        },
                    ],
                    off: [
                        {
                            id: SketchfabSettings.HEIGHT,
                            type: 'segmentedControls',
                            defaultValue: SketchfabHeight.Medium,
                            choices: [
                                { label: 'S', value: SketchfabHeight.Small },
                                { label: 'M', value: SketchfabHeight.Medium },
                                { label: 'L', value: SketchfabHeight.Large },
                            ],
                        },
                    ],
                },
                {
                    id: SketchfabSettings.AUTO_START,
                    label: 'Autostart',
                    type: 'switch',
                    info: 'Enabling this feature will make the model load immediately once the page is ready, rather than waiting for a user to click the Play button.',
                },
                {
                    id: SketchfabSettings.AUTO_PLAY,
                    label: 'Animation Autoplay',
                    type: 'switch',
                    info: 'Automatically play animations when the viewer starts',
                    defaultValue: true,
                },
                {
                    id: SketchfabSettings.TEXTURE_SIZE,
                    label: 'Max Texture Size',
                    type: 'switch',
                    info: 'Setting to a positive number will limit all textures to that maximum resolution (longest side in pixels). This should be a "power of 2" value such as 32, 128, 256, 512, etc.',
                    on: [
                        {
                            id: SketchfabSettings.TEXTURE_SIZE_VALUE,
                            type: 'dropdown',
                            placeholder: '8192',
                            defaultValue: '8192',
                            choices: TEXTURE_SIZES.map((size) => ({ id: size, value: size, label: size })),
                        },
                    ],
                },
                {
                    id: SketchfabSettings.PRELOAD_TEXTURES,
                    type: 'switch',
                    label: 'Preload Textures',
                    info: 'Enabling this feature will force all resources (textures) to download before the scene is displayed.',
                },
                {
                    id: SketchfabSettings.VIEWERS_TRACKING,
                    type: 'switch',
                    label: 'Viewers Tracking',
                    defaultValue: true,
                    info: 'Disabling this feature will prevent cookies, analytics, audience measurement / tracking, etc. in the embed.',
                },
                {
                    id: SketchfabSettings.API_LOG,
                    type: 'switch',
                    label: 'API Log',
                    info: 'When enabled, Data such as background UIDs, environment UIDs, annotation UIDs, and camera limit coordinates will be logged to the browser console.',
                },
                {
                    id: SketchfabSettings.TRANSPARENT_BACKGROUND,
                    type: 'switch',
                    label: 'Transparent Background',
                    info: "Enabling this feature will make the model's background transparent.",
                    show: (bundle) => bundle.getBlock(SketchfabSettings.ACCOUNT_TYPE)?.value !== SketchfabAccount.Basic,
                },
            ],
            label: '',
        },
    ],
    'Navigation & Camera': [
        {
            id: 'sectionHeading-1',
            type: 'sectionHeading',
            label: '',
            blocks: [
                {
                    id: SketchfabSettings.SCROLL_WHEEL,
                    type: 'switch',
                    label: 'Allow Scrollwheel',
                    defaultValue: true,
                    info: 'Disabling this feature will prevent zooming with the scroll wheel.',
                },
                {
                    id: SketchfabSettings.DOUBLE_CLICK,
                    type: 'switch',
                    label: 'Allow Double Click',
                    defaultValue: true,
                    info: 'Disabling this feature will disable the double-clicking to focus the camera in the viewer.',
                    show: isProOrPremiumAccount,
                },
                {
                    id: SketchfabSettings.ALLOW_LIGHT_ROTATION,
                    type: 'switch',
                    defaultValue: true,
                    label: 'Allow Light Rotation',
                    info: 'Enabling this feature will allow using alt + click/drag to rotate the lights and environment.',
                    show: isProOrPremiumAccount,
                },
                {
                    id: SketchfabSettings.STARTING_SPIN,
                    type: 'switch',
                    label: 'Starting Spin',
                    defaultValue: true,
                    info: ' Disabling this feature will skip the initial animation that occurs when a model is loaded, and immediately show the model in its default position.',
                },
                {
                    id: SketchfabSettings.AUTO_SPIN,
                    type: 'switch',
                    label: 'Autospin',
                    info: 'Setting to a number higher than 0 will cause the model to automatically spin around the z-axis after loading.',
                    on: [
                        {
                            id: SketchfabSettings.AUTO_SPIN_COUNT,
                            placeholder: '1',
                            defaultValue: '1',
                            type: 'input',
                            inputType: 'number',
                        },
                    ],
                },
            ],
        },
        {
            id: 'sectionHeading-2',
            type: 'sectionHeading',
            label: '',
            blocks: [
                {
                    id: SketchfabSettings.NAVIGATION_MODE,
                    label: 'Default Navigation Mode',
                    type: 'segmentedControls',
                    info: 'Setting to First Person will start the model in First Person mode by default.',
                    choices: [
                        { value: SketchfabNavigation.Orbit, label: 'Orbit' },
                        { value: SketchfabNavigation.Fps, label: 'First Person' },
                    ],
                },
                {
                    id: SketchfabSettings.FPS,
                    type: 'switch',
                    label: 'First Person Walk Speed',
                    info: 'Setting to a number [0-100] will define the default walk speed in First Person mode.',
                    on: [
                        {
                            id: SketchfabSettings.FPS_VALUE,
                            type: 'input',
                            defaultValue: '25',
                            placeholder: '25',
                            inputType: 'number',
                            rules: [minimumNumericalRule(0), maximumNumericalRule(100)],
                        },
                    ],
                },
            ],
        },
        {
            id: 'sectionHeading-3',
            type: 'sectionHeading',
            label: '',
            show: isProOrPremiumAccount,
            blocks: [
                {
                    id: SketchfabSettings.NAVIGATION_CONSTRAINTS,
                    type: 'switch',
                    label: 'Navigation Constraints',
                    info: 'You can configure the Navigation Constraints here. For a better overview, use the 3D settings of your model within Sketchfab.',
                    size: 'medium',
                },

                {
                    id: SketchfabSettings.ORBIT_CONSTRAINT_PAN,
                    type: 'switch',
                    label: 'Orbit Constraint Pan',
                    info: 'Enabling this feature will prevent panning the camera.',
                    show: isAvailableNavigationConstraint,
                },
                {
                    id: SketchfabSettings.ORBIT_CONSTRAINT_PITCH,
                    type: 'switch',
                    label: 'Orbit Constraint Pitch',
                    show: isAvailableNavigationConstraint,
                    on: [
                        {
                            id: 'orbitConstraintPitchLimits',
                            type: 'multiInput',
                            show: isAvailableNavigationConstraint,
                            layout: 'columns',
                            blocks: [
                                {
                                    id: SketchfabSettings.ORBIT_CONTRAINT_PITCH_LIMITS_UP,
                                    type: 'input',
                                    inputType: 'number',
                                    rules: [pitchRule],
                                    placeholder: '1',
                                    label: 'Up',
                                    info: "Setting to [-π/2 – π/2] will define the camera's pitch up rotation limit.",
                                    show: isAvailableNavigationConstraint,
                                },
                                {
                                    id: SketchfabSettings.ORBIT_CONTRAINT_PITCH_LIMITS_DOWN,
                                    type: 'input',
                                    inputType: 'number',
                                    rules: [pitchRule],
                                    label: 'Down',
                                    info: "Setting to [-π/2 – π/2] will define the camera's pitch down rotation limit.",
                                    placeholder: '-1',
                                    show: isAvailableNavigationConstraint,
                                },
                            ],
                        },
                    ],
                },
                {
                    id: SketchfabSettings.ORBIT_CONTRAINT_YAW,
                    type: 'switch',
                    label: 'Orbit Constraint Yaw',
                    show: isAvailableNavigationConstraint,
                    on: [
                        {
                            id: 'orbitConstraintYawLimits',
                            type: 'multiInput',
                            layout: 'columns',
                            show: isAvailableNavigationConstraint,
                            blocks: [
                                {
                                    id: SketchfabSettings.ORBIT_CONTRAINT_YAW_LIMITS_LEFT,
                                    type: 'input',
                                    inputType: 'number',
                                    rules: [yawRule],
                                    info: "Setting to [-π – π] will define the camera's yaw left rotation limit.",
                                    show: isAvailableNavigationConstraint,
                                    placeholder: '-2',
                                    label: 'Left',
                                },
                                {
                                    id: SketchfabSettings.ORBIT_CONTRAINT_YAW_LIMITS_RIGHT,
                                    type: 'input',
                                    inputType: 'number',
                                    rules: [yawRule],
                                    info: "Setting to [-π – π] will define the camera's yaw right rotation limit.",
                                    show: isAvailableNavigationConstraint,
                                    label: 'Right',
                                    placeholder: '2',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: SketchfabSettings.ORBIT_CONTRAINT_ZOOM_IN,
                    type: 'switch',
                    show: isAvailableNavigationConstraint,
                    label: 'Orbit Constraint Zoom In',
                    info: 'Setting to a positive number will define the camera zoom in limit (minimum distance from the model).',
                    on: [
                        {
                            id: SketchfabSettings.ORBIT_CONTRAINT_ZOOM_IN_COUNT,
                            type: 'input',
                            show: isAvailableNavigationConstraint,
                            placeholder: '3',
                            inputType: 'number',
                            rules: [minimumNumericalRule(0)],
                        },
                    ],
                },
                {
                    id: SketchfabSettings.ORBIT_CONTRAINT_ZOOM_OUT,
                    type: 'switch',
                    show: isAvailableNavigationConstraint,
                    label: 'Orbit Constraint Zoom Out',
                    info: 'Setting to a positive number will define the camera zoom out limit (maximum distance from the model).',
                    on: [
                        {
                            id: SketchfabSettings.ORBIT_CONTRAINT_ZOOM_OUT_COUNT,
                            type: 'input',
                            inputType: 'number',
                            rules: [minimumNumericalRule(0)],
                            show: isAvailableNavigationConstraint,
                            placeholder: '3',
                        },
                    ],
                },
                {
                    ...INCOMPATIBLE_SETTINGS_NOTIFICATION,
                    id: 'incompatibleSettingsAnnotations',
                    text: 'Annotations are incompatible with Navigation Constraints. These settings may not work as expected.',
                    show: (bundle) =>
                        bundle.getBlock(SketchfabSettings.NAVIGATION_CONSTRAINTS)?.value === true &&
                        bundle.getBlock(SketchfabSettings.SHOW_ANNOTATIONS)?.value === true,
                },
                {
                    ...INCOMPATIBLE_SETTINGS_NOTIFICATION,
                    id: 'incompatibleSettingsDoubleClick',
                    text: 'Double-click navigation is incompatible with Navigation Constraints while Pan is limited. These settings may not work as expected.',
                    show: (bundle) =>
                        bundle.getBlock(SketchfabSettings.DOUBLE_CLICK)?.value === true &&
                        bundle.getBlock(SketchfabSettings.ORBIT_CONSTRAINT_PAN)?.value === true &&
                        bundle.getBlock(SketchfabSettings.NAVIGATION_CONSTRAINTS)?.value === true &&
                        bundle.getBlock(SketchfabSettings.SHOW_ANNOTATIONS)?.value === false,
                },
            ],
        },
    ],
    Annotations: [
        {
            id: 'player-sectionHeading-1',
            type: 'sectionHeading',
            label: '',
            blocks: [
                {
                    id: SketchfabSettings.SHOW_ANNOTATIONS,
                    type: 'switch',
                    defaultValue: true,
                    label: 'Show Annotations',
                    size: 'medium',
                    info: 'Disabling this feature will hide annotations by default',
                },
                {
                    id: SketchfabSettings.ANNOTATION_TOOLTIP_VISIBLE,
                    defaultValue: true,
                    label: 'Annotation Tooltip Visible',
                    info: 'Disabling this feature will hide annotation tooltips by default',
                    type: 'switch',
                    show: isAvailableAnnotationControl,
                },
                {
                    id: SketchfabSettings.STARTING_ANNOTATION,
                    defaultValue: false,
                    type: 'switch',
                    label: 'Starting Annotation',
                    info: 'Setting to a positive number [1 – 100] will automatically load that annotation when the viewer starts.',
                    show: isAvailableAnnotationControl,
                    on: [
                        {
                            id: SketchfabSettings.STARTING_ANNOTATION_VALUE,
                            defaultValue: '1',
                            inputType: 'number',
                            rules: [minimumNumericalRule(1), maximumNumericalRule(100)],
                            type: 'input',
                            placeholder: '1',
                        },
                    ],
                },
                {
                    id: SketchfabSettings.ANNOTATION_CYCLE,
                    defaultValue: false,
                    label: 'Annotation Cycle',
                    type: 'switch',
                    info: 'Setting to any number will start the Autopilot cycle with that duration, in seconds, at each annotation',
                    show: isAvailableAnnotationControl,
                    on: [
                        {
                            id: SketchfabSettings.ANNOTATION_CYCLE_COUNT,
                            label: 'Annotation Cycle Speed',
                            placeholder: '3',
                            defaultValue: '3',
                            inputType: 'number',
                            rules: [minimumNumericalRule(0)],
                            type: 'input',
                            show: isAvailableAnnotationControl,
                        },
                    ],
                },
            ],
        },
    ],
    UI: [
        {
            id: 'ui-sectionHeading-1',
            type: 'sectionHeading',
            label: '',
            blocks: [
                {
                    id: SketchfabSettings.UI_THEME,
                    type: 'segmentedControls',
                    label: 'UI Theme',
                    defaultValue: SketchfabTheme.Default,
                    info: 'Setting to Dark will apply a darker appearance to the user interface.',
                    choices: [
                        { value: SketchfabTheme.Default, label: 'Default' },
                        { value: SketchfabTheme.Dark, label: 'Dark' },
                    ],
                },
                {
                    id: SketchfabSettings.UI_COLOR,
                    label: 'UI Color',
                    type: 'switch',
                    info: 'Setting to a color will change the color of the viewer loading bar.',
                    show: (bundle) =>
                        bundle.getBlock(SketchfabSettings.ACCOUNT_TYPE)?.value === SketchfabAccount.Premium,
                    on: [
                        {
                            id: SketchfabSettings.UI_COLOR_VALUE,
                            type: 'colorInput',
                        },
                    ],
                },
            ],
        },
        {
            id: 'ui-sectionHeading-2',
            type: 'sectionHeading',
            label: '',
            blocks: [
                {
                    id: SketchfabSettings.SHOW_UI,
                    label: 'Show UI',
                    type: 'switch',
                    defaultValue: true,
                    size: 'medium',
                    show: isPremiumAccount,
                },
                {
                    id: SketchfabSettings.UI_WATERMARK,
                    label: 'Sketchfab Watermark',
                    defaultValue: true,
                    type: 'switch',
                    info: 'Disabling this feature remove the Sketchfab logo watermark.',
                    show: isAvailablePremiumUIControl,
                },
                {
                    id: SketchfabSettings.UI_HINT,
                    label: 'Hint Animation',
                    defaultValue: true,
                    type: 'switch',
                    info: 'Disabling this feature will always hide the viewer hint animation ("click & hold to rotate").',
                    show: isAvailablePremiumUIControl,
                },
                {
                    id: SketchfabSettings.UI_ANNOTATIONS,
                    label: 'Annotation Menu',
                    type: 'switch',
                    info: 'Disabling this feature will hide the Annotation menu.',
                    defaultValue: true,
                    show: isAvailablePremiumUIControl,
                },
                {
                    id: SketchfabSettings.UI_ANIMATIONS,
                    label: 'Animation Menu / Timeline',
                    type: 'switch',
                    defaultValue: true,
                    info: 'Disabling this feature will hide the animation menu and timeline.',
                    show: isAvailablePremiumUIControl,
                },
                {
                    id: SketchfabSettings.UI_LOADING,
                    label: 'Loading Bars',
                    defaultValue: true,
                    type: 'switch',
                    info: 'Disabling this feature will hide the viewer loading bars.',
                    show: isAvailablePremiumUIControl,
                },
                {
                    id: SketchfabSettings.UI_DOF,
                    label: 'Depth of Field Cicle',
                    type: 'switch',
                    defaultValue: true,
                    info: 'Disabling this feature will not show the depth of field refocus circle animation on click.',
                    show: (bundle) => isAvailablePremiumUIControl(bundle) || !isPremiumAccount(bundle),
                },
                {
                    id: SketchfabSettings.UI_INFOS,
                    label: 'Info Bar',
                    defaultValue: true,
                    type: 'switch',
                    info: 'Disabling this feature will hide the model info bar at the top of the viewer.',
                    show: isAvailablePremiumUIControl,
                },
                {
                    id: SketchfabSettings.UI_FADEOUT,
                    label: 'Fadeout UI Automatically',
                    defaultValue: true,
                    type: 'switch',
                    info: 'Disabling this feature will prevent the viewer controls from disappearing when the camera moves or when the viewer is inactive for a few seconds.',
                    show: isAvailablePremiumUIControl,
                },
            ],
        },
        {
            id: 'ui-sectionHeading-3',
            type: 'sectionHeading',
            label: '',
            blocks: [
                {
                    id: SketchfabSettings.SHOW_BUTTONS,
                    label: 'Buttons',
                    defaultValue: true,
                    type: 'switch',
                    size: 'medium',
                    show: isPremiumAccount,
                },
                {
                    id: SketchfabSettings.UI_HELP,
                    label: 'Help Button',
                    defaultValue: true,
                    type: 'switch',
                    info: 'Disabling this feature will hide the Help button.',
                    show: isAvailablePremiumUIButton,
                },
                {
                    id: SketchfabSettings.UI_SETTINGS,
                    label: 'Settings Button',
                    defaultValue: true,
                    type: 'switch',
                    info: 'Disabling this feature will hide the Settings button.',
                    show: isAvailablePremiumUIButton,
                },
                {
                    id: SketchfabSettings.UI_INSPECTOR,
                    label: 'Inspector Button',
                    defaultValue: true,
                    type: 'switch',
                    info: "Disabling this feature will hide the inspector button. It will also prevent the Inspector from opening, and save loading time by not downloading the model's wireframe file unless wireframe is explicitly enabled in 3D Settings or the wireframe_preload option is enabled.",
                    show: isAvailablePremiumUIButton,
                },
                {
                    id: SketchfabSettings.UI_SOUND,
                    label: 'Sound Button',
                    defaultValue: true,
                    type: 'switch',
                    info: 'Disabling this feature will hide the Sound button.',
                    show: isAvailablePremiumUIButton,
                },
                {
                    id: SketchfabSettings.UI_FULLSCREEN,
                    label: 'Fullscreen Button',
                    defaultValue: true,
                    type: 'switch',
                    info: 'Disabling this feature will hide the Fullscreen button.',
                    show: isAvailablePremiumUIButton,
                },
                {
                    id: SketchfabSettings.UI_START,
                    label: 'Start / Play Button',
                    defaultValue: true,
                    type: 'switch',
                    info: 'Disabling this feature will hide the start/play button.',
                    show: isAvailablePremiumUIButton,
                },
                {
                    id: SketchfabSettings.UI_DISABLE_VIEWER,
                    label: '"Disable Viewer" Button',
                    type: 'switch',
                    defaultValue: true,
                    show: (bundle) => isAvailablePremiumUIButton(bundle) || !isPremiumAccount(bundle),
                    info: 'Disabling this feature will hide the "Disable Viewer" button in the top right so that users cannot stop the 3D render once it is started.',
                },
                {
                    id: SketchfabSettings.UI_VR,
                    label: 'VR Button',
                    defaultValue: true,
                    type: 'switch',
                    info: 'Disabling this feature will hide the View in VR button.',
                    show: isAvailablePremiumUIButton,
                },
                {
                    id: SketchfabSettings.UI_AR,
                    label: 'AR Button',
                    defaultValue: true,
                    type: 'switch',
                    info: 'Disabling this feature will hide the AR button.',
                    show: isAvailablePremiumUIButton,
                },
                {
                    id: SketchfabSettings.UI_AR_HELP,
                    label: 'AR Help Button',
                    defaultValue: true,
                    type: 'switch',
                    info: "Disabling this feature will hide the AR popup's help link.",
                    show: isAvailablePremiumUIButton,
                },
                {
                    id: SketchfabSettings.UI_QR,
                    label: 'Qrcode Button',
                    defaultValue: true,
                    type: 'switch',
                    info: "Disabling this feature will hide the AR popup's QR code.",
                    show: isAvailablePremiumUIButton,
                },
            ],
        },
    ],
};
