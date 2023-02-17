/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import { Button, ButtonEmphasis, ButtonRounding, ButtonSize, IconCross16 } from '@frontify/fondue';
import { Asset } from '@frontify/app-bridge';

type ThumbnailItemProps = {
    asset: Asset;
    isEditing: boolean;
    onRemoveAsset: (assetId: number) => void;
    thumbnailStyle: React.CSSProperties;
};

export const ThumbnailItem: FC<ThumbnailItemProps> = ({ asset, isEditing, onRemoveAsset, thumbnailStyle }) => {
    return (
        <div className="tw-aspect-square tw-group tw-relative">
            <img
                className="tw-object-scale-down tw-w-full tw-h-full"
                src={asset.previewUrl}
                style={thumbnailStyle}
                alt={asset.title}
            />
            {isEditing && (
                <div className="tw-hidden group-hover:tw-block tw-absolute tw-top-0.5 tw-right-0.5">
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
