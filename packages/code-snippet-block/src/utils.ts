/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PIXEL } from './constants';

export const isPxSuffixMissing = (value: string) => !value.includes(PIXEL); // TODO: remove isPxSuffixMissing - use appendUnit after fix

export const appendPxSuffix = (value: string): `${string}px` => `${value}${PIXEL}`; // TODO: remove appendPxSuffix - use appendUnit after fix

export const formatString = (result: string, value: string): string => `${result} ${value ? value : '0px'}`;
