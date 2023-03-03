/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MouseEvent, useEffect, useRef, useState } from 'react';
import '@frontify/fondue-tokens/styles';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { Color, Divider, DividerHeight, DividerStyle } from '@frontify/fondue';
import 'tailwindcss/tailwind.css';
import { GradientColor, Settings, gradientHeightValues, gradientOrientationValues } from './types';
import { HEIGHT_DEFAULT_VALUE, ORIENTATION_DEFAULT_VALUE } from './settings';
import { AddColorButton, ColorPicker, ColorTooltip, CssValueDisplay, SquareBadges } from './components';
import { toHexString } from '@frontify/guideline-blocks-shared';

const emptyStateColors = [
    {
        color: {
            red: 217,
            green: 217,
            blue: 213,
            alpha: 1,
            name: 'Light gray',
        } as Color,
        position: 0,
    },
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
            name: 'White',
        } as Color,
        position: 100,
    },
];

export const GradientBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const gradientBlockRef = useRef<HTMLDivElement>(null);
    const [addButtonPosition, setAddButtonPosition] = useState({ left: 0, top: 0 });
    const [currentlyEditingPosition, setCurrentlyEditingPosition] = useState(0);
    const [showAddButton, setShowAddButton] = useState(false);
    const [showColorModal, setShowColorModal] = useState(false);
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
    const initialColors = !gradientColors || !gradientColors?.length ? emptyStateColors : gradientColors;
    const [colors, setColors] = useState<GradientColor[]>(initialColors);
    //const [colors, setColors] = useState<GradientColor[]>(emptyStateColors);
    const gradientOrientation = isOrientationCustom
        ? orientationCustom
        : gradientOrientationValues[orientationSimple ?? ORIENTATION_DEFAULT_VALUE];
    const gradientBlockHeight = isHeightCustom
        ? heightCustom
        : gradientHeightValues[heightSimple ?? HEIGHT_DEFAULT_VALUE];

    const parseGradientColorsToCss = () => {
        let colorsAsString = '';
        const sortedColors = colors.sort((a, b) => a.position - b.position);
        for (const color of sortedColors) {
            colorsAsString += `, ${toHexString(color.color)} ${color.position}%`;
        }

        return `linear-gradient(${gradientOrientation}deg${colorsAsString})`;
    };

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (showColorModal) {
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const { clientX } = event.nativeEvent;

        const sliderLeft = rect.x;

        const relativeMouseX = clientX - sliderLeft;

        const points = colors.map(({ position }) => (position * rect.width) / 100);
        const isTouchingABreakpoint = points.find((p) => !!(p - 4 < relativeMouseX && p + 12 > relativeMouseX));

        if (!isTouchingABreakpoint) {
            setAddButtonPosition({ left: relativeMouseX - 16 / 2, top: 9 });
            setShowAddButton(true);
        }
    };

    useEffect(() => {
        if (!gradientColors || !gradientColors?.length) {
            setBlockSettings({
                gradientColors: emptyStateColors,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gradientColors]);

    useEffect(() => {
        setBlockSettings({
            gradientColors: colors,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gradientOrientation, colors]);

    return (
        <div data-test-id="gradient-block" ref={gradientBlockRef}>
            <div className="tw-border tw-border-line-strong tw-rounded tw-p-0.5">
                <div
                    className="tw-w-full tw-h-4 tw-rounded"
                    style={{
                        height: gradientBlockHeight,
                        background: parseGradientColorsToCss(),
                    }}
                />
            </div>
            {isEditing ? (
                <div>
                    <div className="tw-relative">
                        <div onMouseOver={handleMouseMove} onMouseLeave={() => setShowAddButton(false)}>
                            <Divider height={DividerHeight.Small} style={DividerStyle.Solid} />
                            {showAddButton && gradientBlockRef.current ? (
                                <AddColorButton
                                    blockWidth={gradientBlockRef.current.clientWidth}
                                    addButtonPosition={addButtonPosition}
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
                            setColors={setColors}
                            setShowColorModal={setShowColorModal}
                        />
                    ) : null}

                    {gradientColors?.map((gradientColor) => (
                        <ColorTooltip
                            key={toHexString(gradientColor.color) + gradientColor.position}
                            gradientColor={gradientColor}
                            gradientColors={gradientColors}
                            setColors={setColors}
                            setShowColorModal={setShowColorModal}
                            setCurrentlyEditingPosition={setCurrentlyEditingPosition}
                        />
                    ))}
                </div>
            ) : (
                <>
                    {gradientBlockRef.current && gradientColors ? (
                        <SquareBadges
                            blockWidth={gradientBlockRef.current.clientWidth}
                            gradientColors={gradientColors}
                            gradientOrientation={gradientOrientation}
                        />
                    ) : null}
                </>
            )}

            {displayCss ? <CssValueDisplay cssValue={parseGradientColorsToCss()} /> : null}
        </div>
    );
};
