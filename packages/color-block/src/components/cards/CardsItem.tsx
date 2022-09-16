/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Button,
    ButtonStyle,
    Color,
    IconSize,
    IconTrashBin,
    Tooltip,
    TooltipPosition,
    useCopy,
} from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-shared';

import { ColorBlockType, ColorSpaceInputValues, ItemProps } from '../../types';
import { mapColorSpaces } from '../../helpers/mapColorSpaces';
import { TooltipContent } from '../TooltipContent';
import { ColorPickerFlyout } from '../ColorPickerFlyout';
import { FormEvent, useState } from 'react';
import { ColorName } from '../ColorName';

export const CardsItem = ({ color, colorSpaces, isEditing, onBlur, onUpdate, onDelete }: ItemProps) => {
    const { copy, status } = useCopy();

    const mappedFirstColorSpace = mapColorSpaces(colorSpaces[0], color);

    const [colorSpaceInputValues, setColorSpaceInputValues] = useState<ColorSpaceInputValues>({
        cmykCoated: color.cmykCoated ?? '',
        cmykNewspaper: color.cmykNewspaper ?? '',
        cmykUncoated: color.cmykUncoated ?? '',
        hks: color.hks ?? '',
        lab: color.lab ?? '',
        ncs: color.ncs ?? '',
        oracal: color.oracal ?? '',
        pantoneCoated: color.pantoneCoated ?? '',
        pantoneCp: color.pantoneCp ?? '',
        pantonePlastics: color.pantonePlastics ?? '',
        pantoneTextile: color.pantoneTextile ?? '',
        pantoneUncoated: color.pantoneUncoated ?? '',
        pantone: color.pantone ?? '',
        ral: color.ral ?? '',
        threeM: color.threeM ?? '',
        variable: color.nameCss ?? '',
    });

    const handleColorSpaceValueChange = (event: FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;

        setColorSpaceInputValues((previousState) => ({ ...previousState, [name]: value }));
    };

    return (
        <div
            data-test-id="cards-item"
            className="tw-group tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded tw-shadow-inner-line tw-transition-all hover:tw-shadow-inner-line-strong"
        >
            {!isEditing ? (
                <Tooltip
                    withArrow
                    position={TooltipPosition.Right}
                    hoverDelay={0}
                    content={<TooltipContent colorValue={mappedFirstColorSpace.value ?? ''} status={status} />}
                    triggerElement={
                        <div
                            data-test-id="color-tooltip-trigger"
                            className="tw-w-full tw-h-[60px] tw-cursor-pointer tw-rounded-t tw-shadow-inner-line tw-transition-all group-hover:tw-shadow-inner-line-strong"
                            style={{
                                backgroundColor: `rgba(${color.red}, ${color.green}, ${color.blue}, ${
                                    (color.alpha && color.alpha / 255) || 1
                                })`,
                            }}
                            onClick={() => copy(mappedFirstColorSpace.value ?? '')}
                        />
                    }
                />
            ) : (
                <ColorPickerFlyout
                    currentColor={color as Color}
                    onConfirm={(color) => {
                        onUpdate({ ...color, alpha: (color.alpha && Math.round(color.alpha * 255)) || 255 });
                    }}
                >
                    <div
                        data-test-id="color-color-picker-flyout-trigger"
                        className="tw-relative tw-w-full tw-h-[60px] tw-rounded-t tw-shadow-inner-line tw-transition-all group-hover:tw-shadow-inner-line-strong"
                        style={{
                            backgroundColor: `rgba(${color.red}, ${color.green}, ${color.blue}, ${
                                (color.alpha && color.alpha / 255) || 1
                            })`,
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
                                style={ButtonStyle.Secondary}
                                onClick={() => onDelete(color.id)}
                            />
                        </div>
                    </div>
                </ColorPickerFlyout>
            )}

            <div className="tw-pt-4 tw-px-6 tw-pb-5">
                <ColorName
                    viewType={ColorBlockType.Cards}
                    initialColorName={color.name || ''}
                    isEditing={isEditing}
                    onBlur={onBlur}
                />

                {colorSpaces?.map((colorSpaceId) => {
                    const mappedColorSpace = mapColorSpaces(colorSpaceId, color);

                    return (
                        <div
                            data-test-id="color-space"
                            key={colorSpaceId}
                            className="tw-flex tw-items-center tw-mb-1 last:tw-mb-0"
                        >
                            <div className="tw-flex tw-items-center">
                                <div className="tw-mr-1 tw-text-s tw-text-black-70">{mappedColorSpace.label}</div>

                                {!isEditing ? (
                                    <Tooltip
                                        withArrow
                                        position={TooltipPosition.Right}
                                        hoverDelay={0}
                                        content={
                                            <TooltipContent colorValue={mappedColorSpace.value ?? ''} status={status} />
                                        }
                                        triggerElement={
                                            <div
                                                data-test-id="color-space-value-trigger"
                                                className="tw-cursor-pointer tw-text-s tw-text-black-80"
                                                onClick={() => copy(mappedColorSpace.value ?? '')}
                                            >
                                                {mappedColorSpace.value}
                                            </div>
                                        }
                                    />
                                ) : (
                                    <>
                                        {['CMYK', 'HEX', 'RGB'].includes(mappedColorSpace.label) ? (
                                            <div className="tw-text-s tw-text-black-80">
                                                {mappedColorSpace.value || mappedColorSpace.placeholder}
                                            </div>
                                        ) : (
                                            <input
                                                name={colorSpaceId}
                                                className="tw-w-full tw-h-4 tw-outline-none"
                                                type="text"
                                                value={colorSpaceInputValues[colorSpaceId]}
                                                onChange={handleColorSpaceValueChange}
                                                placeholder={mappedColorSpace.placeholder}
                                                onBlur={(event) =>
                                                    onUpdate({
                                                        [mappedColorSpace.key || colorSpaceId]: event.target.value,
                                                    })
                                                }
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
