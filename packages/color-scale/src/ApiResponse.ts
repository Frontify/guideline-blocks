export interface ColorApiResponse {
    id: string;
    hex: string;
    name: string;
}

export interface ColorPaletteApiResponse {
    colors: ColorApiResponse[];
}

export interface ApiReponse {
    palettes: ColorPaletteApiResponse[];
}
