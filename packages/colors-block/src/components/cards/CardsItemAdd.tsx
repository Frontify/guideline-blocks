/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus, IconSize } from '@frontify/fondue';

import { ColorPickerFlyout } from '../ColorPickerFlyout';
import { mapColorSpaces } from '../../helpers/mapColorSpaces';
import { ItemAddProps } from '../../types';

export const CardsItemAdd = ({ colorSpaces, onConfirm }: ItemAddProps) => {
    return (
        <div
            data-test-id="cards-item-add"
            className="tw-group tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded tw-shadow-inner-line hover:tw-shadow-inner-line-x-strong"
        >
            <ColorPickerFlyout onConfirm={onConfirm}>
                <div
                    data-test-id="color-color-picker-flyout-trigger"
                    className="tw-flex tw-justify-center tw-items-center tw-w-full tw-h-[60px] tw-cursor-pointer tw-text-black tw-bg-button-background tw-rounded-t tw-shadow-inner-line tw-transition-all hover:tw-bg-button-background-hover group-hover:tw-shadow-inner-line-x-strong"
                >
                    <IconPlus size={IconSize.Size24} />
                </div>
            </ColorPickerFlyout>

            <div className="tw-pt-4 tw-px-6 tw-pb-5">
                <div className="tw-mb-3 tw-pointer-events-none tw-text-m tw-text-black-50 tw-font-bold">Color name</div>

                {colorSpaces?.map((colorSpaceId) => {
                    const mappedColorSpace = mapColorSpaces(colorSpaceId);

                    return (
                        <div key={colorSpaceId} className="tw-flex tw-items-center tw-mb-1 last:tw-mb-0">
                            <div className="tw-mr-1 tw-text-s tw-text-black-50">{mappedColorSpace.label}</div>

                            <div className="tw-pointer-events-none tw-text-s tw-text-black-50">
                                {mappedColorSpace.placeholder}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
