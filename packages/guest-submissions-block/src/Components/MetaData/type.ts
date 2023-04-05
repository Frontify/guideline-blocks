export enum MetadataType {
    "TEXT" = "TEXT",
    "LONGTEXT" = "LONGTEXT",
    "NUMBER" = "NUMBER",
    "MULTISELECT" = "MULTISELECT",
    "DATE" = "DATE",
    "SELECT" = "SELECT",
}

export type MetadataProps = {
    id: string;
    isRequired: boolean;
    defaultValue?: string | null;
    name: string;
    valueType: {
        propertyType: string;
        options?: {
            id: string;
            value: string;
        }[];
    };
};
