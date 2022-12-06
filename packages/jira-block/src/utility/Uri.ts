/* (c) Copyright Frontify Ltd., all rights reserved. */

export const generateBase64Encoding = (input: string) => btoa(unescape(encodeURIComponent(input)));
