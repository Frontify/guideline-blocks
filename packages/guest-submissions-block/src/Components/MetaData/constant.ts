import { MetadataProps, MetadataType } from "./type";

export const testMetadata: MetadataProps[] = [
    {
        id: "eyJpZGVudGlmaWVyIjoxMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==",
        isRequired: true,
        defaultValue: "text",
        name: "Campaign Name",
        valueType: {
            propertyType: MetadataType.TEXT,
        },
    },
    {
        id: "eyJpZGVudGlmaWVyIjoxNSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==",
        isRequired: true,
        defaultValue: "",
        name: "Single Select",
        valueType: {
            propertyType: MetadataType.SELECT,
            options: [
                {
                    id: "eyJpZGVudGlmaWVyIjoxLCJ0eXBlIjoiY3VzdG9tTWV0YWRhdGFQcm9wZXJ0eU9wdGlvbiJ9",
                    value: "My Birthday Party",
                },
                {
                    id: "eyJpZGVudGlmaWVyIjoyLCJ0eXBlIjoiY3VzdG9tTWV0YWRhdGFQcm9wZXJ0eU9wdGlvbiJ9",
                    value: "This is something else",
                },
            ],
        },
    },
    {
        id: "eyJpZGVudGlmaWVyIjoxMywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==",
        isRequired: false,
        defaultValue: "Campaign Description",
        name: "Campaign Description",
        valueType: {
            propertyType: MetadataType.LONGTEXT,
        },
    },
    {
        id: "eyJpZGVudGlmaWVyIjoxNCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==",
        isRequired: false,
        defaultValue: null,
        name: "Event Number",
        valueType: {
            propertyType: MetadataType.NUMBER,
        },
    },
    {
        id: "eyJpZGVudGlmaWVyIjoxNywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==",
        isRequired: false,
        defaultValue: null,
        name: "Campaign Date",
        valueType: {
            propertyType: MetadataType.DATE,
        },
    },
];
