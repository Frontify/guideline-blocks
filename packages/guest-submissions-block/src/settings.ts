import {
    defineSettings,
    DropdownSize,
} from "@frontify/guideline-blocks-settings";
import { AssetSubmission } from "./module/AssetSubmission/AssetSubmission";
import { defineCustomMetadataEntries } from "./settings/CustomMetadataSettings";

export const settings = async () => {
    const assetSubmissionRequests =
        await AssetSubmission.getAssetSubmissionRequests();

    return defineSettings({
        basics: [
            {
                id: "assetSubmission",
                type: "dropdown",
                label: "Destination library",
                info: "You can choose from only libraries which allow an external asset upload. You can allow this in library settings.",
                size: DropdownSize.Large,
                choices: async () => {
                    return assetSubmissionRequests.map((submission: any) => ({
                        value: submission.id,
                        label: submission.title,
                    }));
                },
            },
        ],
        "Custom Metadata": defineCustomMetadataEntries(assetSubmissionRequests),
        Card: [
            {
                id: "buttonText",
                type: "input",
                label: "Button Text",
                defaultValue: "New Submission",
                placeholder: "Button Label",
            },
        ],
        Form: [
            {
                id: "disclaimer",
                type: "switch",
                defaultValue: true,
                info: "Show or Hide the disclaimer Notice",
                label: "Disclaimer",
            },
        ],
        Metadata: [
            {
                id: "description",
                type: "switch",
                defaultValue: false,
                label: "Description",
            },
            {
                id: "creator",
                type: "switch",
                defaultValue: false,
                label: "Creator",
            },
            {
                id: "copyrightStatus",
                type: "switch",
                defaultValue: false,
                label: "CopyrightStatus",
            },
            {
                id: "copyrightNotice",
                type: "switch",
                defaultValue: false,
                label: "CopyrightNotice",
            },
        ],
    });
};
