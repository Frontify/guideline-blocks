/* (c) Copyright Frontify Ltd., all rights reserved. */

export const reorderList = <T>(array: T[], originalIndex: number, newIndex: number): T[] => {
    const newArray = array.slice();
    const [itemToSwap] = newArray.splice(originalIndex, 1);
    newArray.splice(newIndex, 0, itemToSwap);

    return newArray;
};
