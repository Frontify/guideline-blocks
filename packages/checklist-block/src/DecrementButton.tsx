import React, { ReactElement } from 'react';
import { Button, IconCaretUp, IconSize } from '@frontify/arcade';

type DecrementButtonProps = {
    onClick: (e: any) => void;
};

export default function DecrementButton({ onClick }: DecrementButtonProps): ReactElement {
    return <Button onClick={onClick} icon={<IconCaretUp size={IconSize.Size16} />}></Button>;
}
