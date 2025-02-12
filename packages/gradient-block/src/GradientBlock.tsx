/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useColorPalettes, useEditorState } from '@frontify/app-bridge';
import { Divider, Palette } from '@frontify/fondue';

import { BlockProps, mapAppBridgeColorPalettesToFonduePalettes } from '@frontify/guideline-blocks-settings';
import { MouseEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { AddColorButton, ColorFlyout, ColorTooltip, SquareBadgesRow } from './components';
import { DEFAULT_GRADIENT_COLORS, DEFAULT_HEIGHT_VALUE, DEFAULT_ORIENTATION_VALUE } from './constants';
import { parseGradientColorsToCss, toHex6or8String } from './helpers';
import { GradientColor, Settings, gradientHeightValues, gradientOrientationValues } from './types';
import { CssValueDisplay, StyleProvider } from '@frontify/guideline-blocks-shared';

export const GradientBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { colorPalettes } = useColorPalettes(appBridge);
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
    const [addButtonPositionLeft, setAddButtonPositionLeft] = useState<number>(0);
    const [currentlyEditingPosition, setCurrentlyEditingPosition] = useState<number>(0);
    const [showAddButton, setShowAddButton] = useState<boolean>(false);
    const [showColorModal, setShowColorModal] = useState<boolean>(false);

    useEffect(() => {
        setColorPickerPalettes(mapAppBridgeColorPalettesToFonduePalettes(colorPalettes));
    }, [colorPalettes, appBridge]);

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

        if (relativeMouseX >= 0 && relativeMouseX <= rect.width) {
            setAddButtonPositionLeft(relativeMouseX - 16 / 2);
            setShowAddButton(true);
        } else {
            setShowAddButton(false);
        }
    };

    const cssValue = parseGradientColorsToCss(gradientColors, gradientOrientation);

    return (
        <div data-test-id="gradient-block" className="gradient-block" ref={gradientBlockRef}>
            <StyleProvider>
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
                                {showAddButton && gradientBlockRef.current && (
                                    <AddColorButton
                                        blockWidth={gradientBlockRef.current.clientWidth}
                                        positionLeft={addButtonPositionLeft}
                                        setShowColorModal={setShowColorModal}
                                        setCurrentlyEditingPosition={setCurrentlyEditingPosition}
                                    />
                                )}
                            </div>
                        </div>
                        {showColorModal && gradientColors !== undefined && (
                            <ColorFlyout
                                colorPalettes={colorPickerPalettes}
                                currentlyEditingPosition={currentlyEditingPosition}
                                gradientColors={gradientColors}
                                showColorModal={showColorModal}
                                setColors={setGradientColors}
                                setShowColorModal={setShowColorModal}
                            />
                        )}

                        {gradientColors?.map((gradientColor) => (
                            <ColorTooltip
                                key={toHex6or8String(gradientColor.color) + gradientColor.position}
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
                    gradientBlockRef.current &&
                    gradientColors && (
                        <SquareBadgesRow
                            blockWidth={gradientBlockRef.current.clientWidth}
                            gradientColors={gradientColors}
                            gradientOrientation={gradientOrientation}
                        />
                    )
                )}
                {displayCss && <CssValueDisplay cssValue={cssValue} placeholder="<add colors to generate CSS code>" />}
            </StyleProvider>
        </div>
    );
};
