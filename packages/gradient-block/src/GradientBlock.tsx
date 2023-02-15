/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useState } from 'react';
import '@frontify/fondue-tokens/styles';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { Divider, DividerStyle, Tooltip, TooltipAlignment, TooltipPosition } from '@frontify/fondue';
import 'tailwindcss/tailwind.css';
import { Settings, gradientHeightValues } from './types';
import { HEIGHT_DEFAULT_VALUE } from './settings';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { IconEnum, debounce, iconsMap, merge } from '@frontify/fondue';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';

export const GradientBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    // TODO - replace with const [contentValue] = useState(blockSettings.content);
    const [contentValue] = useState(
        'background: linear-gradient(0deg, rgb(36, 60, 90), rgb(215, 23, 203), 25.43%, rgb(23, 108, 215) 80.11%);'
    );
    const isEditing = useEditorState(appBridge);
    const [isCopied, setIsCopied] = useState(false);
    const [gradientColors, setGradientColors] = useState([
        {
            hex: '#243c5a',
            position: '0%',
        },
        {
            hex: '#d717cb',
            position: '25.43%',
        },
        {
            hex: '#176cd7',
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

    return (
        <div data-test-id="gradient-block">
            <div
                className="tw-bg-gradient-to-r tw-from-[#243c5a] tw-via-[#d717cb_25.43%] tw-to-[#176cd7_80.11%] tw-w-full tw-h-4"
                style={{
                    height,
                }}
            ></div>
            {isEditing && (
                <div>
                    <Divider height="36px" style={DividerStyle.Solid} />

                    {gradientColors.map((color, index) => (
                        <>
                            {index === 0 && (
                                <div key={index} className={joinClassNames(['tw-absolute'])} style={{ left: 0 }}>
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
                                <div
                                    key={index}
                                    className={joinClassNames([`tw-left-[${color.position}]`, 'tw-absolute'])}
                                    style={{ left: color.position }}
                                >
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
                                <div key={index} className={joinClassNames(['tw-absolute'])} style={{ right: 5 }}>
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
