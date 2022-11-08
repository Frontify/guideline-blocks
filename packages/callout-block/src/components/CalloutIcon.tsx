/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconInfo20, IconLightbulb20, IconMegaphone20 } from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { ReactElement } from 'react';
import { Icon } from '../types';

type CalloutIconProps = {
    iconType: Icon;
    hasValue: boolean;
    iconUrl?: string;
};
export const CalloutIcon = ({ iconType, hasValue, iconUrl }: CalloutIconProps) => (
    <>
        {iconType === Icon.None || (iconType === Icon.Custom && !iconUrl) ? null : (
            <div
                className={joinClassNames([
                    hasValue ? 'tw-opacity-100' : 'tw-opacity-30',
                    'tw-mr-2 tw-w-6 tw-h-full tw-flex tw-justify-center tw-items-center',
                ])}
            >
                {calloutIconMap(iconUrl)[iconType]}
            </div>
        )}
    </>
);

export const calloutIconMap = (iconUrl?: string): Record<Icon, ReactElement> => ({
    none: <></>,
    info: <IconInfo20 />,
    lightbulb: <IconLightbulb20 />,
    megaphone: <IconMegaphone20 />,
    custom: <img data-test-id="callout-icon" alt="Callout icon" src={iconUrl} />,
});
