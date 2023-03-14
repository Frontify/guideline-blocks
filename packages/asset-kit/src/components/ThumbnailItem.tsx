/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, ButtonRounding, ButtonSize, IconCross16 } from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { useFocusRing } from '@react-aria/focus';
import { ThumbnailItemProps } from '../types';

export const ThumbnailItem = ({ asset, isEditing, onRemoveAsset, thumbnailStyle }: ThumbnailItemProps) => {
    const { isFocused, focusProps } = useFocusRing();
    return (
        <div
            {...focusProps}
            tabIndex={0}
            data-test-id="asset-kit-block-thumbnail"
            className="tw-aspect-square tw-group tw-relative"
        >
            <img
                className="tw-object-scale-down tw-w-full tw-h-full"
                src={asset.previewUrl}
                style={thumbnailStyle}
                alt={asset.title}
            />
            {isEditing ? (
                <div
                    className={joinClassNames([
                        'group-hover:tw-visible tw-absolute tw-top-0.5 tw-right-0.5',
                        (isFocused && 'tw-visible') || 'tw-invisible',
                    ])}
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
            ) : null}
        </div>
    );
};
