/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FrontifyColor } from '@frontify/app-bridge';
import { Text, Tooltip, TooltipPosition } from '@frontify/fondue';
import { toRgbaString } from '@frontify/guideline-blocks-shared';

import { TooltipContent } from './TooltipContent';
import type { PaletteProps } from './types';

export const Palette = ({ palette }: PaletteProps) => {
    const { name, colors = [] } = palette;

    return (
        <div data-test-id="palette" className="tw-flex tw-flex-col tw-space-y-2">
            <Text color="x-weak">{name}</Text>
            <div className="tw-flex tw-flex-wrap [&>div]:tw-h-6 [&>div:first-child>div]:tw-shadow-inner-line-first [&>div:last-child>div]:tw-shadow-inner-line-last">
                {colors.map((color) => {
                    const colorWithDecimalAlpha: FrontifyColor = {
                        ...color,
                        alpha: color.alpha && parseFloat((color.alpha / 255).toFixed(2)),
                    };

                    if (!color.hex) {
                        return <></>;
                    }

                    return (
                        <Tooltip
                            withArrow
                            key={color.id}
                            hoverDelay={100}
                            position={TooltipPosition.Right}
                            content={<TooltipContent color={color.hex} />}
                            triggerElement={
                                <div className="tw-bg-[url('https://cdn.frontify.com/img/transparent.png')] tw-bg-[length:10px_10px]">
                                    <div
                                        key={color.id}
                                        data-test-id="color"
                                        style={{
                                            backgroundColor: toRgbaString(colorWithDecimalAlpha),
                                        }}
                                        className="tw-w-6 tw-h-6 tw-overflow-hidden tw-shadow-inner-line-y tw-transition-shadow hover:!tw-shadow-inner-line-strong"
                                    />
                                </div>
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};
