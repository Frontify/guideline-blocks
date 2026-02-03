/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MouseEvent as ReactMouseEvent, type ReactNode, useEffect, useState } from 'react';

import { MIN_HEIGHT_VALUE } from '../settings';

type Props = {
    saveHeight: (height: number) => void;
    initialHeight: string;
    children: ReactNode;
};

export const Resizeable = ({ children, saveHeight, initialHeight }: Props) => {
    const activeHeight: number = parseFloat(initialHeight.slice(0, -2));
    const [height, setHeight] = useState(activeHeight);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!active && height !== activeHeight) {
            saveHeight(height);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    useEffect(() => {
        setHeight(activeHeight);
    }, [activeHeight]);

    const handler = (mouseDownEvent: ReactMouseEvent) => {
        const startSize = height;
        const startPosition = mouseDownEvent.pageY;

        const onMouseMove = (mouseMoveEvent: MouseEvent) => {
            setActive(true);
            const newHeight = startSize - startPosition + mouseMoveEvent.pageY;
            if (newHeight > MIN_HEIGHT_VALUE) {
                setHeight(newHeight);
            }
        };

        const onMouseUp = () => {
            setActive(false);
            document.body.removeEventListener('mousemove', onMouseMove);
        };

        document.body.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseup', onMouseUp, { once: true });
    };

    return (
        <div className="tw-grid tw-grid-col tw-min-w-full tw-overflow-hidden">
            <div
                data-test-id="resizable-children-container"
                className="tw-grid tw-justify-items-stretch"
                style={{ height: height ?? initialHeight }}
            >
                {active && (
                    <div className="tw-fixed tw-top-0 tw-bottom-0 tw-right-0 tw-left-0 tw-select-none tw-z-40" />
                )}
                {children}
            </div>

            <button
                type="button"
                onMouseDown={handler}
                className="tw-cursor-ns-resize tw-w-full tw-pt-3 tw-h-full tw-bg-white tw-z-50"
                data-test-id="resize-bar"
            >
                <div className="tw-w-8 tw-h-2 tw-bg-black-10 tw-border tw-border-line-x-strong tw-rounded-[100px] tw-mx-auto tw-ml-[50%] tw--translate-x-[50%]" />
            </button>
        </div>
    );
};
