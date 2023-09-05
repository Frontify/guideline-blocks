/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus24 } from '@frontify/fondue';
import { BlockInjectButton } from '@frontify/guideline-blocks-settings';

type UploadPlaceholderProps = {
    openFileDialog: () => void;
    onFilesDrop: (files: FileList, id?: string) => void;
    openAssetChooser: (id?: string) => void;
    isLoading: boolean;
    errorMsg?: string;
    width?: string;
};

export const UploadPlaceholder = ({
    isLoading,
    openAssetChooser,
    onFilesDrop,
    openFileDialog,
}: UploadPlaceholderProps) => (
    <div className="tw-h-full tw-w-full tw-grid tw-aspect-square" data-test-id="thumbnail-image-placeholder">
        <BlockInjectButton
            icon={<IconPlus24 />}
            fillParentContainer={true}
            onUploadClick={openFileDialog}
            onDrop={onFilesDrop}
            onAssetChooseClick={openAssetChooser}
            isLoading={isLoading}
            validFileType="Images"
        />
    </div>
);
