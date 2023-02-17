/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useEffect, useRef, useState } from 'react';
import '@frontify/fondue-tokens/styles';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    Button,
    ButtonSize,
    Color,
    Divider,
    DividerStyle,
    FlyoutFooter,
    FlyoutPlacement,
    IconCross,
    IconPlus,
    IconSize,
    TextInput,
    Tooltip,
    TooltipAlignment,
    TooltipPosition,
} from '@frontify/fondue';
import 'tailwindcss/tailwind.css';
import { GradientColor, Settings, gradientHeightValues, gradientOrientationValues } from './types';
import { HEIGHT_DEFAULT_VALUE, ORIENTATION_DEFAULT_VALUE } from './settings';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import {
    ButtonEmphasis,
    ButtonStyle,
    ColorPickerFlyout,
    Flyout,
    IconEnum,
    IconQuestionMarkCircle16,
    Text,
    TooltipIcon,
    debounce,
    iconsMap,
    merge,
} from '@frontify/fondue';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { IconSide20 } from '.pnpm/@frontify+fondue@11.3.0_angvksxlvvfhyjj3xhcshgfg2m/node_modules/@frontify/fondue';

const ADD_BUTTON_SIZE_PX = 17;
const BUFFER_PX = 10;

const rgba2hex = (rgba: string, forceRemoveAlpha = false) => {
    return `#${rgba
        .replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
        .split(',') // splits them at ","
        .filter((string, index) => !forceRemoveAlpha || index !== 3)
        .map((string) => parseFloat(string)) // Converts them to numbers
        .map((number, index) => (index === 3 ? Math.round(number * 255) : number)) // Converts alpha to 255 number
        .map((number) => number.toString(16)) // Converts numbers to hex
        .map((string) => (string.length === 1 ? `0${string}` : string)) // Adds 0 when length of one number is 1
        .join('')}`; // Puts the array to togehter to a string
};

