/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconLink24, IconPlus24 } from '@frontify/fondue';
// import { BlockInjectButton } from '@frontify/guideline-blocks-settings';
import { BlockInjectButton } from './BlockInjectButton';
import { UrlInjectButton } from './UrlInjectButton';

type UploadPlaceholderProps = {
    onUploadClick: () => void;
    onFilesDrop: (files: FileList) => void;
    onAssetChooseClick: () => void;
    urlLoading: boolean;
    fileLoading: boolean;
    onUrlSubmit: (url: string) => void;
};

export const UploadPlaceholder = ({
    onUploadClick,
    onFilesDrop,
    onAssetChooseClick,
    onUrlSubmit,
    urlLoading,
    fileLoading,
}: UploadPlaceholderProps) => {
    return (
        <div className="tw-w-full tw-flex tw-flex-row tw-border tw-rounded">
            <div className="tw-h-48 md:tw-w-1/2 sm:tw-w-full">
                <BlockInjectButton
                    label="Add or drop your image here"
                    icon={<IconPlus24 />}
                    fillParentContainer={true}
                    onUploadClick={onUploadClick}
                    onAssetChooseClick={onAssetChooseClick}
                    onDrop={onFilesDrop}
                    isLoading={fileLoading}
                    isDisabled={urlLoading}
                />
            </div>
            <div className="block tw-h-48 tw-h-48 md:tw-w-1/2 sm:tw-w-full">
                <UrlInjectButton
                    label="Enter a URL"
                    icon={<IconLink24 />}
                    fillParentContainer={true}
                    isLoading={urlLoading}
                    isDisabled={fileLoading}
                    onUrlSubmit={onUrlSubmit}
                />
            </div>
        </div>
    );
};
