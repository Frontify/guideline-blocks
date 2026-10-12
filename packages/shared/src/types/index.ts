/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum ImageFormat {
    WEBP = 'webp',
    JPG = 'jpg',
    PNG = 'png',
    GIF = 'gif',
}

export type Color = {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    name?: string;
};
