/* (c) Copyright Frontify Ltd., all rights reserved. */
import React, { ReactElement } from 'react';
import { Button, ButtonStyle } from '@frontify/arcade';
import { ChecklistButtonProps } from '../types';

export default function ChecklistButton({ onClick, icon, disabled }: ChecklistButtonProps): ReactElement {
    return (
        <Button solid={false} disabled={disabled} onClick={onClick} style={ButtonStyle.Secondary} icon={icon}></Button>
    );
}
