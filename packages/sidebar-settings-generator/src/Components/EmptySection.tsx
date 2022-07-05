/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonStyle, IconAddSimple } from '@frontify/fondue';

export const EmptySection = ({ onClick, text }: { onClick: () => void; text: string }) => (
    <div className="tw-border tw-border-dashed tw-border-line tw-rounded tw-p-10 tw-flex tw-items-center tw-justify-center">
        <Button onClick={onClick} style={ButtonStyle.Secondary}>
            <IconAddSimple /> {text}
        </Button>
    </div>
);
