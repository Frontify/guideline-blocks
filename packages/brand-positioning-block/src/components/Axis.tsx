/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { AxisProps } from '../types';

export const Axis = ({ minLabel, maxLabel, orientation }: AxisProps) => {
    const { designTokens } = useGuidelineDesignTokens();
    const fontSize = parseFloat(String(designTokens?.imageCaption?.fontSize ?? '0'));
    const lineHeight = parseFloat(String(designTokens?.imageCaption?.lineHeight ?? '0'));
    const labelHeight = fontSize * lineHeight;

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
                className={joinClassNames([
                    'tw-bg-line',
                    orientation === 'horizontal' && 'tw-w-full tw-h-[1px]',
                    orientation === 'vertical' && 'tw-w-[1px] tw-h-full',
                ])}
            />
            <div
                style={{
                    minWidth: orientation === 'horizontal' ? `${labelHeight}px` : 'auto',
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
