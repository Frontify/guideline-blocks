/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Button,
    ButtonEmphasis,
    ButtonGroup,
    ButtonSize,
    ButtonStyle,
    Flyout,
    IconTrashBin16,
    Stack,
    Text,
    Tooltip,
    TooltipPosition,
} from '@frontify/fondue';
import { ReactElement, useState } from 'react';

type DeleteFlyoutProps = {
    onConfirm: () => void;
};

export const DeleteFlyout = ({ onConfirm }: DeleteFlyoutProps): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Flyout
            trigger={
                <Tooltip
                    withArrow
                    content="Delete"
                    position={TooltipPosition.Bottom}
                    enterDelay={800}
                    triggerElement={
                        <Button
                            emphasis={ButtonEmphasis.Weak}
                            icon={<IconTrashBin16 />}
                            onClick={() => setIsOpen(true)}
                        />
                    }
                />
            }
            isOpen={isOpen}
            onOpenChange={() => setIsOpen(!isOpen)}
            legacyFooter={false}
            fitContent={true}
            hug={false}
            offset={8}
        >
            <div className="tw-w-64 tw-text-center">
                <Stack direction="column" align="center" padding="l" spacing="m" wrap={true}>
                    <Text as="p" color="negative">
                        Are you sure?
                    </Text>
                    <ButtonGroup size={ButtonSize.Small}>
                        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button style={ButtonStyle.Danger} onClick={onConfirm}>
                            Delete
                        </Button>
                    </ButtonGroup>
                </Stack>
            </div>
        </Flyout>
    );
};
