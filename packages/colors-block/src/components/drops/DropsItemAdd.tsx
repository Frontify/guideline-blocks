/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus, IconSize } from '@frontify/fondue';

import { ColorPickerFlyout } from '../ColorPickerFlyout';
import { mapColorSpaces } from '../../helpers/mapColorSpaces';
import { ItemAddProps } from '../../types';

export const DropsItemAdd = ({ colorSpaces, onConfirm }: ItemAddProps) => {
    return (
        <div data-test-id="drops-item-add" className="tw-flex tw-flex-col tw-items-center">
            <ColorPickerFlyout onConfirm={onConfirm}>
                <div
                    data-test-id="color-color-picker-flyout-trigger"
                    className="tw-flex tw-justify-center tw-items-center tw-w-[100px] tw-h-[100px] tw-mx-auto tw-cursor-pointer tw-rounded-full tw-mb-3 tw-text-black tw-bg-button-background tw-shadow-inner-line tw-transition-all hover:tw-bg-button-background-hover hover:tw-shadow-inner-line-x-strong"
                >
                    <IconPlus size={IconSize.Size24} />
                </div>
            </ColorPickerFlyout>

            <div className="tw-mb-3 tw-pointer-events-none tw-text-m tw-font-bold tw-text-black-50">Color name</div>

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
    );
};
