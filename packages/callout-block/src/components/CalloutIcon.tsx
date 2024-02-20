/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconInfo20, IconLightbulb20, IconMegaphone20 } from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
import type { ReactNode } from 'react';

import { Icon } from '../types';

type CalloutIconProps = {
    iconType: Icon;
    isActive: boolean;
    iconUrl?: string;
    color?: string;
};
export const CalloutIcon = ({ iconType, isActive, iconUrl, color }: CalloutIconProps) => (
    <div
        data-test-id="callout-icon"
        className={joinClassNames([
            isActive ? 'tw-opacity-100' : 'tw-opacity-30',
            'tw-mr-2 tw-w-6 tw-h-full tw-flex tw-justify-center tw-items-center',
        ])}
        style={{ color }}
    >
        {calloutIconMap(iconUrl)[iconType]}
    </div>
);

export const calloutIconMap = (iconUrl?: string): Record<Icon, ReactNode> => ({
    none: null,
    info: <IconInfo20 data-test-id="callout-icon-info" />,
    lightbulb: <IconLightbulb20 />,
    megaphone: <IconMegaphone20 />,
    custom: <img data-test-id="callout-icon-custom" src={iconUrl} alt="custom callout icon" loading="lazy" />,
});
