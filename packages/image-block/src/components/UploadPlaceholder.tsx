/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus24, IconLink24 } from '@frontify/fondue';
import { BlockInjectButton } from '@frontify/guideline-blocks-settings';
import { UrlInjectButton } from './UrlInjectButton';

type UploadPlaceholderProps = {
    onUploadClick: () => void;
    onFilesDrop: (files: FileList) => void;
    onAssetChooseClick: () => void;
    loading: boolean;
    onUrlSubmit: (url: string) => void;

};

export const UploadPlaceholder = ({
    onUploadClick,
    onFilesDrop,
    onAssetChooseClick,
    onUrlSubmit,
    loading,
}: UploadPlaceholderProps) => {
    return (
        <div className="mod block tw-w-full flex flex-row tw-gap-3">
            <div className="block tw-h-64 tw-w-1/2">
                <BlockInjectButton
                    label="Add or drop your image here"
                    icon={<IconPlus24 />}
                    fillParentContainer={true}
                    onUploadClick={onUploadClick}
                    onAssetChooseClick={onAssetChooseClick}
                    onDrop={onFilesDrop}
                    isLoading={loading}
                />
            </div>
            <div className="block tw-h-64 tw-w-1/2">
                <UrlInjectButton
                    label="Enter a URL"
                    icon={<IconLink24 />}
                    fillParentContainer={true}
                    // onUploadClick={onUploadClick}
                    // onAssetChooseClick={onAssetChooseClick}
                    isLoading={loading}
                    onUrlSubmit={onUrlSubmit}
                />
            </div>
        </div>
    );
};
