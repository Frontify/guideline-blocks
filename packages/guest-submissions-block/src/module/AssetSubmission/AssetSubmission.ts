/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetSubmissionRequestType, CreateAssetSubmissionsInput, DataAccountAssetSubmissionRequests } from './type';
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
        const {
            data: {
                account: { assetSubmissionRequests },
            },
        } = await queryGraphql<DataAccountAssetSubmissionRequests>(uploadBody);
        return assetSubmissionRequests;
    }
}
