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

import { mapColorSpaces } from '../../helpers/mapColorSpaces';
import { ItemProps } from '../../types';
import { TooltipContent } from '../TooltipContent';
import { ColorsBlockColorPicker } from '../ColorsBlockColorPicker';
import { useState } from 'react';

export const DropsItem = ({ color, colorSpaces, isEditing, onBlur, onConfirm, onDelete }: ItemProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    const { copy, status } = useCopy();

    const [colorName, setColorName] = useState<string>(color.name ?? '');

    const handleColorNameChange = (value: string) => setColorName(value);

    const mappedFirstColorSpace = mapColorSpaces(colorSpaces[0], color);

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
                            }}
                            onClick={() => copy(mappedFirstColorSpace.value ?? '')}
                        ></div>
                    }
                />
            ) : (
                <ColorsBlockColorPicker currentColor={color} onConfirm={onConfirm}>
                    <div
                        className="tw-relative tw-w-[100px] tw-h-[100px] tw-rounded-full tw-mb-3 tw-shadow-inner-line tw-transition-all group-hover:tw-shadow-inner-line-strong"
                        style={{
                            backgroundColor: `#${color.hex}`,
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
                                onClick={() => {
                                    onDelete(color.id);
                                }}
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

            {colorSpaces?.map((colorSpaceID: string) => {
                const mappedColorSpace = mapColorSpaces(colorSpaceID, color);

                return (
                    <div key={colorSpaceID} className="tw-flex tw-items-center tw-mb-1 last:tw-mb-0">
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
                            <div className="tw-text-s tw-text-black-80">{mappedColorSpace.value}</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
