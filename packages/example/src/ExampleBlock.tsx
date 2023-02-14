/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import 'tailwindcss/tailwind.css';

export const ExampleBlock = ({}: BlockProps) => {
    return (
        <div data-test-id="example-block">
            <span className="tw-text-violet-60 tw-underline">A custom block in violet and underlined</span>
        </div>
    );
};
