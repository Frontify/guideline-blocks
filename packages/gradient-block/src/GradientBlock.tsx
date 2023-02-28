/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MouseEvent, useEffect, useRef, useState } from 'react';
import '@frontify/fondue-tokens/styles';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { Color, Divider, DividerHeight, DividerStyle } from '@frontify/fondue';
import 'tailwindcss/tailwind.css';
import { GradientColor, Settings, gradientHeightValues, gradientOrientationValues } from './types';
import { HEIGHT_DEFAULT_VALUE, ORIENTATION_DEFAULT_VALUE } from './settings';
import { AddColorButton, ColorPicker, ColorTooltip, CssValueDisplay, SquareBadge } from './components';
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
    const [showAddButton, setShowAddButton] = useState(false);
    const [currentlyEditingPosition, setCurrentlyEditingPosition] = useState(0);

    const {
        gradientColors,
        contentValue,
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

    const [addButtonPosition, setAddButtonPosition] = useState({ left: 0, top: 0 });
    const lastIndex = gradientColors ? gradientColors?.length - 1 : 0;
    const [showColorModal, setShowColorModal] = useState(false);
    const gradientBlockHeight = isHeightCustom
        ? heightCustom
        : gradientHeightValues[heightSimple ?? HEIGHT_DEFAULT_VALUE];

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (showColorModal) {
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const { clientX: mouseX } = event.nativeEvent;

        const sliderLeft = rect.x;

        const relativeMouseX = mouseX - sliderLeft;

        const percentages = colors.map((color) => color.position);

        const points = percentages.map((p) => (p * rect.width) / 100);
        const isTouchingABreakpoint = points.find((p) => !!(p - 4 < relativeMouseX && p + 12 > relativeMouseX));

        if (!isTouchingABreakpoint) {
            setAddButtonPosition({ left: relativeMouseX - 16 / 2, top: 9 });
            setShowAddButton(true);
        }
    };

    const handleMouseLeave = () => {
        setShowAddButton(false);
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
        const parseGradientColorsToString = () => {
            let colorsAsString = '';

            for (const color of colors) {
                colorsAsString += `, ${toHexString(color.color)} ${color.position}%`;
            }

            return `linear-gradient(${gradientOrientation}deg${colorsAsString})`;
        };

        setBlockSettings({
            gradientColors: colors,
            contentValue: parseGradientColorsToString(),
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
                        background: contentValue,
                    }}
                ></div>
            </div>
            {isEditing ? (
                <div>
                    <div className="tw-relative">
                        <div onMouseOver={handleMouseMove} onMouseLeave={handleMouseLeave}>
                            <Divider height={DividerHeight.Small} style={DividerStyle.Solid} />
                            {showAddButton && (
                                <AddColorButton
                                    ref={gradientBlockRef}
                                    addButtonPosition={addButtonPosition}
                                    setShowColorModal={setShowColorModal}
                                    setCurrentlyEditingPosition={setCurrentlyEditingPosition}
                                />
                            )}
                        </div>
                        {showColorModal && gradientColors !== undefined && (
                            <ColorPicker
                                currentlyEditingPosition={currentlyEditingPosition}
                                gradientColors={gradientColors}
                                setColors={setColors}
                                setShowColorModal={setShowColorModal}
                            />
                        )}
                    </div>

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
                <div className="tw-pt-2">
                    {gradientColors?.map((gradientColor, index) => (
                        <SquareBadge
                            key={toHexString(gradientColor.color) + gradientColor.position}
                            index={index}
                            lastIndex={lastIndex}
                            gradientColor={gradientColor}
                        />
                    ))}
                </div>
            )}
            {displayCss && contentValue ? <CssValueDisplay cssValue={contentValue} /> : null}
        </div>
    );
};
