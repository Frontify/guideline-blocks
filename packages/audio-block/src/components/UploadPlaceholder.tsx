/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus24 } from '@frontify/fondue';
import { BlockInjectButton } from '@frontify/guideline-blocks-shared';
import { UploadPlaceholderProps } from '../types';

export const UploadPlaceholder = ({
    onUploadClick,
    onAssetChooseClick,
    loading,
    setDroppedFiles,
}: UploadPlaceholderProps) => {
    return (
        <div data-test-id="upload-placeholder">
            <BlockInjectButton
                label="Add audio asset"
                icon={<IconPlus24 />}
                secondaryLabel="Or drop it here"
                onUploadClick={onUploadClick}
                onAssetChooseClick={onAssetChooseClick}
                onDrop={setDroppedFiles}
                isLoading={loading}
            />
        </div>
    );
};
