/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, MultiInputLayout, TextInputType } from '@frontify/arcade';
import { BlockSettings, Bundle, SettingBlock } from '@frontify/guideline-blocks-settings';
import {
    getBorderRadiusSettings,
    getBorderSettings,
    minimumNumericalOrPixelOrAutoRule,
} from '@frontify/guideline-blocks-shared';
import { SketchFabHeight } from './types';

export const BORDER_COLOR_DEFAULT_VALUE = {
    r: 234,
    g: 235,
    b: 235,
    a: 1,
    name: 'Light Grey',
};
export const URL_INPUT_PLACEHOLDER = 'https://sketchfab.com/models/442c548d94744641ba279ae94b5f45ec/embed';

const minimumNumericalRule = (min: number) => ({
    errorMessage: `Value must be larger than ${min}`,
    validate: (value: string) => !Number.isNaN(Number(value)) && Number(value) >= min,
});

const maximumNumericalRule = (max: number) => ({
    errorMessage: `Value must be smaller than or equal to ${max}`,
    validate: (value: string) => !Number.isNaN(Number(value)) && Number(value) <= max,
});

const pitchRule = {
    errorMessage: 'Value must be between -π/2 and π/2',
    validate: (value: string) => !value || (!Number.isNaN(Number(value)) && Math.abs(Number(value)) <= Math.PI / 2),
};

const yawRule = {
    errorMessage: 'Value must be between -π and π',
    validate: (value: string) => !value || (!Number.isNaN(Number(value)) && Math.abs(Number(value)) <= Math.PI),
};

export const getUrlWithoutSearchParams = (url?: string) => {
    if (!url) {
        return '';
    }
    const urlObj = new URL(url);
    return urlObj.origin + urlObj.pathname;
};

const removeSearchParams = (bundle: Bundle) => {
    const url = getUrlWithoutSearchParams(bundle.getBlock('url')?.value as string);
    bundle.setBlockValue('url', url);
};

