/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';
import { IconArrowCircleUp20, IconImageStack20, IconTrashBin16, LoadingCircle } from '@frontify/fondue';
import { BlockItemWrapper } from '@frontify/guideline-blocks-shared';
import { ReactElement } from 'react';

type AudioPlayerProps = {
    audio: Asset;
    isEditing: boolean;
    isLoading: boolean;
    openFileDialog: () => void;
    openAssetChooser: () => void;
    onRemoveAsset: () => void;
};

export const AudioPlayer = ({
    audio,
    isEditing,
    isLoading,
    openFileDialog,
    openAssetChooser,
    onRemoveAsset,
}: AudioPlayerProps): ReactElement => (
    <BlockItemWrapper
        shouldHideWrapper={!isEditing}
        toolbarFlyoutItems={[
            [
                {
                    title: 'Replace with upload',
                    icon: <IconArrowCircleUp20 />,
                    onClick: openFileDialog,
                },
                {
                    title: 'Replace with asset',
                    icon: <IconImageStack20 />,
                    onClick: openAssetChooser,
                },
            ],
        ]}
        toolbarItems={[{ icon: <IconTrashBin16 />, tooltip: 'Delete Item', onClick: () => onRemoveAsset() }]}
    >
        {isLoading ? (
            <div className="tw-flex tw-items-center tw-justify-center tw-h-14">
                <LoadingCircle />
            </div>
        ) : (
            <audio
                data-test-id="audio-block-audio-tag"
                key={audio.id}
                controls
                className="tw-w-full tw-outline-none"
                controlsList="nodownload"
                preload="metadata"
                src={audio.genericUrl}
            />
        )}
    </BlockItemWrapper>
);
