/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';

import {
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
import { ColorsBlockColorPicker } from '../ColorsBlockColorPicker';

export const CardsItem: FC<ItemProps> = ({ color, colorSpaces, isEditing }) => {
    const { designTokens } = useGuidelineDesignTokens();

    const { copy, status } = useCopy();

    return (
        <div className="tw-group tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded tw-shadow-inner-line tw-transition-all hover:tw-shadow-inner-line-strong">
            {!isEditing ? (
                <Tooltip
                    withArrow
                    position={TooltipPosition.Right}
                    hoverDelay={0}
                    content={<TootlipContent color={color} status={status} />}
                    triggerElement={
                        <div
                            className="tw-relative tw-z-[1] tw-w-full tw-h-[60px] tw-cursor-pointer tw-rounded-t tw-shadow-inner-line tw-transition-all group-hover:tw-shadow-inner-line-strong"
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
                        className="tw-relative tw-w-full tw-h-[60px] tw-rounded-t tw-shadow-inner-line tw-transition-all group-hover:tw-shadow-inner-line-strong"
                        style={{
                            backgroundColor: color,
                        }}
                    >
                        <div
                            className={joinClassNames([
                                'tw-absolute tw-z-[2] tw-hidden tw-top-1 tw-right-1 tw-transition-all',
                                isEditing && 'group-hover:tw-block',
                            ])}
                        >
                            <Button icon={<IconTrash size={IconSize.Size20} />} style={ButtonStyle.Secondary} />
                        </div>
                    </div>
                </ColorsBlockColorPicker>
            )}

            <div className="tw-pt-4 tw-px-6 tw-pb-5">
                <div className="tw-relative tw-z-[1] tw-w-[100px] tw-mb-3 tw-text-m tw-text-black tw-font-bold">
                    <RichTextEditor designTokens={designTokens ?? undefined} readonly={!isEditing} />
                </div>

                {colorSpaces?.map((colorSpaceID: string) => {
                    const mappedColorSpace = mapColorSpaces(colorSpaceID);

                    return (
                        <div key={colorSpaceID} className="tw-flex tw-items-center tw-mb-1 last:tw-mb-0">
                            <div className="tw-mr-1 tw-text-s tw-text-black-70">{mappedColorSpace.value}</div>

                            {!isEditing ? (
                                <Tooltip
                                    withArrow
                                    position={TooltipPosition.Right}
                                    hoverDelay={0}
                                    content={<TootlipContent color={color} status={status} />}
                                    triggerElement={
                                        <div
                                            className="tw-relative tw-z-[1] tw-cursor-pointer tw-text-s tw-text-black-80"
                                            onClick={() => copy(color)}
                                        >
                                            {mappedColorSpace.placeholder}
                                        </div>
                                    }
                                />
                            ) : (
                                <div className="tw-text-s tw-text-black-80">{mappedColorSpace.placeholder}</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
