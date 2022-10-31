/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Badge,
    BadgeEmphasis,
    Button,
    ButtonEmphasis,
    Color,
    IconSize,
    IconTrashBin,
    Tooltip,
    TooltipPosition,
    merge,
    useCopy,
} from '@frontify/fondue';
import { joinClassNames, toRgbaString } from '@frontify/guideline-blocks-shared';

import { ColorName } from '../ColorName';
import { ColorPickerFlyout } from '../ColorPickerFlyout';
import { ColorSpaceValue } from '../ColorSpaceValue';
import { TooltipContent } from '../TooltipContent';
import { mapColorSpaces } from '../../helpers/mapColorSpaces';
import { ColorBlockType, ItemProps } from '../../types';

export const ListItem = ({ color, colorSpaces, isEditing, onBlur, onUpdate, onDelete }: ItemProps) => {
    const { copy, status } = useCopy();

    const mappedFirstColorSpace = mapColorSpaces(colorSpaces[0], color);

    return (
        <div
            data-test-id="list-item"
            className="tw-group tw-relative tw-flex tw-shadow-t-inner-line tw-transition-all hover:tw-shadow-y-inner-line-x-strong"
        >
            {isEditing ? (
                <ColorPickerFlyout
                    currentColor={color as Color}
                    onConfirm={(color) => {
                        onUpdate({ ...color, alpha: (color.alpha && Math.round(color.alpha * 255)) || 255 });
                    }}
                >
                    <div className="tw-h-full tw-mr-9 tw-bg-[url('https://cdn.frontify.com/img/transparent.png')] tw-bg-[length:10px_10px]">
                        <div
                            data-test-id="color-color-picker-flyout-trigger"
                            className="tw-w-[120px] tw-h-full tw-min-h-[60px] tw-shadow-t-inner-line tw-transition-all group-hover:tw-shadow-y-inner-line-x-strong"
                            style={{
                                backgroundColor: toRgbaString(color as Color),
                            }}
                        />
                    </div>
                </ColorPickerFlyout>
            ) : (
                <Tooltip
                    withArrow
                    position={TooltipPosition.Right}
                    content={
                        <TooltipContent
                            colorName={color.name ?? ''}
                            colorValue={mappedFirstColorSpace.value ?? ''}
                            status={status}
                        />
                    }
                    triggerElement={
                        <div className="tw-h-full tw-mr-9 tw-bg-[url('https://cdn.frontify.com/img/transparent.png')] tw-bg-[length:10px_10px]">
                            <div
                                data-test-id="color-tooltip-trigger"
                                className="tw-w-[120px] tw-h-full tw-min-h-[60px] tw-cursor-pointer tw-shadow-t-inner-line tw-transition-all group-hover:tw-shadow-y-inner-line-x-strong"
                                style={{
                                    backgroundColor: toRgbaString(color as Color),
                                }}
                                onClick={() => copy(mappedFirstColorSpace.value ?? '')}
                            />
                        </div>
                    }
                />
            )}

            {isEditing && (
                <div
                    data-test-id="delete-button"
                    className={joinClassNames([
                        'tw-absolute tw-hidden tw-right-3',
                        isEditing && 'group-hover:tw-block',
                        colorSpaces.length > 3 ? 'tw-top-3' : 'tw-top-1/2 tw-translate-y-[-50%]',
                    ])}
                >
                    <Button
                        icon={<IconTrashBin size={IconSize.Size20} />}
                        emphasis={ButtonEmphasis.Default}
                        onClick={() => onDelete(color.id)}
                    />
                </div>
            )}

            <ColorName
                viewType={ColorBlockType.List}
                initialColorName={color.name ?? ''}
                isEditing={isEditing}
                onBlur={onBlur}
            />

            <div className="tw-flex tw-items-center tw-flex-wrap tw-flex-1 tw-gap-y-2.5 tw-py-5">
                {colorSpaces?.map((colorSpaceId) => {
                    const mappedColorSpace = mapColorSpaces(colorSpaceId, color);

                    if (!isEditing && !mappedColorSpace.value) {
                        return <></>;
                    }

                    return (
                        <div
                            data-test-id="color-space"
                            key={colorSpaceId}
                            className={merge([
                                'tw-flex tw-items-center tw-pr-2',
                                colorSpaces.length === 2 ? 'tw-w-1/2' : 'tw-w-1/3',
                            ])}
                        >
                            <div className="tw-flex">
                                <Badge size="small" emphasis={BadgeEmphasis.None}>
                                    {mappedColorSpace.label}
                                </Badge>
                            </div>

                            {isEditing ? (
                                <ColorSpaceValue
                                    viewType={ColorBlockType.List}
                                    color={color}
                                    colorSpaceId={colorSpaceId}
                                    onUpdate={onUpdate}
                                />
                            ) : (
                                <Tooltip
                                    withArrow
                                    position={TooltipPosition.Right}
                                    content={
                                        <TooltipContent
                                            colorName={color.name ?? ''}
                                            colorValue={mappedColorSpace.value ?? ''}
                                            status={status}
                                        />
                                    }
                                    triggerElement={
                                        <div
                                            data-test-id="color-space-value-trigger"
                                            className="tw-w-28 tw-ml-3 tw-overflow-hidden tw-cursor-pointer tw-whitespace-nowrap tw-text-s tw-text-black-80 tw-overflow-ellipsis"
                                            onClick={() => copy(mappedColorSpace.value ?? '')}
                                        >
                                            {mappedColorSpace.value}
                                        </div>
                                    }
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
