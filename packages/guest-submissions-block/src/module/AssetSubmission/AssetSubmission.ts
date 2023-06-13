import {
    AssetSubmissionRequestType,
    CreateAssetSubmissionsInput,
} from "./type";
import { AssetSubmissionRequest, CreateAssetSubmissionsMutation } from "./api";
import { queryGraphql } from "../Common";

export class AssetSubmission {
    static async createAssetSubmissions(input: CreateAssetSubmissionsInput) {
        const uploadBody = {
            query: CreateAssetSubmissionsMutation,
            variables: { input: input },
        };

        await queryGraphql(JSON.stringify(uploadBody));
    }

    static async getAssetSubmissionRequests(): Promise<
        AssetSubmissionRequestType[]
    > {
        const uploadBody = JSON.stringify({
            query: AssetSubmissionRequest,
        });

        const brands = await queryGraphql(uploadBody);

        return AssetSubmission.filterEmptySubmissionRequests(brands);
    }

    static filterEmptySubmissionRequests(input: any) {
        const output = input.data.brands.reduce((prev: any, cur: any) => {
            if (cur.libraries.items.length > 0) {
                const assetSubmissionEntries = cur.libraries.items
                    .filter(
                        (library: any) =>
                            library.assetSubmissionRequests.length > 0
                    )
                    .map((item: any) => item.assetSubmissionRequests);
                return [...prev, assetSubmissionEntries];
            } else {
                return prev;
            }
        }, []);

        return output.flat(2);
    }
}
