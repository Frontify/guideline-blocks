/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretLeft16, IconCaretLeft32, IconCaretRight16, IconCaretRight32 } from '@frontify/fondue';
import { isDark, joinClassNames, toRgbaString } from '@frontify/guideline-blocks-shared';
import { CSSProperties } from 'react';

import { Alignment, Handle, HandleProps } from '../../types';

export const SliderLine = ({ handle, alignment, sliderColor, sliderStyle, sliderWidth }: HandleProps) => {
    const getSliderStyle = () => {
        return alignment === Alignment.Horizontal
            ? {
                  borderLeftWidth: sliderWidth,
                  borderLeftColor: toRgbaString(sliderColor),
                  borderLeftStyle: sliderStyle as unknown,
                  outline: `1px solid ${isDark(sliderColor) ? 'white' : 'black'}`,
              }
            : {
                  borderTopWidth: sliderWidth,
                  borderTopColor: toRgbaString(sliderColor),
                  borderTopStyle: sliderStyle as unknown,
                  outline: `1px solid ${isDark(sliderColor) ? 'white' : 'black'}`,
              };
    };

    const getHandleComponent = () => {
        switch (handle) {
            case Handle.Circles: {
                return (
                    <div
                        className="tw-flex"
                        style={{
                            color: toRgbaString(sliderColor),
                            gap: sliderWidth,
                        }}
                    >
                        <div
                            className={joinClassNames([
                                `${isDark(sliderColor) ? 'tw-bg-white/[.8]' : 'tw-bg-black/[.7]'}`,
                                'tw-h-[22px] tw-w-[22px] tw-flex tw-justify-center tw-items-center tw-pr-[2px] tw-rounded-full tw-mr-1',
                            ])}
                        >
                            <IconCaretLeft16 />
                        </div>
                        <div
                            className={joinClassNames([
                                `${isDark(sliderColor) ? 'tw-bg-white/[.8]' : 'tw-bg-black/[.7]'}`,
                                'tw-h-[22px] tw-w-[22px] tw-flex tw-justify-center tw-items-center tw-pl-[2px] tw-rounded-full tw-ml-1',
                            ])}
                        >
                            <IconCaretRight16 />
                        </div>
                    </div>
                );
            }
            case Handle.Arrows: {
                return (
                    <div
                        className={joinClassNames([
                            isDark(sliderColor) ? '[&_path]:tw-stroke-white' : '[&_path]:tw-stroke-black/[.7]',
                            'tw-flex [&_path]:tw-stroke-[3px]',
                        ])}
                        style={{
                            color: toRgbaString(sliderColor),
                            gap: sliderWidth,
                            paintOrder: 'stroke',
                        }}
                    >
                        <IconCaretLeft32 />
                        <IconCaretRight32 />
                    </div>
                );
            }
            default: {
                return <div />;
            }
        }
    };

    return (
        <div
            className={joinClassNames([
                ' tw-flex tw-justify-center tw-items-center tw-absolute',
                alignment === Alignment.Horizontal
                    ? ' tw-h-full tw-w-[12px] -tw-translate-x-1/2 tw-cursor-ew-resize'
                    : ' tw-w-full tw-h-[12px] -tw-translate-y-1/2 tw-cursor-ns-resize',
            ])}
        >
            <div
                style={{
                    ...(getSliderStyle() as CSSProperties),
                }}
                className={joinClassNames([alignment === Alignment.Horizontal ? 'tw-h-full' : 'tw-w-full'])}
            />
            <div
                className="tw-absolute"
                style={{ transform: `rotate(${alignment === Alignment.Horizontal ? 0 : 90}deg)` }}
            >
                {getHandleComponent()}
            </div>
        </div>
    );
};
