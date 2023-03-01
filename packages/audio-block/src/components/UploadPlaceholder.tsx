/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus24 } from '@frontify/fondue';
import { BlockInjectButton } from '@frontify/guideline-blocks-shared';
import { UploadPlaceholderProps } from '../types';

export const UploadPlaceholder = ({
    onUploadClick,
    onFilesDrop,
    onAssetChooseClick,
    loading,
}: UploadPlaceholderProps) => {
    return (
        <BlockInjectButton
            label="Add audio asset"
            icon={<IconPlus24 />}
            secondaryLabel="Or drop it here"
            onUploadClick={onUploadClick}
            onAssetChooseClick={onAssetChooseClick}
            onDrop={onFilesDrop}
            isLoading={loading}
        />
    );
};
