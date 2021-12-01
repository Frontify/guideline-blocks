import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { useFocusRing } from '@react-aria/focus';
import React, { FC, ReactElement, useRef, useState } from 'react';
import { FOCUS_STYLE } from '../utilities/focusStyle';

type FocusControllerProps = {
    children: ReactElement;
};

export const FocusController: FC<FocusControllerProps> = ({ children: child }) => {
    const { isFocused, focusProps } = useFocusRing();

    const focusControllerRef = useRef<HTMLDivElement>(null);
    const childRef = useRef<HTMLElement>(null);
    let childWithRef = {};

    if (typeof child === 'object') childWithRef = { ...child, ref: childRef };

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
                    focusControllerRef.current.focus();
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
            className={joinClassNames([isFocused && FOCUS_STYLE, 'tw-w-inline-block'])}
            {...focusProps}
        >
            <span hidden={true} className="tw-inline-block">
                {childWithRef}
            </span>
        </div>
    );
};
