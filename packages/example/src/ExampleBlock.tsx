/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/arcade-tokens/styles';
import 'tailwindcss/tailwind.css';
import { FC } from 'react';

export const ExampleBlock: FC = () => {
    return (
        <div data-test-id="example-block">
            <span className="tw-text-text tw-underline">A custom block in violet and underlined</span>
        </div>
    );
};
