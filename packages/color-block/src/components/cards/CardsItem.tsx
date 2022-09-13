/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Button,
    ButtonStyle,
    IconSize,
    IconTrashBin,
    RichTextEditor,
    Tooltip,
    TooltipPosition,
    useCopy,
} from '@frontify/fondue';
import { joinClassNames, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

import { ItemProps } from '../../types';
import { mapColorSpaces } from '../../helpers/mapColorSpaces';
import { TooltipContent } from '../TooltipContent';
import { ColorsBlockColorPicker } from '../ColorsBlockColorPicker';
import { FormEvent, useState } from 'react';

type ColorSpaceInputValues = {
    pantone: Nullable<string>;
    ral: Nullable<string>;
    oracal: Nullable<string>;
    pantone_coated: Nullable<string>;
    pantone_uncoated: Nullable<string>;
    cmyk_coated: Nullable<string>;
    cmyk_uncoated: Nullable<string>;
    cmyk_newspaper: Nullable<string>;
    ncs: Nullable<string>;
    pantone_cp: Nullable<string>;
    pantone_plastics: Nullable<string>;
    pantone_textile: Nullable<string>;
    hks: Nullable<string>;
    three_m: Nullable<string>;
    lab: Nullable<string>;
};

export const CardsItem = ({ color, colorSpaces, isEditing, onBlur, onUpdate, onDelete }: ItemProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    const { copy, status } = useCopy();

    const [colorName, setColorName] = useState<string>(color.name ?? '');

    const handleColorNameChange = (value: string) => setColorName(value);

    const mappedFirstColorSpace = mapColorSpaces(colorSpaces[0], color);

    const [colorSpaceInputValues, setColorSpaceInputValues] = useState<ColorSpaceInputValues>({
        pantone: color.pantone,
        ral: color.ral,
        oracal: color.oracal,
        pantone_coated: color.pantoneCoated,
        pantone_uncoated: color.pantoneUncoated,
        cmyk_coated: color.cmykCoated,
        cmyk_uncoated: color.cmykUncoated,
        cmyk_newspaper: color.cmykNewspaper,
        ncs: color.ncs,
        pantone_cp: color.pantoneCp,
        pantone_plastics: color.pantonePlastics,
        pantone_textile: color.pantoneTextile,
        hks: color.hks,
        three_m: color.threeM,
        lab: color.lab,
    });

    const handleColorSpaceValueChange = (event: FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;

        setColorSpaceInputValues((previousState) => ({ ...previousState, [name]: value }));
    };

    return (
        <div className="tw-group tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded tw-shadow-inner-line tw-transition-all hover:tw-shadow-inner-line-strong">
            {!isEditing ? (
                <Tooltip
                    withArrow
                    position={TooltipPosition.Right}
                    hoverDelay={0}
                    content={<TooltipContent color={mappedFirstColorSpace.value ?? ''} status={status} />}
                    triggerElement={
                        <div
                            className="tw-w-full tw-h-[60px] tw-cursor-pointer tw-rounded-t tw-shadow-inner-line tw-transition-all group-hover:tw-shadow-inner-line-strong"
                            style={{
                                backgroundColor: `#${color.hex}`,
                            }}
                            onClick={() => copy(mappedFirstColorSpace.value ?? '')}
                        ></div>
                    }
                />
            ) : (
                <ColorsBlockColorPicker currentColor={color} onConfirm={onUpdate}>
                    <div
                        className="tw-relative tw-w-full tw-h-[60px] tw-rounded-t tw-shadow-inner-line tw-transition-all group-hover:tw-shadow-inner-line-strong"
                        style={{
                            backgroundColor: `#${color.hex}`,
                        }}
                    >
                        <div
                            className={joinClassNames([
                                'tw-absolute tw-hidden tw-top-1 tw-right-1 tw-transition-all',
                                isEditing && 'group-hover:tw-block',
                            ])}
                        >
                            <Button
                                icon={<IconTrashBin size={IconSize.Size20} />}
                                style={ButtonStyle.Secondary}
                                onClick={() => {
                                    onDelete(color.id);
                                }}
                            />
                        </div>
                    </div>
                </ColorsBlockColorPicker>
            )}

            <div className="tw-pt-4 tw-px-6 tw-pb-5">
                <div className="tw-w-[100px] tw-mb-3 tw-text-m tw-text-black tw-font-bold">
                    <RichTextEditor
                        value={colorName}
                        onTextChange={handleColorNameChange}
                        designTokens={designTokens ?? undefined}
                        readonly={!isEditing}
                        onBlur={onBlur}
                    />
                </div>

                {colorSpaces?.map((colorSpaceId: string) => {
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
                                        content={
                                            <TooltipContent color={mappedColorSpace.value ?? ''} status={status} />
                                        }
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
                                        {mappedColorSpace.label === 'HEX' ||
                                        mappedColorSpace.label === 'RGB' ||
                                        mappedColorSpace.label === 'CMYK' ? (
                                            <div className="tw-text-s tw-text-black-80">
                                                {mappedColorSpace.value || mappedColorSpace.placeholder}
                                            </div>
                                        ) : (
                                            <input
                                                name={colorSpaceId}
                                                className="tw-w-full tw-h-4 tw-outline-none"
                                                type="text"
                                                value={
                                                    colorSpaceInputValues[
                                                        colorSpaceId as keyof ColorSpaceInputValues
                                                    ] || ''
                                                }
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
