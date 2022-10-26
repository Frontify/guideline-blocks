/* (c) Copyright Frontify Ltd., all rights reserved. */

export const isValidStorybookUrl = (url: string) => {
    if (url.trim() === '') {
        return true;
    }
    if (url.split('?').length >= 2 && url.includes('path')) {
        return true;
    }
    return false;
};
