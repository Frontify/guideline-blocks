/* (c) Copyright Frontify Ltd., all rights reserved. */

export const extractUrlParameterFromUriQueries = (uri?: string): string => {
    const extractedUrl = uri
        ?.split('&')
        .find((element: string) => /^url=/.test(element) ?? element)
        ?.split('=')[1];
    return extractedUrl ? decodeURIComponent(extractedUrl) : '';
};
