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
        <div data-test-id="upload-placeholder">
            <BlockInjectButton
                label="Add or drop your audio asset here"
                icon={<IconPlus24 />}
                onUploadClick={onUploadClick}
                onAssetChooseClick={onAssetChooseClick}
                onDrop={onFilesDrop}
                isLoading={loading}
            />
        </div>
    );
};
