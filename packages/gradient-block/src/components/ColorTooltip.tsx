/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip, TooltipAlignment, TooltipPosition } from '@frontify/fondue';

import { EditAndDeleteColorBox } from './';
import { ColorTooltipProps } from '../types';

export const ColorTooltip = ({
    color,
    gradientColors,
    setColors,
    setShowColorModal,
    setCurrentlyEditingPosition,
}: ColorTooltipProps) => {
    return (
        <div className="tw-absolute" style={{ left: `${color.position}%` }}>
            <Tooltip
                alignment={TooltipAlignment.Middle}
                content={
                    <>
                        <span
                            className="tw-absolute tw-top-1 tw-left-1 tw-right-1 tw-bottom-1"
                            style={{
                                backgroundColor: color.hex,
                            }}
                        ></span>
                        <EditAndDeleteColorBox
                            color={color}
                            gradientColors={gradientColors}
                            setColors={setColors}
                            setShowColorModal={setShowColorModal}
                            setCurrentlyEditingPosition={setCurrentlyEditingPosition}
                        />
                    </>
                }
                open
                position={TooltipPosition.Bottom}
                triggerElement={
                    <div className="tw-absolute tw-w-2 tw-h-2 tw-rounded-full tw-bg-line-x-strong tw-mt-[-22px] tw-bg-[#CCCCCC]"></div>
                }
                withArrow
            />
        </div>
    );
};
