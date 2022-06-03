/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Cursor } from '../types';

export class ImageContainer {
    constructor(protected imageContainer: HTMLDivElement) {
        imageContainer.ondragstart = () => false;
    }

    public changeMouseCursor = (cursor: Cursor) => {
        this.imageContainer.style.cursor = cursor;
    };

    public setImageContainerPosition(left: number, top: number) {
        this.imageContainer.style.left = `${left}px`;
        this.imageContainer.style.top = `${top}px`;
    }

    public setImageContainerSize(width: number, height: number) {
        this.imageContainer.style.width = `${width}px`;
        this.imageContainer.style.height = `${height}px`;
    }

    get height(): number {
        return this.imageContainer.clientHeight;
    }

    get width(): number {
        return this.imageContainer.clientWidth;
    }

    get offsetLeft(): number {
        return this.imageContainer.offsetLeft;
    }

    get offsetTop(): number {
        return this.imageContainer.offsetTop;
    }

    get node(): HTMLDivElement {
        return this.imageContainer;
    }
}
