export const getDownloadAriaLabel = (
    hasAssetViewer: boolean,
    hasLink?: boolean,
    altText?: string,
    title?: string
): string => {
    const label = hasAssetViewer || hasLink ? title : altText;
    return label ? `Download ${label}` : 'Download image';
};
