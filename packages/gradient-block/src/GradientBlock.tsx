/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useColorPalettes, useEditorState } from '@frontify/app-bridge';
import { Divider, Palette } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { toHexString } from '@frontify/guideline-blocks-shared';
import { MouseEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { AddColorButton, ColorPicker, ColorTooltip, CssValueDisplay, SquareBadgesRow } from './components';
import { DEFAULT_GRADIENT_COLORS, DEFAULT_HEIGHT_VALUE, DEFAULT_ORIENTATION_VALUE } from './constants';
import { parseGradientColorsToCss } from './helpers';
import { GradientColor, Settings, gradientHeightValues, gradientOrientationValues } from './types';

export const GradientBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { colorPalettes: appBridgePalettes } = useColorPalettes(appBridge);
    const [colorPickerPalettes, setColorPickerPalettes] = useState<Palette[]>([]);
    const {
        gradientColors,
        isOrientationCustom,
        orientationCustom,
        orientationSimple,
        isHeightCustom,
        heightCustom,
        heightSimple,
        displayCss,
    } = blockSettings;
    const gradientBlockRef = useRef<HTMLDivElement>(null);
    const [addButtonPositionLeft, setAddButtonPositionLeft] = useState(0);
    const [currentlyEditingPosition, setCurrentlyEditingPosition] = useState(0);
    const [showAddButton, setShowAddButton] = useState(false);
    const [showColorModal, setShowColorModal] = useState(false);
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        setColorPickerPalettes(
            appBridgePalettes.map((palette) => {
                const colors = palette.colors.map((color) => {
                    return {
                        alpha: color.alpha ? color.alpha / 255 : 1,
                        red: color.red ?? 0,
                        green: color.green ?? 0,
                        blue: color.blue ?? 0,
                        name: color.name ?? '',
                    };
                });

                return {
                    id: palette.id,
                    title: palette.name,
                    colors,
                };
            })
        );
    }, [appBridgePalettes, appBridge]);

    if (!gradientColors) {
        setBlockSettings({
            gradientColors: DEFAULT_GRADIENT_COLORS,
        });
    }

    const setGradientColors = (colors: GradientColor[]) => {
        setBlockSettings({
            gradientColors: colors,
        });
    };

    const gradientOrientation = isOrientationCustom
        ? orientationCustom
        : gradientOrientationValues[orientationSimple ?? DEFAULT_ORIENTATION_VALUE];

    const gradientBlockHeight = isHeightCustom
        ? heightCustom
        : gradientHeightValues[heightSimple ?? DEFAULT_HEIGHT_VALUE];

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (showColorModal) {
            return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        const { clientX } = event.nativeEvent;
        const relativeMouseX = clientX - rect.x;
        setAddButtonPositionLeft(relativeMouseX - 16 / 2);
        setShowAddButton(true);
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    const cssValue = parseGradientColorsToCss(gradientColors, gradientOrientation);

    return (
        <div data-test-id="gradient-block" ref={gradientBlockRef}>
            <div className="tw-border tw-border-line-strong tw-rounded tw-p-0.5">
                <div
                    data-test-id="gradient-block-display"
                    className="tw-w-full tw-h-4 tw-rounded"
                    style={{
                        height: gradientBlockHeight,
                        background: cssValue,
                    }}
                />
            </div>
            {isEditing ? (
                <div>
                    <div className="tw-relative">
                        <div
                            data-test-id="gradient-block-divider"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => setShowAddButton(false)}
                        >
                            <Divider />
                            {showAddButton && gradientBlockRef.current ? (
                                <AddColorButton
                                    blockWidth={gradientBlockRef.current.clientWidth}
                                    positionLeft={addButtonPositionLeft}
                                    setShowColorModal={setShowColorModal}
                                    setCurrentlyEditingPosition={setCurrentlyEditingPosition}
                                />
                            ) : null}
                        </div>
                    </div>
                    {showColorModal && gradientColors !== undefined ? (
                        <ColorPicker
                            colorPalettes={colorPickerPalettes}
                            currentlyEditingPosition={currentlyEditingPosition}
                            gradientColors={gradientColors}
                            setColors={setGradientColors}
                            setShowColorModal={setShowColorModal}
                        />
                    ) : null}

                    {gradientColors?.map((gradientColor) => (
                        <ColorTooltip
                            key={toHexString(gradientColor.color) + gradientColor.position}
                            gradientColor={gradientColor}
                            gradientColors={gradientColors}
                            showColorModal={showColorModal}
                            setColors={setGradientColors}
                            setShowColorModal={setShowColorModal}
                            setCurrentlyEditingPosition={setCurrentlyEditingPosition}
                        />
                    ))}
                </div>
            ) : (
                <>
                    {gradientBlockRef.current && gradientColors && isMounted ? (
                        <SquareBadgesRow
                            blockWidth={gradientBlockRef.current.clientWidth}
                            gradientColors={gradientColors}
                            gradientOrientation={gradientOrientation}
                        />
                    ) : null}
                </>
            )}
            {displayCss ? <CssValueDisplay cssValue={cssValue} /> : null}
        </div>
    );
};
