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
            tabIndex={0}
            data-test-id="block-item-wrapper"
            className={joinClassNames([
                'tw-relative tw-group tw-outline-offset-2 tw-outline-1 tw-outline-box-selected-inverse',
                !shouldHideWrapper && 'hover:tw-outline focus:tw-outline focus-within:tw-outline',
                isFlyoutOpen && 'tw-outline',
            ])}
        >
            <div className={joinClassNames([shouldHideComponent && 'tw-opacity-0'])}>
                <div
                    className={joinClassNames([
                        'tw-absolute tw-bottom-[calc(100%-4px)] tw-right-[-3px] tw-w-full tw-opacity-0 tw-z-10',
                        !shouldHideWrapper &&
                            'group-hover:tw-opacity-100 group-focus:tw-opacity-100 focus-within:tw-opacity-100',
                        isFlyoutOpen && 'tw-opacity-100',
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
