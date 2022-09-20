/* (c) Copyright Frontify Ltd., all rights reserved. */

export const updateArray = <T>(array: T[], from: number, to: number): T[] => {
    const newArray = [...array];
    const toIndex = to < 0 ? newArray.length + to : to;

    if (toIndex >= 0 && toIndex < newArray.length) {
        const slice = newArray.splice(from, 1)[0];
        newArray.splice(toIndex, 0, slice);
    }

    return newArray;
};
