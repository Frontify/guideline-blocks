/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { Badge, BadgeEmphasis, IconPlus, IconSize, RichTextEditor } from '@frontify/fondue';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

import { ItemAddProps } from '../../types';
import { mapColorSpaces } from '../../helpers/mapColorSpaces';
import { ColorsBlockColorPicker } from '../ColorsBlockColorPicker';

export const ListItemAdd: FC<ItemAddProps> = ({ colorSpaces, isEditing }) => {
    const { designTokens } = useGuidelineDesignTokens();

    return (
        <div
            key={4}
            className="tw-relative tw-w-full tw-flex before:tw-absolute before:tw-top-0 before:tw-left-0 before:tw-w-full before:tw-h-full before:tw-content-[''] before:tw-shadow-inset-top after:tw-absolute after:tw-top-0 after:tw-left-0 after:tw-w-full after:tw-h-full after:tw-content-[''] after:tw-shadow-inset-bottom"
        >
            <ColorsBlockColorPicker onSelect={(value) => console.log(value)}>
                <div className="tw-flex tw-justify-center tw-items-center tw-w-[120px] tw-min-h-[60px] tw-mr-9 tw-cursor-pointer tw-text-black tw-bg-gray-add-button tw-shadow-inset-list-add">
                    <IconPlus size={IconSize.Size24} />
                </div>
            </ColorsBlockColorPicker>

            <div className="tw-relative tw-z-[1] tw-flex tw-items-center tw-w-[100px] tw-py-4 tw-mr-12 tw-text-m tw-text-black tw-font-bold">
                <RichTextEditor
                    designTokens={designTokens ?? undefined}
                    readonly={!isEditing}
                    placeholder="Color Name"
                />
            </div>

            <div className="tw-flex tw-items-center tw-flex-wrap tw-gap-y-2.5 tw-w-list-color-types tw-py-5">
                {colorSpaces?.map((colorSpaceID: string) => {
                    const mappedColorSpace = mapColorSpaces(colorSpaceID);

                    return (
                        <div key={colorSpaceID} className="tw-flex tw-items-center tw-w-1/3">
                            <Badge size="s" emphasis={BadgeEmphasis.None}>
                                {mappedColorSpace.value}
                            </Badge>

                            <div className="tw-ml-3 tw-text-s tw-text-black-50">{mappedColorSpace.placeholder}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
