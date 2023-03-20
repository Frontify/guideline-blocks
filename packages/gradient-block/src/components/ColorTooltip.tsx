/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames, toHexString } from '@frontify/guideline-blocks-shared';
import { EditAndDeleteColorBox } from './';
import { ColorTooltipProps } from '../types';
import { useHover } from '@react-aria/interactions';

export const ColorTooltip = ({
    gradientColor,
    gradientColors,
    showColorModal,
    setColors,
    setShowColorModal,
    setCurrentlyEditingPosition,
}: ColorTooltipProps) => {
    const left = gradientColor.position > 95 ? `calc(${gradientColor.position}% - 8px)` : `${gradientColor.position}%`;
    const { hoverProps, isHovered } = useHover({});

    return (
        <div className="tw-absolute tw-z-[1]" style={{ left }} {...hoverProps}>
            <div
                data-test-id="color-points"
                className={joinClassNames([
                    'tw-w-2 tw-h-2 tw-rounded-full -tw-mt-[22px]',
                    isHovered ? 'tw-bg-black-100' : 'tw-bg-black-20',
                ])}
            />
            <div
                data-test-id="color-tooltip"
                role="tooltip"
                className={joinClassNames([
                    'tw-inline-block tw-mt-2.5 -tw-ml-1',
                    isHovered ? 'tw-visible' : 'tw-invisible',
                ])}
            >
                <div className="tw-absolute tw-w-2 tw-h-2 tw-left-0 tw-pointer-events-none -tw-top-[11px] before:tw-absolute before:tw-bg-white before:tw-w-2 before:tw-h-2 before:tw-rotate-45 before:tw-border before:tw-border-b-0 before:tw-border-r-0 before:tw-border-box-selected-strong" />

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
