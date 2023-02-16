/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '@frontify/app-bridge';

type PlayerProps = {
    asset?: Asset;
};

export const Player = ({ asset }: PlayerProps) => {
    return (
        <div className="tw-flex tw-flex-col tw-items-center">
            {asset !== undefined ? (
                <video
                    src={
                        asset.previewUrl.indexOf('?') > 0
                            ? `${asset.previewUrl}&format=mp4`
                            : `${asset.previewUrl}?format=mp4`
                    }
                    controls
                />
            ) : null}
        </div>
    );
};
