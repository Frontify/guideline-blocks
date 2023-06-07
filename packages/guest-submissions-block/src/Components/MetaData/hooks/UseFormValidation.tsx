import { RequiredSettingsType } from "../StandardMetadata/type";
import { MetadataProps } from "../type";
import { Settings } from "../../../types";
import { defaultStandardMetaData } from "../StandardMetadata/constant";
import { FormValues } from "../Metadata";

export function useFormValidation(formValues: FormValues) {
    return (
        requiredStandardMetaData: (keyof RequiredSettingsType)[],
        metaConfigurationData: MetadataProps[],
        setMissingFields: (
            value: ((prevState: string[]) => string[]) | string[]
        ) => void,
        fromBlockSettings: Settings
    ): boolean => {
        // All the Standard Metadata is required
        const standardMetaData = requiredStandardMetaData.filter(
            (item) => fromBlockSettings[item]
        );
        const requiredCustomMetadataId = metaConfigurationData
            .filter((item) => item.isRequired)
            .map((item) => item.id);

        const requiredFields = [
            ...requiredCustomMetadataId,
            ...standardMetaData,
            ...defaultStandardMetaData,
        ];

        const missingRequiredFields = requiredFields.filter(
            (item) =>
                !Object.keys(formValues).includes(item) ||
                (Object.keys(formValues).includes(item) &&
                    formValues[item] === "")
        );

        setMissingFields(missingRequiredFields);

        return missingRequiredFields.length === 0;
    };
}
