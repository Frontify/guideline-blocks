import { AssetSubmissionRequestType } from "../module/AssetSubmission/type";
import { DATA_DELIMINATOR } from "../Components/MetaData/hooks/useMetadataSettingsConfig";

export const defineCustomMetadataEntries = (
    assetSubmissions: AssetSubmissionRequestType[]
) => {
    return assetSubmissions
        .map((assetSubmission: any, parentIndex: number) => {
            const metaDataEntries = JSON.parse(assetSubmission.configuration);
            return metaDataEntries.map((metaDataEntry: any, index: number) => {
                return {
                    id: `metadata-${assetSubmission.id}-heading-${metaDataEntry.id}-${index}-${parentIndex}`,
                    type: "sectionHeading",
                    label: metaDataEntry.name,
                    defaultValue: null,
                    show: (bundle: any) =>
                        bundle.getBlock("assetSubmission")?.value ===
                        assetSubmission.id,
                    blocks: [
                        {
                            id: `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}`,
                            type: "switch",
                            label: "Show",
                            labelStyle: "heading",
                            defaultValue: null,
                            show: (bundle: any) =>
                                bundle.getBlock("assetSubmission")?.value ===
                                assetSubmission.id,
                            on: [
                                {
                                    id: `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}${DATA_DELIMINATOR}required`,
                                    type: "switch",
                                    label: "Required",
                                    info: `${
                                        !!metaDataEntry.isRequired
                                            ? "This field is required by the Library, but its okey to disable it for submissions"
                                            : ""
                                    }`,
                                    size: "small",
                                },
                                {
                                    id: `${metaDataEntry.name}${DATA_DELIMINATOR}${metaDataEntry.id}${DATA_DELIMINATOR}label`,
                                    type: "input",
                                    inputType: "text",
                                    label: "Custom Label",
                                    placeholder: "Enter a custom label",
                                },
                            ],
                        },
                    ],
                };
            });
        })
        .flat(1);
};