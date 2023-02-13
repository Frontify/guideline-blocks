/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import { useEffect, useRef, useState } from 'react';
import { AxisProps } from '../types';

export const HorizontalAxis = ({}: AxisProps) => {
    const { designTokens } = useGuidelineDesignTokens();
    const [labelWidth, setLabelWidth] = useState<string | number>('auto');

    const labelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        /**
         * Labels are rotated 90 degrees on mobile screen.
         * This is needed to calculate the new width of the labels after rotated.
         */
        const handleWindowResize = () => {
            if (window.innerWidth <= 600 && labelRef.current) {
                const { width } = labelRef.current.getBoundingClientRect();
                setLabelWidth(width);
            } else {
                if (labelWidth !== 'auto') {
                    setLabelWidth('auto');
                }
            }
        };
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, [labelWidth]);

    return (
        <div
            style={designTokens?.imageCaption}
            className="tw-flex tw-h-full tw-gap-3 tw-items-center tw-whitespace-nowrap"
        >
            <div
                style={{
                    width: labelWidth,
                }}
                className="tw-flex tw-items-center tw-justify-center tw-relative"
            >
                <div ref={labelRef} className="tw-absolute sm:tw-relative -tw-rotate-90 sm:tw-rotate-0">
                    Low price
                </div>
            </div>
            <div className="tw-w-full tw-h-[1px] tw-bg-line" />
            <div
                style={{
                    width: labelWidth,
                }}
                className="tw-flex tw-items-center tw-justify-center tw-relative"
            >
                <div className="tw-absolute sm:tw-relative tw-rotate-90 sm:tw-rotate-0">High price</div>
            </div>
        </div>
    );
};
