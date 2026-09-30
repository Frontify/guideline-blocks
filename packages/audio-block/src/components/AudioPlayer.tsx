/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Asset } from '@frontify/app-bridge';
import { LoadingCircle } from '@frontify/fondue/components';
import { IconArrowCircleUp, IconImageStack, IconTrashBin } from '@frontify/fondue/icons';
import { BlockItemWrapper } from '@frontify/guideline-blocks-settings';
import { type ReactElement } from 'react';

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
}: AudioPlayerProps): ReactElement => {
    return (
        <BlockItemWrapper
            shouldHideWrapper={!isEditing}
            showAttachments
            toolbarItems={[
                { type: 'button', icon: <IconTrashBin size={16} />, tooltip: 'Delete item', onClick: onRemoveAsset },
                {
                    type: 'menu',
                    items: [
                        [
                            {
                                title: 'Replace with upload',
                                icon: <IconArrowCircleUp size={20} />,
                                onClick: openFileDialog,
                            },
                            {
                                title: 'Replace with asset',
                                icon: <IconImageStack size={20} />,
                                onClick: openAssetChooser,
                            },
                        ],
                    ],
                },
            ]}
        >
            {isLoading ? (
                <div className="tw-flex tw-items-center tw-justify-center tw-h-14">
                    <LoadingCircle />
                </div>
            ) : (
                // oxlint-disable-next-line jsx-a11y-x/media-has-caption
                <audio
                    data-test-id="audio-block-audio-tag"
                    key={audio.id}
                    controls
                    className="tw-w-full tw-outline-none focus-visible:tw-ring-4 focus-visible:tw-ring-blue focus-visible:tw-ring-offset-2 focus-visible:dark:tw-ring-offset-black focus-visible:tw-outline-none"
                    controlsList="nodownload"
                    preload="metadata"
                >
                    <source src={audio.genericUrl} />
                </audio>
            )}
        </BlockItemWrapper>
    );
};