const settings: BlockSettings & {
    UI: SettingBlock[];
    Annotations: SettingBlock[];
    'Navigation & Camera': SettingBlock[];
    Player: SettingBlock[];
} = {
    main: [
        {
            id: 'accountType',
            type: 'dropdown',
            size: DropdownSize.Large,
            clearable: false,
            defaultValue: 'Basic',
            choices: [
                { value: 'Basic', label: 'Basic' },
                { value: 'Pro', label: 'Pro' },
                { value: 'Premium', label: 'Premium' },
            ],
        },
    ],
    content: [
        {
            id: 'url',
            label: '3D Model URL',
            type: 'input',
            clearable: true,
            onChange: removeSearchParams,
            placeholder: URL_INPUT_PLACEHOLDER,
        },
    ],
    layout: [
        {
            id: 'isCustomHeight',
            type: 'switch',
            switchLabel: 'Custom',
            label: 'Height',
            on: [
                {
                    id: 'customHeight',
                    type: 'input',
                    placeholder: '0px',
                    defaultValue: '200px',
                    rules: [minimumNumericalOrPixelOrAutoRule(0)],
                },
            ],
            off: [
                {
                    id: 'height',
                    type: 'slider',
                    defaultValue: SketchFabHeight.Medium,
                    choices: [
                        { label: 'S', value: SketchFabHeight.Small },
                        { label: 'M', value: SketchFabHeight.Medium },
                        { label: 'L', value: SketchFabHeight.Large },
                    ],
                },
            ],
        },
    ],
    style: [getBorderSettings(), getBorderRadiusSettings({ dependentSettingId: 'hasBorder' })],
    Player: [
        {
            id: 'autoStart',
            label: 'Autostart',
            type: 'switch',
            info: 'Enabling this feature will make the model load immediately once the page is ready, rather than waiting for a user to click the Play button.',
        },
        {
            id: 'autoPlay',
            label: 'Animation Autoplay',
            type: 'switch',
            info: 'Automatically play animations when the viewer starts',
            defaultValue: true,
        },
        {
            id: 'textureSize',
            label: 'Max Texture Size',
            type: 'switch',
            info: 'Setting to a positive number will limit all textures to that maximum resolution (longest side in pixels). This should be a "power of 2" value such as 32, 128, 256, 512, etc.',
            on: [
                {
                    id: 'textureSizeValue',
                    type: 'input',
                    rules: [
                        {
                            errorMessage: 'Value must be a power of 2',
                            validate: (value: string) => {
                                let num = Number(value);
                                if (!num || Number.isNaN(num) || num < 2) {
                                    return false;
                                }
                                while (num >= 2) {
                                    num = num / 2;
                                    if (num === 2) {
                                        return true;
                                    }
                                }
                                return false;
                            },
                        },
                    ],
                    defaultValue: '8192',
                },
            ],
        },
        {
            id: 'preloadTextures',
            type: 'switch',
            label: 'Preload Textures',
            info: 'Enabling this feature will force all resources (textures) to download before the scene is displayed.',
        },
        {
            id: 'viewersTracking',
            type: 'switch',
            label: 'Viewers Tracking',
            defaultValue: true,
            info: 'Disabling this feature will prevent cookies, analytics, audience measurement / tracking, etc. in the embed.',
        },
        {
            id: 'apiLog',
            type: 'switch',
            label: 'API Log',
            info: 'When enabled, Data such as background UIDs, environment UIDs, annotation UIDs, and camera limit coordinates will be logged to the browser console.',
        },
        {
            id: 'transparentBackground',
            type: 'switch',
            label: 'Transparent Background',
            info: "Enabling this feature will make the model's background transparent.",
            show: (bundle) => bundle.getBlock('accountType')?.value !== 'Basic',
        },
    ],
    'Navigation & Camera': [
        {
            id: 'navigationMode',
            label: 'Navigation Mode',
            type: 'slider',
            info: 'Setting to First Person will start the model in First Person mode by default.',
            choices: [
                { value: 'orbit', label: 'Orbit' },
                { value: 'fps', label: 'First Person' },
            ],
        },
        {
            id: 'fps',
            type: 'switch',
            label: 'First Person Navigation Speed',
            info: 'Setting to a number [0-100] will define the default walk speed in First Person mode.',
            on: [
                {
                    id: 'fpsValue',
                    type: 'input',
                    defaultValue: '25',
                    placeholder: '25',
                    inputType: TextInputType.Number,
                    rules: [minimumNumericalRule(0), maximumNumericalRule(100)],
                },
            ],
        },
        {
            id: 'scrollWheel',
            type: 'switch',
            label: 'Allow Scrollwheel',
            defaultValue: true,
            info: 'Disabling this feature will prevent zooming with the scroll wheel.',
        },
        {
            id: 'doubleClick',
            type: 'switch',
            label: 'Allow Double Click',
            defaultValue: true,
            info: 'Disabling this feature will disable the double-clicking to focus the camera in the viewer.',
            show: (bundle) => bundle.getBlock('accountType')?.value !== 'Basic',
        },
        {
            id: 'startingSpin',
            type: 'switch',
            label: 'Starting Spin',
            defaultValue: true,
            info: ' Disabling this feature will skip the initial animation that occurs when a model is loaded, and immediately show the model in its default position.',
        },
        {
            id: 'autoSpin',
            type: 'switch',
            label: 'Autospin',
            info: 'Setting to a number higher than 0 will cause the model to automatically spin around the z-axis after loading.',
            on: [
                {
                    id: 'autoSpinCount',
                    placeholder: '3',
                    type: 'input',
                    inputType: TextInputType.Number,
                    rules: [minimumNumericalRule(0)],
                },
            ],
        },
        {
            id: 'preventLightRotation',
            type: 'switch',
            label: 'Prevent User Light Rotation',
            info: 'Enabling this feature will prevent using alt + click/drag to rotate the lights and environment.',
            show: (bundle) => bundle.getBlock('accountType')?.value !== 'Basic',
        },
        {
            id: 'orbitConstraintPan',
            type: 'switch',
            label: 'Orbit Constraint Pan',
            info: 'Enabling this feature will prevent panning the camera.',
            show: (bundle) => bundle.getBlock('accountType')?.value !== 'Basic',
        },
        {
            id: 'orbitConstraintPitch',
            type: 'switch',
            label: 'Orbit Constraint Pitch',
            show: (bundle) => bundle.getBlock('accountType')?.value !== 'Basic',
            on: [
                {
                    id: 'orbitConstraintPitchLimits',
                    type: 'multiInput',
                    show: (bundle) => bundle.getBlock('accountType')?.value !== 'Basic',
                    layout: MultiInputLayout.Columns,
                    blocks: [
                        {
                            id: 'orbitConstraintPitchLimitsUp',
                            type: 'input',
                            inputType: TextInputType.Number,
                            rules: [pitchRule],
                            placeholder: '1',
                            label: 'Up',
                            info: "Setting to [-π/2 – π/2] will define the camera's pitch up rotation limit.",
                            show: (bundle) => bundle.getBlock('accountType')?.value !== 'Basic',
                        },
                        {
                            id: 'orbitConstraintPitchLimitsDown',
                            type: 'input',
                            inputType: TextInputType.Number,
                            rules: [pitchRule],
                            label: 'Down',
                            info: "Setting to [-π/2 – π/2] will define the camera's pitch down rotation limit.",
                            placeholder: '-1',
                            show: (bundle) => bundle.getBlock('accountType')?.value !== 'Basic',
                        },
                    ],
                },
            ],
        },
        {
            id: 'orbitConstraintYaw',
            type: 'switch',
            label: 'Orbit Constraint Yaw',
            show: (bundle) => bundle.getBlock('accountType')?.value !== 'Basic',
            on: [
                {
                    id: 'orbitConstraintYawLimits',
                    type: 'multiInput',
                    layout: MultiInputLayout.Columns,
                    show: (bundle) => bundle.getBlock('accountType')?.value !== 'Basic',
                    blocks: [
                        {
                            id: 'orbitConstraintYawLimitsLeft',
                            type: 'input',
                            inputType: TextInputType.Number,
                            rules: [yawRule],
                            info: "Setting to [-π – π] will define the camera's yaw left rotation limit.",
                            show: (bundle) => bundle.getBlock('accountType')?.value !== 'Basic',
                            placeholder: '-2',
                            label: 'Left',
                        },
                        {
                            id: 'orbitConstraintYawLimitsRight',
                            type: 'input',
                            inputType: TextInputType.Number,
                            rules: [yawRule],
                            info: "Setting to [-π – π] will define the camera's yaw right rotation limit.",
                            show: (bundle) => bundle.getBlock('accountType')?.value !== 'Basic',
                            label: 'Right',
                            placeholder: '2',
                        },
                    ],
                },
            ],
        },
        {
            id: 'orbitConstraintZoomIn',
            type: 'switch',
            show: (bundle) => bundle.getBlock('accountType')?.value !== 'Basic',
            label: 'Orbit Constraint Zoom In',
            info: 'Setting to a positive number will define the camera zoom in limit (minimum distance from the model).',
            on: [
                {
                    id: 'orbitConstraintZoomInCount',
                    type: 'input',
                    show: (bundle) => bundle.getBlock('accountType')?.value !== 'Basic',
                    placeholder: '3',
                    inputType: TextInputType.Number,
                    rules: [minimumNumericalRule(0)],
                },
            ],
        },
        {
            id: 'orbitConstraintZoomOut',
            type: 'switch',
            show: (bundle) => bundle.getBlock('accountType')?.value !== 'Basic',
            label: 'Orbit Constraint Zoom Out',
            info: 'Setting to a positive number will define the camera zoom out limit (maximum distance from the model).',
            on: [
                {
                    id: 'orbitConstraintZoomOutCount',
                    type: 'input',
                    inputType: TextInputType.Number,
                    rules: [minimumNumericalRule(0)],
                    show: (bundle) => bundle.getBlock('accountType')?.value !== 'Basic',
                    placeholder: '3',
                },
            ],
        },
    ],
    Annotations: [
        {
            id: 'showAnnotations',
            type: 'switch',
            defaultValue: true,
            label: 'Show Annotations',
            info: 'Disabling this feature will hide annotations by default',
        },
        {
            id: 'annotationCycle',
            defaultValue: false,
            label: 'Annotation Cycle',
            type: 'switch',
            info: 'Setting to any number will start the Autopilot cycle with that duration, in seconds, at each annotation',
            show: (bundle) => bundle.getBlock('showAnnotations')?.value === true,
            on: [
                {
                    id: 'annotationCycleCount',
                    placeholder: '1',
                    inputType: TextInputType.Number,
                    rules: [minimumNumericalRule(0)],
                    type: 'input',
                    show: (bundle) => bundle.getBlock('showAnnotations')?.value === true,
                },
            ],
        },
        {
            id: 'annotationTooltipVisible',
            defaultValue: true,
            label: 'Annotation Tooltip Visible',
            info: 'Disabling this feature will hide annotation tooltips by default',
            type: 'switch',
            show: (bundle) => bundle.getBlock('showAnnotations')?.value === true,
        },
        {
            id: 'startingAnnotation',
            defaultValue: '1',
            inputType: TextInputType.Number,
            rules: [minimumNumericalRule(0), maximumNumericalRule(100)],
            label: 'Starting Annotation',
            info: 'Automatically load the selected annotation (1 to 100) when the viewer starts',
            show: (bundle) => bundle.getBlock('showAnnotations')?.value === true,
            type: 'input',
        },
    ],
    UI: [
        {
            id: 'uiTheme',
            type: 'slider',
            label: 'UI Theme',
            defaultValue: 'default',
            info: 'Setting to Dark will apply a darker appearance to the user interface.',
            choices: [
                { value: 'default', label: 'Default' },
                { value: 'dark', label: 'Dark' },
            ],
        },
        {
            id: 'uiDOF',
            label: 'Depth of Field Cicle',
            type: 'switch',
            defaultValue: true,
            info: 'Disabling this feature will not show the depth of field refocus circle animation on click.',
        },
        {
            id: 'uiDisableViewer',
            label: '"Disable Viewer" Button',
            type: 'switch',
            defaultValue: true,
            info: 'Disabling this feature will hide the "Disable Viewer" button in the top right so that users cannot stop the 3D render once it is started.',
        },
        {
            id: 'uiColor',
            label: 'UI Color',
            type: 'colorInput',
            info: 'Setting to a color will change the color of the viewer loading bar.',
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiAnimations',
            label: 'Animation Menu / Timeline',
            type: 'switch',
            defaultValue: true,
            info: 'Setting to 0 will hide the animation menu and timeline.',
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiAnnotations',
            label: 'Annotation Menu',
            type: 'switch',
            info: 'Setting to 0 will hide the Annotation menu.',
            defaultValue: true,
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiControls',
            defaultValue: true,
            label: 'Controls Buttons',
            type: 'switch',
            info: 'Setting to 0 will hide all the viewer controls at the bottom of the viewer (Help, Settings, Inspector, VR, Fullscreen, Annotations, and Animations).',
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiFadeout',
            label: 'Fadeout UI Automatically',
            defaultValue: true,
            type: 'switch',
            info: 'Setting to 0 will prevent the viewer controls from disappearing when the camera moves or when the viewer is inactive for a few seconds.',
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiFullscreen',
            label: 'Fullscreen Button',
            defaultValue: true,
            type: 'switch',
            info: 'Setting to 0 will hide the Fullscreen button.',
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiGeneralControls',
            label: 'General Controls',
            defaultValue: true,
            type: 'switch',
            info: 'Setting to 0 will hide main control buttons in the bottom right of the viewer (Help, Settings, Inspector, VR, Fullscreen).',
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiHelp',
            label: 'Help Button',
            defaultValue: true,
            type: 'switch',
            info: 'Setting to 0 will hide the Help button.',
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiHint',
            label: 'Hint Animation',
            defaultValue: true,
            type: 'switch',
            info: 'Setting to 0 will always hide the viewer hint animation ("click & hold to rotate").',
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiInfos',
            label: 'Info Bar',
            defaultValue: true,
            type: 'switch',
            info: 'Setting to 0 will hide the model info bar at the top of the viewer.',
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiInspector',
            label: 'Inspector Button',
            defaultValue: true,
            type: 'switch',
            info: "Setting to 0 will hide the inspector button. It will also prevent the Inspector from opening, and save loading time by not downloading the model's wireframe file unless wireframe is explicitly enabled in 3D Settings or the wireframe_preload option is enabled.",
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiLoading',
            label: 'Loading Bars',
            defaultValue: true,
            type: 'switch',
            info: 'Setting to 0 will hide the viewer loading bars.',
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiSettings',
            label: 'Settings Button',
            defaultValue: true,
            type: 'switch',
            info: 'Setting to 0 will hide the Settings button.',
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiSound',
            label: 'Sound Button',
            defaultValue: true,
            type: 'switch',
            info: 'Setting to 0 will hide the Sound button.',
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiStart',
            label: 'Start / Play Button',
            defaultValue: true,
            type: 'switch',
            info: 'Setting to 0 will hide the start/play button.',
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiVR',
            label: 'VR Button',
            defaultValue: true,
            type: 'switch',
            info: 'Setting to 0 will hide the View in VR button.',
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiAR',
            label: 'AR Button',
            defaultValue: true,
            type: 'switch',
            info: 'Setting to 0 will hide the AR button.',
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiARHelp',
            label: 'AR Help Button',
            defaultValue: true,
            type: 'switch',
            info: "Setting to 0 will hide the AR popup's help link.",
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiQR',
            label: 'Qrcode Button',
            defaultValue: true,
            type: 'switch',
            info: "Setting to 0 will hide the AR popup's QR code.",
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
        {
            id: 'uiWatermark',
            label: 'UI Watermark',
            defaultValue: true,
            type: 'switch',
            info: 'Setting to 0 remove the Sketchfab logo watermark.',
            show: (bundle) => bundle.getBlock('accountType')?.value === 'Premium',
        },
    ],
};

// eslint-disable-next-line import/no-default-export
export default settings;
