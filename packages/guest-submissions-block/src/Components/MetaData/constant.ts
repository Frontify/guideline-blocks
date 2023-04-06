import { MetadataProps } from "./type";

export const testMetadata: MetadataProps[] = [
    {
        id: "eyJpZGVudGlmaWVyIjoxMiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==",
        isRequired: false,
        defaultValue: "Default Value",
        name: "test",
        valueType: {
            propertyType: "TEXT",
        },
    },
    {
        id: "eyJpZGVudGlmaWVyIjoxMywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==",
        isRequired: false,
        defaultValue: null,
        name: "Long Text",
        valueType: {
            propertyType: "LONGTEXT",
        },
    },
    {
        id: "eyJpZGVudGlmaWVyIjoxNCwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==",
        isRequired: false,
        defaultValue: null,
        name: "Number",
        valueType: {
            propertyType: "NUMBER",
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
                    value: "one",
                },
                {
                    id: "eyJpZGVudGlmaWVyIjoyLCJ0eXBlIjoiY3VzdG9tTWV0YWRhdGFQcm9wZXJ0eU9wdGlvbiJ9",
                    value: "two",
                },
            ],
        },
    },
    {
        id: "eyJpZGVudGlmaWVyIjoxNiwidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==",
        isRequired: false,
        defaultValue: {
            id: "eyJpZGVudGlmaWVyIjozLCJ0eXBlIjoiY3VzdG9tTWV0YWRhdGFQcm9wZXJ0eU9wdGlvbiJ9",
            value: "one",
        },
        name: "Multi-select",
        valueType: {
            propertyType: "MULTISELECT",
            options: [
                {
                    id: "eyJpZGVudGlmaWVyIjozLCJ0eXBlIjoiY3VzdG9tTWV0YWRhdGFQcm9wZXJ0eU9wdGlvbiJ9",
                    value: "one",
                },
                {
                    id: "eyJpZGVudGlmaWVyIjo0LCJ0eXBlIjoiY3VzdG9tTWV0YWRhdGFQcm9wZXJ0eU9wdGlvbiJ9",
                    value: "two",
                },
                {
                    id: "eyJpZGVudGlmaWVyIjo1LCJ0eXBlIjoiY3VzdG9tTWV0YWRhdGFQcm9wZXJ0eU9wdGlvbiJ9",
                    value: "three",
                },
            ],
        },
    },
    {
        id: "eyJpZGVudGlmaWVyIjoxNywidHlwZSI6ImN1c3RvbU1ldGFkYXRhUHJvcGVydHkifQ==",
        isRequired: false,
        defaultValue: null,
        name: "Date",
        valueType: {
            propertyType: "DATE",
        },
    },
];
