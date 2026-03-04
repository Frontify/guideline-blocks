/* (c) Copyright Frontify Ltd., all rights reserved. */

import { UnstyledOpenInCodeSandboxButton } from '@codesandbox/sandpack-react';
import { merge } from '@frontify/fondue/rte';

import { IconSandBox } from './icons';

export const OpenInSandboxButton = () => {
    return (
        <UnstyledOpenInCodeSandboxButton
            className={merge([
                'tw-border-transparent hover:tw-bg-container-secondary-hover hover:tw-border-primary active:tw-bg-container-secondary-active  tw-group tw-border tw-box-box tw-relative tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-outline-none tw-font-primary tw-font-medium tw-rounded-medium tw-h-6 tw-w-6',
                'focus-visible:tw-ring-4 focus-visible:tw-ring-blue focus-visible:tw-ring-offset-2 focus-visible:dark:tw-ring-offset-black focus-visible:tw-outline-none',
            ])}
        >
            <IconSandBox />
        </UnstyledOpenInCodeSandboxButton>
    );
};
