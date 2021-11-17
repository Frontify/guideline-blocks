import React, { ReactElement } from 'react';
import { Button, IconCaretDown, IconSize } from '@frontify/arcade';
import { ChecklistButtonProps } from './types';

export default function DecrementButton({ onClick, disabled }: ChecklistButtonProps): ReactElement {
    return (
        <Button inverted disabled={disabled} onClick={onClick} icon={<IconCaretDown size={IconSize.Size16} />}></Button>
    );
}
