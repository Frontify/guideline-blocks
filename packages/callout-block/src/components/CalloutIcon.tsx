/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconInfo20, IconLightbulb20, IconMegaphone20 } from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
import type { ReactNode } from 'react';

import { Icon } from '../types';
import { AppBridgeBlock } from '@frontify/app-bridge';
import { CustomCalloutIcon } from './CustomCalloutIcon';

type CalloutIconProps = {
    iconType: Icon;
    isActive: boolean;
    appBridge: AppBridgeBlock;
    color?: string;
};
export const CalloutIcon = ({ iconType, isActive, appBridge, color }: CalloutIconProps) => {
    const icon = calloutIconMap(appBridge)[iconType];

    return icon ? (
        <div
            data-test-id="callout-icon"
            className={joinClassNames([
                isActive ? 'tw-opacity-100' : 'tw-opacity-30',
                'tw-mr-2 tw-w-6 tw-h-full tw-flex tw-justify-center tw-items-center',
            ])}
            style={{ color }}
        >
            {icon}
        </div>
    ) : null;
};

export const calloutIconMap = (appBridge: AppBridgeBlock): Record<Icon, ReactNode> => ({
    none: null,
    info: <IconInfo20 data-test-id="callout-icon-info" />,
    lightbulb: <IconLightbulb20 />,
    megaphone: <IconMegaphone20 />,
    custom: <CustomCalloutIcon appBridge={appBridge} />,
});
