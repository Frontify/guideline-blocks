/* (c) Copyright Frontify Ltd., all rights reserved. */

export const telOrMailRegex = /^(mailto:|tel:)[\w%+.-@]+$/;
export const urlRegex = /[^\s#$./?].\S*\.[a-z]{2,}$/i;
export const urlRegexWithHttps = /^(https?:\/\/)[^\s#$./?].\S*\.[a-z]{2,}$/i;
export const relativeUrlRegex = /^\/(document|r)\/\S+$/i;
