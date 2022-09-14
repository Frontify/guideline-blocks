/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Button,
    ButtonStyle,
    Color,
    IconSize,
    IconTrashBin,
    RichTextEditor,
    Tooltip,
    TooltipPosition,
    useCopy,
} from '@frontify/fondue';
import { joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

import { mapColorSpaces } from '../../helpers/mapColorSpaces';
import { ColorSpaceInputValues, ItemProps } from '../../types';
import { TooltipContent } from '../TooltipContent';
import { ColorsBlockColorPicker } from '../ColorsBlockColorPicker';
import { FormEvent, useState } from 'react';

export const DropsItem = ({ color, colorSpaces, isEditing, onBlur, onUpdate, onDelete }: ItemProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    const { copy, status } = useCopy();

    const [colorName, setColorName] = useState<string>(color.name ?? '');

    const handleColorNameChange = (value: string) => setColorName(value);

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
        <div key={color.id} className="tw-group tw-flex tw-flex-col tw-items-center">
            {!isEditing ? (
                <Tooltip
                    withArrow
                    position={TooltipPosition.Right}
                    hoverDelay={0}
                    content={<TooltipContent color={mappedFirstColorSpace.value ?? ''} status={status} />}
                    triggerElement={
                        <div
                            className="tw-relative tw-w-[100px] tw-h-[100px] tw-rounded-full tw-mb-3 tw-cursor-pointer tw-shadow-inner-line tw-transition-all group-hover:tw-shadow-inner-line-strong"
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
                        className="tw-relative tw-w-[100px] tw-h-[100px] tw-rounded-full tw-mb-3 tw-shadow-inner-line tw-transition-all group-hover:tw-shadow-inner-line-strong"
                        style={{
                            backgroundColor: `#${color.hex}`,
                            opacity: (color.alpha && color.alpha / 255) || 1,
                        }}
                    >
                        <div
                            className={joinClassNames([
                                'tw-absolute tw-hidden tw-top-[-0.25rem] tw-right-[-0.25rem]',
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
                </ColorsBlockColorPicker>
            )}

            <div className="tw-flex tw-w-[100px] tw-mb-3 tw-text-m tw-font-bold tw-text-black tw-text-center">
                <RichTextEditor
                    value={colorName}
                    onTextChange={handleColorNameChange}
                    designTokens={designTokens ?? undefined}
                    readonly={!isEditing}
                    onBlur={onBlur}
                />
            </div>

            {colorSpaces?.map((colorSpaceId) => {
                const mappedColorSpace = mapColorSpaces(colorSpaceId, color);

                return (
                    <div key={colorSpaceId} className="tw-flex tw-items-center tw-mb-1 last:tw-mb-0">
                        <div className="tw-flex tw-items-center">
                            <div className="tw-mr-1 tw-text-s tw-text-black-70">{mappedColorSpace.label}</div>

                            {!isEditing ? (
                                <Tooltip
                                    withArrow
                                    position={TooltipPosition.Right}
                                    hoverDelay={0}
                                    content={<TooltipContent color={mappedColorSpace.value ?? ''} status={status} />}
                                    triggerElement={
                                        <div
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
    );
};
