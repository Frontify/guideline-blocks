/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/arcade-tokens/styles';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Button, FormControl, FormControlStyle, IconExternalAsset, IconSize, Text, TextInput } from '@frontify/arcade';
import { BorderStyle, Radius, joinClassNames, toHex8String } from '@frontify/guideline-blocks-shared';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { BORDER_COLOR_DEFAULT_VALUE, DEFAULT_BORDER_WIDTH, URL_INPUT_PLACEHOLDER } from './settings';
import {
    Settings,
    SketchfabAccount,
    SketchfabBlockProps,
    SketchfabHeight,
    SketchfabNavigation,
    SketchfabTheme,
    borderRadiusClasses,
    heights,
} from './types';
import {
    SKETCHFAB_RULE_ERROR,
    generateUrl,
    getIframeStyles,
    getUrlWithoutSearchParams,
    isSketchfabUrl,
} from './helpers';

export const SketchfabBlock = ({ appBridge }: SketchfabBlockProps) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [localUrl, setLocalUrl] = useState('');
    const [iframeUrl, setIframeUrl] = useState<URL | null>(null);
    const [inputError, setInputError] = useState(false);

    // Defaults reflected here https://help.sketchfab.com/hc/en-us/articles/360056963172-Customizing-your-embedded-3d-model
    const {
        url = '',
        isCustomHeight = false,
        height = SketchfabHeight.Medium,
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
        navigationMode = SketchfabNavigation.Orbit,
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
        annotationCycleCount,
        annotationTooltipVisible = true,
        startingAnnotation = '',
        uiTheme = SketchfabTheme.Default,
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
        uiARHelp = true,
        uiQR = true,
        uiWatermark = true,
        accountType,
    } = blockSettings;

    const saveLink = () => {
        const urlWithoutSearchParams = getUrlWithoutSearchParams(localUrl);
        if (isSketchfabUrl(urlWithoutSearchParams)) {
            setBlockSettings({
                ...blockSettings,
                url: urlWithoutSearchParams,
            });
            setInputError(false);
        } else {
            setInputError(true);
        }
    };

    useEffect(() => {
        if (url) {
            setIframeUrl(
                generateUrl(url, {
                    animation_autoplay: !autoPlay && '0',
                    annotation: showAnnotations && Boolean(startingAnnotation) && startingAnnotation,
                    annotation_cycle: showAnnotations && annotationCycle && annotationCycleCount,
                    annotation_tooltip_visible: showAnnotations && !annotationTooltipVisible && '0',
                    annotations_visible: !showAnnotations && '0',
                    api_log: apiLog && '1',
                    autospin: autoSpin && autoSpinCount,
                    autostart: autoStart && '1',
                    camera: !startingSpin && '0',
                    dof_circle: !uiDOF && '0',
                    fps_speed: fps && fpsValue,
                    max_texture_size: textureSize && textureSizeValue,
                    navigation: navigationMode === SketchfabNavigation.Fps && navigationMode,
                    preload: preloadTextures && '1',
                    scrollwheel: !scrollWheel && '0',
                    ui_stop: !uiDisableViewer && '0',
                    ui_theme: uiTheme === SketchfabTheme.Dark && uiTheme,
                    transparent: accountType !== SketchfabAccount.Basic && transparentBackground && '1',
                    double_click: accountType !== SketchfabAccount.Basic && !doubleClick && '0',
                    orbit_constraint_pan: accountType !== SketchfabAccount.Basic && orbitConstraintPan && '1',
                    orbit_constraint_pitch_down:
                        accountType !== SketchfabAccount.Basic &&
                        orbitConstraintPitch &&
                        orbitConstraintPitchLimitsDown,
                    orbit_constraint_pitch_up: accountType !== SketchfabAccount.Basic && orbitConstraintPitchLimitsUp,
                    orbit_constraint_yaw_left:
                        accountType !== SketchfabAccount.Basic && orbitConstraintYaw && orbitConstraintYawLimitsLeft,
                    orbit_constraint_yaw_right:
                        accountType !== SketchfabAccount.Basic && orbitConstraintYaw && orbitConstraintYawLimitsRight,
                    orbit_constraint_zoom_in:
                        accountType !== SketchfabAccount.Basic && orbitConstraintZoomIn && orbitConstraintZoomInCount,
                    orbit_constraint_zoom_out:
                        accountType !== SketchfabAccount.Basic && orbitConstraintZoomOut && orbitConstraintZoomOutCount,
                    prevent_user_light_rotation: accountType !== SketchfabAccount.Basic && preventLightRotation && '1',
                    ui_animations: accountType === SketchfabAccount.Premium && !uiAnimations && '0',
                    ui_annotations: accountType === SketchfabAccount.Premium && !uiAnnotations && '0',
                    ui_controls: accountType === SketchfabAccount.Premium && !uiControls && '0',
                    ui_fadeout: accountType === SketchfabAccount.Premium && !uiFadeout && '0',
                    ui_fullscreen: accountType === SketchfabAccount.Premium && !uiFullscreen && '0',
                    ui_general_controls: accountType === SketchfabAccount.Premium && !uiGeneralControls && '0',
                    ui_help: accountType === SketchfabAccount.Premium && !uiHelp && '0',
                    ui_hint: accountType === SketchfabAccount.Premium && !uiHint && '0',
                    ui_infos: accountType === SketchfabAccount.Premium && !uiInfos && '0',
                    ui_inspector: accountType === SketchfabAccount.Premium && !uiInspector && '0',
                    ui_loading: accountType === SketchfabAccount.Premium && !uiLoading && '0',
                    ui_settings: accountType === SketchfabAccount.Premium && !uiSettings && '0',
                    ui_sound: accountType === SketchfabAccount.Premium && !uiSound && '0',
                    ui_start: accountType === SketchfabAccount.Premium && !uiStart && '0',
                    ui_vr: accountType === SketchfabAccount.Premium && !uiVR && '0',
                    ui_ar: accountType === SketchfabAccount.Premium && !uiAR && '0',
                    ui_ar_help: accountType === SketchfabAccount.Premium && !uiARHelp && '0',
                    ui_ar_qrcode: accountType === SketchfabAccount.Premium && !uiQR && '0',
                    ui_watermark: accountType === SketchfabAccount.Premium && !uiWatermark && '0',
                    ui_color: accountType === SketchfabAccount.Premium && toHex8String(uiColor).slice(1, 7),
                    dnt: !viewersTracking && '1',
                })
            );
        } else {
            setLocalUrl('');
            setIframeUrl(null);
        }
    }, [
        accountType,
        annotationCycle,
        annotationCycleCount,
        annotationTooltipVisible,
        apiLog,
        autoPlay,
        autoSpin,
        autoSpinCount,
        autoStart,
        blockSettings,
        doubleClick,
        fps,
        fpsValue,
        navigationMode,
        orbitConstraintPan,
        orbitConstraintPitch,
        orbitConstraintPitchLimitsDown,
        orbitConstraintPitchLimitsUp,
        orbitConstraintYaw,
        orbitConstraintYawLimitsLeft,
        orbitConstraintYawLimitsRight,
        orbitConstraintZoomIn,
        orbitConstraintZoomInCount,
        orbitConstraintZoomOut,
        orbitConstraintZoomOutCount,
        preloadTextures,
        preventLightRotation,
        scrollWheel,
        showAnnotations,
        startingAnnotation,
        startingSpin,
        textureSize,
        textureSizeValue,
        transparentBackground,
        uiAR,
        uiARHelp,
        uiAnimations,
        uiAnnotations,
        uiColor,
        uiControls,
        uiDOF,
        uiDisableViewer,
        uiFadeout,
        uiFullscreen,
        uiGeneralControls,
        uiHelp,
        uiHint,
        uiInfos,
        uiInspector,
        uiLoading,
        uiQR,
        uiSettings,
        uiSound,
        uiStart,
        uiTheme,
        uiVR,
        uiWatermark,
        url,
        viewersTracking,
    ]);

    return (
        <div data-test-id="sketchfab-block" className="tw-relative">
            {iframeUrl ? (
                <div>
                    <iframe
                        className={joinClassNames(['tw-w-full', !hasRadius && borderRadiusClasses[radiusChoice]])}
                        style={
                            hasBorder
                                ? getIframeStyles(borderStyle, borderWidth, borderColor, hasRadius ? radiusValue : '')
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
                            data-test-id="sketchfab-empty-block-edit"
                        >
                            <Text color="x-weak">Enter a URL to your 3D model from Sketchfab.</Text>
                            <div className="tw-text-text-x-weak tw-flex tw-items-start tw-gap-3 tw-w-full tw-justify-center">
                                <div className="tw-flex-none tw-mt-[2px]">
                                    <IconExternalAsset size={IconSize.Size32} />
                                </div>
                                <div className="tw-w-full tw-max-w-sm">
                                    <FormControl
                                        helper={inputError ? { text: SKETCHFAB_RULE_ERROR } : undefined}
                                        style={inputError ? FormControlStyle.Danger : FormControlStyle.Primary}
                                    >
                                        <TextInput
                                            value={localUrl}
                                            onChange={setLocalUrl}
                                            onEnterPressed={saveLink}
                                            placeholder={URL_INPUT_PLACEHOLDER}
                                        />
                                    </FormControl>
                                </div>
                                <Button onClick={saveLink}>Confirm</Button>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="tw-flex tw-items-center tw-justify-center tw-bg-black-5 tw-p-20"
                            data-test-id="sketchfab-empty-block-view"
                        >
                            <Text color="x-weak">
                                <IconExternalAsset size={IconSize.Size32} />
                            </Text>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
