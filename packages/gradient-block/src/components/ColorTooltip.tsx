/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip, TooltipAlignment, TooltipPosition } from '@frontify/fondue';
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
    const getLeft = () => {
        if (gradientColor.position > 95) {
            return `calc(${gradientColor.position}% - 8px)`;
        } else {
            return `${gradientColor.position}%`;
        }
    };

    return (
        <div className="tw-absolute tw-z-10" style={{ left: getLeft() }}>
            <Tooltip
                alignment={TooltipAlignment.Middle}
                content={
                    <>
                        <span
                            className="tw-absolute tw-top-1 tw-left-1 tw-right-1 tw-bottom-1 tw-rounded"
                            style={{
                                backgroundColor: toHexString(gradientColor.color),
                            }}
                        />
                        {!showColorModal ? (
                            <EditAndDeleteColorBox
                                color={gradientColor}
                                gradientColors={gradientColors}
                                setColors={setColors}
                                setShowColorModal={setShowColorModal}
                                setCurrentlyEditingPosition={setCurrentlyEditingPosition}
                            />
                        ) : null}
                    </>
                }
                position={TooltipPosition.Bottom}
                triggerElement={
                    <div className="tw-absolute tw-w-2 tw-h-2 tw-rounded-full tw-bg-line-x-strong -tw-mt-[22px] tw-bg-black-20"></div>
                }
                withArrow
            />
        </div>
    );
};
