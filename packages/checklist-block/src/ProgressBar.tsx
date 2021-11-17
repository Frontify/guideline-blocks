import React, { ReactElement, useRef } from 'react';
import { ProgressBarProps } from './types';

export default function ProgressBar({ trackColor, fillColor, percentage }: ProgressBarProps): ReactElement {
    const outerRef = useRef();

    return (
        <div className="tw-relative tw-w-1/2" style={{ backgroundColor: trackColor, height: '20px' }} ref={outerRef}>
            <div
                className="tw-absolute tw-transition tw-transition-width tw-duration-200 tw-top-0 tw-left-0 tw-h-100"
                style={{ backgroundColor: fillColor, width: `${percentage}%`, height: '20px' }}
            ></div>
        </div>
    );
}
