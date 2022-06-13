/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ImageContainer } from '../ImageContainer';
import { ImageStage } from '../ImageStage';
import { ImageElement } from '../ImageElement';
import { Zoom } from '../../types';
import { IMAGE_PADDING_PERCENTAGE } from './constants';

export abstract class ContainerOperator {
    constructor(
        protected imageContainer: ImageContainer,
        protected imageStage: ImageStage,
        protected imageElement: ImageElement
    ) {
        this.fitAndCenterTheImageContainerWithinTheImageStage();
    }

    public fitAndCenterTheImageContainerWithinTheImageStage() {
        this.imageElement.hide();
        this.resizeImageContainerToFitWithinImageStage();
        this.centerImageContainerWithinTheImageStage();
        this.imageElement.show();
    }

    private resizeImageContainerToFitWithinImageStage() {
        const { width, height } = this.calculateTheImageContainerSizeToFitInImageStage();
        this.imageContainer.setImageContainerSize(
            width * (1 - IMAGE_PADDING_PERCENTAGE),
            height * (1 - IMAGE_PADDING_PERCENTAGE)
        );
    }

    private calculateTheImageContainerSizeToFitInImageStage(): { width: number; height: number } {
        const scale =
            this.imageStage.aspectRatio() < this.imageElement.aspectRatio()
                ? this.imageStage.width / this.imageElement.width
                : this.imageStage.height / this.imageElement.height;

        return { width: this.imageElement.width * scale, height: this.imageElement.height * scale };
    }

    public centerTheImageContainerWithinTheImageStage() {
        this.imageElement.hide();
        this.centerImageContainerWithinTheImageStage();
        this.imageElement.show();
    }

    private centerImageContainerWithinTheImageStage() {
        this.imageContainer.setImageContainerPosition(
            (this.imageStage.width - this.imageContainer.width) / 2,
            (this.imageStage.height - this.imageContainer.height) / 2
        );
    }

    abstract resize(zoom: Zoom): void;
}
