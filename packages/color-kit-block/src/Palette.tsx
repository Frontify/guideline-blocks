import { Stack, Text, Tooltip, TooltipPosition } from '@frontify/fondue';

import { TooltipContent } from './TooltipContent';

import { PaletteProps } from './types';

export const Palette = ({ palette }: PaletteProps) => {
    const { name, colors } = palette;
    return (
        <div data-test-id="palette" className="tw-flex tw-flex-col tw-space-y-2">
            <Text color="x-weak">{name}</Text>
            <Stack padding="none" spacing="none">
                {colors.map(({ id, hex }) => {
                    if (!hex) {
                        return <></>;
                    }

                    return (
                        <Tooltip
                            withArrow
                            key={id}
                            hoverDelay={100}
                            position={TooltipPosition.Right}
                            content={<TooltipContent color={hex} />}
                            triggerElement={
                                <div
                                    key={id}
                                    data-test-id={`color-${id}`}
                                    style={{ backgroundColor: hex }}
                                    className="tw-w-6 tw-h-6 tw-inline-block"
                                />
                            }
                        />
                    );
                })}
            </Stack>
        </div>
    );
};
