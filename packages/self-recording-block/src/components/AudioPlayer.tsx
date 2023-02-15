/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';

type AudioPlayerProps = {
    asset?: Asset;
};

export const AudioPlayer = ({ asset }: AudioPlayerProps) => {
    return (
        <div className="tw-flex tw-flex-col tw-items-center">
            {/* //TODO: This needs to serve the generic Url rather than the originUrl. Fix mimetype missing */}
            {asset !== undefined ? <audio src={`${asset.originUrl}`} controls /> : null}
        </div>
    );
};
