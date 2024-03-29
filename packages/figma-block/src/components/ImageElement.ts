/* (c) Copyright Frontify Ltd., all rights reserved. */

export class ImageElement {
    constructor(protected imageElement: HTMLImageElement) {}

    get height(): number {
        return this.imageElement.height;
    }

    get width(): number {
        return this.imageElement.width;
    }

    public show() {
        this.imageElement.style.visibility = 'visible';
    }

    public hide() {
        this.imageElement.style.visibility = 'hidden';
    }

    public aspectRatio(): number {
        return this.height === 0 ? 0 : this.width / this.height;
    }
}
