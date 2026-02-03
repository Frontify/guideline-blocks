/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Zoom } from '../../types';
import { type ImageContainer } from '../ImageContainer';
import { type ImageElement } from '../ImageElement';
import { type ImageStage } from '../ImageStage';

import { IMAGE_PADDING_PERCENTAGE_DEFAULT } from './constants';

export abstract class ContainerOperator {
    protected padding = IMAGE_PADDING_PERCENTAGE_DEFAULT;

    constructor(
        protected imageContainer: ImageContainer,
        protected imageStage: ImageStage,
        protected imageElement: ImageElement
    ) {}

    public setPadding(paddingInPercentage: number): this {
        this.padding = paddingInPercentage;
        return this;
    }

    public centerTheImageContainerWithinTheImageStage() {
        this.imageElement.hide();
        this.centerImageContainerWithinTheImageStage();
        this.imageElement.show();
    }

    protected centerImageContainerWithinTheImageStage() {
        this.imageContainer.setImageContainerPosition(
            (this.imageStage.width - this.imageContainer.width) / 2,
            (this.imageStage.height - this.imageContainer.height) / 2
        );
    }

    protected resizeImageContainerToFitWithinImageStage() {
        const { width, height } = this.calculateTheImageContainerSizeToFitInImageStage();
        this.imageContainer.setImageContainerSize(width * (1 - this.padding), height * (1 - this.padding));
    }

    private calculateTheImageContainerSizeToFitInImageStage(): { width: number; height: number } {
        const scale =
            this.imageStage.aspectRatio() < this.imageElement.aspectRatio()
                ? this.imageStage.width / this.imageElement.width
                : this.imageStage.height / this.imageElement.height;

        return { width: this.imageElement.width * scale, height: this.imageElement.height * scale };
    }

    abstract resize(zoom: Zoom): this;
    abstract fitAndCenterTheImageContainerWithinTheImageStage(): this;
}
