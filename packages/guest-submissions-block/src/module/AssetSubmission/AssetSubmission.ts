/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetSubmissionRequestType, CreateAssetSubmissionsInput, DataBrandAssetRequest } from './type';
import { AssetSubmissionRequest, CreateAssetSubmissionsMutation } from './api';
import { queryGraphql } from '../Common';

export class AssetSubmission {
    static async createAssetSubmissions(input: CreateAssetSubmissionsInput) {
        const uploadBody = {
            query: CreateAssetSubmissionsMutation,
            variables: { input },
        };

        await queryGraphql(JSON.stringify(uploadBody));
    }

    static async getAssetSubmissionRequests(): Promise<AssetSubmissionRequestType[]> {
        const uploadBody = JSON.stringify({
            query: AssetSubmissionRequest,
        });
        const brands = await queryGraphql<DataBrandAssetRequest>(uploadBody);

        return AssetSubmission.filterEmptySubmissionRequests(brands) ?? [];
    }

    static filterEmptySubmissionRequests(input?: DataBrandAssetRequest) {
        return input?.data.brands
            .reduce((prev, cur) => {
                if (cur.libraries.items.length > 0) {
                    const assetSubmissionEntries = cur.libraries.items
                        .filter(
                            (library) =>
                                library && library.assetSubmissionRequests && library.assetSubmissionRequests.length > 0
                        )
                        .map((item) => item.assetSubmissionRequests);
                    return [...prev, ...assetSubmissionEntries];
                } else {
                    return prev;
                }
            }, [] as AssetSubmissionRequestType[][])
            .flat(1);
    }
}
