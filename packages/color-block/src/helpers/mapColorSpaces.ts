type ColorSpace = {
    id: string;
    value?: string;
    placeholder?: string;
};

export const mapColorSpaces = (colorSpaceID: string) => {
    let mappedColorSpace: ColorSpace = { id: colorSpaceID };

    switch (colorSpaceID) {
        case 'hex':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'HEX',
                placeholder: '#hexhex',
            };
            break;
        case 'rgb':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'RGB',
                placeholder: 'r/g/b',
            };
            break;
        case 'variable':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'LESS',
                placeholder: 'h,s,l',
            };
            break;
        case 'ral':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'RAL',
                placeholder: 'r,a,l',
            };
            break;
        case 'pantone':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'PMS',
                placeholder: 'color 0000 p',
            };
            break;
        case 'pantone_coated':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'PMS-C',
                placeholder: 'p 000 00 c',
            };
            break;
        case 'pantone_uncoated':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'PMS-U',
                placeholder: '00-0000',
            };
            break;
        case 'pantone_cp':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'PMS-CP',
                placeholder: '0000 CP',
            };
            break;
        case 'pantone_plastics':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'PMS-PQ',
                placeholder: 'PQ-000C',
            };
            break;
        case 'pantone_textile':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'PMS-TCX',
                placeholder: '00-000 TCX',
            };
            break;
        case 'oracal':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'ORA',
                placeholder: '000',
            };
            break;
        case 'cmyk':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'CMYK',
                placeholder: 'c/m/y/k',
            };
            break;
        case 'cmyk_coated':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'CMYK-C',
                placeholder: 'c/m/y/k c',
            };
            break;
        case 'cmyk_uncoated':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'CMYK-U',
                placeholder: 'c/m/y/k u',
            };
            break;
        case 'cmyk_newspaper':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'CMYK-N',
                placeholder: 'c/m/y/k n',
            };
            break;
        case 'ncs':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'NCS',
                placeholder: '0000-0000',
            };
            break;
        case 'hks':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'HKS',
                placeholder: '00 K',
            };
            break;
        case 'three_m':
            mappedColorSpace = {
                id: colorSpaceID,
                value: '3M',
                placeholder: '208',
            };
            break;
        case 'lab':
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'LAB',
                placeholder: 'l,a,b,%',
            };
            break;
        default:
            mappedColorSpace = {
                id: colorSpaceID,
                value: 'HEX',
                placeholder: '#hexhex',
            };
    }

    return mappedColorSpace;
};
