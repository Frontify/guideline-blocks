/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ContainerOperator } from './ContainerOperator';
import { ImageContainer } from '../ImageContainer';
import { ImageStage } from '../ImageStage';
import { ImageElement } from '../ImageElement';

export class BitmapContainerOperator extends ContainerOperator {
    constructor(
        protected imageContainer: ImageContainer,
        protected imageStage: ImageStage,
        protected imageElement: ImageElement
    ) {
        super(imageContainer, imageStage, imageElement);
    }

    public resize() {
        return this;
    }

    public fitAndCenterTheImageContainerWithinTheImageStage() {
        return this;
    }
}
