/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Tooltip } from '@frontify/fondue/components';
import { type ReactElement } from 'react';

interface Props {
    icon?: ReactElement;
    tooltip: string;
    onClick?: () => void;
    triggerElement?: ReactElement;
    ariaExpanded?: boolean;
    ariaControls?: string;
}

export const ToolbarButton = ({
    icon,
    tooltip,
    onClick,
    triggerElement,
    ariaExpanded,
    ariaControls,
}: Props): ReactElement => {
    return (
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id="toolbar-icon-btn" asChild={!triggerElement}>
                {triggerElement ?? (
                    <Button
                        aria-label={tooltip}
                        aria-expanded={ariaExpanded}
                        aria-controls={ariaControls}
                        onPress={onClick}
                        size="small"
                        aspect="square"
                        emphasis="weak"
                    >
                        {icon}
                    </Button>
                )}
            </Tooltip.Trigger>
            <Tooltip.Content>
                <div className="tw-min-w-[70px] tw-text-center">{tooltip}</div>
            </Tooltip.Content>
        </Tooltip.Root>
    );
};
