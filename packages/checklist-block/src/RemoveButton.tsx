import React, { ReactElement } from 'react';
import { Button, IconReject, IconSize } from '@frontify/arcade';

type RemoveButtonProps = {
    onClick: (e: any) => void;
};

export default function RemoveButton({ onClick }: RemoveButtonProps): ReactElement {
    return <Button onClick={onClick} icon={<IconReject size={IconSize.Size16} />}></Button>;
}
