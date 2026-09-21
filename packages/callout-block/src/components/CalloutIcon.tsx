/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset } from '@frontify/app-bridge';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
import { type ReactNode } from 'react';

import { type Icon } from '../types';

import { CustomCalloutIcon } from './CustomCalloutIcon';
import { IconInfo, IconLightbulb, IconMegaphone } from './icons/';

type CalloutIconProps = {
    iconType: Icon;
    isActive: boolean;
    customIcon: Asset | undefined;
    color?: string;
};
export const CalloutIcon = ({ iconType, isActive, customIcon, color }: CalloutIconProps) => {
    const icon = calloutIconMap(customIcon)[iconType];

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

const calloutIconMap = (customIcon: Asset | undefined): Record<Icon, ReactNode> => ({
    none: null,
    info: <IconInfo />,
    lightbulb: <IconLightbulb />,
    megaphone: <IconMegaphone />,
    custom: <CustomCalloutIcon customIcon={customIcon} />,
});
