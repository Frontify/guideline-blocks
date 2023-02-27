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

const emptyStateColors = [
    {
        hex: '#F1F1F1',
        name: 'Light gray',
        position: 0,
    },
    {
        hex: '#FFFFFF',
        name: 'White',
        position: 100,
    },
];

export const GradientBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const gradientBlockRef = useRef<HTMLDivElement>(null);
    const [showAddButton, setShowAddButton] = useState(false);
    const [currentlyEditingColor, setCurrentlyEditingColor] = useState<string>();

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
    const [currentColor, setCurrentColor] = useState<Color | null>(null);
    const [currentColorPosition, setCurrentColorPosition] = useState<number>();
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
                colorsAsString += `, ${color.hex} ${color.position}%`;
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
            {!isEditing && (
                <div className="tw-pt-2">
                    {gradientColors?.map((color, index) => (
                        <SquareBadge
                            key={color.hex + color.position}
                            index={index}
                            lastIndex={lastIndex}
                            color={color}
                        />
                    ))}
                </div>
            )}
            {isEditing && (
                <div>
                    <div className="tw-relative">
                        <div onMouseOver={handleMouseMove} onMouseLeave={handleMouseLeave}>
                            <Divider height={DividerHeight.Small} style={DividerStyle.Solid} />
                            {showAddButton && (
                                <AddColorButton
                                    ref={gradientBlockRef}
                                    addButtonPosition={addButtonPosition}
                                    setShowColorModal={setShowColorModal}
                                    setCurrentColorPosition={setCurrentColorPosition}
                                />
                            )}
                        </div>
                        {showColorModal && gradientColors !== undefined && (
                            <ColorPicker
                                editing={false}
                                color={null}
                                currentColor={currentColor}
                                currentColorPosition={currentColorPosition}
                                setColors={setColors}
                                setCurrentColor={setCurrentColor}
                                setCurrentColorPosition={setCurrentColorPosition}
                                setShowColorModal={setShowColorModal}
                                gradientColors={gradientColors}
                                setCurrentlyEditingColor={setCurrentlyEditingColor}
                            />
                        )}
                    </div>

                    {gradientColors?.map((color) => (
                        <ColorTooltip
                            key={color.hex + color.position}
                            color={color}
                            currentColor={currentColor}
                            currentColorPosition={currentColorPosition}
                            currentlyEditingColor={currentlyEditingColor}
                            gradientColors={gradientColors}
                            showColorModal={showColorModal}
                            setColors={setColors}
                            setShowColorModal={setShowColorModal}
                            setCurrentColor={setCurrentColor}
                            setCurrentColorPosition={setCurrentColorPosition}
                            setCurrentlyEditingColor={setCurrentlyEditingColor}
                        />
                    ))}
                </div>
            )}
            {displayCss && contentValue ? <CssValueDisplay cssValue={contentValue} /> : null}
        </div>
    );
};
