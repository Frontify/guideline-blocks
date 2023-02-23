/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip, TooltipAlignment, TooltipPosition } from '@frontify/fondue';

import { EditAndDeleteColorBox } from './EditAndDeleteColorBox';
import { ColorTooltipProps } from '../types';

export const ColorTooltip = ({
    color,
    colors,
    currentColor,
    currentColorPosition,
    currentlyEditingColor,
    gradientColors,
    showColorModal,
    setColors,
    setShowColorModal,
    setCurrentColorPosition,
    setCurrentColor,
    setCurrentlyEditingColor,
}: ColorTooltipProps) => {
    return (
        <div className="tw-absolute" style={{ left: `${color.position}%` }}>
            <Tooltip
                alignment={TooltipAlignment.Middle}
                content={
                    <>
                        <div
                            className="tw-absolute tw-top-1 tw-left-1 tw-right-1 tw-bottom-1 tw-z-[100]"
                            style={{
                                backgroundColor: color.hex,
                            }}
                        ></div>
                        <EditAndDeleteColorBox
                            color={color}
                            colors={colors}
                            currentColor={currentColor}
                            currentColorPosition={currentColorPosition}
                            currentlyEditingColor={currentlyEditingColor}
                            gradientColors={gradientColors}
                            showColorModal={showColorModal}
                            setColors={setColors}
                            setShowColorModal={setShowColorModal}
                            setCurrentColor={setCurrentColor}
                            setCurrentColorPosition={setCurrentColorPosition}
                            setCurrentlyEditingColor={setCurrentlyEditingColor}
                        />
                    </>
                }
                heading=""
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
