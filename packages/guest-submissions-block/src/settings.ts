import {
    defineSettings,
    DropdownSize,
    IconEnum,
} from "@frontify/guideline-blocks-settings";
import { AssetSubmission } from "./module/AssetSubmission/AssetSubmission";

export const settings = defineSettings({
    main: [
        {
            id: "main-dropdown",
            type: "dropdown",
            defaultValue: "content_block",
            size: DropdownSize.Large,
            disabled: true,
            choices: [
                {
                    value: "content_block",
                    icon: IconEnum.BuildingBlock,
                    label: "Content Block",
                },
            ],
        },
    ],
    basics: [
        {
            id: "assetSubmission",
            type: "dropdown",
            defaultValue: "cards",
            label: "Destination library",
            info: "You can choose from only libraries which allow an external asset upload. You can allow this in library settings.",
            size: DropdownSize.Large,
            choices: async () => {
                const assetSubmissionRequests =
                    await AssetSubmission.getAssetSubmissionRequests();

                return assetSubmissionRequests.map((submission: any) => ({
                    value: submission.id,
                    label: submission.title,
                }));
            },
        },
    ],
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
            id: "name",
            type: "switch",
            defaultValue: true,
            label: "Name",
        },
        {
            id: "email",
            type: "switch",
            defaultValue: true,
            label: "Email",
        },
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
