/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PIXEL } from './constants';

export const isPxSufixMissing = (value: string) => !value.includes(PIXEL); // TODO: remove isPxSufixMissing - use appendUnit after fix

export const appendPxSufix = (value: string): `${string}px` => `${value}${PIXEL}`; // TODO: remove appendPxSufix - use appendUnit after fix

export const formatString = (result: string, value: string): string => `${result} ${value ? value : '0px'}`;
