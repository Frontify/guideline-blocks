/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus } from '@frontify/fondue/icons';
import { BlockInjectButton } from '@frontify/guideline-blocks-settings';

type UploadPlaceholderProps = {
    onUploadClick: () => void;
    onFilesDrop: (files: FileList) => void;
    onAssetChooseClick: () => void;
    loading: boolean;
};

export const UploadPlaceholder = ({
    onUploadClick,
    onFilesDrop,
    onAssetChooseClick,
    loading,
}: UploadPlaceholderProps) => {
    return (
        <div className="tw-h-64">
            <BlockInjectButton
                label="Add or drop your image here"
                icon={<IconPlus size={24} />}
                fillParentContainer
                onUploadClick={onUploadClick}
                onAssetChooseClick={onAssetChooseClick}
                onDrop={onFilesDrop}
                isLoading={loading}
            />
        </div>
    );
};
