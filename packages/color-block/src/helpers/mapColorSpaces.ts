/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FrontifyColor } from '@frontify/app-bridge';
import { ColorSpaceInputValues } from '../types';

type ColorSpace = {
    id: string;
    key?: string;
    label: string;
    value?: string;
    placeholder?: string;
};

export const mapColorSpaces = (colorSpaceId: keyof ColorSpaceInputValues, color?: FrontifyColor): ColorSpace => {
    switch (colorSpaceId) {
        case 'hex':
            return {
                id: colorSpaceId,
                label: 'HEX',
                value: `#${color?.hex}`,
                placeholder: '#hexhex',
            };
        case 'rgb':
            return {
                id: colorSpaceId,
                label: 'RGB',
                value: color && `${color.red}/${color.green}/${color.blue}`,
                placeholder: 'r/g/b',
            };
        case 'variable':
            return {
                id: colorSpaceId,
                key: 'nameCss',
                label: 'LESS',
                value: `$${color?.nameCss}`,
                placeholder: 'h,s,l',
            };
        case 'ral':
            return {
                id: colorSpaceId,
                label: 'RAL',
                value: color?.ral ?? '',
                placeholder: 'r,a,l',
            };
        case 'pantone':
            return {
                id: colorSpaceId,
                label: 'PMS',
                value: color?.pantone ?? '',
                placeholder: 'color 0000 p',
            };
        case 'pantoneCoated':
            return {
                id: colorSpaceId,
                key: 'pantoneCoated',
                label: 'PMS-C',
                value: color?.pantoneCoated ?? '',
                placeholder: 'p 000 00 c',
            };
        case 'pantoneUncoated':
            return {
                id: colorSpaceId,
                key: 'pantoneUncoated',
                label: 'PMS-U',
                value: color?.pantoneUncoated ?? '',
                placeholder: '00-0000',
            };
        case 'pantoneCp':
            return {
                id: colorSpaceId,
                key: 'pantoneCp',
                label: 'PMS-CP',
                value: color?.pantoneCp ?? '',
                placeholder: '0000 CP',
            };
        case 'pantonePlastics':
            return {
                id: colorSpaceId,
                key: 'pantonePlastics',
                label: 'PMS-PQ',
                value: color?.pantonePlastics ?? '',
                placeholder: 'PQ-000C',
            };
        case 'pantoneTextile':
            return {
                id: colorSpaceId,
                key: 'pantoneTextile',
                label: 'PMS-TCX',
                value: color?.pantoneTextile ?? '',
                placeholder: '00-000 TCX',
            };
        case 'oracal':
            return {
                id: colorSpaceId,
                label: 'ORA',
                value: color?.oracal ?? '',
                placeholder: '000',
            };
        case 'cmyk':
            return {
                id: colorSpaceId,
                label: 'CMYK',
                value: color && `${color.c}/${color.m}/${color.y}/${color.k}`,
                placeholder: 'c/m/y/k',
            };
        case 'cmykCoated':
            return {
                id: colorSpaceId,
                key: 'cmykCoated',
                label: 'CMYK-C',
                value: color?.cmykCoated ?? '',
                placeholder: 'c/m/y/k c',
            };
        case 'cmykUncoated':
            return {
                id: colorSpaceId,
                key: 'cmykUncoated',
                label: 'CMYK-U',
                value: color?.cmykUncoated ?? '',
                placeholder: 'c/m/y/k u',
            };
        case 'cmykNewspaper':
            return {
                id: colorSpaceId,
                key: 'cmykNewspaper',
                label: 'CMYK-N',
                value: color?.cmykNewspaper ?? '',
                placeholder: 'c/m/y/k n',
            };
        case 'ncs':
            return {
                id: colorSpaceId,
                label: 'NCS',
                value: color?.ncs ?? '',
                placeholder: '0000-0000',
            };
        case 'hks':
            return {
                id: colorSpaceId,
                label: 'HKS',
                value: color?.hks ?? '',
                placeholder: '00 K',
            };
        case 'threeM':
            return {
                id: colorSpaceId,
                key: 'threeM',
                label: '3M',
                value: color?.threeM ?? '',
                placeholder: '208',
            };
        case 'lab':
            return {
                id: colorSpaceId,
                label: 'LAB',
                value: color?.lab ?? '',
                placeholder: 'l,a,b,%',
            };
        default:
            return {
                id: colorSpaceId,
                label: 'HEX',
                value: `#${color?.hex}`,
                placeholder: '#hexhex',
            };
    }
};
