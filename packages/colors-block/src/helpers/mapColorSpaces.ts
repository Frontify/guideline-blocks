/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/app-bridge';

import { ColorSpaceLabels, ColorSpaceValues } from '../types';

type ColorSpace = {
    id: string;
    key?: string;
    label: ColorSpaceLabels;
    value?: string;
    placeholder?: string;
};

export const mapColorSpaces = (colorSpaceId: keyof ColorSpaceValues, color?: Color): ColorSpace => {
    switch (colorSpaceId) {
        case 'hex':
            return {
                id: colorSpaceId,
                label: ColorSpaceLabels.Hex,
                value: `#${color?.hex}`,
                placeholder: '#hexhex',
            };
        case 'rgb':
            return {
                id: colorSpaceId,
                label: ColorSpaceLabels.Rgb,
                value: color && `${color.red}/${color.green}/${color.blue}`,
                placeholder: 'r/g/b',
            };
        case 'variable':
            return {
                id: colorSpaceId,
                key: 'nameCss',
                label: ColorSpaceLabels.Less,
                value: `$${color?.nameCss}`,
                placeholder: 'h,s,l',
            };
        case 'ral':
            return {
                id: colorSpaceId,
                label: ColorSpaceLabels.Ral,
                value: color?.ral ?? '',
                placeholder: 'r,a,l',
            };
        case 'pantone':
            return {
                id: colorSpaceId,
                label: ColorSpaceLabels.Pms,
                value: color?.pantone ?? '',
                placeholder: 'color 0000 p',
            };
        case 'pantoneCoated':
            return {
                id: colorSpaceId,
                key: 'pantoneCoated',
                label: ColorSpaceLabels.PmsC,
                value: color?.pantoneCoated ?? '',
                placeholder: 'p 000 00 c',
            };
        case 'pantoneUncoated':
            return {
                id: colorSpaceId,
                key: 'pantoneUncoated',
                label: ColorSpaceLabels.PmsU,
                value: color?.pantoneUncoated ?? '',
                placeholder: '00-0000',
            };
        case 'pantoneCp':
            return {
                id: colorSpaceId,
                key: 'pantoneCp',
                label: ColorSpaceLabels.PmsCp,
                value: color?.pantoneCp ?? '',
                placeholder: '0000 CP',
            };
        case 'pantonePlastics':
            return {
                id: colorSpaceId,
                key: 'pantonePlastics',
                label: ColorSpaceLabels.PmsPq,
                value: color?.pantonePlastics ?? '',
                placeholder: 'PQ-000C',
            };
        case 'pantoneTextile':
            return {
                id: colorSpaceId,
                key: 'pantoneTextile',
                label: ColorSpaceLabels.PmsTcx,
                value: color?.pantoneTextile ?? '',
                placeholder: '00-000 TCX',
            };
        case 'oracal':
            return {
                id: colorSpaceId,
                label: ColorSpaceLabels.Ora,
                value: color?.oracal ?? '',
                placeholder: '000',
            };
        case 'cmyk':
            return {
                id: colorSpaceId,
                label: ColorSpaceLabels.Cmyk,
                value: color && `${color.c}/${color.m}/${color.y}/${color.k}`,
                placeholder: 'c/m/y/k',
            };
        case 'cmykCoated':
            return {
                id: colorSpaceId,
                key: 'cmykCoated',
                label: ColorSpaceLabels.CmykC,
                value: color?.cmykCoated ?? '',
                placeholder: 'c/m/y/k c',
            };
        case 'cmykUncoated':
            return {
                id: colorSpaceId,
                key: 'cmykUncoated',
                label: ColorSpaceLabels.CmykU,
                value: color?.cmykUncoated ?? '',
                placeholder: 'c/m/y/k u',
            };
        case 'cmykNewspaper':
            return {
                id: colorSpaceId,
                key: 'cmykNewspaper',
                label: ColorSpaceLabels.CmykN,
                value: color?.cmykNewspaper ?? '',
                placeholder: 'c/m/y/k n',
            };
        case 'ncs':
            return {
                id: colorSpaceId,
                label: ColorSpaceLabels.Ncs,
                value: color?.ncs ?? '',
                placeholder: '0000-0000',
            };
        case 'hks':
            return {
                id: colorSpaceId,
                label: ColorSpaceLabels.Hks,
                value: color?.hks ?? '',
                placeholder: '00 K',
            };
        case 'threeM':
            return {
                id: colorSpaceId,
                key: 'threeM',
                label: ColorSpaceLabels.ThreeM,
                value: color?.threeM ?? '',
                placeholder: '208',
            };
        case 'lab':
            return {
                id: colorSpaceId,
                label: ColorSpaceLabels.Lab,
                value: color?.lab ?? '',
                placeholder: 'l,a,b,%',
            };
        default:
            return {
                id: colorSpaceId,
                label: ColorSpaceLabels.Hex,
                value: `#${color?.hex}`,
                placeholder: '#hexhex',
            };
    }
};
