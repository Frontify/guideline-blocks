import React, { ReactElement, useRef } from 'react';

export type ProgressBarProps = {
    trackColor: string;
    fillColor: string;
    percentage: number;
};

export default function ProgressBar({ trackColor, fillColor, percentage }: ProgressBarProps): ReactElement {
    const outerRef = useRef();

    return (
        <div className="tw-relative tw-w-1/4 tw-h-2" style={{ backgroundColor: trackColor }} ref={outerRef}>
            <div
                className="tw-absolute tw-duration-200 tw-top-0 tw-left-0 tw-bottom-0"
                style={{ backgroundColor: fillColor, width: `${percentage}%` }}
            ></div>
        </div>
    );
}
