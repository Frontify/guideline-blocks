/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';

export const ExampleBlock: FC = () => {
    return (
        <div data-test-id="example-block">
            <span className="tw-text-text tw-underline">A custom block in violet and underlined</span>
        </div>
    );
};
