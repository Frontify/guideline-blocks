/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark24, IconCheckMarkCircle24, IconCross24, IconCrossCircle24 } from '@frontify/fondue';
import { useEffect, useState } from 'react';
import { DoDontType, IconComponentProps, ItemIconChoice } from '../types';

const ICON_MAP = {
    [ItemIconChoice.CHECKMARK]: IconCheckMark24,
    [ItemIconChoice.CHECKMARK_CIRCLE]: IconCheckMarkCircle24,
    [ItemIconChoice.CROSS]: IconCross24,
    [ItemIconChoice.CROSS_CIRCLE]: IconCrossCircle24,
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

            fetch(url).then((response) => {
                if (response.ok) {
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
