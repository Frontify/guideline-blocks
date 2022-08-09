/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Button, FormControl, FormControlStyle, IconExternalAsset, IconSize, Text, TextInput } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { joinClassNames, toHex8String } from '@frontify/guideline-blocks-shared';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import {
    SKETCHFAB_RULE_ERROR,
    generateIframeUrl,
    generateSketchfabEmbedUrl,
    getIframeStyles,
    getUrlStringWithoutSearchParams,
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
        const embedUrl = generateSketchfabEmbedUrl(urlWithoutSearchParams);
        if (embedUrl) {
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
    } = blockSettings;

    useEffect(() => {
        const bs = blockSettings;
        if (bs.url) {
            const basicSettings = {
                animation_autoplay: bs.autoPlay === false && '0',
                annotation:
                    bs.showAnnotations &&
                    Boolean(Number(bs.startingAnnotation)) &&
                    bs.startingAnnotation &&
                    bs.startingAnnotationValue,
                annotation_cycle: bs.showAnnotations && bs.annotationCycle && bs.annotationCycleCount,
                annotation_tooltip_visible: bs.showAnnotations && bs.annotationTooltipVisible === false && '0',
                annotations_visible: bs.showAnnotations === false && '0',
                api_log: bs.apiLog && '1',
                autospin: bs.autoSpin && bs.autoSpinCount,
                autostart: bs.autoStart && '1',
                camera: bs.startingSpin === false && '0',
                dof_circle: (!bs.showUI || bs.uiDOF === false) && '0',
                fps_speed: bs.fps && bs.fpsValue,
                max_texture_size: bs.textureSize && bs.textureSizeValue,
                navigation: bs.navigationMode === SketchfabNavigation.Fps && bs.navigationMode,
                preload: bs.preloadTextures && '1',
                scrollwheel: bs.scrollWheel === false && '0',
                ui_stop: bs.uiDisableViewer === false && '0',
                ui_theme: bs.uiTheme === SketchfabTheme.Dark && bs.uiTheme,
                dnt: !bs.viewersTracking === false && '1',
            };

            const proSettings =
                bs.accountType !== SketchfabAccount.Basic
                    ? {
                          transparent: bs.transparentBackground && '1',
                          double_click: bs.doubleClick === false && '0',
                          orbit_constraint_pan: bs.navigationConstraints && bs.orbitConstraintPan && '1',
                          orbit_constraint_pitch_down:
                              bs.navigationConstraints && bs.orbitConstraintPitch && bs.orbitConstraintPitchLimitsDown,
                          orbit_constraint_pitch_up: bs.navigationConstraints && bs.orbitConstraintPitchLimitsUp,
                          orbit_constraint_yaw_left:
                              bs.navigationConstraints && bs.orbitConstraintYaw && bs.orbitConstraintYawLimitsLeft,
                          orbit_constraint_yaw_right:
                              bs.navigationConstraints && bs.orbitConstraintYaw && bs.orbitConstraintYawLimitsRight,
                          orbit_constraint_zoom_in:
                              bs.navigationConstraints && bs.orbitConstraintZoomIn && bs.orbitConstraintZoomInCount,
                          orbit_constraint_zoom_out:
                              bs.navigationConstraints && bs.orbitConstraintZoomOut && bs.orbitConstraintZoomOutCount,
                          prevent_user_light_rotation: !bs.allowLightRotation && '1',
                      }
                    : {};

            const premiumSettings =
                bs.accountType === SketchfabAccount.Premium
                    ? {
                          ui_animations: (!bs.showUI || !bs.uiAnimations) && '0',
                          ui_annotations: (!bs.showUI || !bs.uiAnnotations) && '0',
                          ui_controls: !bs.showButtons && '0',
                          ui_fadeout: bs.showUI && !bs.uiFadeout && '0',
                          ui_fullscreen: (!bs.showButtons || !bs.uiFullscreen) && '0',
                          ui_general_controls: !bs.showUI && '0',
                          ui_help: (!bs.showButtons || !bs.uiHelp) && '0',
                          ui_hint: (!bs.showUI || !bs.uiHint) && '0',
                          ui_infos: (!bs.showUI || !bs.uiInfos) && '0',
                          ui_inspector: (!bs.showButtons || !bs.uiInspector) && '0',
                          ui_loading: (!bs.showUI || !bs.uiLoading) && '0',
                          ui_settings: (!bs.showButtons || !bs.uiSettings) && '0',
                          ui_sound: (!bs.showButtons || !bs.uiSound) && '0',
                          ui_start: (!bs.showButtons || !bs.uiStart) && '0',
                          ui_vr: (!bs.showButtons || !bs.uiVR) && '0',
                          ui_ar: (!bs.showButtons || !bs.uiAR) && '0',
                          ui_ar_help: (!bs.showButtons || !bs.uiARHelp) && '0',
                          ui_ar_qrcode: (!bs.showButtons || !bs.uiQR) && '0',
                          ui_watermark: (!bs.showUI || !bs.uiWatermark) && '0',
                          ui_color: bs.uiColor && toHex8String(bs.uiColorValue).slice(1, 7),
                      }
                    : {};

            setIframeUrl(
                generateIframeUrl(bs.url, {
                    ...basicSettings,
                    ...proSettings,
                    ...premiumSettings,
                })
            );
        } else {
            setLocalUrl('');
            setIframeUrl(null);
        }
    }, [blockSettings]);

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
