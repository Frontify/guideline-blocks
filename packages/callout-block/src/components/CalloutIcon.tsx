/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconInfo20, IconLightbulb20, IconMegaphone20 } from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
import type { ReactNode } from 'react';

import { Icon, Type } from '../types';
import { AppBridgeBlock } from '@frontify/app-bridge';
import { CustomCalloutIcon } from './CustomCalloutIcon';

type CalloutIconProps = {
    iconType: Icon;
    isActive: boolean;
    appBridge: AppBridgeBlock;
    color?: string;
    type: Type;
};
export const CalloutIcon = ({ iconType, isActive, appBridge, color, type }: CalloutIconProps) => {
    const icon = calloutIconMap(appBridge, type)[iconType];

    return (
        <div
            data-test-id="callout-icon-wrapper"
            className={joinClassNames([
                isActive ? 'tw-opacity-100' : 'tw-opacity-30',
                'tw-flex-none',
                // Only apply margin if icon or custom asset is defined
                '[&>*:first-child]:tw-mr-2',
            ])}
            style={{ color }}
        >
            {icon}
        </div>
    );
};

const calloutIconMap = (appBridge: AppBridgeBlock, type: Type): Record<Icon, ReactNode> => ({
    none: null,
    info: <IconInfo20 data-test-id="callout-icon-info" />,
    lightbulb: <IconLightbulb20 />,
    megaphone: <IconMegaphone20 />,
    custom: <CustomCalloutIcon appBridge={appBridge} type={type} />,
});
