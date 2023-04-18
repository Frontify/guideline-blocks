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
    Form: [],
    Metadata: [],
});
