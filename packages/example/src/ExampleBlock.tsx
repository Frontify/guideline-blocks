/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/arcade-tokens/styles';
import { useDesignApi } from '@frontify/guideline-blocks-shared';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';

export const ExampleBlock: FC = () => {
    const { styleCategories, error, isLoading } = useDesignApi();

    return (
        <div data-test-id="example-block">
            <span className="tw-text-text tw-underline">A custom block in violet and underlined</span>
            {(!isLoading && !error && (
                <>
                    <p style={styleCategories?.heading1}>Heading 1</p>
                    <p style={styleCategories?.heading2}>Heading 2</p>
                </>
            )) ||
                (isLoading && <>loading...</>)}
        </div>
    );
};
