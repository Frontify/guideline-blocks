/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Button, FormControl, FormControlStyle, IconLinkBox, IconSize, Text, TextInput } from '@frontify/fondue';

import { BlockProps, joinClassNames, toHex8String } from '@frontify/guideline-blocks-settings';
import { FC, useEffect, useState } from 'react';
import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';
import 'tailwindcss/tailwind.css';
import { SKETCHFAB_RULE_ERROR, generateIframeUrl, generateSketchfabEmbedUrl, getIframeBorderStyles } from './helpers';
import { URL_INPUT_PLACEHOLDER } from './settings';
import { Settings, SketchfabAccount, SketchfabNavigation, SketchfabTheme, heights, radiusClassMap } from './types';

export const SketchfabBlock: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [localUrl, setLocalUrl] = useState('');
    const [iframeUrl, setIframeUrl] = useState<URL | null>(null);
    const [inputError, setInputError] = useState(false);

    const saveLink = () => {
        const embedUrl = generateSketchfabEmbedUrl(localUrl);
        if (embedUrl) {
            setBlockSettings({
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
        /* Parameters are only added if they are different to the default defined
            in https://help.sketchfab.com/hc/en-us/articles/360056963172-Customizing-your-embedded-3d-model
            to keep the url as short as possible, with the final value in the conditional chain being used in the param */
        if (bs.url) {
            const disableAllUI = !bs.showUI;
            const disableAllButtons = !bs.showButtons;

            const annotationSettings = bs.showAnnotations
                ? {
                      annotation: bs.startingAnnotation && bs.startingAnnotationValue,
                      annotation_cycle: bs.annotationCycle && bs.annotationCycleCount,
                      annotation_tooltip_visible: !bs.annotationTooltipVisible && '0',
                  }
                : {
                      annotations_visible: '0',
                  };

            const basicSettings = {
                animation_autoplay: !bs.autoPlay && '0',
                api_log: bs.apiLog && '1',
                autospin: bs.autoSpin && bs.autoSpinCount,
                autostart: bs.autoStart && '1',
                camera: !bs.startingSpin && '0',
                dof_circle: ((bs.accountType === SketchfabAccount.Premium && disableAllUI) || !bs.uiDOF) && '0',
                fps_speed: bs.fps && bs.fpsValue,
                max_texture_size: bs.textureSize && bs.textureSizeValue,
                navigation: bs.navigationMode === SketchfabNavigation.Fps && bs.navigationMode,
                preload: bs.preloadTextures && '1',
                scrollwheel: !bs.scrollWheel && '0',
                ui_stop:
                    ((bs.accountType === SketchfabAccount.Premium && disableAllButtons) || !bs.uiDisableViewer) && '0',
                ui_theme: bs.uiTheme === SketchfabTheme.Dark && bs.uiTheme,
                dnt: !bs.viewersTracking && '1',
                ...annotationSettings,
            };

            const navigationSettings = bs.navigationConstraints
                ? {
                      orbit_constraint_pan: bs.orbitConstraintPan && '1',
                      orbit_constraint_pitch_down: bs.orbitConstraintPitch && bs.orbitConstraintPitchLimitsDown,
                      orbit_constraint_pitch_up: bs.orbitConstraintPitch && bs.orbitConstraintPitchLimitsUp,
                      orbit_constraint_yaw_left: bs.orbitConstraintYaw && bs.orbitConstraintYawLimitsLeft,
                      orbit_constraint_yaw_right: bs.orbitConstraintYaw && bs.orbitConstraintYawLimitsRight,
                      orbit_constraint_zoom_in: bs.orbitConstraintZoomIn && bs.orbitConstraintZoomInCount,
                      orbit_constraint_zoom_out: bs.orbitConstraintZoomOut && bs.orbitConstraintZoomOutCount,
                      prevent_user_light_rotation: !bs.allowLightRotation && '1',
                  }
                : {};

            const proSettings =
                bs.accountType !== SketchfabAccount.Basic
                    ? {
                          transparent: bs.transparentBackground && '1',
                          double_click: !bs.doubleClick && '0',
                          ...navigationSettings,
                      }
                    : {};

            const premiumSettings =
                bs.accountType === SketchfabAccount.Premium
                    ? {
                          ui_color: bs.uiColor && toHex8String(bs.uiColorValue).slice(1, 7),
                          // UI Controls
                          ui_animations: (disableAllUI || !bs.uiAnimations) && '0',
                          ui_annotations: (disableAllUI || !bs.uiAnnotations) && '0',
                          ui_fadeout: (disableAllUI || !bs.uiFadeout) && '0',
                          ui_help: (disableAllButtons || !bs.uiHelp) && '0',
                          ui_hint: (disableAllUI || !bs.uiHint) && '0',
                          ui_infos: (disableAllUI || !bs.uiInfos) && '0',
                          ui_loading: (disableAllUI || !bs.uiLoading) && '0',
                          ui_watermark: (disableAllUI || !bs.uiWatermark) && '0',
                          // Button Controls
                          ui_inspector: (disableAllButtons || !bs.uiInspector) && '0',
                          ui_fullscreen: (disableAllButtons || !bs.uiFullscreen) && '0',
                          ui_settings: (disableAllButtons || !bs.uiSettings) && '0',
                          ui_sound: (disableAllButtons || !bs.uiSound) && '0',
                          ui_start: (disableAllButtons || !bs.uiStart) && '0',
                          ui_vr: (disableAllButtons || !bs.uiVR) && '0',
                          ui_ar: (disableAllButtons || !bs.uiAR) && '0',
                          ui_ar_help: (disableAllButtons || !bs.uiARHelp) && '0',
                          ui_ar_qrcode: (disableAllButtons || !bs.uiQR) && '0',
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
        <div className="sketchfab-block">
            <div data-test-id="sketchfab-block" className="tw-relative">
                {iframeUrl && (
                    <div>
                        <iframe
                            className={joinClassNames(['tw-w-full', !hasRadius && radiusClassMap[radiusChoice]])}
                            style={{
                                ...(hasBorder ? getIframeBorderStyles(borderStyle, borderWidth, borderColor) : {}),
                                borderRadius: hasRadius ? radiusValue : '',
                            }}
                            height={isCustomHeight ? customHeight : heights[height]}
                            src={iframeUrl.toString()}
                            frameBorder="0"
                            data-test-id="sketchfab-iframe"
                            title="3D model from Sketchfab"
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
                                <IconLinkBox size={IconSize.Size32} />
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
                            <IconLinkBox size={IconSize.Size32} />
                        </Text>
                    </div>
                )}
            </div>
        </div>
    );
};
