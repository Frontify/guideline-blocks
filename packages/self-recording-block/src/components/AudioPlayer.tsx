/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';

export const AudioPlayer = ({ asset }: { asset?: Asset }) => {
    return (
        <div className="tw-flex tw-flex-col tw-items-center">
            {/* This needs to serve the generic Url rather than the originUrl. Fix mimetype missing */}
            {asset !== undefined ? <audio src={`${asset.originUrl}`} controls /> : <span>Please record something</span>}
        </div>
    );
};
