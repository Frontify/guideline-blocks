/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretLeft, IconCaretRight } from '@frontify/fondue/icons';
import { isDark, joinClassNames, toRgbaString } from '@frontify/guideline-blocks-settings';
import { CSSProperties } from 'react';

import { Alignment, Handle, HandleProps } from '../../types';

export const SliderLine = ({ handle, alignment, sliderColor, sliderStyle, sliderWidth }: HandleProps) => {
    const getSliderStyle = () => {
        return alignment === Alignment.Horizontal
            ? {
                  borderLeftWidth: sliderWidth,
                  borderLeftColor: toRgbaString(sliderColor),
                  borderLeftStyle: sliderStyle as unknown,
              }
            : {
                  borderTopWidth: sliderWidth,
                  borderTopColor: toRgbaString(sliderColor),
                  borderTopStyle: sliderStyle as unknown,
              };
    };

    const getContrastStyle = () => {
        const sliderWidthValue = +sliderWidth?.split('px')[0] || 0;
        return alignment === Alignment.Horizontal
            ? {
                  display: !sliderWidthValue ? 'none' : 'block',
                  width: sliderWidthValue + 2,
                  background: isDark(sliderColor) ? 'white' : 'black',
              }
            : {
                  display: !sliderWidthValue ? 'none' : 'block',
                  height: sliderWidthValue + 2,
                  background: isDark(sliderColor) ? 'white' : 'black',
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
                            <IconCaretLeft size={16} />
                        </div>
                        <div
                            className={joinClassNames([
                                `${isDark(sliderColor) ? 'tw-bg-white/[.8]' : 'tw-bg-black/[.7]'}`,
                                'tw-h-[22px] tw-w-[22px] tw-flex tw-justify-center tw-items-center tw-pl-[2px] tw-rounded-full tw-ml-1',
                            ])}
                        >
                            <IconCaretRight size={16} />
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
                        <IconCaretLeft size={32} />
                        <IconCaretRight size={32} />
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
                'handle',
                'tw-flex tw-justify-center tw-items-center tw-absolute tw-ring-blue',
                alignment === Alignment.Horizontal
                    ? 'tw-top-0 tw-h-full tw-w-3 -tw-translate-x-1/2 tw-cursor-ew-resize'
                    : 'tw-left-0 tw-w-full tw-h-3 -tw-translate-y-1/2 tw-cursor-ns-resize',
            ])}
        >
            <div
                style={getContrastStyle()}
                className={joinClassNames([
                    alignment === Alignment.Horizontal ? 'tw-h-full' : 'tw-w-full',
                    'tw-absolute',
                ])}
            />
            <div
                style={getSliderStyle() as CSSProperties}
                className={joinClassNames([
                    alignment === Alignment.Horizontal ? 'tw-h-full' : 'tw-w-full',
                    'tw-relative',
                ])}
            ></div>
            <div
                className="tw-absolute"
                style={{ transform: `rotate(${alignment === Alignment.Horizontal ? 0 : 90}deg)` }}
            >
                {getHandleComponent()}
            </div>
        </div>
    );
};
