/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FrontifyHttpClient } from '../utility/FrontifyHttpClient';

export const getUnresolvedAnnotationCountsByAssetPermissionToken = async (
    assetPermissionToken: string
): Promise<AnnotationCount[]> => {
    const { result } = await FrontifyHttpClient.post<AnnotationCount[]>('/api/annotation/count', {
        asset_permission_token: assetPermissionToken,
        status: AnnotationStatus.Open,
    });
    return result.data;
};
