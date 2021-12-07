/* (c) Copyright Frontify Ltd., all rights reserved. */
import { FC } from 'react';
import { Button, ButtonStyle } from '@frontify/arcade';
import { ChecklistButtonProps } from '../types';

export const ChecklistButton: FC<ChecklistButtonProps> = ({ onClick, icon, disabled }) => (
    <Button solid={false} disabled={disabled} onClick={onClick} style={ButtonStyle.Secondary} icon={icon} />
);
