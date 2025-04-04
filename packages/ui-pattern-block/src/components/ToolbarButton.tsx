/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { Button, ButtonEmphasis, ButtonSize, LegacyTooltip, TooltipPosition } from '@frontify/fondue';

interface Props {
    icon?: ReactElement;
    tooltip: string;
    onClick?: () => void;
    triggerElement?: ReactElement;
}

export const ToolbarButton = ({ icon, tooltip, onClick, triggerElement }: Props): ReactElement => {
    return (
        <LegacyTooltip
            data-test-id="toolbar-icon-btn"
            content={<div className="tw-min-w-[70px] tw-text-center">{tooltip}</div>}
            position={TooltipPosition.Top}
            hoverDelay={75}
            enterDelay={75}
            withArrow
            triggerElement={
                triggerElement ?? (
                    <Button
                        aria-label={tooltip}
                        onClick={onClick}
                        icon={icon}
                        size={ButtonSize.Small}
                        emphasis={ButtonEmphasis.Weak}
                    />
                )
            }
        />
    );
};
