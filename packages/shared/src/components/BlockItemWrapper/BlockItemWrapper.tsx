/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { PropsWithChildren, useState } from 'react';
import { joinClassNames } from '../../utilities';
import Toolbar from './Toolbar';
import { BlockItemWrapperProps } from './types';
import { useFocusWithin } from '@react-aria/interactions';

export const BlockItemWrapper = ({
    children,
    toolbarFlyoutItems,
    toolbarItems,
    shouldHideWrapper,
    shouldHideComponent,
    isDragging,
}: PropsWithChildren<BlockItemWrapperProps>) => {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const { focusWithinProps } = useFocusWithin({
        onFocusWithin: () => setIsFocused(true),
        onBlurWithin: () => setIsFocused(false),
    });

    return (
        <div
            {...focusWithinProps}
            data-test-id="block-item-wrapper"
            className={joinClassNames([
                'tw-relative tw-group tw-outline-offset-2 tw-outline-1 tw-outline-box-selected-inverse',
                !shouldHideWrapper && ' hover:tw-outline',
                isFocused && 'tw-outline',
            ])}
        >
            <div className={joinClassNames([shouldHideComponent && 'tw-opacity-0'])}>
                <div
                    className={joinClassNames([
                        'tw-absolute tw-bottom-[calc(100%-4px)] tw-right-[-3px] tw-w-full',
                        !shouldHideWrapper && 'group-hover:tw-opacity-100',
                        (isFocused || isFlyoutOpen) && !shouldHideWrapper ? 'tw-opacity-100' : 'tw-opacity-0',
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
