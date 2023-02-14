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

export const GradientBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
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
        </div>
    );
};
