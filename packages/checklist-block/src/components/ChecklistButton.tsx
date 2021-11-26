import React, { ReactElement, MouseEvent } from 'react';
import { Button, ButtonStyle } from '@frontify/arcade';

export type ChecklistButtonProps = {
    disabled?: boolean;
    onClick: (e: MouseEvent) => void;
    icon: ReactElement;
};

export default function ChecklistButton({ onClick, icon, disabled }: ChecklistButtonProps): ReactElement {
    return (
        <Button solid={false} disabled={disabled} onClick={onClick} style={ButtonStyle.Secondary} icon={icon}></Button>
    );
}
