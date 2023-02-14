/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { AxisProps } from '../types';

export const Axis = ({ minLabel, maxLabel, orientation }: AxisProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    return (
        <div
            style={designTokens?.imageCaption}
            className={joinClassNames([
                'tw-flex tw-h-full tw-gap-3 tw-items-center tw-whitespace-nowrap',
                orientation === 'vertical' && 'tw-flex-col',
            ])}
        >
            <div
                className={orientation === 'horizontal' ? 'tw-flex tw-items-center tw-justify-center tw-relative' : ''}
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
                className={orientation === 'horizontal' ? 'tw-flex tw-items-center tw-justify-center tw-relative' : ''}
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
