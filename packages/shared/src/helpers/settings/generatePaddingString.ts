export const generatePaddingString = (paddingSpiderInput: (string | null)[]): string => {
    if (!paddingSpiderInput) return '0px';
    const [top, left, right, bottom] = paddingSpiderInput;
    return [top, right, bottom, left].map((pixels) => pixels || '0px').join(' ');
};
