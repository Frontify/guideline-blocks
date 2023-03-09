/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { PropsWithChildren, useState } from 'react';
import { joinClassNames } from '../../utilities';
import Toolbar from './Toolbar';
import { BlockItemWrapperProps } from './types';

export const BlockItemWrapper = ({
    children,
    toolbarFlyoutItems,
    toolbarItems,
    shouldHideWrapper,
    shouldHideComponent,
    isDragging,
}: PropsWithChildren<BlockItemWrapperProps>) => {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
    return (
        <div
            data-test-id="block-item-wrapper"
            className={joinClassNames([
                'tw-relative tw-group',
                !shouldHideWrapper &&
                    'hover:tw-outline-offset-[2px] hover:tw-outline hover:tw-outline-[1px] hover:tw-outline-box-selected-inverse',
            ])}
        >
            <div className={joinClassNames([shouldHideComponent && 'tw-opacity-0'])}>
                <div
                    className={joinClassNames([
                        'tw-absolute tw-z-20 tw-bottom-[calc(100%-4px)] tw-right-[-3px] tw-w-full',
                        !shouldHideWrapper && 'group-hover:tw-opacity-100',
                        isFlyoutOpen && !shouldHideWrapper ? 'tw-opacity-100' : 'tw-opacity-0',
                    ])}
                >
                    <Toolbar
                        isFlyoutOpen={isFlyoutOpen}
                        setIsFlyoutOpen={setIsFlyoutOpen}
                        flyoutItems={toolbarFlyoutItems}
                        items={toolbarItems}
                        isDragging={isDragging}
                    />
                </div>
                {children}
            </div>
        </div>
    );
};
