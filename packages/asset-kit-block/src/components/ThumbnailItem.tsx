/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useKeyboard } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { ThumbnailItemProps } from '../types';
import { ThumbnailToolbar } from '.';
import { LoadingCircle } from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
export const ThumbnailItem = ({
    asset,
    isEditing,
    appBridge,
    onRemoveAsset,
    onReplaceAsset,
    thumbnailStyle,
}: ThumbnailItemProps) => {
    const { isFocused, focusProps } = useFocusRing();
    const [isUploading, setIsUploading] = useState(false);

    const { keyboardProps } = useKeyboard({
        onKeyUp: (event) => {
            if ((event.key === 'Backspace' || event.key === 'Delete') && isEditing && isFocused) {
                onRemoveAsset(asset.id);
            }
        },
    });

    return (
        <div
            {...mergeProps(focusProps, keyboardProps)}
            tabIndex={0}
            data-test-id="block-thumbnail"
            className={joinClassNames([
                'tw-aspect-square tw-group tw-relative tw-outline-1 tw-outline-offset-1 tw-outline-box-selected-inverse focus:tw-outline ',
                isEditing && 'hover:tw-outline',
            ])}
        >
            <>
                {isUploading ? (
                    <div className="tw-relative tw-w-full tw-h-full" style={thumbnailStyle}>
                        <div className="tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-y-1/2 -tw-translate-x-1/2">
                            <LoadingCircle />
                        </div>
                    </div>
                ) : (
                    <img
                        data-test-id="block-thumbnail-image"
                        className="tw-object-scale-down tw-w-full tw-h-full"
                        src={asset.previewUrl}
                        style={thumbnailStyle}
                        alt={asset.title}
                    />
                )}

                {isEditing ? (
                    <ThumbnailToolbar
                        appBridge={appBridge}
                        asset={asset}
                        isFocused={isFocused}
                        onRemoveAsset={onRemoveAsset}
                        onReplaceAsset={onReplaceAsset}
                        setIsUploading={setIsUploading}
                        isUploading={isUploading}
                    />
                ) : null}
            </>
        </div>
    );
};
