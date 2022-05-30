/* (c) Copyright Frontify Ltd., all rights reserved. */

export class ImageElement {
    constructor(protected imageElement: HTMLImageElement) {}

    public show() {
        this.imageElement.style.visibility = 'visible';
    }

    get height(): number {
        return this.imageElement.height;
    }

    get width(): number {
        return this.imageElement.width;
    }

    aspectRatio() {
        return this.width / this.height;
    }
}
