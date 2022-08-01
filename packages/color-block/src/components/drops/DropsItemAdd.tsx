/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';

import { IconPlus, IconSize, RichTextEditor } from '@frontify/fondue';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

import { ItemAddProps } from '../../types';
import { mapColorSpaces } from '../../helpers/mapColorSpaces';
import { ColorsBlockColorPicker } from '../ColorsBlockColorPicker';

export const DropsItemAdd: FC<ItemAddProps> = ({ colorSpaces, isEditing }: ItemAddProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    return (
        <div className="tw-flex tw-flex-col tw-items-center">
            <ColorsBlockColorPicker onSelect={(value) => console.log(value)}>
                <div className="tw-flex tw-justify-center tw-items-center tw-w-[100px] tw-h-[100px] tw-mx-auto tw-cursor-pointer tw-rounded-full tw-mb-3 tw-text-black tw-bg-gray-add-button">
                    <IconPlus size={IconSize.Size24} />
                </div>
            </ColorsBlockColorPicker>

            <div className="tw-flex tw-w-[100px] tw-mb-3 tw-text-m tw-font-bold tw-text-black tw-text-center">
                <RichTextEditor
                    designTokens={designTokens ?? undefined}
                    readonly={!isEditing}
                    placeholder="Color Name"
                />
            </div>

            {colorSpaces?.map((colorSpaceID: string) => {
                const mappedColorSpace = mapColorSpaces(colorSpaceID);

                return (
                    <div key={colorSpaceID} className="tw-flex tw-items-center tw-mb-1 last:tw-mb-0">
                        <div className="tw-mr-1 tw-text-s tw-text-black-50">{mappedColorSpace.value}</div>

                        <div className="tw-text-s tw-text-black-50">{mappedColorSpace.placeholder}</div>
                    </div>
                );
            })}
        </div>
    );
};
