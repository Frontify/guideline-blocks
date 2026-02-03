/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ImageContainer } from '../ImageContainer';
import { type ImageElement } from '../ImageElement';
import { type ImageStage } from '../ImageStage';

import { ContainerOperator } from './ContainerOperator';

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
