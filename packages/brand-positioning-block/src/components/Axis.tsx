/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames, toHex8String, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { AxisProps } from '../types';
import { borderSettingsToCss } from '../utilities/settingsToCss';

export const Axis = ({ minLabel, maxLabel, orientation, style }: AxisProps) => {
    const { designTokens } = useGuidelineDesignTokens();
    const { labelsColor, lineColor, lineWidth, lineStyle } = style;
    const fontSize = parseFloat(String(designTokens?.imageCaption?.fontSize ?? '0'));
    const lineHeight = parseFloat(String(designTokens?.imageCaption?.lineHeight ?? '0'));
    const labelHeight = fontSize * lineHeight;
    const borderProperty = orientation === 'horizontal' ? 'borderTop' : 'borderLeft';

    return (
        <div
            style={designTokens?.imageCaption}
            className={joinClassNames([
                'tw-flex tw-h-full tw-gap-2 sm:tw-gap-3 tw-items-center tw-whitespace-nowrap',
                orientation === 'vertical' && 'tw-flex-col',
            ])}
        >
            <div
                style={{
                    minWidth: orientation === 'horizontal' ? `${labelHeight}px` : 'auto',
                    color: toHex8String(labelsColor),
                }}
                className={
                    orientation === 'horizontal'
                        ? 'tw-shrink-0 tw-flex tw-items-center tw-justify-center tw-relative'
                        : ''
                }
            >
                <div
                    className={
                        orientation === 'horizontal' ? 'tw-absolute sm:tw-relative -tw-rotate-90 sm:tw-rotate-0' : ''
                    }
                >
                    {orientation === 'horizontal' ? minLabel : maxLabel}
                </div>
            </div>
            <div
                style={{
                    [borderProperty]: borderSettingsToCss(lineWidth, lineStyle, lineColor),
                }}
                className={joinClassNames([
                    orientation === 'horizontal' && 'tw-w-full tw-h-0',
                    orientation === 'vertical' && 'tw-w-0 tw-h-full',
                ])}
            />
            <div
                style={{
                    minWidth: orientation === 'horizontal' ? `${labelHeight}px` : 'auto',
                    color: toHex8String(labelsColor),
                }}
                className={
                    orientation === 'horizontal'
                        ? 'tw-flex tw-shrink-0 tw-items-center tw-justify-center tw-relative'
                        : ''
                }
            >
                <div
                    className={
                        orientation === 'horizontal' ? 'tw-absolute sm:tw-relative tw-rotate-90 sm:tw-rotate-0' : ''
                    }
                >
                    {orientation === 'horizontal' ? maxLabel : minLabel}
                </div>
            </div>
        </div>
    );
};
