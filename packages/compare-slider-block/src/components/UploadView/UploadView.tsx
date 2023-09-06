/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPlus24 } from '@frontify/fondue';
import { BlockInjectButton, joinClassNames } from '@frontify/guideline-blocks-settings';
import { Alignment, SliderImageSlot, UploadViewProps } from '../../types';

export const UploadView = ({
    alignment,
    firstAssetPreviewUrl,
    secondAssetPreviewUrl,
    openAssetChooser,
    startFileDialogUpload,
    startDragAndDropUpload,
    isFirstAssetLoading,
    isSecondAssetLoading,
}: UploadViewProps) => {
    return (
        <div
            className={joinClassNames([
                'tw-grid tw-w-full',
                alignment === Alignment.Vertical ? 'tw-grid-cols-1 tw-grid-rows-2' : 'tw-grid-cols-2',
            ])}
        >
            {firstAssetPreviewUrl ? (
                <img
                    loading="lazy"
                    className="tw-w-full tw-h-full tw-object-cover tw-object-left"
                    src={firstAssetPreviewUrl}
                />
            ) : (
                <BlockInjectButton
                    verticalLayout={alignment === Alignment.Vertical}
                    label="Add or drop image here"
                    icon={<IconPlus24 />}
                    fillParentContainer={true}
                    onUploadClick={() => startFileDialogUpload(SliderImageSlot.First)}
                    onAssetChooseClick={() => openAssetChooser(SliderImageSlot.First)}
                    onDrop={(files) => startDragAndDropUpload(files, SliderImageSlot.First)}
                    isLoading={isFirstAssetLoading}
                />
            )}

            {secondAssetPreviewUrl ? (
                <img
                    loading="lazy"
                    className="tw-w-full tw-h-full tw-object-cover tw-object-right"
                    src={secondAssetPreviewUrl}
                />
            ) : (
                <BlockInjectButton
                    verticalLayout={alignment === Alignment.Vertical}
                    label="Add or drop image here"
                    icon={<IconPlus24 />}
                    fillParentContainer={true}
                    onUploadClick={() => startFileDialogUpload(SliderImageSlot.Second)}
                    onAssetChooseClick={() => openAssetChooser(SliderImageSlot.Second)}
                    onDrop={(files) => startDragAndDropUpload(files, SliderImageSlot.Second)}
                    isLoading={isSecondAssetLoading}
                />
            )}
        </div>
    );
};
