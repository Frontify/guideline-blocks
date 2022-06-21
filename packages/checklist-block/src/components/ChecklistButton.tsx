/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonStyle } from '@frontify/fondue';
import { FC } from 'react';
import { ChecklistButtonProps } from '../types';

export const ChecklistButton: FC<ChecklistButtonProps> = ({ onClick, icon, disabled, size }) => (
    <Button solid={false} disabled={disabled} onClick={onClick} style={ButtonStyle.Secondary} icon={icon} size={size} />
);
