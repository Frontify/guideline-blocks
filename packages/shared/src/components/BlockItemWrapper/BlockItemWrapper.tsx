/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { PropsWithChildren, useEffect, useState } from 'react';
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
    shouldFillContainer,
    outlineOffset = 2,
}: PropsWithChildren<BlockItemWrapperProps>) => {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
    const [isFlyoutDisabled, setIsFlyoutDisabled] = useState(false);

    useEffect(() => {
        if (!isFlyoutOpen) {
            // This prevents automatic refocusing of the trigger element
            setIsFlyoutDisabled(true);
        }
    }, [isFlyoutOpen]);

    return (
        <div
            tabIndex={0}
            onFocus={() => setIsFlyoutDisabled(false)}
            onPointerEnter={() => setIsFlyoutDisabled(false)}
            onPointerLeave={() => (document.activeElement as HTMLElement).blur()}
            data-test-id="block-item-wrapper"
            style={{
                outlineOffset,
            }}
            className={joinClassNames([
                'tw-relative tw-group tw-outline-1 tw-outline-box-selected-inverse',
                shouldFillContainer && 'tw-flex-1',
                !shouldHideWrapper && 'hover:tw-outline focus:tw-outline focus-within:tw-outline',
                isFlyoutOpen && 'tw-outline',
            ])}
        >
            <div className={joinClassNames([shouldHideComponent && 'tw-opacity-0'])}>
                <div
                    style={{
                        right: -1 - outlineOffset,
                        bottom: `calc(100% - ${2 + outlineOffset}px)`,
                    }}
                    className={joinClassNames([
                        'tw-absolute tw-bottom-[calc(100%-4px)] tw-right-[-3px] tw-w-full tw-opacity-0 tw-z-10',
                        !shouldHideWrapper &&
                            'group-hover:tw-opacity-100 group-focus:tw-opacity-100 focus-within:tw-opacity-100',
                        isFlyoutOpen && 'tw-opacity-100',
                    ])}
                >
                    <Toolbar
                        isFlyoutOpen={isFlyoutOpen}
                        isFlyoutDisabled={isFlyoutDisabled}
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
