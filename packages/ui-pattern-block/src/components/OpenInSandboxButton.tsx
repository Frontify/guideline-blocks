/* (c) Copyright Frontify Ltd., all rights reserved. */

import { UnstyledOpenInCodeSandboxButton } from '@codesandbox/sandpack-react';
import { FOCUS_VISIBLE_STYLE, merge } from '@frontify/fondue';

import { IconSandBox } from './icons';

export const OpenInSandboxButton = () => {
    return (
        <UnstyledOpenInCodeSandboxButton
            className={merge([
                'tw-border-transparent hover:tw-bg-button-background-hover hover:tw-border-button-border active:tw-bg-button-background-pressed  tw-group tw-border tw-box-box tw-relative tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-outline-none tw-font-body tw-font-medium tw-rounded tw-h-6 tw-w-6',
                FOCUS_VISIBLE_STYLE,
            ])}
        >
            <IconSandBox />
        </UnstyledOpenInCodeSandboxButton>
    );
};
