import { FC, useEffect, useState } from 'react';
import { MAX_HEIGHT_VALUE, MIN_HEIGHT_VALUE } from '../settings';

type Props = {
    saveHeight: (height: number) => void;
    initialHeight: string;
};

export const Resizeable: FC<Props> = ({ children, saveHeight, initialHeight }) => {
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

    const handler = (mouseDownEvent: { pageY: number }) => {
        const startSize = height;
        const startPosition = mouseDownEvent.pageY;

        function onMouseMove(mouseMoveEvent: { pageY: number }) {
            setActive(true);
            const newHeight = startSize - startPosition + mouseMoveEvent.pageY;
            if (newHeight > MIN_HEIGHT_VALUE && newHeight < MAX_HEIGHT_VALUE) {
                setHeight(newHeight);
            }
        }
        function onMouseUp() {
            setActive(false);
            document.body.removeEventListener('mousemove', onMouseMove);
        }
        document.body.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseup', onMouseUp, { once: true });
    };

    return (
        <div id="container" className="tw-grid tw-grid-col tw-min-w-full tw-overflow-hidden">
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
                id="draghandle"
                type="button"
                onMouseDown={handler}
                className="tw-cursor-ns-resize tw-w-full tw-pt-7 tw-h-full tw-bg-white tw-z-50"
                data-test-id="resize-bar"
            >
                <div className="tw-w-8 tw-h-2 tw-bg-black-10 tw-border tw-border-line-x-strong tw-rounded-[100px] tw-mx-auto tw-ml-[50%] tw--translate-x-[50%]" />
            </button>
        </div>
    );
};
