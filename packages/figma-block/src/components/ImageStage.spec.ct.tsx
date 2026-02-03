/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';

import { ImageStage } from './ImageStage';

const IMAGE_STAGE_SELECTOR = '[id="image-stage"]';

const ImageStageDivBlock = () => <div id="image-stage" style={{ height: 100, width: 200 }}></div>;

describe('ImageStage', () => {
    it('return the correct width and height', () => {
        mount(<ImageStageDivBlock />);

        cy.get(IMAGE_STAGE_SELECTOR).then((element) => {
            const imageStage = new ImageStage(element.get(0) as HTMLDivElement);

            expect(imageStage.height).to.equal(100);
            expect(imageStage.width).to.equal(200);
            return null;
        });
    });

    it('return the correct aspectRatio', () => {
        mount(<ImageStageDivBlock />);

        cy.get(IMAGE_STAGE_SELECTOR).then((element) => {
            const imageStage = new ImageStage(element.get(0) as HTMLDivElement);
            expect(imageStage.aspectRatio()).to.equal(2);
            return null;
        });
    });

    it('correct alters the height', () => {
        mount(<ImageStageDivBlock />);

        cy.get(IMAGE_STAGE_SELECTOR).then((element) => {
            const imageStage = new ImageStage(element.get(0) as HTMLDivElement);
            imageStage.alterHeight('300px');
            expect(imageStage.height).to.equal(300);
            return null;
        });
    });
});
