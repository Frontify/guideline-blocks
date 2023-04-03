/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus24 } from '@frontify/fondue';
import { BlockInjectButton } from '@frontify/guideline-blocks-shared';

type UploadPlaceholderProps = {
    onUploadClick: () => void;
    onFilesDrop: (files: FileList) => void;
    onAssetChooseClick: () => void;
    loading: boolean;
    errorMsg?: string;
};

export const UploadPlaceholder = ({
    onUploadClick,
    onFilesDrop,
    onAssetChooseClick,
    loading,
    errorMsg,
}: UploadPlaceholderProps) => {
    return (
        <div className="tw-h-64">
            <BlockInjectButton
                label="Add or drop your image here"
                icon={<IconPlus24 />}
                fillParentContainer={true}
                onUploadClick={onUploadClick}
                onAssetChooseClick={onAssetChooseClick}
                onDrop={onFilesDrop}
                isLoading={loading}
            />
            {errorMsg && <p className="tw-text-red-60">{errorMsg}</p>}
        </div>
    );
};
