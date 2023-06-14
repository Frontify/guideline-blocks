/* (c) Copyright Frontify Ltd., all rights reserved. */

export const LibraryRequest = (id: string) => `
query LibraryMetadata{
  library(id: "${id}") {
    id
    customMetadataProperties {
      id
      isRequired
      defaultValue
      name
      type {
        name
        ... on CustomMetadataPropertyTypeSelect {
          options {
            value
            id
            isDefault
          }
        }
        ... on CustomMetadataPropertyTypeMultiSelect {
          options {
            value
            id
            isDefault
          }
        }
      }
    }
  }
}
`;
