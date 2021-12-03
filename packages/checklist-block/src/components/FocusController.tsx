/* (c) Copyright Frontify Ltd., all rights reserved. */
import { FOCUS_STYLE } from '@frontify/arcade';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { useFocusRing } from '@react-aria/focus';
import React, { FC, useRef } from 'react';
import { FocusControllerProps } from '../types';

export const FocusController: FC<FocusControllerProps> = ({ children }) => {
    if (typeof children !== 'object') {
        return children;
    }

    const { isFocused, focusProps } = useFocusRing();

    const focusControllerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const childRef = useRef() as React.MutableRefObject<HTMLElement>;
    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        const isChildsEvent = event.currentTarget !== event.target;

        switch (event.code) {
            case 'Space':
                if (!isChildsEvent) {
                    childRef.current.focus();
                }
                break;
            case 'Enter':
                if (isChildsEvent) {
                    event.stopPropagation();
                } else {
                    childRef.current.focus();
                }
                break;
            case 'Escape':
                if (isChildsEvent) {
                    focusControllerRef.current.focus();
                }
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                if (isChildsEvent) {
                    event.stopPropagation();
                }
                break;
        }
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        childRef.current.focus();
    };

    return (
        <div
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            ref={focusControllerRef}
            className={joinClassNames([isFocused && FOCUS_STYLE, 'tw-flex'])}
            {...focusProps}
        >
            <div hidden={true} className="tw-flex">
                {{ ...children, ref: childRef }}
            </div>
        </div>
    );
};
