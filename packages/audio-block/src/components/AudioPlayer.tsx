/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';
import {
    FOCUS_VISIBLE_STYLE,
    IconArrowCircleUp20,
    IconImageStack20,
    IconTrashBin16,
    LoadingCircle,
} from '@frontify/fondue';
import { BlockItemWrapper, joinClassNames } from '@frontify/guideline-blocks-settings';
import { ReactElement } from 'react';

type AudioPlayerProps = {
    audio: Asset;
    caption: null | Asset;
    isEditing: boolean;
    isLoading: boolean;
    openFileDialog: () => void;
    openAssetChooser: () => void;
    onRemoveAsset: () => void;
};

export const AudioPlayer = ({
    audio,
    caption,
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
                { type: 'button', icon: <IconTrashBin16 />, tooltip: 'Delete item', onClick: onRemoveAsset },
                {
                    type: 'menu',
                    items: [
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
                    ],
                },
            ]}
        >
            {isLoading ? (
                <div className="tw-flex tw-items-center tw-justify-center tw-h-14">
                    <LoadingCircle />
                </div>
            ) : (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <audio
                    data-test-id="audio-block-audio-tag"
                    key={audio.id}
                    controls
                    className={joinClassNames(['tw-w-full tw-outline-none', FOCUS_VISIBLE_STYLE])}
                    controlsList="nodownload"
                    preload="metadata"
                >
                    <source src={audio.genericUrl} />
                    {caption && <track src={caption?.originUrl} kind="captions" />}
                </audio>
            )}
        </BlockItemWrapper>
    );
};
