/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FormValues } from '../../Components/MetaData';
import { AssetSubmissionMetadata } from './type';

export const assetSubmissionDTO = ({
    creator,
    description,
    copyrightStatus,
    copyrightNotice,
    ...customFields
}: FormValues): AssetSubmissionMetadata => {
    return {
        description,
        copyright: {
            author: creator,
            status: copyrightStatus,
            notice: copyrightNotice,
        },
        custom: Object.entries(customFields)
            .map(([propertyId, value]) => ({
                propertyId,
                value,
            }))
            .filter((item) => item.propertyId !== ('name' || 'email' || 'disclaimer')),
    };
};
