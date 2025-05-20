/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockStyles, TextStyles, toRgbaString } from '@frontify/guideline-blocks-settings';
import { ReactElement } from 'react';
import { AssetCountProps } from '../types';

export const AssetCount = ({ count, color }: AssetCountProps): ReactElement => {
    const imageCaptionStyles = BlockStyles[TextStyles.imageCaption];

    if (count > 0) {
        return (
            <div
                data-test-id="asset-kit-count"
                style={{ ...imageCaptionStyles, color: color ? toRgbaString(color) : undefined }}
            >{`${count} asset${count > 1 ? 's' : ''}`}</div>
        );
    }

    return (
        <div style={{ color: BlockStyles[TextStyles.p].color }} className="tw-opacity-70">
            Add assets to make them available
        </div>
    );
};
