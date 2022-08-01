/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import {
    Badge,
    BadgeEmphasis,
    Button,
    ButtonStyle,
    IconSize,
    IconTrash,
    RichTextEditor,
    Tooltip,
    TooltipPosition,
    useCopy,
} from '@frontify/fondue';
import { joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

import { ItemProps } from '../../types';
import { mapColorSpaces } from '../../helpers/mapColorSpaces';
import { TootlipContent } from '../TooltipContent';

export const ListItem: FC<ItemProps> = ({ color, colorSpaces, isEditing }) => {
    const { designTokens } = useGuidelineDesignTokens();

    const { copy, status } = useCopy();

    return (
        <div
            key={color}
            className={joinClassNames([
                "tw-group tw-relative tw-w-full tw-flex before:tw-absolute before:tw-top-0 before:tw-left-0 before:tw-w-full before:tw-h-full before:tw-content-[''] before:tw-shadow-inset-top before:tw-transition-all",
                isEditing && 'hover:before:tw-shadow-inset-hover-strong',
                !isEditing &&
                    'last:after:tw-absolute last:after:tw-top-0 last:after:tw-left-0 last:after:tw-w-full last:after:tw-h-full last:after:tw-content-[""] last:after:tw-shadow-inset-bottom hover:tw-bg-black-0',
            ])}
        >
            {!isEditing ? (
                <Tooltip
                    withArrow
                    position={TooltipPosition.Right}
                    hoverDelay={0}
                    content={<TootlipContent color={color} status={status} />}
                    triggerElement={
                        <div
                            className="tw-relative tw-z-[1] tw-w-[120px] tw-min-h-[60px] tw-mr-9 tw-cursor-pointer"
                            style={{
                                backgroundColor: color,
                            }}
                            onClick={() => copy(color)}
                        ></div>
                    }
                />
            ) : (
                <div
                    className="tw-w-[120px] tw-min-h-[60px] tw-mr-9"
                    style={{
                        backgroundColor: color,
                    }}
                ></div>
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
                                            className="tw-relative tw-z-[1] tw-ml-3 tw-cursor-pointer tw-text-s tw-text-black-80"
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
