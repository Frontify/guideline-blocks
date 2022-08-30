/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/fondue-tokens/styles';

import { FC } from 'react';

export const ColorKitBlock: FC = () => {
    return (
        <div data-test-id="example-block">
            <span className="tw-text-violet-60 tw-underline">A color kit block in violet and underlined</span>
        </div>
    );
};
