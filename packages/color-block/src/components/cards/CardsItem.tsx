/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
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

export const CardsItem = ({ color, colorSpaces, isEditing, onBlur, onUpdate, onDelete }: ItemProps) => {
    const { copy, status } = useCopy();

    const mappedFirstColorSpace = mapColorSpaces(colorSpaces[0], color);

    return (
        <div
            data-test-id="cards-item"
            className="tw-group tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded tw-shadow-inner-line tw-transition-all hover:tw-shadow-inner-line-x-strong"
        >
            {isEditing ? (
                <ColorPickerFlyout
                    currentColor={color as Color}
                    onConfirm={(color) => {
                        onUpdate({ ...color, alpha: (color.alpha && Math.round(color.alpha * 255)) || 255 });
                    }}
                >
                    <div className="tw-overflow-hidden tw-rounded-t tw-bg-[url('https://cdn.frontify.com/img/transparent.png')] tw-bg-[length:10px_10px]">
                        <div
                            data-test-id="color-color-picker-flyout-trigger"
                            className="tw-relative tw-w-full tw-h-[60px] tw-rounded-t tw-shadow-inner-line tw-transition-all group-hover:tw-shadow-inner-line-x-strong"
                            style={{
                                backgroundColor: toRgbaString(color as Color),
                            }}
                        >
                            <div
                                data-test-id="delete-button"
                                className={joinClassNames([
                                    'tw-absolute tw-hidden tw-top-1 tw-right-1 tw-transition-all',
                                    isEditing && 'group-hover:tw-block',
                                ])}
                            >
                                <Button
                                    icon={<IconTrashBin size={IconSize.Size20} />}
                                    emphasis={ButtonEmphasis.Default}
                                    onClick={() => onDelete(color.id)}
                                />
                            </div>
                        </div>
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
                        <div className="tw-overflow-hidden tw-rounded-t tw-bg-[url('https://cdn.frontify.com/img/transparent.png')] tw-bg-[length:10px_10px]">
                            <div
                                data-test-id="color-tooltip-trigger"
                                className="tw-w-full tw-h-[60px] tw-cursor-pointer tw-shadow-inner-line tw-transition-all group-hover:tw-shadow-inner-line-x-strong"
                                style={{
                                    backgroundColor: toRgbaString(color as Color),
                                }}
                                onClick={() => copy(mappedFirstColorSpace.value ?? '')}
                            />
                        </div>
                    }
                />
            )}

            <div className="tw-pt-4 tw-px-6 tw-pb-5">
                <ColorName
                    viewType={ColorBlockType.Cards}
                    initialColorName={color.name ?? ''}
                    isEditing={isEditing}
                    onBlur={onBlur}
                />

                <div className={merge([colorSpaces.length > 0 && 'tw-mt-3'])}>
                    {colorSpaces?.map((colorSpaceId) => {
                        const mappedColorSpace = mapColorSpaces(colorSpaceId, color);

                        return (
                            <div
                                data-test-id="color-space"
                                key={colorSpaceId}
                                className={merge([
                                    'tw-flex tw-items-center tw-mb-1 last:tw-mb-0',
                                    isEditing || mappedColorSpace.value ? '' : 'tw-mb-0',
                                ])}
                            >
                                <div className="tw-flex tw-items-center tw-max-w-full">
                                    <div
                                        className={merge([
                                            'tw-flex-[0_0_auto] tw-mr-1.5 tw-text-xs tw-text-black-70',
                                            isEditing || mappedColorSpace.value ? '' : 'tw-hidden',
                                            !isEditing && '[&~div]:tw-overflow-hidden',
                                        ])}
                                    >
                                        {mappedColorSpace.label}
                                    </div>

                                    {isEditing ? (
                                        <ColorSpaceValue
                                            viewType={ColorBlockType.Cards}
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
                                                    className="tw-cursor-pointer tw-text-s tw-text-black-80 tw-truncate"
                                                    onClick={() => copy(mappedColorSpace.value ?? '')}
                                                >
                                                    {mappedColorSpace.value}
                                                </div>
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
