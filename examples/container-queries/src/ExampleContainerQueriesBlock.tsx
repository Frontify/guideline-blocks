/* (c) Copyright Frontify Ltd., all rights reserved. */

import { QueryBreakpoints, useContainerQueries } from '@frontify/guideline-blocks-shared';

import { FC, useEffect, useState } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);

const getTailwindBreakpoints = (): QueryBreakpoints => {
    const { sm, md, lg, xl } = fullConfig.theme.screens;
    const parsedSm = parseInt(sm);
    const parsedMd = parseInt(md);
    const parsedLg = parseInt(lg);
    const parsedXl = parseInt(xl);

    return {
        sm: [0, parsedSm],
        md: [parsedSm + 1, parsedMd],
        lg: [parsedMd + 1, parsedLg],
        xl: [parsedLg + 1, parsedXl],
        '2xl': [parsedXl + 1],
    };
};

export const ExampleContainerQueriesBlock: FC = () => {
    const { active, ref } = useContainerQueries({
        breakpoints: getTailwindBreakpoints(),
    });

    const [backgroundState, setBackgroundState] = useState(active);

    useEffect(() => {
        setBackgroundState(active);
    }, [active]);

    let background: string;
    switch (backgroundState) {
        case 'sm':
            background = '#4fc4c4';
            break;
        case 'md':
            background = '#caa0d8';
            break;
        case 'lg':
            background = '#8deac9';
            break;
        case 'xl':
            background = '#f5c780';
            break;
        default:
            background = '#8daff7';
    }

    return (
        <>
            <div
                className="tw-p-4 tw-resize tw-overflow-auto"
                style={{
                    resize: 'both',
                    background,
                }}
                ref={ref}
            >
                <div>
                    <b>Resize me!</b>
                </div>
                <br />
                <div>Current breakpoint: '{active}'</div>
            </div>
        </>
    );
};
