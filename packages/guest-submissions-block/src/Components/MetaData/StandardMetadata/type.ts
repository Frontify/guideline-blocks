import { Settings } from "../../../types";

export type PartialSettingsType = Partial<
    Pick<
        Settings,
        "description" | "creator" | "copyrightStatus" | "copyrightNotice"
    >
>;

export type RequiredSettingsType = Partial<
    Pick<Settings, "disclaimer" | "name" | "email">
>;

export type DefaultStandardMetadataType = Partial<
    Pick<Settings, "name" | "email">
>;

export enum CopyRightStatus {
    "UNKNOWN" = "UNKNOWN",
    "COPYRIGHTED" = "COPYRIGHTED",
    "PUBLIC" = "PUBLIC",
}
