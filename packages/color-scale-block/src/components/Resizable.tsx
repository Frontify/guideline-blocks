/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DragEvent, FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

export interface ResizableProps {
    children: ReactNode;
}

export const Resizable: FC<ResizableProps> = ({ children }) => {
    const [initialPos, setInitialPos] = useState<number>(0);
    const [initialSize, setInitialSize] = useState<number>(0);

    const ref = useRef<HTMLDivElement>(null);

    const [, drag, dragPreview] = useDrag(() => ({ type: '123' }));
    const [, drag2, dragPreview2] = useDrag(() => ({ type: '321' }));

    const initial = (e: DragEvent<HTMLDivElement>) => {
        if (ref === null || !ref.current) {
            return;
        }

        setInitialPos(e.clientX);
        setInitialSize(ref.current.offsetWidth);
    };

    const resize = (e: DragEvent<HTMLDivElement>) => {
        if (ref === null || !ref.current) {
            return;
        }

        ref.current.style.width = `${initialSize + (e.clientX - initialPos)}px`;
    };

    useEffect(() => {
        dragPreview(getEmptyImage(), { captureDraggingState: true });
        dragPreview2(getEmptyImage(), { captureDraggingState: true });
    }, [dragPreview, dragPreview2]);

    return (
        <div className="tw-relative tw-flex tw-items-center">
            <div id="test-wrap" ref={ref}>
                {children}
            </div>

            <div
                ref={drag}
                id="Draggable-test"
                onDragStart={initial}
                onDrag={resize}
                style={{
                    background: 'rgba(1, 1, 1, 0.2)',
                    borderBottom: '1px solid black',
                    borderRight: '1px solid black',
                    borderTop: '1px solid black',
                    cursor: 'col-resize',
                    height: '20px',
                    width: '10px',
                    position: 'absolute',
                    right: '-5px',
                }}
            />

            <div
                ref={drag2}
                id="Draggable-test"
                onDragStart={initial}
                onDrag={resize}
                style={{
                    background: 'rgba(1, 1, 1, 0.2)',
                    borderBottom: '1px solid black',
                    borderRight: '1px solid black',
                    borderTop: '1px solid black',
                    cursor: 'col-resize',
                    height: '20px',
                    width: '10px',
                    position: 'absolute',
                    left: '-5px',
                }}
            />
        </div>
    );
};
