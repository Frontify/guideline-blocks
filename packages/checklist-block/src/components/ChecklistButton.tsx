/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, ButtonStyle } from '@frontify/fondue';
import { FC } from 'react';
import { ChecklistButtonProps } from '../types';

export const ChecklistButton: FC<ChecklistButtonProps> = ({ onClick, icon, disabled, size }) => (
    <Button
        solid={true}
        disabled={disabled}
        onClick={onClick}
        style={ButtonStyle.Default}
        emphasis={ButtonEmphasis.Default}
        icon={icon}
        size={size}
    />
);
