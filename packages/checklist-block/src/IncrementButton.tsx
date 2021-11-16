import React, { ReactElement } from 'react';
import { Button, IconCaretUp, IconSize } from '@frontify/arcade';

type IncrementButtonProps = {
    onClick: (e: any) => void;
};

export default function IncrementButton({ onClick }: IncrementButtonProps): ReactElement {
    return <Button onClick={onClick} icon={<IconCaretUp size={IconSize.Size16} />}></Button>;
}
