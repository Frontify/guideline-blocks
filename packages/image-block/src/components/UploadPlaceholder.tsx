/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconLink24, IconPlus24 } from '@frontify/fondue';
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
        <div className="tw-flex tw-flex-row tw-flex-wrap tw-w-full tw-border tw-rounded">
            <div className="tw-h-48 max-md:tw-w-full md:tw-w-1/2 lg:tw-w-1/2">
                <BlockInjectButton
                    label="Add or drop your Lottie here"
                    icon={<IconPlus24 />}
                    fillParentContainer={true}
                    onUploadClick={onUploadClick}
                    onAssetChooseClick={onAssetChooseClick}
                    onDrop={onFilesDrop}
                    isLoading={fileLoading}
                    isDisabled={urlLoading}
                />
            </div>
            <div className="tw-h-48 max-md:tw-w-full md:tw-w-1/2 lg:tw-w-1/2">
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
