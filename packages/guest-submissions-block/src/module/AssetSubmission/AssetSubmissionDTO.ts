/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FormValues } from '../../Components/MetaData';
import { AssetSubmissionMetadata } from './type';

export const assetSubmissionDTO = ({
    name,
    email,
    creator,
    disclaimer,
    description,
    copyrightStatus,
    copyrightNotice,
    ...customFields
}: Omit<FormValues, 'name'>): AssetSubmissionMetadata => ({
    description,
    copyright: {
        author: creator,
        status: copyrightStatus,
        notice: copyrightNotice,
    },
    custom: Object.entries(customFields).map(([propertyId, value]) => ({
        propertyId,
        value,
    })),
});
