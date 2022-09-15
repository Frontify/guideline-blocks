/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Badge,
    BadgeEmphasis,
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
import { ColorsBlockColorPicker } from '../ColorsBlockColorPicker';
import { FormEvent, useState } from 'react';
import { ColorName } from '../ColorName';

export const ListItem = ({ color, colorSpaces, isEditing, onBlur, onUpdate, onDelete }: ItemProps) => {
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
        <div className="tw-group tw-relative tw-flex tw-shadow-t-inner-line tw-transition-all hover:tw-shadow-t-inner-line-strong">
            {!isEditing ? (
                <Tooltip
                    withArrow
                    position={TooltipPosition.Right}
                    hoverDelay={0}
                    content={<TooltipContent color={mappedFirstColorSpace.value ?? ''} status={status} />}
                    triggerElement={
                        <div
                            className="tw-w-[120px] tw-h-full tw-min-h-[60px] tw-mr-9 tw-cursor-pointer tw-shadow-t-inner-line tw-transition-all group-hover:tw-shadow-t-inner-line-strong"
                            style={{
                                backgroundColor: `#${color.hex}`,
                                opacity: (color.alpha && color.alpha / 255) || 1,
                            }}
                            onClick={() => copy(mappedFirstColorSpace.value ?? '')}
                        />
                    }
                />
            ) : (
                <ColorsBlockColorPicker
                    currentColor={color as Color}
                    onConfirm={(color) => {
                        onUpdate({ ...color, alpha: (color.alpha && Math.round(color.alpha * 255)) || 255 });
                    }}
                >
                    <div
                        className="tw-w-[120px] tw-min-h-[60px] tw-mr-9 tw-shadow-t-inner-line tw-transition-all group-hover:tw-shadow-t-inner-line-strong"
                        style={{
                            backgroundColor: `#${color.hex}`,
                            opacity: (color.alpha && color.alpha / 255) || 1,
                        }}
                    ></div>
                </ColorsBlockColorPicker>
            )}

            <ColorName
                viewType={ColorBlockType.List}
                initialColorName={color.name || ''}
                isEditing={isEditing}
                onBlur={onBlur}
            />

            <div className="tw-flex tw-items-center tw-flex-wrap tw-grow tw-gap-y-2.5 tw-w-[calc(100% - 306px)] tw-py-5">
                {colorSpaces?.map((colorSpaceId) => {
                    const mappedColorSpace = mapColorSpaces(colorSpaceId, color);

                    return (
                        <div key={colorSpaceId} className="tw-flex tw-items-center tw-w-1/3">
                            <div>
                                <Badge size="s" emphasis={BadgeEmphasis.None}>
                                    {mappedColorSpace.label}
                                </Badge>
                            </div>

                            {!isEditing ? (
                                <Tooltip
                                    withArrow
                                    position={TooltipPosition.Right}
                                    hoverDelay={0}
                                    content={<TooltipContent color={mappedColorSpace.value ?? ''} status={status} />}
                                    triggerElement={
                                        <div
                                            className="tw-ml-3 tw-cursor-pointer tw-text-s tw-text-black-80"
                                            onClick={() => copy(mappedColorSpace.value ?? '')}
                                        >
                                            {mappedColorSpace.value}
                                        </div>
                                    }
                                />
                            ) : (
                                <div className="tw-ml-3 ">
                                    {['CMYK', 'HEX', 'RGB'].includes(mappedColorSpace.label) ? (
                                        <div className="tw-text-s tw-text-black-80">
                                            {mappedColorSpace.value || mappedColorSpace.placeholder}
                                        </div>
                                    ) : (
                                        <input
                                            name={colorSpaceId}
                                            className="tw-w-full tw-h-5 tw-outline-none"
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
                                </div>
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
                        <Button
                            icon={<IconTrashBin size={IconSize.Size20} />}
                            style={ButtonStyle.Secondary}
                            onClick={() => onDelete(color.id)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
