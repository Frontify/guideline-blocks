/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toRgbaString } from '@frontify/guideline-blocks-shared';
import { ReactElement } from 'react';
import { AssetCountProps } from '../types';

export const AssetCount = ({ count, color }: AssetCountProps): ReactElement => {
    if (count > 0) {
        return (
            <div
                data-test-id="asset-kit-count"
                style={{ color: color ? toRgbaString(color) : undefined }}
            >{`${count} asset${count > 1 ? 's' : ''}`}</div>
        );
    } else {
        return <div className="tw-text-black-50">Add assets to make them available</div>;
    }
};