export const GradientBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const gradientBlockRef = useRef<HTMLDivElement>();
    const dividerRef = useRef<HTMLDivElement>(null);
    const addRef = useRef<HTMLDivElement>(null);
    const [isCopied, setIsCopied] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);
    const [currentColor, setCurrentColor] = useState<Color | null>(null);
    const [currentColorPosition, setCurrentColorPosition] = useState<number>();
    const [addButtonPosition, setAddButtonPosition] = useState({ left: 0, top: 0 });
    const lastIndex = blockSettings && blockSettings.gradientColors ? blockSettings?.gradientColors?.length - 1 : 0;
    const [showColorModal, setShowColorModal] = useState(false);
    const gradientBlockHeight = blockSettings.isHeightCustom
        ? blockSettings.heightCustom
        : gradientHeightValues[blockSettings.heightSimple ?? HEIGHT_DEFAULT_VALUE];

    // TODO - use this for the 'deg' value
    const gradientOrientation = blockSettings.isOrientationCustom
        ? blockSettings.orientationCustom
        : gradientOrientationValues[blockSettings.orientationSimple ?? ORIENTATION_DEFAULT_VALUE];

    const getCopyButtonText = () =>
        isCopied ? <>{iconsMap[IconEnum.CheckMark16]} Copied</> : <>{iconsMap[IconEnum.Clipboard16]} Copy</>;

    // TODO - use this to update the CSS snippet when gradient changes
    const handleChange = debounce((value: string) => setBlockSettings({ content: value }), 500);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(blockSettings.content || '');
        setIsCopied(true);
        debounce(() => {
            setIsCopied(false);
        }, 2000)();
    };

    const parseGradientColorsToString = (colors: GradientColor[]) => {
        // TODO: make this not hardcoded
        const orientation = 90;
        let colorsAsString = '';

        for (const color of colors) {
            colorsAsString += `, ${color.hex} ${color.position}%`;
        }

        return `linear-gradient(${orientation}deg${colorsAsString})`;
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

                const sliderTop = rect.height / 2 + rect.top - BUFFER_PX;
                const sliderBottom = rect.height / 2 + rect.top + BUFFER_PX;

                const isWithinWidth = mouseX >= sliderLeft && mouseX <= sliderRight;
                const isWithinHeight = mouseY >= sliderTop && mouseY <= sliderBottom;

                if (isWithinWidth && isWithinHeight) {
                    setAddButtonPosition({ left: mouseX - sliderLeft - ADD_BUTTON_SIZE_PX / 2, top: 9 });
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

        if (!blockSettings.gradientColors || !blockSettings.gradientColors?.length) {
            setBlockSettings({
                gradientColors: defaultGradientColors,
            });
        }

        if (!blockSettings.contentValue) {
            setBlockSettings({
                contentValue: parseGradientColorsToString(defaultGradientColors),
            });
        }
    });

    const addNewColor = (color: GradientColor) => {
        const newGradientColors = [...(blockSettings.gradientColors ?? []), color].sort((a, b) => {
            return a.position - b.position;
        });

        setBlockSettings({
            gradientColors: newGradientColors,
            contentValue: parseGradientColorsToString(newGradientColors),
        });
    };

    const CSSBlock = (
        <div
            data-test-id="gradient-css-snippet-block"
            className="tw-mt-8 tw-overflow-hidden tw-border tw-border-line tw-rounded-[4px] tw-text-sm"
            style={{
                fontFamily: 'Courier, monospace',
            }}
        >
            <div className={merge(['tw-relative tw-group/copy CodeMirror-readonly'])}>
                <div
                    data-test-id="gradient-css-snippet-header"
                    className="tw-py-2.5 tw-pl-5 tw-pr-3 tw-bg-black-5 tw-border-b tw-border-black-10 tw-text-s tw-flex tw-justify-between tw-items-center"
                >
                    <span
                        className="tw-text-text-weak"
                        style={{
                            fontFamily: 'Space Grotesk Frontify, sans-serif',
                        }}
                    >
                        CSS
                    </span>
                    <button
                        data-test-id="gradient-css-copy-button"
                        className="tw-items-center tw-justify-end tw-gap-1 tw-flex"
                        onClick={handleCopy}
                    >
                        {getCopyButtonText()}
                    </button>
                </div>
                <CodeMirror
                    theme="light"
                    value={blockSettings.contentValue}
                    extensions={[langs['css']()]}
                    readOnly={!isEditing}
                    basicSetup={{
                        highlightActiveLineGutter: false,
                        highlightActiveLine: false,
                    }}
                    placeholder={blockSettings.contentValue ? '' : '<add colors to generate CSS code>'}
                />
            </div>
        </div>
    );

    enum ColorSquarePositionType {
        Left = 'left',
        Right = 'right',
    }

    const SquareBadge = ({
        color,
        colorSquarePosition = ColorSquarePositionType.Left,
    }: {
        color: GradientColor;
        colorSquarePosition?: ColorSquarePositionType;
    }) => {
        return (
            <div className="tw-flex tw-items-center tw-h-5 tw-bg-base tw-border-line hover:tw-line-box-selected-strong tw-border tw-rounded tw-group">
                {colorSquarePosition === ColorSquarePositionType.Left && (
                    <>
                        <div
                            className="tw-inline-flex tw-w-4 tw-h-4 tw-rounded tw-ml-[1px]"
                            style={{
                                backgroundColor: color.hex,
                            }}
                        ></div>
                        <span className="tw-text-weak tw-pl-[5px] tw-pr-[5px] tw-text-xs">
                            <strong>{color.name}</strong>
                        </span>
                        <span className="tw-text-x-weak tw-text-xs tw-pr-[5px]">{color.hex}</span>
                        <button
                            data-test-id="gradient-css-copy-button"
                            className="tw-inline-flex tw-pr-[4px] tw-items-center tw-justify-end tw-gap-1 tw-flex tw-hidden group-hover:tw-inline-flex"
                            onClick={handleCopy}
                        >
                            {iconsMap[IconEnum.Clipboard16]}
                        </button>
                    </>
                )}

                {colorSquarePosition === ColorSquarePositionType.Right && (
                    <>
                        <button
                            data-test-id="gradient-css-copy-button"
                            className="tw-inline-flex tw-pl-[5px] tw-items-center tw-justify-end tw-gap-1 tw-flex tw-hidden group-hover:tw-inline-flex"
                            onClick={handleCopy}
                        >
                            {iconsMap[IconEnum.Clipboard16]}
                        </button>
                        <span className="tw-text-weak tw-pl-[4px] tw-pr-[5px] tw-text-xs">
                            <strong>{color.name}</strong>
                        </span>
                        <span className="tw-text-x-weak tw-text-xs">{color.hex}</span>
                        <div
                            className="tw-inline-flex tw-w-4 tw-h-4 tw-rounded tw-ml-[5px] tw-mr-[1px]"
                            style={{
                                backgroundColor: color.hex,
                            }}
                        ></div>
                    </>
                )}
            </div>
        );
    };

    const handleAdd = (position: number) => {
        if (!gradientBlockRef.current) {
            return;
        }
        console.log('pos:', position);
        setShowColorModal(true);
        setCurrentColorPosition((position / gradientBlockRef?.current?.getBoundingClientRect().width) * 100);
    };

    const ColorPicker = () => {
        if (!addRef.current) {
            return null;
        }

        return (
            <div className="tw-z-[100]">
                <Flyout
                    // placement={FlyoutPlacement.TopRight}
                    fixedHeader={
                        <div className="tw-flex tw-justify-between tw-items-center tw-font-bold tw-text-s tw-py-3 tw-px-6 tw-bg-white dark:tw-bg-black-95 tw-border-b tw-border-b-black-10">
                            <span>Configure Color</span>
                            <span
                                className="hover:tw-bg-box-neutral-hover hover:tw-cursor-pointer tw-rounded-sm tw-p-[2px] tw-text-strong"
                                onClick={() => setShowColorModal(false)}
                            >
                                <IconCross size={IconSize.Size20} />
                            </span>
                        </div>
                    }
                    fixedFooter={
                        <FlyoutFooter
                            buttons={[
                                {
                                    style: ButtonStyle.Default,
                                    emphasis: ButtonEmphasis.Default,
                                    children: 'Cancel',
                                    // onClick: onCancel,
                                },
                            ]}
                        />
                    }
                    isOpen={true}
                    contentMinHeight={300}
                    onCancel={() => {
                        setShowColorModal(false);
                    }}
                    onConfirm={() => {
                        if (!currentColorPosition) {
                            return;
                        }
                        addNewColor({
                            hex: rgba2hex(
                                `rgba(${currentColor?.red}, ${currentColor?.green}, ${currentColor?.blue}, ${currentColor?.alpha})`
                            ),
                            name: currentColor?.name ?? '',
                            position: currentColorPosition,
                        });
                        setShowColorModal(false);
                        setCurrentColorPosition(undefined);
                    }}
                    onOpenChange={() => true}
                    trigger={null}
                >
                    <div className="tw-flex">
                        <div className="tw-w-full tw-pt-5 tw-pl-6 tw-pr-[40px] ">
                            <Text color="weak">Color</Text>
                            <ColorPickerFlyout
                                clearable
                                currentColor={currentColor}
                                onClose={() => setShowColorModal(false)}
                                onClick={() => console.log('onClick')}
                                onSelect={(color) => setCurrentColor(color)}
                                onClear={() => console.log('onClear')}
                            >
                                {addRef.current}
                            </ColorPickerFlyout>
                            <span className="tw-flex tw-mt-6">
                                <Text color="weak">Stop</Text>
                                <span className="tw-ml-1">
                                    <TooltipIcon
                                        tooltip={{
                                            content: 'Hammertime',
                                        }}
                                        triggerIcon={<IconQuestionMarkCircle16 />}
                                        iconSize={IconSize.Size12}
                                    />
                                </span>
                            </span>
                            <TextInput
                                value="asd"
                                onChange={() => console.log('onChange')}
                                onEnterPressed={() => console.log('onEnterPressed')}
                                placeholder="placeholder"
                            />
                        </div>
                    </div>
                </Flyout>
            </div>
        );
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

    return (
        <div data-test-id="gradient-block" ref={gradientBlockRef}>
            <div className="tw-border tw-border-line-strong tw-rounded-[4px] tw-p-[1px]">
                <div
                    className="tw-w-full tw-h-4 tw-rounded-[3px]"
                    style={{
                        height: gradientBlockHeight,
                        background: blockSettings.contentValue,
                    }}
                ></div>
            </div>
            {!isEditing && (
                <div className="tw-pt-[9px]">
                    {blockSettings?.gradientColors?.map((color, index) => (
                        <>
                            {index === 0 && (
                                <div key={index} className="tw-absolute" style={{ left: 0 }}>
                                    <SquareBadge color={color}></SquareBadge>
                                </div>
                            )}
                            {index !== 0 && index !== lastIndex && (
                                <div key={index} className="tw-absolute" style={{ left: `${color.position}%` }}>
                                    <SquareBadge color={color}></SquareBadge>
                                </div>
                            )}
                            {index === lastIndex && (
                                <div key={index} className="tw-absolute" style={{ right: 0 }}>
                                    <SquareBadge
                                        color={color}
                                        colorSquarePosition={ColorSquarePositionType.Right}
                                    ></SquareBadge>
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
                        {showColorModal && <ColorPicker />}
                    </div>
                    {blockSettings?.gradientColors?.map((color, index) => (
                        <>
                            {index === 0 && (
                                <div key={index} className="tw-absolute" style={{ left: 0 }}>
                                    <Tooltip
                                        key={index}
                                        alignment={TooltipAlignment.Middle}
                                        content={
                                            <div
                                                className={joinClassNames([
                                                    'tw-absolute tw-top-[4px] tw-left-[4px] tw-right-[4px] tw-bottom-[4px] tw-z-[100]',
                                                ])}
                                                style={{
                                                    backgroundColor: color.hex,
                                                }}
                                            ></div>
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
                                            <div
                                                className={joinClassNames([
                                                    'tw-absolute tw-top-[4px] tw-left-[4px] tw-right-[4px] tw-bottom-[4px] tw-z-[100]',
                                                ])}
                                                style={{
                                                    backgroundColor: color.hex,
                                                }}
                                            ></div>
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
                                            <div
                                                className={joinClassNames([
                                                    'tw-absolute tw-top-[4px] tw-left-[4px] tw-right-[4px] tw-bottom-[4px] tw-z-[100]',
                                                ])}
                                                style={{
                                                    backgroundColor: color.hex,
                                                }}
                                            ></div>
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
            {blockSettings.displayCss ? CSSBlock : null}
        </div>
    );
};
