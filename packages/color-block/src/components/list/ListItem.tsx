/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import {
    Badge,
    BadgeEmphasis,
    Button,
    ButtonStyle,
    IconSize,
    IconTrash,
    ItemDragState,
    RichTextEditor,
    Tooltip,
    TooltipPosition,
    useCopy,
} from '@frontify/fondue';
import { joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

import { useDrag } from 'react-dnd';

import { ItemProps } from '../../types';
import { mapColorSpaces } from '../../helpers/mapColorSpaces';
import { TootlipContent } from '../TooltipContent';
import { ColorsBlockColorPicker } from '../ColorsBlockColorPicker';

export const ListItem: FC<ItemProps> = ({ color, colorSpaces, isEditing }) => {
    const { designTokens } = useGuidelineDesignTokens();

    const { copy, status } = useCopy();

    const [{}, drag] = useDrag({
        item: color,
        collect: (monitor) => ({
            componentDragState: monitor.isDragging() ? ItemDragState.Dragging : ItemDragState.Idle,
        }),
        type: 'test',
        canDrag: isEditing,
    });

    return (
        <div
            key={color}
            ref={drag}
            className="tw-group tw-relative tw-flex tw-shadow-t-inner-line tw-transition-all last:tw-border-b last:tw-border-black/[.1] hover:tw-shadow-t-inner-line-strong"
        >
            {!isEditing ? (
                <Tooltip
                    withArrow
                    position={TooltipPosition.Right}
                    hoverDelay={0}
                    content={<TootlipContent color={color} status={status} />}
                    triggerElement={
                        <div
                            className="tw-w-[120px] tw-min-h-[60px] tw-mr-9 tw-cursor-pointer tw-shadow-t-inner-line tw-transition-all group-hover:tw-shadow-t-inner-line-strong"
                            style={{
                                backgroundColor: color,
                            }}
                            onClick={() => copy(color)}
                        ></div>
                    }
                />
            ) : (
                <ColorsBlockColorPicker onSelect={(value) => console.log(value)}>
                    <div
                        className="tw-w-[120px] tw-min-h-[60px] tw-mr-9 tw-shadow-t-inner-line tw-transition-all group-hover:tw-shadow-t-inner-line-strong"
                        style={{
                            backgroundColor: color,
                        }}
                    ></div>
                </ColorsBlockColorPicker>
            )}

            <div className="tw-flex tw-items-center tw-w-[100px] tw-py-4 tw-mr-12 tw-text-m tw-text-black tw-font-bold">
                <RichTextEditor designTokens={designTokens ?? undefined} readonly={!isEditing} />
            </div>

            <div className="tw-flex tw-items-center tw-flex-wrap tw-gap-y-2.5 tw-w-list-color-types tw-py-5">
                {colorSpaces?.map((colorSpaceID: string) => {
                    const mappedColorSpace = mapColorSpaces(colorSpaceID);

                    return (
                        <div key={colorSpaceID} className="tw-flex tw-items-center tw-w-1/3">
                            <Badge size="s" emphasis={BadgeEmphasis.None}>
                                {mappedColorSpace.value}
                            </Badge>

                            {!isEditing ? (
                                <Tooltip
                                    withArrow
                                    position={TooltipPosition.Right}
                                    hoverDelay={0}
                                    content={<TootlipContent color={color} status={status} />}
                                    triggerElement={
                                        <div
                                            className="tw-ml-3 tw-cursor-pointer tw-text-s tw-text-black-80"
                                            onClick={() => copy(color)}
                                        >
                                            {mappedColorSpace.placeholder}
                                        </div>
                                    }
                                />
                            ) : (
                                <div className="tw-ml-3 tw-text-s tw-text-black-80">{mappedColorSpace.placeholder}</div>
                            )}
                        </div>
                    );
                })}

                {isEditing && (
                    <div
                        className={joinClassNames([
                            'tw-absolute tw-hidden tw-top-1/2 tw-right-3 tw-translate-y-[-50%]',
                            isEditing && 'group-hover:tw-block',
                        ])}
                    >
                        <Button icon={<IconTrash size={IconSize.Size20} />} style={ButtonStyle.Secondary} />
                    </div>
                )}
            </div>
        </div>
    );
};
