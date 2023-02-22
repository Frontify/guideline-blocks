/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';
import '@frontify/fondue-tokens/styles';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    Button,
    ButtonEmphasis,
    ButtonRounding,
    ButtonSize,
    ButtonStyle,
    ButtonType,
    Color,
    Divider,
    DividerStyle,
    IconPen,
    IconPlus,
    IconSize,
    IconTrashBin,
    Tooltip,
    TooltipAlignment,
    TooltipPosition,
    debounce,
} from '@frontify/fondue';
import 'tailwindcss/tailwind.css';
import {
    ColorSquarePositionType,
    GradientColor,
    Settings,
    gradientHeightValues,
    gradientOrientationValues,
} from './types';
import { HEIGHT_DEFAULT_VALUE, ORIENTATION_DEFAULT_VALUE } from './settings';
import { joinClassNames } from '@frontify/guideline-blocks-shared';

import { hex2rgba } from './helpers';
import { ColorPicker, CssValueDisplay, SquareBadge } from './components';

const ADD_BUTTON_SIZE_PX = 17;
const BUFFER_PX = 10;

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
    const dividerRef = useRef<HTMLDivElement>(null);
    const addRef = useRef<HTMLDivElement>(null);
    const [isCopied, setIsCopied] = useState(false);
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
    // const [colors, setColors] = useState<GradientColor[]>(emptyStateColors);
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

    const handleCopy = async () => {
        await navigator.clipboard.writeText(contentValue || '');
        setIsCopied(true);
        debounce(() => {
            setIsCopied(false);
        }, 2000)();
    };

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!dividerRef.current || showColorModal) {
                return;
            }

            const rect = dividerRef.current.getBoundingClientRect();

            debounce(() => {
                const { clientX: mouseX, clientY: mouseY } = event;

                const sliderLeft = rect.x;
                const sliderRight = rect.x + rect.width;

                const relativeMouseX = mouseX - sliderLeft;

                const sliderTop = rect.height / 2 + rect.top - BUFFER_PX;
                const sliderBottom = rect.height / 2 + rect.top + BUFFER_PX;

                const isWithinWidth = mouseX >= sliderLeft && mouseX <= sliderRight;
                const isWithinHeight = mouseY >= sliderTop && mouseY <= sliderBottom;

                const percentages = colors.map((color) => color.position);

                const points = percentages.map((p) => (p * rect.width) / 100);
                const isTouchingABreakpoint = points.find((p) => !!(p - 4 < relativeMouseX && p + 12 > relativeMouseX));

                if (isWithinWidth && isWithinHeight && !isTouchingABreakpoint) {
                    setAddButtonPosition({ left: relativeMouseX - ADD_BUTTON_SIZE_PX / 2, top: 9 });
                    setShowAddButton(true);
                } else {
                    setShowAddButton(false);
                }
            }, 50)();
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showColorModal]);

    useEffect(() => {
        const defaultGradientColors = [
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

        if (!gradientColors || !gradientColors?.length) {
            setBlockSettings({
                gradientColors: defaultGradientColors,
            });
        }
    });

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

    const deleteColor = (color: GradientColor) => {
        const newGradientColors = colors.filter((item) => {
            if (item.hex === color.hex) {
                return true;
            }
            return false;
        });

        setColors(newGradientColors);
    };

    const handleAdd = (position: number) => {
        if (!gradientBlockRef.current) {
            return;
        }
        setShowColorModal(true);
        setCurrentColorPosition((position / gradientBlockRef?.current?.getBoundingClientRect().width) * 100);
    };

    const AddButton = () => {
        return (
            <div
                ref={addRef}
                data-test-id="gradient-add"
                className={joinClassNames([
                    'tw-absolute',
                    `tw-h-[${ADD_BUTTON_SIZE_PX}px] tw-w-[${ADD_BUTTON_SIZE_PX}px]`,
                    'tw-bg-box-selected-strong tw-flex tw-items-center tw-justify-center tw-rounded-[3px] tw-cursor-pointer',
                ])}
                style={{ ...addButtonPosition }}
            >
                <span
                    className="tw-text-white tw-h-[17px] tw-w-[17px] tw-flex tw-justify-center tw-items-center tw-pt-[1px]"
                    onClick={() => handleAdd(addButtonPosition.left)}
                >
                    <IconPlus size={IconSize.Size12} />
                </span>
            </div>
        );
    };

    const EditAndDeleteBox = ({ color }: { color: GradientColor }) => {
        return (
            <div className="tw-absolute tw-flex tw-bg-base tw-border tw-border-box-selected-strong tw-rounded tw-w-[63px] tw-h-7 tw-top-[40px] tw-left-[-15px]">
                <Button
                    emphasis={ButtonEmphasis.Strong}
                    hugWidth
                    inverted
                    onClick={() => {
                        setCurrentlyEditingColor(color.hex);
                        setShowColorModal(true);
                        setCurrentColor(hex2rgba(color.hex) as Color);
                    }}
                    rounding={ButtonRounding.Medium}
                    size={ButtonSize.Small}
                    solid
                    style={ButtonStyle.Default}
                    type={ButtonType.Button}
                >
                    <IconPen size={IconSize.Size12} />
                </Button>

                <Button
                    emphasis={ButtonEmphasis.Strong}
                    hugWidth
                    inverted
                    onClick={() => {
                        deleteColor(color);
                    }}
                    rounding={ButtonRounding.Medium}
                    size={ButtonSize.Small}
                    solid
                    style={ButtonStyle.Default}
                    type={ButtonType.Button}
                >
                    <IconTrashBin size={IconSize.Size12} />
                </Button>

                {showColorModal && currentlyEditingColor === color.hex && (
                    <ColorPicker
                        editing={isEditing}
                        color={color}
                        colors={colors}
                        currentColor={currentColor}
                        currentColorPosition={currentColorPosition}
                        setColors={setColors}
                        setCurrentColor={setCurrentColor}
                        setCurrentColorPosition={setCurrentColorPosition}
                        setShowColorModal={setShowColorModal}
                        addRef={addRef}
                        gradientColors={gradientColors}
                        setCurrentlyEditingColor={setCurrentlyEditingColor}
                    />
                )}
            </div>
        );
    };

    return (
        <div data-test-id="gradient-block" ref={gradientBlockRef}>
            <div className="tw-border tw-border-line-strong tw-rounded-[4px] tw-p-[1px]">
                <div
                    className="tw-w-full tw-h-4 tw-rounded-[3px]"
                    style={{
                        height: gradientBlockHeight,
                        background: contentValue,
                    }}
                ></div>
            </div>
            {!isEditing && (
                <div className="tw-pt-[9px]">
                    {gradientColors?.map((color, index) => (
                        <>
                            {index === 0 && (
                                <div key={index} className="tw-absolute" style={{ left: 0 }}>
                                    <SquareBadge color={color} handleCopy={handleCopy} />
                                </div>
                            )}
                            {index !== 0 && index !== lastIndex && (
                                <div key={index} className="tw-absolute" style={{ left: `${color.position}%` }}>
                                    <SquareBadge color={color} handleCopy={handleCopy} />
                                </div>
                            )}
                            {index === lastIndex && (
                                <div key={index} className="tw-absolute" style={{ right: 0 }}>
                                    <SquareBadge
                                        color={color}
                                        colorSquarePosition={ColorSquarePositionType.Right}
                                        handleCopy={handleCopy}
                                    />
                                </div>
                            )}
                        </>
                    ))}
                </div>
            )}
            {isEditing && (
                <div>
                    <div className="tw-relative" ref={dividerRef}>
                        <Divider height="36px" style={DividerStyle.Solid} />
                        {showAddButton && <AddButton />}
                        {showColorModal && addRef.current && (
                            <ColorPicker
                                editing={isEditing}
                                color={null}
                                colors={colors}
                                currentColor={currentColor}
                                currentColorPosition={currentColorPosition}
                                setColors={setColors}
                                setCurrentColor={setCurrentColor}
                                setCurrentColorPosition={setCurrentColorPosition}
                                setShowColorModal={setShowColorModal}
                                addRef={addRef}
                                gradientColors={gradientColors}
                                setCurrentlyEditingColor={setCurrentlyEditingColor}
                            />
                        )}
                    </div>

                    {gradientColors?.map((color, index) => (
                        <>
                            {index === 0 && (
                                <div key={index} className="tw-absolute" style={{ left: 0 }}>
                                    <Tooltip
                                        key={index}
                                        alignment={TooltipAlignment.Middle}
                                        content={
                                            <>
                                                <div
                                                    className={joinClassNames([
                                                        'tw-absolute tw-top-[4px] tw-left-[4px] tw-right-[4px] tw-bottom-[4px] tw-z-[100]',
                                                    ])}
                                                    style={{
                                                        backgroundColor: color.hex,
                                                    }}
                                                ></div>
                                                <EditAndDeleteBox color={color} />
                                            </>
                                        }
                                        heading=""
                                        open
                                        position={TooltipPosition.Bottom}
                                        triggerElement={
                                            <div
                                                className={joinClassNames([
                                                    'tw-absolute tw-w-2 tw-h-2 tw-rounded-full tw-bg-line-x-strong tw-mt-[-22px] tw-bg-[#CCCCCC]',
                                                ])}
                                            ></div>
                                        }
                                        withArrow
                                    />
                                </div>
                            )}
                            {index !== 0 && index !== lastIndex && (
                                <div key={index} className="tw-absolute" style={{ left: `${color.position}%` }}>
                                    <Tooltip
                                        key={index}
                                        alignment={TooltipAlignment.Middle}
                                        content={
                                            <>
                                                <div
                                                    className={joinClassNames([
                                                        'tw-absolute tw-top-[4px] tw-left-[4px] tw-right-[4px] tw-bottom-[4px] tw-z-[100]',
                                                    ])}
                                                    style={{
                                                        backgroundColor: color.hex,
                                                    }}
                                                ></div>
                                                <EditAndDeleteBox color={color} />
                                            </>
                                        }
                                        heading=""
                                        open
                                        position={TooltipPosition.Bottom}
                                        triggerElement={
                                            <div
                                                className={joinClassNames([
                                                    'tw-absolute tw-w-2 tw-h-2 tw-rounded-full tw-bg-line-x-strong tw-mt-[-22px] tw-bg-[#CCCCCC]',
                                                ])}
                                            ></div>
                                        }
                                        withArrow
                                    />
                                </div>
                            )}
                            {index === lastIndex && (
                                <div key={index} className="tw-absolute" style={{ right: 5 }}>
                                    <Tooltip
                                        key={index}
                                        alignment={TooltipAlignment.Middle}
                                        content={
                                            <>
                                                <div
                                                    className={joinClassNames([
                                                        'tw-absolute tw-top-[4px] tw-left-[4px] tw-right-[4px] tw-bottom-[4px] tw-z-[100]',
                                                    ])}
                                                    style={{
                                                        backgroundColor: color.hex,
                                                    }}
                                                ></div>
                                                <EditAndDeleteBox color={color} />
                                            </>
                                        }
                                        heading=""
                                        position={TooltipPosition.Bottom}
                                        open
                                        triggerElement={
                                            <div
                                                className={joinClassNames([
                                                    'tw-absolute tw-w-2 tw-h-2 tw-rounded-full tw-bg-line-x-strong tw-mt-[-22px] tw-bg-[#CCCCCC]',
                                                ])}
                                            ></div>
                                        }
                                        withArrow
                                    />
                                </div>
                            )}
                        </>
                    ))}
                </div>
            )}
            {displayCss ? (
                <CssValueDisplay cssValue={contentValue} handleCopy={handleCopy} isCopied={isCopied} />
            ) : null}
        </div>
    );
};
