/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark24, IconCheckMarkCircle24, IconCross24, IconCrossCircle24 } from '@frontify/fondue';
import { DoDontType, IconComponentProps, ItemIconChoice } from '../types';

const ICON_MAP = {
    [ItemIconChoice.CHECKMARK]: IconCheckMark24,
    [ItemIconChoice.CHECKMARK_CIRCLE]: IconCheckMarkCircle24,
    [ItemIconChoice.CROSS]: IconCross24,
    [ItemIconChoice.CROSS_CIRCLE]: IconCrossCircle24,
};

const IconComponent = ({ doIconChoice, dontIconChoice, type }: IconComponentProps) => {
    const iconChoice = type === DoDontType.Do ? doIconChoice : dontIconChoice;

    const Component = ICON_MAP[iconChoice];
    return <Component />;
};

export default IconComponent;
