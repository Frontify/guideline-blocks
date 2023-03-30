export const uploadFileFrontify = `
    mutation UploadFile($input: UploadFileInput!) {
      uploadFile(input: $input) {
        id
        urls
      }
    }
`;
