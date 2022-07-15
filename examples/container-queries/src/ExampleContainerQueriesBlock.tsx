/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContainerQueries } from '@frontify/guideline-blocks-shared';

import { FC, useEffect, useState } from 'react';

export const PocContainerQueriesBlock: FC = () => {
    const { activeBreakpoint, containerRef } = useContainerQueries({});

    const [backgroundState, setBackgroundState] = useState(activeBreakpoint);

    useEffect(() => {
        setBackgroundState(activeBreakpoint);
    }, [activeBreakpoint]);

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
        <div
            data-test-id="example-container-queries-block"
            className="tw-p-4 tw-resize tw-overflow-auto"
            style={{
                resize: 'both',
                background,
            }}
            ref={containerRef}
        >
            <div>
                <b>Resize me!</b>
            </div>
            <br />
            <div>
                Active breakpoint: <span data-test-id="breakpoint">{activeBreakpoint}</span>
            </div>
        </div>
    );
};
