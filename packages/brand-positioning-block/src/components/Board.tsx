/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { useRef, useState } from 'react';
import { HorizontalAxis } from './HorizontalAxis';
import { Item } from './Item';
import { VerticalAxis } from './VerticalAxis';

export const Board = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
            position: { x: 20, y: 30 },
        },
        {
            id: 2,
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adobe_XD_CC_icon.svg/2101px-Adobe_XD_CC_icon.svg.png',
            position: { x: 60, y: 60 },
        },
        {
            id: 3,
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlU4c9fPbFra-FMGiVFCldOG18IUF6fom24_v_LcC9Vr22HosMUD9aBzmAaarwcSgn42Y&usqp=CAU',
            position: { x: 70, y: 10 },
        },
    ]);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);
    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    const handleDragEnd = (event: DragEndEvent) => {
        if (!containerRef.current) {
            return;
        }
        const { width, height } = containerRef.current.getBoundingClientRect();
        const deltaXInPercentage = (event.delta.x * 100) / width;
        const deltaYInPercentage = (event.delta.y * 100) / height;
        setItems(
            items.map((item) =>
                item.id === event.active.id
                    ? {
                          ...item,
                          position: {
                              x: item.position.x + deltaXInPercentage,
                              y: item.position.y + deltaYInPercentage,
                          },
                      }
                    : item
            )
        );
    };

    return (
        <div className="tw-w-full tw-flex tw-rounded tw-h-[613px] sm:tw-h-[500px] tw-relative tw-border tw-p-3">
            <DndContext modifiers={[restrictToParentElement]} sensors={sensors} onDragEnd={handleDragEnd}>
                <div ref={containerRef} className="tw-relative tw-h-full tw-w-full">
                    <div className="tw-absolute tw-w-full tw-top-1/2 -tw-translate-y-1/2">
                        <HorizontalAxis minLabel="Low Price" maxLabel="High Price" />
                    </div>
                    <div className="tw-absolute tw-h-full tw-left-1/2 -tw-translate-x-1/2">
                        <VerticalAxis minLabel="Low Quality" maxLabel="High Quality" />
                    </div>
                    {items.map((item, i) => (
                        <Item
                            key={i}
                            id={item.id}
                            src={item.src}
                            xPosition={item.position.x}
                            yPosition={item.position.y}
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    );
};
