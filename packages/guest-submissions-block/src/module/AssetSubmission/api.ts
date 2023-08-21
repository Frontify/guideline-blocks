/* (c) Copyright Frontify Ltd., all rights reserved. */

export const CreateAssetSubmissionsMutation = `
    mutation AssetSubmissions ($input: CreateAssetSubmissionsInput!) {
      createAssetSubmissions(input: $input) {
        assetSubmissionIds
      }
    }
`;

export const AssetSubmissionRequest = `
query assetSubmissionRequest {
  account {
        assetSubmissionRequests {
          id
          projectId
          title
          description
          tokens {
             token
          }
        }
    }
}
`;
