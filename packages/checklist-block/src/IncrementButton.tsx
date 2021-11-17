import React, { ReactElement } from 'react';
import { Button, IconCaretUp, IconSize } from '@frontify/arcade';
import { ChecklistButtonProps } from './types';

export default function IncrementButton({ onClick, disabled }: ChecklistButtonProps): ReactElement {
    return (
        <Button inverted disabled={disabled} onClick={onClick} icon={<IconCaretUp size={IconSize.Size16} />}></Button>
    );
}
