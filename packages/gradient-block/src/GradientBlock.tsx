/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MouseEvent, useRef, useState } from 'react';
import '@frontify/fondue-tokens/styles';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { Divider } from '@frontify/fondue';
import 'tailwindcss/tailwind.css';
import { GradientColor, Settings, gradientHeightValues, gradientOrientationValues } from './types';
import { DEFAULT_GRADIENT_COLORS, DEFAULT_HEIGHT_VALUE, DEFAULT_ORIENTATION_VALUE } from './constants';
import { AddColorButton, ColorPicker, ColorTooltip, CssValueDisplay, SquareBadgesRow } from './components';
import { toHexString } from '@frontify/guideline-blocks-shared';

export const GradientBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
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

    const parseGradientColorsToCss = () => {
        if (!gradientColors) {
            return '';
        } else {
            let colorsAsString = '';
            for (const color of gradientColors.sort((a, b) => a.position - b.position)) {
                colorsAsString += `, ${toHexString(color.color)} ${color.position}%`;
            }

            return `linear-gradient(${gradientOrientation}deg${colorsAsString})`;
        }
    };

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

    const cssValue = parseGradientColorsToCss();

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
                    {gradientBlockRef.current && gradientColors ? (
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
