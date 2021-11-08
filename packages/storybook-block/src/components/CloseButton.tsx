/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC } from 'react';
import { IconReject, IconSize } from '@frontify/arcade';

type CloseButtonProps = {
    onClick: () => void;
};

export const CloseButton: FC<CloseButtonProps> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="tw-absolute tw-w-9 tw-h-9 tw-flex tw-items-center tw-justify-center tw-bg-black-20 hover:tw-bg-black-30 tw-transition-colors tw-rounded tw-top-4 tw-right-4 tw-text-black"
    >
        <IconReject size={IconSize.Size20} />
    </button>
);
