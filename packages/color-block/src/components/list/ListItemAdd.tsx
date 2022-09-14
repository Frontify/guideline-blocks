/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Badge, BadgeEmphasis, IconPlus, IconSize, RichTextEditor } from '@frontify/fondue';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

import { ItemAddProps } from '../../types';
import { mapColorSpaces } from '../../helpers/mapColorSpaces';
import { ColorsBlockColorPicker } from '../ColorsBlockColorPicker';

export const ListItemAdd = ({ colorSpaces, onConfirm }: ItemAddProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    return (
        <div className="tw-group tw-relative tw-w-full tw-flex tw-ml-[1px] tw-shadow-inner-line hover:tw-shadow-inner-line-strong">
            <ColorsBlockColorPicker onConfirm={onConfirm}>
                <div className="tw-flex tw-justify-center tw-items-center tw-w-[120px] tw-min-h-[60px] tw-mr-9 tw-ml-[-1px] tw-cursor-pointer tw-text-black tw-bg-button-background tw-shadow-inner-line group:tw-shadow-inner-line-strong">
                    <IconPlus size={IconSize.Size24} />
                </div>
            </ColorsBlockColorPicker>

            <div className="tw-flex tw-items-center tw-w-[100px] tw-py-4 tw-mr-12 tw-text-m tw-text-black tw-font-bold">
                <RichTextEditor designTokens={designTokens ?? undefined} readonly placeholder="Color Name" />
            </div>

            <div className="tw-flex tw-items-center tw-flex-wrap tw-grow tw-gap-y-2.5 tw-w-[calc(100% - 306px)] tw-py-5">
                {colorSpaces?.map((colorSpaceId) => {
                    const mappedColorSpace = mapColorSpaces(colorSpaceId);

                    return (
                        <div key={colorSpaceId} className="tw-flex tw-items-center tw-w-1/3">
                            <Badge size="s" emphasis={BadgeEmphasis.None}>
                                {mappedColorSpace.label}
                            </Badge>

                            <div className="tw-ml-3 tw-text-s tw-text-black-50 tw-pointer-events-none">
                                {mappedColorSpace.placeholder}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
