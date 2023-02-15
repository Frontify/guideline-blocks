/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useEffect, useRef, useState } from 'react';
import '@frontify/fondue-tokens/styles';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import {
    Divider,
    DividerStyle,
    IconPlus,
    IconSize,
    Tooltip,
    TooltipAlignment,
    TooltipPosition,
} from '@frontify/fondue';
import 'tailwindcss/tailwind.css';
import { Settings, gradientHeightValues } from './types';
import { HEIGHT_DEFAULT_VALUE } from './settings';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { IconEnum, debounce, iconsMap, merge } from '@frontify/fondue';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';

type GradientBlockColor = {
    hex: string;
    name: string;
    position: string;
};
const ADD_BUTTON_SIZE_PX = 17;
const BUFFER_PX = 10;

export const GradientBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    // TODO - replace with const [contentValue] = useState(blockSettings.content);
    const [contentValue] = useState(
        'background: linear-gradient(0deg, rgb(36, 60, 90), rgb(215, 23, 203), 25.43%, rgb(23, 108, 215) 80.11%);'
    );
    const isEditing = useEditorState(appBridge);
    const dividerRef = useRef<HTMLDivElement>(null);
    const [isCopied, setIsCopied] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);
    const [addButtonPosition, setAddButtonPosition] = useState({ left: 0, top: 0 });
    const [gradientColors, setGradientColors] = useState([
        {
            hex: '#243c5a',
            name: 'Black',
            position: '0%',
        },
        {
            hex: '#d717cb',
            name: 'Hot pink',
            position: '25.43%',
        },
        {
            hex: '#176cd7',
            name: 'Electric blue',
            position: '80.11%',
        },
    ]);
    const lastIndex = gradientColors.length - 1;

    const height = blockSettings.isHeightCustom
        ? blockSettings.heightCustom
        : gradientHeightValues[blockSettings.heightSimple ?? HEIGHT_DEFAULT_VALUE];

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

    const handleMouseMove = (event: MouseEvent) => {
        if (!dividerRef.current) {
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

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

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
                    value={contentValue}
                    extensions={[langs['css']()]}
                    readOnly={!isEditing}
                    basicSetup={{
                        highlightActiveLineGutter: false,
                        highlightActiveLine: false,
                    }}
                    placeholder={contentValue ? '' : '<add colors to generate CSS code>'}
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
        color: GradientBlockColor;
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
    const AddButton = (
        <div
            data-test-id="gradient-add"
            className={joinClassNames([
                'tw-absolute',
                `tw-h-[${ADD_BUTTON_SIZE_PX}px] tw-w-[${ADD_BUTTON_SIZE_PX}px]`,
                'tw-bg-box-selected-strong tw-flex tw-items-center tw-justify-center tw-rounded-sm',
            ])}
            style={{ ...addButtonPosition }}
        >
            <span className="tw-text-white tw-pt-[1px]">
                <IconPlus size={IconSize.Size12} />
            </span>
        </div>
    );

    return (
        <div data-test-id="gradient-block">
            <div
                className="tw-bg-gradient-to-r tw-from-[#243c5a] tw-via-[#d717cb_25.43%] tw-to-[#176cd7_80.11%] tw-w-full tw-h-4"
                style={{
                    height,
                }}
            ></div>
            {!isEditing && (
                <div className="tw-pt-[9px]">
                    {gradientColors.map((color, index) => (
                        <>
                            {index === 0 && (
                                <div key={index} className="tw-absolute" style={{ left: 0 }}>
                                    <SquareBadge color={color}></SquareBadge>
                                </div>
                            )}
                            {index !== 0 && index !== lastIndex && (
                                <div key={index} className="tw-absolute" style={{ left: color.position }}>
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
                        {showAddButton && AddButton}
                    </div>
                    {gradientColors.map((color, index) => (
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
                                <div key={index} className="tw-absolute" style={{ left: color.position }}>
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
