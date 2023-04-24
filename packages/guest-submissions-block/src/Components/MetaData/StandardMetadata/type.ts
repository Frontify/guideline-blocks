import { Settings } from "../../../types";

export type PartialSettingsType = Partial<
    Pick<
        Settings,
        "description" | "creator" | "copyrightStatus" | "copyrightNotice"
    >
>;

export type RequiredSettingsType = Partial<
    Pick<Settings, "name" | "email" | "disclaimer">
>;
