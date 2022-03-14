/* (c) Copyright Frontify Ltd., all rights reserved. */

/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Button, Color, IconExternalAsset, IconSize, Text, TextInput } from '@frontify/arcade';
import { BorderStyle, joinClassNames, Radius, toHex8String, toRgbaString } from '@frontify/guideline-blocks-shared';
import { CSSProperties, FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { BORDER_COLOR_DEFAULT_VALUE, getUrlWithoutSearchParams, URL_INPUT_PLACEHOLDER } from './settings';
import { borderRadiusClasses, borderStyles, heights, Settings, SketchFabHeight } from './types';

const DEFAULT_BORDER_WIDTH = '1px';

const getIframeStyles = (borderSelection: [BorderStyle, string, Color], borderRadius: string): CSSProperties => {
    // TODO: This check could be removed if defaultValue are returned from blockSettings (ticket: https://app.clickup.com/t/1p69p6a)
    const style = borderSelection[0] ?? BorderStyle.Solid;
    const width = borderSelection[1] ?? DEFAULT_BORDER_WIDTH;
    const rgba = borderSelection[2] ?? BORDER_COLOR_DEFAULT_VALUE;
    return {
        borderStyle: borderStyles[style],
        borderWidth: width,
        borderColor: toRgbaString(rgba),
        borderRadius,
    };
};

const generateUrl = (href: string, params: Record<string, string | undefined | boolean>) => {
    const url = new URL(href);
    Object.entries(params).forEach(([key, value]) => {
        if (typeof value === 'string') {
            url.searchParams.set(key, value);
        }
    });
    return url;
};

export const SketchFabBlock: FC<{ appBridge: AppBridgeNative }> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [localUrl, setLocalUrl] = useState('');
    const [iframeUrl, setIframeUrl] = useState<URL | null>(null);
    const {
        url = '',
        isCustomHeight = false,
        height = SketchFabHeight.Medium,
        customHeight = '',
        hasBorder = false,
        borderColor = BORDER_COLOR_DEFAULT_VALUE,
        borderWidth = DEFAULT_BORDER_WIDTH,
        borderStyle = BorderStyle.Solid,
        hasRadius = false,
        radiusChoice = Radius.None,
        radiusValue = '',
        autoStart = false,
        autoPlay = true,
        textureSize = false,
        textureSizeValue = '',
        fps = false,
        fpsValue = '',
        preloadTextures = false,
        viewersTracking = true,
        apiLog = false,
        transparentBackground = false,
        navigationMode = 'orbit',
        scrollWheel = true,
        doubleClick = true,
        startingSpin = true,
        autoSpin = false,
        autoSpinCount = '0',
        preventLightRotation = false,
        orbitConstraintPan = false,
        orbitConstraintPitch = false,
        orbitConstraintPitchLimitsUp,
        orbitConstraintPitchLimitsDown,
        orbitConstraintYaw = false,
        orbitConstraintYawLimitsLeft,
        orbitConstraintYawLimitsRight,
        orbitConstraintZoomIn = false,
        orbitConstraintZoomInCount = '0',
        orbitConstraintZoomOut = false,
        orbitConstraintZoomOutCount = '0',
        showAnnotations = true,
        annotationCycle = false,
        annotationTooltipVisible = true,
        startingAnnotation = '',
        uiTheme = 'default',
        uiDOF = true,
        uiDisableViewer = true,
        uiColor = BORDER_COLOR_DEFAULT_VALUE,
        uiAnimations = true,
        uiControls = true,
        uiFadeout = true,
        uiFullscreen = true,
        uiGeneralControls = true,
        uiHelp = true,
        uiHint = true,
        uiInfos = true,
        uiInspector = true,
        uiLoading = true,
        uiAnnotations = true,
        uiSettings = true,
        uiSound = true,
        uiStart = true,
        uiVR = true,
        uiAR = true,
        uiQR = true,
        uiWatermark = true,
        accountType,
    } = blockSettings;

    const saveLink = () => {
        const urlWithoutSearchParams = getUrlWithoutSearchParams(localUrl);

        setBlockSettings({
            ...blockSettings,
            url: urlWithoutSearchParams,
        });
    };

    useEffect(() => {
        if (url) {
            setIframeUrl(
                generateUrl(url, {
                    animation_autoplay: !autoPlay && '0',
                    annotation: showAnnotations && startingAnnotation,
                    annotation_cycle: showAnnotations && annotationCycle && '10',
                    annotation_tooltip_visible: showAnnotations && !annotationTooltipVisible && '0',
                    annotations_visible: !showAnnotations && '0',
                    api_log: apiLog && '1',
                    autospin: autoSpin && autoSpinCount,
                    autostart: autoStart && '1',
                    camera: !startingSpin && '0',
                    dof_circle: !uiDOF && '0',
                    fps_speed: fps && fpsValue,
                    max_texture_size: textureSize && textureSizeValue,
                    navigation: navigationMode === 'fps' && navigationMode,
                    preload: preloadTextures && '1',
                    scrollwheel: !scrollWheel && '0',
                    ui_stop: !uiDisableViewer && '0',
                    ui_theme: uiTheme === 'dark' && uiTheme,
                    transparent: accountType !== 'Basic' && transparentBackground && '1',
                    double_click: accountType !== 'Basic' && !doubleClick && '0',
                    orbit_constraint_pan: accountType !== 'Basic' && orbitConstraintPan && '1',
                    orbit_constraint_pitch_down:
                        accountType !== 'Basic' && orbitConstraintPitch && orbitConstraintPitchLimitsDown,
                    orbit_constraint_pitch_up: accountType !== 'Basic' && orbitConstraintPitchLimitsUp,
                    orbit_constraint_yaw_left:
                        accountType !== 'Basic' && orbitConstraintYaw && orbitConstraintYawLimitsLeft,
                    orbit_constraint_yaw_right:
                        accountType !== 'Basic' && orbitConstraintYaw && orbitConstraintYawLimitsRight,
                    orbit_constraint_zoom_in:
                        accountType !== 'Basic' && orbitConstraintZoomIn && orbitConstraintZoomInCount,
                    orbit_constraint_zoom_out:
                        accountType !== 'Basic' && orbitConstraintZoomOut && orbitConstraintZoomOutCount,
                    prevent_user_light_rotation: accountType !== 'Basic' && preventLightRotation && '1',
                    ui_animations: accountType === 'Premium' && !uiAnimations && '0',
                    ui_annotations: accountType === 'Premium' && !uiAnnotations && '0',
                    ui_controls: accountType === 'Premium' && !uiControls && '0',
                    ui_fadeout: accountType === 'Premium' && !uiFadeout && '0',
                    ui_fullscreen: accountType === 'Premium' && !uiFullscreen && '0',
                    ui_general_controls: accountType === 'Premium' && !uiGeneralControls && '0',
                    ui_help: accountType === 'Premium' && !uiHelp && '0',
                    ui_hint: accountType === 'Premium' && !uiHint && '0',
                    ui_infos: accountType === 'Premium' && !uiInfos && '0',
                    ui_inspector: accountType === 'Premium' && !uiInspector && '0',
                    ui_loading: accountType === 'Premium' && !uiLoading && '0',
                    ui_settings: accountType === 'Premium' && !uiSettings && '0',
                    ui_sound: accountType === 'Premium' && !uiSound && '0',
                    ui_start: accountType === 'Premium' && !uiStart && '0',
                    ui_vr: accountType === 'Premium' && !uiVR && '0',
                    ui_ar_help: accountType === 'Premium' && !uiAR && '0',
                    ui_ar_qrcode: accountType === 'Premium' && !uiQR && '0',
                    ui_watermark: accountType === 'Premium' && !uiWatermark && '0',
                    ui_color: accountType === 'Premium' && toHex8String(uiColor).slice(1, 7),
                    dnt: !viewersTracking && '1',
                })
            );
        } else {
            setLocalUrl('');
            setIframeUrl(null);
        }
    }, [blockSettings]);

    return (
        <div data-test-id="storybook-block" className="tw-relative">
            {iframeUrl ? (
                <div>
                    <iframe
                        className={joinClassNames(['tw-w-full', !hasRadius && borderRadiusClasses[radiusChoice]])}
                        style={
                            hasBorder
                                ? getIframeStyles([borderStyle, borderWidth, borderColor], hasRadius ? radiusValue : '')
                                : {}
                        }
                        height={isCustomHeight ? customHeight : heights[height]}
                        src={iframeUrl.toString()}
                        frameBorder="0"
                        data-test-id="sketchfab-iframe"
                    />
                </div>
            ) : (
                <>
                    {isEditing ? (
                        <div
                            className="tw-flex tw-flex-col tw-items-center tw-bg-black-5 tw-p-20 tw-gap-8"
                            data-test-id="storybook-empty-wrapper"
                        >
                            <Text color="x-weak">Enter a URL to your 3D model from Sketchfab.</Text>
                            <div className="tw-text-text-x-weak tw-flex tw-items-center tw-gap-3 tw-w-full tw-justify-center">
                                <div className="tw-flex-none">
                                    <IconExternalAsset size={IconSize.Size32} />
                                </div>
                                <div className="tw-w-full tw-max-w-sm">
                                    <TextInput
                                        value={localUrl}
                                        onChange={setLocalUrl}
                                        onEnterPressed={saveLink}
                                        placeholder={URL_INPUT_PLACEHOLDER}
                                    />
                                </div>
                                <Button onClick={saveLink}>Confirm</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="tw-flex tw-items-center tw-justify-center tw-bg-black-5 tw-p-20">
                            <Text color="x-weak">No SketchFab-URL defined.</Text>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
