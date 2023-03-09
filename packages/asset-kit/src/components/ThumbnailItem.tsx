/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, ButtonRounding, ButtonSize, IconCross16 } from '@frontify/fondue';
import { ThumbnailItemProps } from '../types';

export const ThumbnailItem = ({ asset, isEditing, onRemoveAsset, thumbnailStyle }: ThumbnailItemProps) => {
    return (
        <div data-test-id="asset-kit-block-thumbnail" className="tw-aspect-square tw-group tw-relative">
            <img
                className="tw-object-scale-down tw-w-full tw-h-full"
                src={asset.previewUrl}
                style={thumbnailStyle}
                alt={asset.title}
            />
            {isEditing && (
                <div
                    className="tw-hidden group-hover:tw-block tw-absolute tw-top-0.5 tw-right-0.5"
                    data-test-id="asset-kit-block-remove-thumbnail"
                >
                    <Button
                        size={ButtonSize.Small}
                        rounding={ButtonRounding.Medium}
                        emphasis={ButtonEmphasis.Default}
                        icon={<IconCross16 />}
                        onClick={() => onRemoveAsset(asset.id)}
                    />
                </div>
            )}
        </div>
    );
};
