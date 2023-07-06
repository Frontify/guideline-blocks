/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';
import { useFocusWithin } from '@react-aria/interactions';
import { joinClassNames, toHexString } from '@frontify/guideline-blocks-shared';
import { ColorTooltipProps } from '../types';
import { EditAndDeleteColorBox } from './';

export const ColorTooltip = ({
    gradientColor,
    gradientColors,
    showColorModal,
    setColors,
    setShowColorModal,
    setCurrentlyEditingPosition,
}: ColorTooltipProps) => {
    const left = gradientColor.position > 95 ? `calc(${gradientColor.position}% - 8px)` : `${gradientColor.position}%`;
    const [isFocusWithin, setFocusWithin] = useState(false);
    const { focusWithinProps } = useFocusWithin({
        onFocusWithinChange: (focused) => {
            setFocusWithin(focused);
        },
    });
    const isActive = showColorModal || isFocusWithin;

    return (
        <div {...focusWithinProps} className="tw-absolute tw-z-[1] tw-group" style={{ left }} tabIndex={0}>
            <div
                data-test-id="color-points"
                className={joinClassNames([
                    'tw-w-2 tw-h-2 tw-rounded-full -tw-mt-[22px] tw-bg-black-20 group-hover:tw-bg-box-selected-strong-hover',
                    isActive && 'tw-bg-box-selected-strong-hover',
                ])}
            />
            <div data-test-id="color-tooltip" role="tooltip" className="tw-inline-block tw-mt-2.5 -tw-ml-1">
                <div
                    className={joinClassNames([
                        'tw-absolute tw-w-2 tw-h-2 tw-left-0 tw-pointer-events-none -tw-top-[11px] before:tw-absolute before:tw-border-black-20 before:tw-bg-white before:tw-w-2 before:tw-h-2 before:tw-rotate-45 before:tw-border before:tw-border-b-0 before:tw-border-r-0 group-hover:before:tw-border-box-selected-strong-hover',
                        isActive && 'before:tw-border-box-selected-strong-hover',
                    ])}
                />

                <div
                    className={joinClassNames([
                        'tw-w-4 tw-h-4 tw-rounded tw-outline tw-outline-1 tw-outline-offset-2 tw-outline-black-20 group-hover:tw-outline-box-selected-inverse',
                        isActive && 'tw-outline-box-selected-inverse',
                    ])}
                >
                    <div
                        className="tw-absolute tw-w-4 tw-h-4 tw-rounded"
                        style={{
                            backgroundColor: toHexString(gradientColor.color),
                        }}
                    />
                </div>

                <EditAndDeleteColorBox
                    color={gradientColor}
                    gradientColors={gradientColors}
                    setColors={setColors}
                    setShowColorModal={setShowColorModal}
                    setCurrentlyEditingPosition={setCurrentlyEditingPosition}
                    shouldShow={isActive}
                />
            </div>
        </div>
    );
};
