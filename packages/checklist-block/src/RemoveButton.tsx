import React, { ReactElement } from 'react';
import { Button, ButtonSize, IconReject, IconSize } from '@frontify/arcade';
import { ChecklistButtonProps } from './types';

export default function RemoveButton({ onClick }: ChecklistButtonProps): ReactElement {
    return <Button inverted onClick={onClick} icon={<IconReject size={IconSize.Size16} />}></Button>;
}
