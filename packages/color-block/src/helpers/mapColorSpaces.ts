/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FrontifyColor } from '@frontify/app-bridge';

type ColorSpace = {
    id: string;
    key?: string;
    label?: string;
    value?: string;
    placeholder?: string;
};

export const mapColorSpaces = (colorSpaceID: string, color?: FrontifyColor) => {
    let mappedColorSpace: ColorSpace = { id: colorSpaceID };

    switch (colorSpaceID) {
        case 'hex':
            mappedColorSpace = {
                id: colorSpaceID,
                label: 'HEX',
                value: color && `#${color.hex}`,
                placeholder: '#hexhex',
            };
            break;
        case 'rgb':
            mappedColorSpace = {
                id: colorSpaceID,
                label: 'RGB',
                value: color && `${color.red}/${color.green}/${color.blue}`,
                placeholder: 'r/g/b',
            };
            break;
        case 'variable':
            mappedColorSpace = {
                id: colorSpaceID,
                label: 'LESS',
                value: color && '',
                placeholder: 'h,s,l',
            };
            break;
        case 'ral':
            mappedColorSpace = {
                id: colorSpaceID,
                label: 'RAL',
                value: (color && color.ral) ?? '',
                placeholder: 'r,a,l',
            };
            break;
        case 'pantone':
            mappedColorSpace = {
                id: colorSpaceID,
                label: 'PMS',
                value: (color && color.pantone) ?? '',
                placeholder: 'color 0000 p',
            };
            break;
        case 'pantone_coated':
            mappedColorSpace = {
                id: colorSpaceID,
                key: 'pantoneCoated',
                label: 'PMS-C',
                value: (color && color.pantoneCoated) ?? '',
                placeholder: 'p 000 00 c',
            };
            break;
        case 'pantone_uncoated':
            mappedColorSpace = {
                id: colorSpaceID,
                key: 'pantoneUncoated',
                label: 'PMS-U',
                value: (color && color.pantoneUncoated) ?? '',
                placeholder: '00-0000',
            };
            break;
        case 'pantone_cp':
            mappedColorSpace = {
                id: colorSpaceID,
                key: 'pantoneCp',
                label: 'PMS-CP',
                value: (color && color.pantoneCp) ?? '',
                placeholder: '0000 CP',
            };
            break;
        case 'pantone_plastics':
            mappedColorSpace = {
                id: colorSpaceID,
                label: 'PMS-PQ',
                value: color && '',
                placeholder: 'PQ-000C',
            };
            break;
        case 'pantone_textile':
            mappedColorSpace = {
                id: colorSpaceID,
                key: 'pantoneTextile',
                label: 'PMS-TCX',
                value: (color && color.pantoneTextile) ?? '',
                placeholder: '00-000 TCX',
            };
            break;
        case 'oracal':
            mappedColorSpace = {
                id: colorSpaceID,
                label: 'ORA',
                value: (color && color.oracal) ?? '',
                placeholder: '000',
            };
            break;
        case 'cmyk':
            mappedColorSpace = {
                id: colorSpaceID,
                label: 'CMYK',
                value: color && `${color.c}/${color.m}/${color.y}/${color.k}`,
                placeholder: 'c/m/y/k',
            };
            break;
        case 'cmyk_coated':
            mappedColorSpace = {
                id: colorSpaceID,
                key: 'cmykCoated',
                label: 'CMYK-C',
                value: (color && color.cmykCoated) ?? '',
                placeholder: 'c/m/y/k c',
            };
            break;
        case 'cmyk_uncoated':
            mappedColorSpace = {
                id: colorSpaceID,
                key: 'cmykUncoated',
                label: 'CMYK-U',
                value: (color && color.cmykUncoated) ?? '',
                placeholder: 'c/m/y/k u',
            };
            break;
        case 'cmyk_newspaper':
            mappedColorSpace = {
                id: colorSpaceID,
                key: 'cmykNewspaper',
                label: 'CMYK-N',
                value: (color && color.cmykNewspaper) ?? '',
                placeholder: 'c/m/y/k n',
            };
            break;
        case 'ncs':
            mappedColorSpace = {
                id: colorSpaceID,
                label: 'NCS',
                value: (color && color.ncs) ?? '',
                placeholder: '0000-0000',
            };
            break;
        case 'hks':
            mappedColorSpace = {
                id: colorSpaceID,
                label: 'HKS',
                value: (color && color.hks) ?? '',
                placeholder: '00 K',
            };
            break;
        case 'three_m':
            mappedColorSpace = {
                id: colorSpaceID,
                key: 'threeM',
                label: '3M',
                value: (color && color.threeM) ?? '',
                placeholder: '208',
            };
            break;
        case 'lab':
            mappedColorSpace = {
                id: colorSpaceID,
                label: 'LAB',
                value: (color && color.lab) ?? '',
                placeholder: 'l,a,b,%',
            };
            break;
        default:
            mappedColorSpace = {
                id: colorSpaceID,
                label: 'HEX',
                value: color && `#${color.hex}`,
                placeholder: '#hexhex',
            };
    }

    return mappedColorSpace;
};
