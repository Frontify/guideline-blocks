/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus } from '@frontify/fondue/icons';
import { BlockInjectButton } from '@frontify/guideline-blocks-settings';
import { ReactElement } from 'react';

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
}: UploadPlaceholderProps): ReactElement => (
    <div className="tw-h-full tw-w-full tw-grid tw-aspect-square" data-test-id="thumbnail-image-placeholder">
        <BlockInjectButton
            icon={<IconPlus />}
            fillParentContainer={true}
            onUploadClick={openFileDialog}
            onDrop={onFilesDrop}
            onAssetChooseClick={openAssetChooser}
            isLoading={isLoading}
            validFileType="Images"
        />
    </div>
);
