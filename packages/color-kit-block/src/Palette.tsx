/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Text, Tooltip, TooltipPosition } from '@frontify/fondue';

import { TooltipContent } from './TooltipContent';
import type { PaletteProps } from './types';

export const Palette = ({ palette }: PaletteProps) => {
    const { name, colors = [] } = palette;

    return (
        <div data-test-id="palette" className="tw-flex tw-flex-col tw-space-y-2">
            <Text color="x-weak">{name}</Text>
            <div className="tw-flex tw-flex-wrap [&>div]:tw-h-6 [&>div:first-child>div]:tw-shadow-inner-line-first [&>div:last-child>div]:tw-shadow-inner-line-last">
                {colors.map(({ id, hex }) => {
                    if (!hex) {
                        return <></>;
                    }

                    return (
                        <Tooltip
                            withArrow
                            key={id}
                            hoverDelay={0}
                            position={TooltipPosition.Right}
                            content={<TooltipContent color={hex} />}
                            triggerElement={
                                <div
                                    key={id}
                                    data-test-id="color"
                                    style={{ backgroundColor: `#${hex}` }}
                                    className="tw-w-6 tw-h-6 tw-inline-block tw-shadow-inner-line-y tw-transition-shadow  hover:tw-shadow-inner-line-strong"
                                />
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};
