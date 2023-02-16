/* (c) Copyright Frontify Ltd., all rights reserved. */

export const getTimeStringFromTimeStamp = (timeStamp: number): string => {
    return new Date(timeStamp * 1000).toISOString().slice(14, 19).toString();
};
