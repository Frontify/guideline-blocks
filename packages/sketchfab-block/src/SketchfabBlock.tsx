/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Button, FormControl, FormControlStyle, IconExternalAsset, IconSize, Text, TextInput } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { joinClassNames, toHex8String } from '@frontify/guideline-blocks-shared';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import {
    SKETCHFAB_RULE_ERROR,
    applyEmbedToUrl,
    generateUrl,
    getIframeStyles,
    getUrlStringWithoutSearchParams,
    isSketchfabUrl,
} from './helpers';
import { URL_INPUT_PLACEHOLDER } from './settings';
import {
    Settings,
    SketchfabAccount,
    SketchfabBlockProps,
    SketchfabNavigation,
    SketchfabTheme,
    borderRadiusClasses,
    heights,
} from './types';

export const SketchfabBlock = ({ appBridge }: SketchfabBlockProps) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [localUrl, setLocalUrl] = useState('');
    const [iframeUrl, setIframeUrl] = useState<URL | null>(null);
    const [inputError, setInputError] = useState(false);

    const saveLink = () => {
        const urlWithoutSearchParams = getUrlStringWithoutSearchParams(localUrl);
        if (isSketchfabUrl(urlWithoutSearchParams)) {
            const embedUrl = applyEmbedToUrl(urlWithoutSearchParams);
            setBlockSettings({
                ...blockSettings,
                url: embedUrl,
            });
            setInputError(false);
        } else {
            setInputError(true);
        }
    };

    const {
        height,
        hasBorder,
        hasRadius,
        radiusChoice,
        radiusValue,
        borderColor,
        borderStyle,
        borderWidth,
        isCustomHeight,
        customHeight,
        ...params
    } = blockSettings;

    useEffect(() => {
        if (params.url) {
            setIframeUrl(
                generateUrl(params.url, {
                    animation_autoplay: params.autoPlay === false && '0',
                    annotation:
                        params.showAnnotations &&
                        Boolean(Number(params.startingAnnotation)) &&
                        params.startingAnnotation &&
                        params.startingAnnotationValue,
                    annotation_cycle: params.showAnnotations && params.annotationCycle && params.annotationCycleCount,
                    annotation_tooltip_visible:
                        params.showAnnotations && params.annotationTooltipVisible === false && '0',
                    annotations_visible: params.showAnnotations === false && '0',
                    api_log: params.apiLog && '1',
                    autospin: params.autoSpin && params.autoSpinCount,
                    autostart: params.autoStart && '1',
                    camera: params.startingSpin === false && '0',
                    dof_circle: params.showUI && params.uiDOF === false && '0',
                    fps_speed: params.fps && params.fpsValue,
                    max_texture_size: params.textureSize && params.textureSizeValue,
                    navigation: params.navigationMode === SketchfabNavigation.Fps && params.navigationMode,
                    preload: params.preloadTextures && '1',
                    scrollwheel: params.scrollWheel === false && '0',
                    ui_stop: params.uiDisableViewer === false && '0',
                    ui_theme: params.uiTheme === SketchfabTheme.Dark && params.uiTheme,
                    transparent: params.accountType !== SketchfabAccount.Basic && params.transparentBackground && '1',
                    double_click: params.accountType !== SketchfabAccount.Basic && params.doubleClick === false && '0',
                    orbit_constraint_pan:
                        params.accountType !== SketchfabAccount.Basic &&
                        params.navigationConstraints &&
                        params.orbitConstraintPan &&
                        '1',
                    orbit_constraint_pitch_down:
                        params.accountType !== SketchfabAccount.Basic &&
                        params.navigationConstraints &&
                        params.orbitConstraintPitch &&
                        params.orbitConstraintPitchLimitsDown,
                    orbit_constraint_pitch_up:
                        params.accountType !== SketchfabAccount.Basic &&
                        params.navigationConstraints &&
                        params.orbitConstraintPitchLimitsUp,
                    orbit_constraint_yaw_left:
                        params.accountType !== SketchfabAccount.Basic &&
                        params.navigationConstraints &&
                        params.orbitConstraintYaw &&
                        params.orbitConstraintYawLimitsLeft,
                    orbit_constraint_yaw_right:
                        params.accountType !== SketchfabAccount.Basic &&
                        params.navigationConstraints &&
                        params.orbitConstraintYaw &&
                        params.orbitConstraintYawLimitsRight,
                    orbit_constraint_zoom_in:
                        params.accountType !== SketchfabAccount.Basic &&
                        params.navigationConstraints &&
                        params.orbitConstraintZoomIn &&
                        params.orbitConstraintZoomInCount,
                    orbit_constraint_zoom_out:
                        params.accountType !== SketchfabAccount.Basic &&
                        params.navigationConstraints &&
                        params.orbitConstraintZoomOut &&
                        params.orbitConstraintZoomOutCount,
                    prevent_user_light_rotation:
                        params.accountType !== SketchfabAccount.Basic && !params.allowLightRotation && '1',
                    ui_animations:
                        params.accountType === SketchfabAccount.Premium && params.showUI && !params.uiAnimations && '0',
                    ui_annotations:
                        params.accountType === SketchfabAccount.Premium &&
                        params.showUI &&
                        !params.uiAnnotations &&
                        '0',
                    ui_controls:
                        params.accountType === SketchfabAccount.Premium &&
                        params.showButtons &&
                        !params.uiControls &&
                        '0',
                    ui_fadeout:
                        params.accountType === SketchfabAccount.Premium && params.showUI && !params.uiFadeout && '0',
                    ui_fullscreen:
                        params.accountType === SketchfabAccount.Premium &&
                        params.showButtons &&
                        !params.uiFullscreen &&
                        '0',
                    ui_general_controls:
                        params.accountType === SketchfabAccount.Premium &&
                        params.showUI &&
                        !params.uiGeneralControls &&
                        '0',
                    ui_help:
                        params.accountType === SketchfabAccount.Premium && params.showButtons && !params.uiHelp && '0',
                    ui_hint: params.accountType === SketchfabAccount.Premium && params.showUI && !params.uiHint && '0',
                    ui_infos:
                        params.accountType === SketchfabAccount.Premium && params.showUI && !params.uiInfos && '0',
                    ui_inspector:
                        params.accountType === SketchfabAccount.Premium &&
                        params.showButtons &&
                        !params.uiInspector &&
                        '0',
                    ui_loading:
                        params.accountType === SketchfabAccount.Premium && params.showUI && !params.uiLoading && '0',
                    ui_settings:
                        params.accountType === SketchfabAccount.Premium &&
                        params.showButtons &&
                        !params.uiSettings &&
                        '0',
                    ui_sound:
                        params.accountType === SketchfabAccount.Premium && params.showButtons && !params.uiSound && '0',
                    ui_start:
                        params.accountType === SketchfabAccount.Premium && params.showButtons && !params.uiStart && '0',
                    ui_vr: params.accountType === SketchfabAccount.Premium && params.showButtons && !params.uiVR && '0',
                    ui_ar: params.accountType === SketchfabAccount.Premium && params.showButtons && !params.uiAR && '0',
                    ui_ar_help:
                        params.accountType === SketchfabAccount.Premium &&
                        params.showButtons &&
                        !params.uiARHelp &&
                        '0',
                    ui_ar_qrcode:
                        params.accountType === SketchfabAccount.Premium && params.showButtons && !params.uiQR && '0',
                    ui_watermark:
                        params.accountType === SketchfabAccount.Premium && params.showUI && !params.uiWatermark && '0',
                    ui_color:
                        params.accountType === SketchfabAccount.Premium &&
                        params.uiColor &&
                        toHex8String(params.uiColorValue).slice(1, 7),
                    dnt: params.viewersTracking === false && '1',
                })
            );
        } else {
            setLocalUrl('');
            setIframeUrl(null);
        }
    }, [
        params.accountType,
        params.annotationCycle,
        params.annotationCycleCount,
        params.annotationTooltipVisible,
        params.apiLog,
        params.autoPlay,
        params.autoSpin,
        params.autoSpinCount,
        params.autoStart,
        params.doubleClick,
        params.fps,
        params.fpsValue,
        params.navigationMode,
        params.navigationConstraints,
        params.orbitConstraintPan,
        params.orbitConstraintPitch,
        params.orbitConstraintPitchLimitsDown,
        params.orbitConstraintPitchLimitsUp,
        params.orbitConstraintYaw,
        params.orbitConstraintYawLimitsLeft,
        params.orbitConstraintYawLimitsRight,
        params.orbitConstraintZoomIn,
        params.orbitConstraintZoomInCount,
        params.orbitConstraintZoomOut,
        params.orbitConstraintZoomOutCount,
        params.preloadTextures,
        params.allowLightRotation,
        params.scrollWheel,
        params.showAnnotations,
        params.startingAnnotation,
        params.startingAnnotationValue,
        params.startingSpin,
        params.textureSize,
        params.textureSizeValue,
        params.transparentBackground,
        params.showUI,
        params.showButtons,
        params.uiAR,
        params.uiARHelp,
        params.uiAnimations,
        params.uiAnnotations,
        params.uiColor,
        params.uiColorValue,
        params.uiControls,
        params.uiDOF,
        params.uiDisableViewer,
        params.uiFadeout,
        params.uiFullscreen,
        params.uiGeneralControls,
        params.uiHelp,
        params.uiHint,
        params.uiInfos,
        params.uiInspector,
        params.uiLoading,
        params.uiQR,
        params.uiSettings,
        params.uiSound,
        params.uiStart,
        params.uiTheme,
        params.uiVR,
        params.uiWatermark,
        params.url,
        params.viewersTracking,
    ]);

    return (
        <div data-test-id="sketchfab-block" className="tw-relative">
            {iframeUrl && (
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
            )}
            {isEditing && !iframeUrl && (
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
            )}
            {!isEditing && !iframeUrl && (
                <div
                    className="tw-flex tw-items-center tw-justify-center tw-bg-black-5 tw-p-20"
                    data-test-id="sketchfab-empty-block-view"
                >
                    <Text color="x-weak">
                        <IconExternalAsset size={IconSize.Size32} />
                    </Text>
                </div>
            )}
        </div>
    );
};
