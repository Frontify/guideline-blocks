import { MetadataProps } from "./type";

export const testMetadata: MetadataProps[] = [
    {
        id: "eyJpZGVudGlmaWVyIjoxMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==",
        isRequired: false,
        defaultValue: null,
        name: "Campaign Name",
        valueType: {
            propertyType: "TEXT",
        },
    },
    {
        id: "eyJpZGVudGlmaWVyIjoxNSwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==",
        isRequired: false,
        defaultValue: null,
        name: "Single Select",
        valueType: {
            propertyType: "SELECT",
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
        defaultValue: null,
        name: "Campaign Description",
        valueType: {
            propertyType: "LONGTEXT",
        },
    },
    {
        id: "eyJpZGVudGlmaWVyIjoxNCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==",
        isRequired: false,
        defaultValue: null,
        name: "Event Number",
        valueType: {
            propertyType: "NUMBER",
        },
    },
    {
        id: "eyJpZGVudGlmaWVyIjoxNywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==",
        isRequired: false,
        defaultValue: null,
        name: "Campaign Date",
        valueType: {
            propertyType: "DATE",
        },
    },
];
