export const parseString = ({ lastModified, name, size, type }: File) =>
    JSON.stringify({
        type,
        name,
        size,
        lastModified,
    });
