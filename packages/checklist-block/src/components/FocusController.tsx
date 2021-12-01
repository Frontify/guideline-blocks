import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { useFocusRing } from '@react-aria/focus';
import React, { FC, ReactElement, useRef } from 'react';
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
                    childRef.current?.focus();
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
                if (!isChildsEvent) {
                    event.stopPropagation();
                    childRef.current.hide();
                    focusControllerRef.current?.parentElement?.dispatchEvent(
                        new KeyboardEvent(event.nativeEvent.type, event.nativeEvent)
                    );
                    childRef.current.unhide();
                }
                break;
        }
    };

    return (
        <div
            tabIndex={0}
            onKeyDown={handleKeyDown}
            ref={focusControllerRef}
            className={joinClassNames([isFocused && FOCUS_STYLE])}
            {...focusProps}
        >
            {childWithRef}
        </div>
    );
};
