import { useDrop } from 'react-dnd';
import { DraggableItem, DropZonePosition, merge } from '@frontify/fondue';
import { ColorBlockType } from '../types';

export type OnDropCallback<T> = (
    targetItem: DraggableItem<T>,
    sourceItem: DraggableItem<T>,
    position: DropZonePosition
) => void;

type DropZoneData<T> = {
    targetItem: DraggableItem<T>;
    position: DropZonePosition;
};

export type DropZoneProps<T> = {
    data: DropZoneData<T>;
    onDrop?: OnDropCallback<T>;
    treeId: string;
    children?: JSX.Element;
    colorBlockType: ColorBlockType;
};

export const DropZone = <T extends object>({ data, onDrop, children, treeId, colorBlockType }: DropZoneProps<T>) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'test',
        drop: (item: any) => {
            console.log(item);
            onDrop?.(data.targetItem, item, data.position);
        },
        canDrop: (item: any) => {
            console.log(item);
            // can't drop an item on itself
            if (item.id === data.targetItem.id) {
                return false;
            }
            // otherwise anything can be dropped anywhere ATM
            return true;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = isOver && canDrop;
    let outerDropZoneClassNames = '';
    let activeOuterDropZoneClassNames = '';

    switch (colorBlockType) {
        case ColorBlockType.List:
            outerDropZoneClassNames = 'tw-my-[-5px] tw-h-[10px] tw-py-1 tw-outline-none tw-relative tw-z-20';
            activeOuterDropZoneClassNames =
                'tw-h-7 tw-py-0 tw-my-0 tw-bg-violet-20 tw-border-2 tw-border-dashed tw-border-violet-60 tw-rounded tw-bg-clip-content';
            break;
        case ColorBlockType.Drops:
            outerDropZoneClassNames = 'tw-mx-[-5px] tw-w-[10px] tw-px-1 tw-outline-none tw-relative tw-z-20';
            activeOuterDropZoneClassNames =
                'tw-w-7 tw-px-0 tw-bg-violet-20 tw-border-2 tw-border-dashed tw-border-violet-60 tw-rounded tw-bg-clip-content';
            break;
        case ColorBlockType.Cards:
            outerDropZoneClassNames = 'tw-mx-[-5px] tw-w-[10px] tw-px-1 tw-outline-none tw-relative tw-z-20';
            activeOuterDropZoneClassNames =
                'tw-w-7 tw-px-0 tw-bg-violet-20 tw-border-2 tw-border-dashed tw-border-violet-60 tw-rounded tw-bg-clip-content';
            break;
        default:
            break;
    }

    return (
        <div
            role="row"
            aria-hidden={!isActive}
            className={merge([
                'tw-w-full tw-transition-all',
                data.position !== DropZonePosition.Within ? outerDropZoneClassNames : 'tw-h-auto',
                isActive && data.position !== DropZonePosition.Within ? activeOuterDropZoneClassNames : '',
            ])}
            ref={drop}
        >
            {children}
        </div>
    );
};
