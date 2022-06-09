/* (c) Copyright Frontify Ltd., all rights reserved. */

export const extractUrlParameterFromUriQueries = (uri?: string): string => new URLSearchParams(uri).get('url') ?? '';
