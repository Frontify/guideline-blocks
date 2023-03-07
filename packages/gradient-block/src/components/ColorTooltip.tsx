/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toHexString } from '@frontify/guideline-blocks-shared';
import { EditAndDeleteColorBox } from './';
import { ColorTooltipProps } from '../types';

export const ColorTooltip = ({
    gradientColor,
    gradientColors,
    showColorModal,
    setColors,
    setShowColorModal,
    setCurrentlyEditingPosition,
}: ColorTooltipProps) => {
    const left = gradientColor.position > 95 ? `calc(${gradientColor.position}% - 8px)` : `${gradientColor.position}%`;

    return (
        <div className="tw-absolute tw-group tw-z-10" style={{ left }}>
            <div
                data-test-id="color-points"
                className="tw-w-2 tw-h-2 tw-rounded-full tw- tw-bg-line-x-strong -tw-mt-[22px] tw-bg-black-20 group-hover:tw-bg-black-100"
            />

            <div
                data-test-id="color-tooltip"
                role="tooltip"
                className="tw-inline-block tw-mt-2.5 -tw-ml-1 tw-invisible group-hover:tw-visible"
            >
                <div className="tw-absolute before:tw-z-1000 tw-w-2 tw-h-2 tw-left-0 tw-pointer-events-none -tw-top-[11px] before:tw-absolute before:tw-bg-white before:tw-w-2 before:tw-h-2 before:tw-border-box-selected-strong before:tw-rotate-45 before:tw-border before:tw-border-line before:tw-border-b-0 before:tw-border-r-0" />

                <div className="tw-w-4 tw-h-4 tw-rounded tw-outline tw-outline-1 tw-outline-offset-2 tw-outline-box-selected-inverse">
                    <div
                        className="tw-absolute tw-w-4 tw-h-4 tw-rounded"
                        style={{
                            backgroundColor: toHexString(gradientColor.color),
                        }}
                    />
                </div>
                {!showColorModal ? (
                    <EditAndDeleteColorBox
                        color={gradientColor}
                        gradientColors={gradientColors}
                        setColors={setColors}
                        setShowColorModal={setShowColorModal}
                        setCurrentlyEditingPosition={setCurrentlyEditingPosition}
                    />
                ) : null}
            </div>
        </div>
    );
};
