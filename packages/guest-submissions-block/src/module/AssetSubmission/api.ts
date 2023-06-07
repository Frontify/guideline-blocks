export const CreateAssetSubmissionsMutation = `
    mutation AssetSubmissions ($input: CreateAssetSubmissionsInput!) {
      createAssetSubmissions(input: $input) {
        assetSubmissionIds
      }
    }
`;

export const AssetSubmissionRequest = `
query assetSubmissionRequest {
 brands {
    libraries {
      items {
        name
        assetSubmissionRequests {
          id
          title
          description
          configuration
        }
      }
    }
  }
}
`;
