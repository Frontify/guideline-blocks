export const extractUrl = (url?: string) => {
    const extractedUrl = url
        ?.split('&')
        .find((element: string) => /^url=/.test(element) ?? element)
        ?.split('=')[1];
    return extractedUrl && decodeURIComponent(extractedUrl);
};
