/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus, IconSize, RichTextEditor } from '@frontify/fondue';
import { useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';

import { ItemAddProps } from '../../types';
import { mapColorSpaces } from '../../helpers/mapColorSpaces';
import { ColorPickerFlyout } from '../ColorPickerFlyout';

export const CardsItemAdd = ({ colorSpaces, onConfirm }: ItemAddProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    return (
        <div className="tw-group tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded tw-shadow-inner-line hover:tw-shadow-inner-line-strong">
            <ColorPickerFlyout onConfirm={onConfirm}>
                <div className="tw-flex tw-justify-center tw-items-center tw-w-full tw-h-[60px] tw-cursor-pointer tw-text-black tw-bg-button-background tw-rounded-t tw-shadow-inner-line tw-transition-all group-hover:tw-shadow-inner-line-strong">
                    <IconPlus size={IconSize.Size24} />
                </div>
            </ColorPickerFlyout>

            <div className="tw-pt-4 tw-px-6 tw-pb-5">
                <div className="tw-w-[100px] tw-mb-3 tw-text-m tw-text-black tw-font-bold">
                    <RichTextEditor designTokens={designTokens ?? undefined} readonly placeholder="Color Name" />
                </div>

                {colorSpaces?.map((colorSpaceId) => {
                    const mappedColorSpace = mapColorSpaces(colorSpaceId);

                    return (
                        <div key={colorSpaceId} className="tw-flex tw-items-center tw-mb-1 last:tw-mb-0">
                            <div className="tw-mr-1 tw-text-s tw-text-black-50">{mappedColorSpace.label}</div>

                            <div className="tw-text-s tw-text-black-50">{mappedColorSpace.placeholder}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
