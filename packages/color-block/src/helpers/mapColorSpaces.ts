/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FrontifyColor } from '@frontify/app-bridge';

type ColorSpace = {
    id: string;
    badge?: string;
    value?: string;
    placeholder?: string;
};

export const mapColorSpaces = (colorSpaceID: string, color?: FrontifyColor) => {
    let mappedColorSpace: ColorSpace = { id: colorSpaceID };

    switch (colorSpaceID) {
        case 'hex':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'HEX',
                value: color && `#${color.hex}`,
                placeholder: '#hexhex',
            };
            break;
        case 'rgb':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'RGB',
                value: color && `${color.red}/${color.green}/${color.blue}`,
                placeholder: 'r/g/b',
            };
            break;
        case 'variable':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'LESS',
                value: color && '',
                placeholder: 'h,s,l',
            };
            break;
        case 'ral':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'RAL',
                value: (color && color.ral) ?? '',
                placeholder: 'r,a,l',
            };
            break;
        case 'pantone':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'PMS',
                value: (color && color.pantone) ?? '',
                placeholder: 'color 0000 p',
            };
            break;
        case 'pantone_coated':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'PMS-C',
                value: (color && color.pantoneCoated) ?? '',
                placeholder: 'p 000 00 c',
            };
            break;
        case 'pantone_uncoated':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'PMS-U',
                value: (color && color.pantoneUncoated) ?? '',
                placeholder: '00-0000',
            };
            break;
        case 'pantone_cp':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'PMS-CP',
                value: (color && color.pantoneCp) ?? '',
                placeholder: '0000 CP',
            };
            break;
        case 'pantone_plastics':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'PMS-PQ',
                value: color && '',
                placeholder: 'PQ-000C',
            };
            break;
        case 'pantone_textile':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'PMS-TCX',
                value: (color && color.pantoneTextile) ?? '',
                placeholder: '00-000 TCX',
            };
            break;
        case 'oracal':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'ORA',
                value: (color && color.oracal) ?? '',
                placeholder: '000',
            };
            break;
        case 'cmyk':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'CMYK',
                value: color && `${color.c}/${color.m}/${color.y}/${color.k}`,
                placeholder: 'c/m/y/k',
            };
            break;
        case 'cmyk_coated':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'CMYK-C',
                value: (color && color.cmykCoated) ?? '',
                placeholder: 'c/m/y/k c',
            };
            break;
        case 'cmyk_uncoated':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'CMYK-U',
                value: (color && color.cmykUncoated) ?? '',
                placeholder: 'c/m/y/k u',
            };
            break;
        case 'cmyk_newspaper':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'CMYK-N',
                value: (color && color.cmykNewspaper) ?? '',
                placeholder: 'c/m/y/k n',
            };
            break;
        case 'ncs':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'NCS',
                value: (color && color.ncs) ?? '',
                placeholder: '0000-0000',
            };
            break;
        case 'hks':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'HKS',
                value: (color && color.hks) ?? '',
                placeholder: '00 K',
            };
            break;
        case 'three_m':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: '3M',
                value: (color && color.threeM) ?? '',
                placeholder: '208',
            };
            break;
        case 'lab':
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'LAB',
                value: (color && color.lab) ?? '',
                placeholder: 'l,a,b,%',
            };
            break;
        default:
            mappedColorSpace = {
                id: colorSpaceID,
                badge: 'HEX',
                value: color && `#${color.hex}`,
                placeholder: '#hexhex',
            };
    }

    return mappedColorSpace;
};
