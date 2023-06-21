/* (c) Copyright Frontify Ltd., all rights reserved. */

export const splitText = (text: string, maxWordCount = 2000): string[] => {
    const sections: string[] = [];
    let startIndex = 0;

    while (startIndex < text.length) {
        // Start by trying to split the text at maxWordCount words
        let endIndex = startIndex;
        let wordCount = 0;

        while (wordCount < maxWordCount && endIndex < text.length) {
            // Look for the next space or newline
            const nextSpaceIndex = text.indexOf(' ', endIndex + 1);
            const nextNewlineIndex = text.indexOf('\n', endIndex + 1);
            if (nextSpaceIndex === -1 && nextNewlineIndex === -1) {
                // If there are no more spaces or newlines, set endIndex to the end of the text
                endIndex = text.length;
            } else if (nextSpaceIndex === -1 || (nextNewlineIndex !== -1 && nextNewlineIndex < nextSpaceIndex)) {
                // If there are no more spaces, or there is a newline before the next space, split at the newline
                endIndex = nextNewlineIndex;
            } else {
                // If there are no more newlines, or there is a space before the next newline, split at the space
                endIndex = nextSpaceIndex;
            }
            wordCount++;
        }

        // Add the section to the sections array
        sections.push(text.substring(startIndex, endIndex));

        // Update the startIndex to the start of the next section
        startIndex = endIndex + 1;
    }

    return sections;
};

function dotProduct(A: number[], B: number[]) {
    let dotProduct = 0;
    for (let i = 0; i < A.length; i++) {
        dotProduct += A[i] * B[i];
    }

    return dotProduct;
}

function magnitude(vector: number[]) {
    let sum = 0;
    for (let i = 0; i < vector.length; i++) {
        sum += Math.pow(vector[i], 2);
    }

    return Math.sqrt(sum);
}

export function cosineSimilarity(A: number[], B: number[]): number {
    const dotProductAB = dotProduct(A, B);
    const magnitudeA = magnitude(A);
    const magnitudeB = magnitude(B);

    return dotProductAB / (magnitudeA * magnitudeB);
}
