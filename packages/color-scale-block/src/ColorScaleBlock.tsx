/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropZonePosition, OrderableListItem, useMemoizedId } from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { FC, Fragment } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'tailwindcss/tailwind.css';
import { Draggable } from './components/Draggable';
import { Resizable } from './components/Resizable';
import { DropZone } from './react-dnd/DropZone';

export const ColorScaleBlock: FC = () => {
    const resizeableArr = [
        {
            id: '1',
            sort: 1,
            color: 30,
        },
        {
            id: '2',
            sort: 2,
            color: 50,
        },
        {
            id: '3',
            sort: 3,
            color: 90,
        },
    ];

    const handleDrop = (
        targetItem: OrderableListItem<T>,
        sourceItem: OrderableListItem<T>,
        position: DropZonePosition
    ) => {
        // const modifiedItems = moveItems(targetItem, sourceItem, position, demoColors);
        // handleMove(modifiedItems);

        console.log(targetItem);
        console.log(sourceItem);
        console.log(position);
    };

    const listId = useMemoizedId();

    return (
        <div className="tw-flex tw-flex-wrap tw-min-h-[96px] tw-border">
            <DndProvider backend={HTML5Backend}>
                {resizeableArr.map((item, index) => (
                    <>
                        <DropZone
                            key={`orderable-list-item-${item.id}-before`}
                            data={{
                                targetItem: item,
                                position: DropZonePosition.Before,
                            }}
                            onDrop={handleDrop}
                            treeId={listId}
                        />

                        <Resizable>
                            <Draggable item={item} listId={listId} dragDisabled={true} />
                        </Resizable>

                        {index === resizeableArr.length - 1 && (
                            <DropZone
                                key={`orderable-list-item-${index}-after`}
                                data={{
                                    targetItem: item,
                                    position: DropZonePosition.After,
                                }}
                                onDrop={handleDrop}
                                treeId={listId}
                            />
                        )}
                    </>
                ))}
            </DndProvider>
        </div>
    );
};
