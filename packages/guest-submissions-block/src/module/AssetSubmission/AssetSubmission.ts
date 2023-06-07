import {
    AssetSubmissionRequestType,
    CreateAssetSubmissionsInput,
} from "./type";
import { AssetSubmissionRequest, CreateAssetSubmissionsMutation } from "./api";

export class AssetSubmission {
    static getCsrfToken(): string {
        const tokenElement = document.getElementsByName("x-csrf-token");
        return (tokenElement[0] as HTMLMetaElement).content;
    }

    static async createAssetSubmissions(input: CreateAssetSubmissionsInput) {
        const uploadBody = {
            query: CreateAssetSubmissionsMutation,
            variables: { input: input },
        };

        await AssetSubmission.queryGraphql(JSON.stringify(uploadBody));
    }

    static async getAssetSubmissionRequests(): Promise<
        AssetSubmissionRequestType[]
    > {
        const uploadBody = JSON.stringify({
            query: AssetSubmissionRequest,
        });

        const brands = await AssetSubmission.queryGraphql(uploadBody);

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

    static async queryGraphql(uploadBody: string) {
        try {
            const response = await fetch(
                `${window.location.origin}/graphql-internal`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": AssetSubmission.getCsrfToken(),
                        "X-Frontify-Development-Flags":
                            "PUBLIC_API_ASSET_SUBMISSION",
                    },
                    body: uploadBody,
                }
            );

            return await response.json();
        } catch (e: any) {
            console.log(e.errors);
        }
    }
}
