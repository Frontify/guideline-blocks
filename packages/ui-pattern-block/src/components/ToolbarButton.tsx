/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { Button, Tooltip } from '@frontify/fondue/components';

interface Props {
    icon?: ReactElement;
    tooltip: string;
    onClick?: () => void;
    triggerElement?: ReactElement;
}

export const ToolbarButton = ({ icon, tooltip, onClick, triggerElement }: Props): ReactElement => {
    return (
        <Tooltip.Root>
            <Tooltip.Trigger data-test-id="toolbar-icon-btn" asChild={!triggerElement}>
                {triggerElement ?? (
                    <Button aria-label={tooltip} onPress={onClick} size="small" aspect="square" emphasis="weak">
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
