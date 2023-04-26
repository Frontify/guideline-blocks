/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FOCUS_STYLE, merge } from '@frontify/fondue';
import { useFocusRing } from '@react-aria/focus';
import { Children, FC, KeyboardEvent, MouseEvent, ReactElement, cloneElement, useRef } from 'react';

type FocusControllerProps = {
    children: ReactElement;
    width?: FocusControllerWidth;
};

enum FocusControllerWidth {
    Full = 'Full',
    HugContents = 'HugContents',
}

const FocusControllerWidthClass: Record<FocusControllerWidth, string> = {
    [FocusControllerWidth.Full]: 'tw-w-full tw-flex-auto',
    [FocusControllerWidth.HugContents]: 'tw-flex-initial tw-min-w-0',
};

export const FocusController: FC<FocusControllerProps> = ({ children, width = FocusControllerWidth.HugContents }) => {
    const { isFocused, focusProps } = useFocusRing();

    const focusControllerRef = useRef<HTMLDivElement | null>(null);
    const childRef = useRef<HTMLElement | null>(null);
    if (typeof children !== 'object') {
        return children;
    }
    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        const isChildsEvent = event.currentTarget !== event.target;

        switch (event.code) {
            case 'Space':
                event.stopPropagation();
                if (!isChildsEvent) {
                    event.preventDefault();
                    childRef?.current?.focus();
                }
                break;
            case 'Enter':
                event.stopPropagation();
                if (!isChildsEvent) {
                    event.preventDefault();
                    childRef?.current?.focus();
                } else {
                    focusControllerRef?.current?.focus();
                }
                break;
            case 'Escape':
                event.stopPropagation();
                if (isChildsEvent) {
                    focusControllerRef?.current?.focus();
                }
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'ArrowDown':
            case 'ArrowUp':
                if (isChildsEvent) {
                    event.stopPropagation();
                }
                break;
        }
    };

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            event.preventDefault();
            childRef?.current?.focus();
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            ref={focusControllerRef}
            className={merge([isFocused && FOCUS_STYLE, 'tw-flex', FocusControllerWidthClass[width]])}
            {...focusProps}
        >
            <div hidden={true} className={merge(['tw-flex', FocusControllerWidthClass[width]])}>
                {Children.map(children, (child) => cloneElement(child, { ref: childRef }))}
            </div>
        </div>
    );
};
