import { describe, expect, test } from "vitest";
import { AssetSubmission } from "./AssetSubmission";

const testQuery = {
    data: {
        brands: [
            {
                libraries: {
                    items: [
                        {
                            name: "test",
                            assetSubmissionRequests: [
                                {
                                    id: "eyJpZGVudGlmaWVyIjoxLCJ0eXBlIjoiYXNzZXRTdWJtaXNzaW9uUmVxdWVzdCJ9",
                                    title: "test title",
                                    configuration: "[]",
                                },
                            ],
                        },
                        {
                            name: "Icon library",
                            assetSubmissionRequests: [],
                        },
                        {
                            name: "Submissions",
                            assetSubmissionRequests: [],
                        },
                    ],
                },
            },
            {
                libraries: {
                    items: [],
                },
            },
            {
                libraries: {
                    items: [],
                },
            },
        ],
    },
};

describe("AssetSubmission", () => {
    test("Should return Flat Array with AssetSubmissionRequest Object", () => {
        const desiredOutput = [
            {
                id: "eyJpZGVudGlmaWVyIjoxLCJ0eXBlIjoiYXNzZXRTdWJtaXNzaW9uUmVxdWVzdCJ9",
                title: "test title",
                configuration: "[]",
            },
        ];
        const output = AssetSubmission.filterEmptySubmissionRequests(testQuery);
        expect(output).toStrictEqual(desiredOutput);
    });
});
