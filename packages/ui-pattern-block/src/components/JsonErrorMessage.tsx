/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconExclamationMarkTriangle20 } from '@frontify/fondue';
import { ReactElement } from 'react';

export const JsonErrorMessage = (): ReactElement => {
    return (
        <div
            data-test-id="dependency-invalid-json"
            className="tw-text-box-negative-inverse tw-w-full tw-h-11 tw-flex tw-items-center tw-px-3 tw-gap-3 tw-bg-box-negative tw-text-s tw-font-medium tw-font-sans"
        >
            <IconExclamationMarkTriangle20 />
            <span aria-live="assertive">The entered JSON is invalid</span>
        </div>
    );
};
