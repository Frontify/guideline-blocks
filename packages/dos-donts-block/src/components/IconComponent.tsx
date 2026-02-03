/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconCheckMarkCircle, IconCross, IconCrossCircle } from '@frontify/fondue/icons';
import { useEffect, useState } from 'react';

import { DoDontType, type IconComponentProps, ItemIconChoice } from '../types';

const ICON_MAP = {
    [ItemIconChoice.CHECKMARK]: IconCheckMark,
    [ItemIconChoice.CHECKMARK_CIRCLE]: IconCheckMarkCircle,
    [ItemIconChoice.CROSS]: IconCross,
    [ItemIconChoice.CROSS_CIRCLE]: IconCrossCircle,
};

const IconComponent = ({
    doIconAsset,
    doIconChoice,
    dontIconAsset,
    dontIconChoice,
    hasCustomDoIcon,
    hasCustomDontIcon,
    type,
}: IconComponentProps) => {
    const iconAsset = type === DoDontType.Do ? doIconAsset : dontIconAsset;
    const iconChoice = type === DoDontType.Do ? doIconChoice : dontIconChoice;
    const hasCustomIcon = type === DoDontType.Do ? hasCustomDoIcon : hasCustomDontIcon;
    const [svg, setSvg] = useState<string>('');
    useEffect(() => {
        if (hasCustomIcon && iconAsset && iconAsset.length > 0) {
            const url = iconAsset[0].genericUrl;

            // eslint-disable-next-line @typescript-eslint/no-floating-promises, promise/catch-or-return
            fetch(url).then((response) => {
                // eslint-disable-next-line promise/always-return
                if (response.ok) {
                    // eslint-disable-next-line promise/catch-or-return, @typescript-eslint/no-floating-promises
                    response.text().then((svgString) => setSvg(svgString));
                }
            });
        }
    }, [hasCustomIcon, iconAsset]);

    if (!hasCustomIcon) {
        const Component = ICON_MAP[iconChoice];
        return <Component />;
    } else if (svg) {
        return (
            <div
                className="tw-w-[24px] tw-h-[24px] [&>svg]:tw-w-[24px] [&>svg]:tw-h-[24px]"
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        );
    } else {
        return <div />;
    }
};

export default IconComponent;
